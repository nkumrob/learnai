import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";

export interface Session {
  id: string;
  learnerName: string | null;
  tier: "free" | "premium";
  /** Level the learner was placed at (1..5); defaults to 1. */
  startLevel: number;
  email: string | null;
  emailMarketingOk: boolean;
  timezone: string | null;
  streakCount: number;
  lastPassedAt: number | null;
  lastSeenAt: number | null;
  /** Set when the session is bound to an opted-in account. */
  accountId: string | null;
}

type Row = Record<string, unknown>;

function toSession(r: Row): Session {
  return {
    id: String(r.id),
    learnerName: r.learner_name == null ? null : String(r.learner_name),
    tier: (r.tier as "free" | "premium") ?? "free",
    startLevel: r.start_level == null ? 1 : Number(r.start_level),
    email: r.email == null ? null : String(r.email),
    emailMarketingOk: r.email_marketing_ok == null ? true : Number(r.email_marketing_ok) === 1,
    timezone: r.timezone == null ? null : String(r.timezone),
    streakCount: r.streak_count == null ? 0 : Number(r.streak_count),
    lastPassedAt: r.last_passed_at == null ? null : Number(r.last_passed_at),
    lastSeenAt: r.last_seen_at == null ? null : Number(r.last_seen_at),
    accountId: r.account_id == null ? null : String(r.account_id),
  };
}

export async function getSession(id: string): Promise<Session | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM sessions WHERE id = ?`,
    args: [id],
  });
  return res.rows[0] ? toSession(res.rows[0] as Row) : null;
}

export async function createSession(id: string): Promise<Session> {
  await ensureSchema();
  const now = Date.now();
  await getDb().execute({
    sql: `INSERT INTO sessions (id, created_at, last_seen_at) VALUES (?, ?, ?)
          ON CONFLICT(id) DO NOTHING`,
    args: [id, new Date().toISOString(), now],
  });
  return (await getSession(id))!;
}

export async function touchSeen(id: string): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions SET last_seen_at = ? WHERE id = ?`,
    args: [Date.now(), id],
  });
}

export async function setLearnerName(
  id: string,
  name: string,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions SET learner_name = ? WHERE id = ?`,
    args: [name, id],
  });
}

/** Record the placement result so the journey can open the right levels. */
export async function setStartLevel(
  id: string,
  level: number,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions SET start_level = ? WHERE id = ?`,
    args: [level, id],
  });
}

/** Save the email captured after the first quiz pass. Lower-cases and trims. */
export async function setEmail(id: string, email: string): Promise<void> {
  await ensureSchema();
  const clean = email.trim().toLowerCase();
  if (!clean) return;
  await getDb().execute({
    sql: `UPDATE sessions SET email = ?, email_marketing_ok = 1 WHERE id = ?`,
    args: [clean, id],
  });
}

/** Token-based unsubscribe. Sets opt-out without removing the email so we
 *  can still send transactional (certificate) mail if needed. */
export async function setMarketingOptOut(id: string): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions SET email_marketing_ok = 0 WHERE id = ?`,
    args: [id],
  });
}

/** Update streak counter + last_passed_at as a single atomic write. */
export async function updateStreak(
  id: string,
  streakCount: number,
  lastPassedAt: number,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions
          SET streak_count = ?, last_passed_at = ?
          WHERE id = ?`,
    args: [streakCount, lastPassedAt, id],
  });
}
