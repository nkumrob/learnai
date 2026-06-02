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
    sql: `SELECT p.module_id, p.status, p.score
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
  // Keep the best score: only overwrite if the new score is higher (or new row).
  await getDb().execute({
    sql: `INSERT INTO progress (session_id, module_id, status, score, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(session_id, module_id) DO UPDATE SET
            status = CASE WHEN excluded.status = 'passed'
                          OR progress.status != 'passed'
                          THEN excluded.status ELSE progress.status END,
            score = MAX(COALESCE(progress.score, 0), COALESCE(excluded.score, 0)),
            updated_at = excluded.updated_at`,
    args: [sessionId, moduleId, status, score, new Date().toISOString()],
  });
}

/** True when every module in the track has status 'passed' for this session. */
export async function isTrackPassed(
  sessionId: string,
  trackId: string,
): Promise<boolean> {
  await ensureSchema();
  const total = await getDb().execute({
    sql: `SELECT COUNT(*) AS n FROM modules WHERE track_id = ?`,
    args: [trackId],
  });
  const passed = await getDb().execute({
    sql: `SELECT COUNT(*) AS n
          FROM progress p JOIN modules m ON m.id = p.module_id
          WHERE p.session_id = ? AND m.track_id = ? AND p.status = 'passed'`,
    args: [sessionId, trackId],
  });
  const totalN = Number((total.rows[0] as Row).n);
  const passedN = Number((passed.rows[0] as Row).n);
  return totalN > 0 && passedN === totalN;
}
