import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";

export interface Session {
  id: string;
  learnerName: string | null;
  tier: "free" | "premium";
  /** Level the learner was placed at (1..5); defaults to 1. */
  startLevel: number;
}

type Row = Record<string, unknown>;

function toSession(r: Row): Session {
  return {
    id: String(r.id),
    learnerName: r.learner_name == null ? null : String(r.learner_name),
    tier: (r.tier as "free" | "premium") ?? "free",
    startLevel: r.start_level == null ? 1 : Number(r.start_level),
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
  await getDb().execute({
    sql: `INSERT INTO sessions (id, created_at) VALUES (?, ?)
          ON CONFLICT(id) DO NOTHING`,
    args: [id, new Date().toISOString()],
  });
  return (await getSession(id))!;
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
