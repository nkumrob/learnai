import "server-only";
import { getAllPassTimestamps } from "@/lib/server/db/progress";
import { updateStreak as updateSessionStreak } from "@/lib/server/db/sessions";

/**
 * A pass-streak is the count of consecutive calendar days, ending today or
 * yesterday, on which the learner passed at least one module quiz.
 *
 * Rules:
 *  - The streak ends if there's a calendar-day gap. A pass on day D and the
 *    next pass on day D+2 = streak of 1 (today), not 2.
 *  - The streak is preserved if the most recent pass was yesterday: the
 *    learner still has today to keep it alive. So "today's streak" returned
 *    here is the streak as-of-now, *not* the count up to the last pass.
 *  - Returned streak counts unique calendar days, not number of passes.
 *  - Computed in the learner's timezone if given, else UTC.
 */
export function computeStreakFromTimestamps(
  passTimestamps: number[],
  now: number = Date.now(),
  timezone: string | null = null,
): number {
  if (passTimestamps.length === 0) return 0;

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone ?? "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const dayKey = (t: number) => formatter.format(new Date(t));

  // Deduplicate to one entry per calendar day.
  const passDays = new Set<string>(passTimestamps.map(dayKey));

  const today = dayKey(now);
  const yesterday = dayKey(now - 86_400_000);

  // Streak must end at today or yesterday — otherwise it's broken.
  let cursor: string;
  if (passDays.has(today)) cursor = today;
  else if (passDays.has(yesterday)) cursor = yesterday;
  else return 0;

  let count = 0;
  // Walk back day by day from cursor while each day has a pass.
  // Use a Date object anchored to noon UTC to avoid DST drift.
  const cursorDate = new Date(`${cursor}T12:00:00Z`);
  while (passDays.has(dayKey(cursorDate.getTime()))) {
    count += 1;
    cursorDate.setUTCDate(cursorDate.getUTCDate() - 1);
  }
  return count;
}

/** Recompute the streak from raw pass timestamps and persist the result on
 *  the session row. Returns the new streak count. Called from /api/grade
 *  every time a learner passes a module. */
export async function recomputeStreak(sessionId: string): Promise<number> {
  const timestamps = await getAllPassTimestamps(sessionId);
  const streak = computeStreakFromTimestamps(timestamps);
  const lastPassedAt = timestamps[0] ?? 0;
  await updateSessionStreak(sessionId, streak, lastPassedAt);
  return streak;
}

/** Tells the dashboard whether the learner's streak is at risk of breaking
 *  today (active but no pass yet today). Used to colour the streak chip. */
export function isStreakAtRisk(
  streakCount: number,
  lastPassedAt: number | null,
  now: number = Date.now(),
): boolean {
  if (streakCount <= 0 || lastPassedAt == null) return false;
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return today.format(new Date(lastPassedAt)) !== today.format(new Date(now));
}
