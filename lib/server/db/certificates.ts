import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";
import type { Certificate } from "@/types/shared";

type Row = Record<string, unknown>;

function toCertificate(r: Row): Certificate {
  return {
    id: String(r.id),
    trackId: String(r.track_id),
    trackTitle: String(r.track_title),
    learnerName: String(r.learner_name),
    issuedAt: String(r.issued_at),
    verifyToken: String(r.verify_token),
  };
}

const SELECT = `SELECT c.id, c.track_id, c.learner_name, c.issued_at,
                       c.verify_token, t.title AS track_title
                FROM certificates c JOIN tracks t ON t.id = c.track_id`;

export async function issueCertificate(args: {
  sessionId: string;
  trackId: string;
  learnerName: string;
}): Promise<Certificate> {
  await ensureSchema();
  const existing = await getForSessionTrack(args.sessionId, args.trackId);
  if (existing) return existing;

  const id = crypto.randomUUID();
  const verifyToken = crypto.randomUUID().replace(/-/g, "");
  await getDb().execute({
    sql: `INSERT INTO certificates
            (id, session_id, track_id, learner_name, issued_at, verify_token)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      args.sessionId,
      args.trackId,
      args.learnerName,
      new Date().toISOString(),
      verifyToken,
    ],
  });
  return (await getByToken(verifyToken))!;
}

export async function getForSessionTrack(
  sessionId: string,
  trackId: string,
): Promise<Certificate | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `${SELECT} WHERE c.session_id = ? AND c.track_id = ?`,
    args: [sessionId, trackId],
  });
  return res.rows[0] ? toCertificate(res.rows[0] as Row) : null;
}

export async function getByToken(token: string): Promise<Certificate | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `${SELECT} WHERE c.verify_token = ?`,
    args: [token],
  });
  return res.rows[0] ? toCertificate(res.rows[0] as Row) : null;
}

/** All certificates ever issued, newest first. Used by the sitemap so every
 *  public /verify/[token] page is discoverable. Safe to call at build time. */
export async function listAllCerts(): Promise<
  Array<{ verifyToken: string; issuedAt: string }>
> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT verify_token, issued_at FROM certificates
          ORDER BY issued_at DESC LIMIT 40000`,
  });
  return res.rows.map((r) => {
    const row = r as Row;
    return {
      verifyToken: String(row.verify_token),
      issuedAt: String(row.issued_at),
    };
  });
}
