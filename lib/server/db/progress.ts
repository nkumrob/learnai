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
    sql: `SELECT p.module_id, p.status, p.score, p.task_done
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
    };
  });
}

export async function upsertProgress(
  sessionId: string,
  moduleId: string,
  status: ProgressStatus,
  score: number | null,
): Promise<void> {
  await ensureSchema();
  // Keep the best score; never downgrade a 'passed' status.
  await getDb().execute({
    sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at)
          VALUES (?, ?, ?, ?, 0, ?)
          ON CONFLICT(session_id, module_id) DO UPDATE SET
            status = CASE WHEN excluded.status = 'passed'
                          OR progress.status != 'passed'
                          THEN excluded.status ELSE progress.status END,
            score = MAX(COALESCE(progress.score, 0), COALESCE(excluded.score, 0)),
            updated_at = excluded.updated_at`,
    args: [sessionId, moduleId, status, score, new Date().toISOString()],
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
