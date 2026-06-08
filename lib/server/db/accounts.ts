import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";

export interface Account {
  id: string;
  email: string;
  primarySessionId: string;
  createdAt: string;
  lastSignInAt: string | null;
}

type Row = Record<string, unknown>;

function toAccount(r: Row): Account {
  return {
    id: String(r.id),
    email: String(r.email),
    primarySessionId: String(r.primary_session_id),
    createdAt: String(r.created_at),
    lastSignInAt: r.last_sign_in_at == null ? null : String(r.last_sign_in_at),
  };
}

export async function getAccountByEmail(
  email: string,
): Promise<Account | null> {
  await ensureSchema();
  const clean = email.trim().toLowerCase();
  const res = await getDb().execute({
    sql: `SELECT * FROM accounts WHERE email = ?`,
    args: [clean],
  });
  return res.rows[0] ? toAccount(res.rows[0] as Row) : null;
}

export async function getAccountById(id: string): Promise<Account | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM accounts WHERE id = ?`,
    args: [id],
  });
  return res.rows[0] ? toAccount(res.rows[0] as Row) : null;
}

export async function createAccount(args: {
  email: string;
  primarySessionId: string;
}): Promise<Account> {
  await ensureSchema();
  const clean = args.email.trim().toLowerCase();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await getDb().execute({
    sql: `INSERT INTO accounts (id, email, primary_session_id, created_at, last_sign_in_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [id, clean, args.primarySessionId, now, now],
  });
  return (await getAccountById(id))!;
}

export async function touchSignIn(accountId: string): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE accounts SET last_sign_in_at = ? WHERE id = ?`,
    args: [new Date().toISOString(), accountId],
  });
}

/** Attach a session row to an account. */
export async function linkSessionToAccount(
  sessionId: string,
  accountId: string,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `UPDATE sessions SET account_id = ? WHERE id = ?`,
    args: [accountId, sessionId],
  });
}
