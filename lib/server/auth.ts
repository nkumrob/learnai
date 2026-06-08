import "server-only";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import {
  createAccount,
  getAccountByEmail,
  linkSessionToAccount,
  touchSignIn,
  type Account,
} from "@/lib/server/db/accounts";
import {
  consumeMagicLink,
  createMagicLink,
  recentMagicLinkCount,
} from "@/lib/server/db/magic-links";
import { sendEmail } from "@/lib/server/email/client";
import { magicLinkTemplate } from "@/lib/server/email/templates";
import { setEmail } from "@/lib/server/db/sessions";

const MAGIC_LINK_HOURLY_CAP = 3;

interface SendMagicLinkArgs {
  email: string;
  /** The current cookie session — gets attached to the account on verify. */
  sessionId: string;
}

export type SendResult =
  | { ok: true; devToken?: string }
  | { ok: false; reason: "rate_limited" | "invalid_email" | "send_failed" };

export async function sendMagicLink(args: SendMagicLinkArgs): Promise<SendResult> {
  const email = args.email.trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, reason: "invalid_email" };
  }

  const recent = await recentMagicLinkCount(email);
  if (recent >= MAGIC_LINK_HOURLY_CAP) {
    return { ok: false, reason: "rate_limited" };
  }

  const link = await createMagicLink({
    email,
    pendingSessionId: args.sessionId,
  });

  const base = process.env.APP_URL ?? "https://learnai.to";
  const verifyUrl = `${base}/api/auth/verify?token=${link.token}`;

  const tpl = magicLinkTemplate({ verifyUrl, expiresInMinutes: 15 });
  const res = await sendEmail({
    to: email,
    subject: tpl.subject,
    html: tpl.html,
    text: tpl.text,
  });

  // In development without a Resend key, surface the token so testing isn't
  // blocked. The dry-run console line in sendEmail also logs the link.
  if (!res.ok && res.reason === "no_api_key") {
    console.log(`[auth] magic-link DEV URL: ${verifyUrl}`);
    return { ok: true, devToken: link.token };
  }
  if (!res.ok) {
    return { ok: false, reason: "send_failed" };
  }
  return { ok: true };
}

interface VerifyResult {
  /** The session_id the browser cookie should hold after this call. */
  activeSessionId: string;
  account: Account;
}

/** Verifies a magic-link token and merges progress.
 *
 *  - New email → create account, the pending session becomes the primary.
 *  - Existing email → merge pending session's progress + certs into the
 *    account's primary session, then swap the cookie to the primary.
 *
 *  Returns the session_id the cookie should be set to. */
export async function verifyAndSignIn(token: string): Promise<VerifyResult | null> {
  const link = await consumeMagicLink(token);
  if (!link) return null;

  await ensureSchema();
  const db = getDb();
  const existing = await getAccountByEmail(link.email);

  if (!existing) {
    // Brand new account — pending session is the primary.
    const account = await createAccount({
      email: link.email,
      primarySessionId: link.pendingSessionId,
    });
    await linkSessionToAccount(link.pendingSessionId, account.id);
    await setEmail(link.pendingSessionId, link.email);
    return { activeSessionId: link.pendingSessionId, account };
  }

  // Existing account: merge pending session into primary if different.
  const pending = link.pendingSessionId;
  const primary = existing.primarySessionId;
  if (pending !== primary) {
    // Merge progress: take best score / preserve passed_at.
    await db.execute({
      sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, passed_at, time_spent_seconds)
            SELECT ?, module_id, status, score, task_done, updated_at, passed_at, COALESCE(time_spent_seconds, 0)
            FROM progress WHERE session_id = ?
            ON CONFLICT(session_id, module_id) DO UPDATE SET
              status = CASE WHEN excluded.status = 'passed' OR progress.status != 'passed'
                            THEN excluded.status ELSE progress.status END,
              score = MAX(COALESCE(progress.score, 0), COALESCE(excluded.score, 0)),
              task_done = MAX(progress.task_done, excluded.task_done),
              passed_at = COALESCE(progress.passed_at, excluded.passed_at),
              time_spent_seconds = COALESCE(progress.time_spent_seconds, 0) + COALESCE(excluded.time_spent_seconds, 0),
              updated_at = excluded.updated_at`,
      args: [primary, pending],
    });

    // Merge certificates: copy any from pending that primary doesn't have.
    await db.execute({
      sql: `INSERT INTO certificates (id, session_id, track_id, learner_name, issued_at, verify_token)
            SELECT id, ?, track_id, learner_name, issued_at, verify_token
            FROM certificates WHERE session_id = ?
            ON CONFLICT(session_id, track_id) DO NOTHING`,
      args: [primary, pending],
    });

    // Tidy up: remove the (now-stale) pending session's progress/certs so the
    // old session id is "orphaned" and can be garbage collected later.
    await db.execute({
      sql: `DELETE FROM progress WHERE session_id = ?`,
      args: [pending],
    });
    await db.execute({
      sql: `DELETE FROM certificates WHERE session_id = ?`,
      args: [pending],
    });
  }

  // Ensure the primary session is linked to the account and its email is set.
  await linkSessionToAccount(primary, existing.id);
  await setEmail(primary, link.email);
  await touchSignIn(existing.id);

  return { activeSessionId: primary, account: existing };
}
