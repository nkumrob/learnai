import "server-only";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";

export type EmailType =
  | "welcome"
  | "day_2"
  | "streak_save"
  | "cert_issued";

export async function logEmailSent(
  sessionId: string,
  type: EmailType,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO email_events (id, session_id, type, sent_at)
          VALUES (?, ?, ?, ?)`,
    args: [
      crypto.randomUUID(),
      sessionId,
      type,
      new Date().toISOString(),
    ],
  });
}

/** Count emails sent to this session in the last N days. Used for frequency
 *  caps (max 4/week). */
export async function countRecent(
  sessionId: string,
  days = 7,
): Promise<number> {
  await ensureSchema();
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const res = await getDb().execute({
    sql: `SELECT COUNT(*) AS n FROM email_events
          WHERE session_id = ? AND sent_at >= ?`,
    args: [sessionId, since],
  });
  return Number((res.rows[0] as Record<string, unknown>).n) || 0;
}

/** Was an email of this specific type sent in the last N hours? */
export async function wasSentRecently(
  sessionId: string,
  type: EmailType,
  hours: number,
): Promise<boolean> {
  await ensureSchema();
  const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();
  const res = await getDb().execute({
    sql: `SELECT 1 FROM email_events
          WHERE session_id = ? AND type = ? AND sent_at >= ?
          LIMIT 1`,
    args: [sessionId, type, since],
  });
  return res.rows.length > 0;
}
