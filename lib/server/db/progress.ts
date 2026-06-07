import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";
import type { ModuleProgress, ProgressStatus } from "@/types/shared";

type Row = Record<string, unknown>;

export async function getTrackProgress(
  sessionId: string,
  trackId: string,
): Promise<ModuleProgress[]> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT p.module_id, p.status, p.score, p.task_done,
                 p.passed_at, p.time_spent_seconds, p.updated_at
          FROM progress p
          JOIN modules m ON m.id = p.module_id
          WHERE p.session_id = ? AND m.track_id = ?`,
    args: [sessionId, trackId],
  });
  return res.rows.map((r) => {
    const row = r as Row;
    return {
      moduleId: String(row.module_id),
      status: row.status as ProgressStatus,
      score: row.score == null ? null : Number(row.score),
      taskDone: Number(row.task_done) === 1,
      passedAt: row.passed_at == null ? null : Number(row.passed_at),
      timeSpentSeconds: row.time_spent_seconds == null ? 0 : Number(row.time_spent_seconds),
      updatedAt: row.updated_at == null ? null : String(row.updated_at),
    };
  });
}

/** Returns ALL pass timestamps for a session across all tracks. Used by the
 *  streak calculator to group passes by calendar day. */
export async function getAllPassTimestamps(
  sessionId: string,
): Promise<number[]> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT passed_at FROM progress
          WHERE session_id = ? AND passed_at IS NOT NULL
          ORDER BY passed_at DESC`,
    args: [sessionId],
  });
  return res.rows
    .map((r) => Number((r as Row).passed_at))
    .filter((n) => Number.isFinite(n) && n > 0);
}

/** Total stats for a session — used by the dashboard. */
export interface SessionStats {
  modulesPassed: number;
  totalTimeSeconds: number;
  thisWeekTimeSeconds: number;
}

export async function getSessionStats(
  sessionId: string,
): Promise<SessionStats> {
  await ensureSchema();
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();
  const res = await getDb().execute({
    sql: `SELECT
            COUNT(CASE WHEN status = 'passed' THEN 1 END) AS modules_passed,
            COALESCE(SUM(time_spent_seconds), 0) AS total_seconds,
            COALESCE(SUM(CASE WHEN updated_at >= ? THEN time_spent_seconds ELSE 0 END), 0) AS week_seconds
          FROM progress
          WHERE session_id = ?`,
    args: [weekAgo, sessionId],
  });
  const row = res.rows[0] as Row;
  return {
    modulesPassed: Number(row.modules_passed) || 0,
    totalTimeSeconds: Number(row.total_seconds) || 0,
    thisWeekTimeSeconds: Number(row.week_seconds) || 0,
  };
}

/** The single most-recent in-progress (or just-passed) module for resume
 *  surfacing on the dashboard. */
export async function getMostRecentModule(
  sessionId: string,
): Promise<{ moduleId: string; status: ProgressStatus; score: number | null } | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT module_id, status, score
          FROM progress
          WHERE session_id = ?
          ORDER BY updated_at DESC
          LIMIT 1`,
    args: [sessionId],
  });
  if (!res.rows[0]) return null;
  const row = res.rows[0] as Row;
  return {
    moduleId: String(row.module_id),
    status: row.status as ProgressStatus,
    score: row.score == null ? null : Number(row.score),
  };
}

export async function upsertProgress(
  sessionId: string,
  moduleId: string,
  status: ProgressStatus,
  score: number | null,
): Promise<{ wasFirstPass: boolean }> {
  await ensureSchema();
  const isPass = status === "passed";
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  // Check whether this is the learner's FIRST pass overall (across all modules).
  // Used to surface the soft email capture moment.
  let wasFirstPass = false;
  if (isPass) {
    const existing = await getDb().execute({
      sql: `SELECT COUNT(*) AS n FROM progress
            WHERE session_id = ? AND status = 'passed'`,
      args: [sessionId],
    });
    const prior = Number((existing.rows[0] as Row).n);
    wasFirstPass = prior === 0;
  }

  // Keep the best score; never downgrade a 'passed' status; set passed_at the
  // first time the module is passed (so we never overwrite the original date).
  await getDb().execute({
    sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, passed_at)
          VALUES (?, ?, ?, ?, 0, ?, ?)
          ON CONFLICT(session_id, module_id) DO UPDATE SET
            status = CASE WHEN excluded.status = 'passed'
                          OR progress.status != 'passed'
                          THEN excluded.status ELSE progress.status END,
            score = MAX(COALESCE(progress.score, 0), COALESCE(excluded.score, 0)),
            updated_at = excluded.updated_at,
            passed_at = COALESCE(progress.passed_at, excluded.passed_at)`,
    args: [
      sessionId,
      moduleId,
      status,
      score,
      nowIso,
      isPass ? now : null,
    ],
  });
  return { wasFirstPass };
}

/** Bump the time-on-lesson counter for a module. Adds delta seconds; never
 *  decreases. Used by the lesson-player heartbeat (Phase 4). */
export async function addTimeSpent(
  sessionId: string,
  moduleId: string,
  deltaSeconds: number,
): Promise<void> {
  if (deltaSeconds <= 0) return;
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, time_spent_seconds)
          VALUES (?, ?, 'in_progress', NULL, 0, ?, ?)
          ON CONFLICT(session_id, module_id) DO UPDATE SET
            time_spent_seconds = COALESCE(progress.time_spent_seconds, 0) + excluded.time_spent_seconds,
            updated_at = excluded.updated_at`,
    args: [sessionId, moduleId, new Date().toISOString(), deltaSeconds],
  });
}

/** Mark (or unmark) the hands-on task as completed by the learner. */
export async function setTaskDone(
  sessionId: string,
  moduleId: string,
  done: boolean,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at)
          VALUES (?, ?, 'in_progress', NULL, ?, ?)
          ON CONFLICT(session_id, module_id) DO UPDATE SET
            task_done = excluded.task_done,
            updated_at = excluded.updated_at`,
    args: [sessionId, moduleId, done ? 1 : 0, new Date().toISOString()],
  });
}

/** All modules in the track have status 'passed' (quiz gate). */
export async function isTrackPassed(
  sessionId: string,
  trackId: string,
): Promise<boolean> {
  return countMatchesTotal(
    sessionId,
    trackId,
    `p.status = 'passed'`,
  );
}

/** All modules passed AND their tasks self-attested (full completion). */
export async function isTrackComplete(
  sessionId: string,
  trackId: string,
): Promise<boolean> {
  return countMatchesTotal(
    sessionId,
    trackId,
    `p.status = 'passed' AND p.task_done = 1`,
  );
}

async function countMatchesTotal(
  sessionId: string,
  trackId: string,
  condition: string,
): Promise<boolean> {
  await ensureSchema();
  const total = await getDb().execute({
    sql: `SELECT COUNT(*) AS n FROM modules WHERE track_id = ?`,
    args: [trackId],
  });
  const done = await getDb().execute({
    sql: `SELECT COUNT(*) AS n
          FROM progress p JOIN modules m ON m.id = p.module_id
          WHERE p.session_id = ? AND m.track_id = ? AND ${condition}`,
    args: [sessionId, trackId],
  });
  const totalN = Number((total.rows[0] as Row).n);
  const doneN = Number((done.rows[0] as Row).n);
  return totalN > 0 && doneN === totalN;
}
