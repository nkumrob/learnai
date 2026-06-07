import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { getSession } from "@/lib/server/db/sessions";
import { getJourney } from "@/lib/server/journey";
import { listTracks, listModules } from "@/lib/server/db/tracks";
import { getTrackProgress } from "@/lib/server/db/progress";
import { TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import { dispatchStreakSave } from "@/lib/server/email/dispatch";

/** Daily ~5pm UTC sweep: ping learners with an active streak who haven't
 *  passed anything today yet — one chance to save the streak. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureSchema();
  const db = getDb();

  // Eligibility:
  //  - has email + opted in
  //  - streak_count > 0
  //  - last_passed_at is at least 18 hours ago (so they haven't passed today)
  //  - last_passed_at is less than 36 hours ago (so the streak is still alive)
  const now = Date.now();
  const eighteenHrs = now - 18 * 3600 * 1000;
  const thirtySixHrs = now - 36 * 3600 * 1000;
  const res = await db.execute({
    sql: `SELECT id FROM sessions
          WHERE email IS NOT NULL
            AND email_marketing_ok = 1
            AND streak_count > 0
            AND last_passed_at IS NOT NULL
            AND last_passed_at <= ?
            AND last_passed_at >= ?`,
    args: [eighteenHrs, thirtySixHrs],
  });

  let sentCount = 0;
  let skipped = 0;

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
      const result = await dispatchStreakSave(session, {
        streakCount: session.streakCount,
        trackTitle: TRACK_LABEL[currentTrack.slug],
        nextLessonTitle: next.title,
        nextHref: `${process.env.APP_URL ?? "https://learnai.to"}/track/${currentTrack.slug}/${next.order}`,
      });
      if (result.sent) sentCount++;
      else skipped++;
    } catch {
      /* swallow per-session errors */
    }
  }

  return NextResponse.json({
    ran: "streak_save",
    eligible: res.rows.length,
    sent: sentCount,
    skipped,
  });
}
