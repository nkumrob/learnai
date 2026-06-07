import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { getSession } from "@/lib/server/db/sessions";
import { getJourney } from "@/lib/server/journey";
import { listTracks, listModules } from "@/lib/server/db/tracks";
import { getTrackProgress } from "@/lib/server/db/progress";
import { TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import { dispatchDay2 } from "@/lib/server/email/dispatch";

/** Daily 9am UTC sweep: nudge learners who started yesterday but haven't
 *  passed anything today. Sends at most one email per eligible session. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();
  const db = getDb();

  // Eligibility: has an email, marketing opt-in, last_passed_at within 1-2 days
  // (so they're a true "started yesterday"), and no pass today.
  const now = Date.now();
  const oneDayAgo = now - 86_400_000;
  const twoDaysAgo = now - 2 * 86_400_000;
  const res = await db.execute({
    sql: `SELECT id FROM sessions
          WHERE email IS NOT NULL
            AND email_marketing_ok = 1
            AND last_passed_at IS NOT NULL
            AND last_passed_at <= ?
            AND last_passed_at >= ?`,
    args: [oneDayAgo, twoDaysAgo],
  });

  let sentCount = 0;
  let skipped = 0;
  const failures: string[] = [];

  for (const row of res.rows) {
    const id = String((row as Record<string, unknown>).id);
    try {
      const session = await getSession(id);
      if (!session) continue;
      const journey = await getJourney(session.id, session.startLevel);
      const tracks = await listTracks();
      const sorted = tracks.sort(
        (a, b) => TRACK_LEVEL[a.slug] - TRACK_LEVEL[b.slug],
      );
      const currentTrack = sorted[journey.currentLevel - 1];
      if (!currentTrack) {
        skipped++;
        continue;
      }
      const modules = await listModules(currentTrack.id);
      const progress = await getTrackProgress(session.id, currentTrack.id);
      const passedIds = new Set(
        progress.filter((p) => p.status === "passed").map((p) => p.moduleId),
      );
      const next = modules.find((m) => !passedIds.has(m.id));
      if (!next) {
        skipped++;
        continue;
      }
      const result = await dispatchDay2(session, {
        trackTitle: TRACK_LABEL[currentTrack.slug],
        nextLessonTitle: next.title,
        nextHref: `${process.env.APP_URL ?? "https://learnai.to"}/track/${currentTrack.slug}/${next.order}`,
        estMinutes: 6,
      });
      if (result.sent) sentCount++;
      else skipped++;
    } catch (e) {
      failures.push(`${id}: ${String((e as Error).message)}`);
    }
  }

  return NextResponse.json({
    ran: "day_2",
    eligible: res.rows.length,
    sent: sentCount,
    skipped,
    failures: failures.length,
  });
}
