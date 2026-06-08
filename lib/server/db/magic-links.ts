import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";

export interface MagicLink {
  token: string;
  email: string;
  pendingSessionId: string;
  createdAt: string;
  expiresAt: number;
  usedAt: string | null;
}

const TTL_MINUTES = 15;

export async function createMagicLink(args: {
  email: string;
  pendingSessionId: string;
}): Promise<MagicLink> {
  await ensureSchema();
  // 32 hex chars from crypto.randomUUID (no hyphens) + 16 random.
  const token =
    crypto.randomUUID().replace(/-/g, "") +
    Math.random().toString(36).slice(2, 18);
  const now = Date.now();
  const expiresAt = now + TTL_MINUTES * 60 * 1000;
  const email = args.email.trim().toLowerCase();
  await getDb().execute({
    sql: `INSERT INTO magic_links (token, email, pending_session_id, created_at, expires_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [token, email, args.pendingSessionId, new Date(now).toISOString(), expiresAt],
  });
  return {
    token,
    email,
    pendingSessionId: args.pendingSessionId,
    createdAt: new Date(now).toISOString(),
    expiresAt,
    usedAt: null,
  };
}

/** Atomically consumes the token: returns null if expired/used, otherwise
 *  the link details. Marks used_at as a side effect. */
export async function consumeMagicLink(token: string): Promise<MagicLink | null> {
  await ensureSchema();
  const db = getDb();
  const res = await db.execute({
    sql: `SELECT token, email, pending_session_id, created_at, expires_at, used_at
          FROM magic_links WHERE token = ?`,
    args: [token],
  });
  const row = res.rows[0];
  if (!row) return null;
  const r = row as Record<string, unknown>;
  const expiresAt = Number(r.expires_at);
  if (r.used_at != null) return null;
  if (Date.now() > expiresAt) return null;

  await db.execute({
    sql: `UPDATE magic_links SET used_at = ? WHERE token = ? AND used_at IS NULL`,
    args: [new Date().toISOString(), token],
  });

  return {
    token: String(r.token),
    email: String(r.email),
    pendingSessionId: String(r.pending_session_id),
    createdAt: String(r.created_at),
    expiresAt,
    usedAt: new Date().toISOString(),
  };
}

/** Throttle: max 3 magic-link emails per email address per hour. */
export async function recentMagicLinkCount(email: string): Promise<number> {
  await ensureSchema();
  const clean = email.trim().toLowerCase();
  const hourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
  const res = await getDb().execute({
    sql: `SELECT COUNT(*) AS n FROM magic_links
          WHERE email = ? AND created_at >= ?`,
    args: [clean, hourAgo],
  });
  return Number((res.rows[0] as Record<string, unknown>).n) || 0;
}
