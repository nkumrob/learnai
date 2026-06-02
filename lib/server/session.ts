import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants/session";
import { createSession, getSession, type Session } from "@/lib/server/db/sessions";

/**
 * Resolve the current anonymous learner session. The cookie is set by
 * middleware; here we lazily ensure the matching DB row exists.
 * Returns null only if the cookie is somehow absent (pre-middleware contexts).
 */
export async function getCurrentSession(): Promise<Session | null> {
  const store = await cookies();
  const sid = store.get(SESSION_COOKIE)?.value;
  if (!sid) return null;
  return (await getSession(sid)) ?? (await createSession(sid));
}

/** Like getCurrentSession but throws if missing - for API routes that require it. */
export async function requireSession(): Promise<Session> {
  const session = await getCurrentSession();
  if (!session) throw new Error("No session");
  return session;
}
