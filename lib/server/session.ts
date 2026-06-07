import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants/session";
import {
  createSession,
  getSession,
  touchSeen,
  type Session,
} from "@/lib/server/db/sessions";

/**
 * Resolve the current anonymous learner session. The cookie is set by
 * middleware; here we lazily ensure the matching DB row exists.
 * Returns null only if the cookie is somehow absent (pre-middleware contexts).
 *
 * Updates `last_seen_at` opportunistically — fire-and-forget so dashboard
 * loads aren't blocked on the write.
 */
export async function getCurrentSession(): Promise<Session | null> {
  const store = await cookies();
  const sid = store.get(SESSION_COOKIE)?.value;
  if (!sid) return null;
  const existing = await getSession(sid);
  const session = existing ?? (await createSession(sid));
  // Throttle: only write last_seen_at if it was last set >5 minutes ago.
  if (
    !session.lastSeenAt ||
    Date.now() - session.lastSeenAt > 5 * 60 * 1000
  ) {
    touchSeen(sid).catch(() => {});
  }
  return session;
}

/** Like getCurrentSession but throws if missing - for API routes that require it. */
export async function requireSession(): Promise<Session> {
  const session = await getCurrentSession();
  if (!session) throw new Error("No session");
  return session;
}
