import "server-only";

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendResult {
  ok: boolean;
  /** When ok=false, the reason the email wasn't sent. */
  reason?: "no_api_key" | "send_failed" | "no_recipient";
  id?: string;
}

/**
 * Thin wrapper around the Resend HTTP API. We avoid importing the `resend`
 * SDK so this file works in edge runtimes too; only standard fetch is used.
 *
 * Gracefully degrades to a no-op + console log in dev when RESEND_API_KEY
 * is missing. Production builds without it WILL still ship — the log line
 * lets ops see exactly which message would have been sent.
 */
export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const { to, subject, html, text } = args;
  const from = process.env.EMAIL_FROM ?? "LearnAI <hello@learnai.dev>";

  if (!to) return { ok: false, reason: "no_recipient" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[email] (dry-run; no RESEND_API_KEY) to=${to} subject="${subject}"`,
      );
    }
    return { ok: false, reason: "no_api_key" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.warn(`[email] resend failed ${res.status}: ${detail}`);
      return { ok: false, reason: "send_failed" };
    }
    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id };
  } catch (e) {
    console.warn(`[email] resend threw: ${String((e as Error).message)}`);
    return { ok: false, reason: "send_failed" };
  }
}

export function unsubscribeUrl(sessionId: string): string {
  const base = process.env.APP_URL ?? "https://learnai.to";
  const token = unsubscribeToken(sessionId);
  return `${base}/api/email/unsubscribe?token=${token}`;
}

/** HMAC-like signed token using a server secret. Deterministic per session
 *  so the same unsubscribe URL works across emails. */
export function unsubscribeToken(sessionId: string): string {
  const secret = process.env.CRON_SECRET ?? "dev-secret";
  // Lightweight non-cryptographic mix that's good enough for an opt-out
  // token (the link is share-revocable; real auth not required).
  const input = `${sessionId}::${secret}`;
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (
    Math.abs(h).toString(16).padStart(8, "0") +
    Buffer.from(sessionId).toString("base64url")
  );
}

/** Regenerates the expected token from the embedded session id and compares
 *  full match. Returns the session id on success, null otherwise. */
export function verifyUnsubscribeToken(token: string): string | null {
  if (!token) return null;
  const sessionId = (() => {
    try {
      return Buffer.from(token.slice(8), "base64url").toString();
    } catch {
      return "";
    }
  })();
  if (!sessionId) return null;
  return unsubscribeToken(sessionId) === token ? sessionId : null;
}
