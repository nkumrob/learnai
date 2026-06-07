// Dev-only: populate a fake session with realistic progress so the dashboard
// shows the rich path. Idempotent — runs against the LOCAL file DB only.
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { TRACK_ORDER, TRACK_LEVEL } from "@/lib/core/track-meta";
import { listTracks, listModules } from "@/lib/server/db/tracks";
import { recomputeStreak } from "@/lib/server/streak";

const DEMO_SESSION_ID = "demo-session-dashboard";

async function main() {
  const url = process.env.DATABASE_URL;
  if (url && !url.startsWith("file:")) {
    console.error(
      `[31mRefusing to seed demo progress: DATABASE_URL is "${url}".[0m`,
    );
    console.error("Run with DATABASE_URL=file:./learnai.db only.");
    process.exit(1);
  }

  await ensureSchema();
  const db = getDb();

  console.log(`Seeding demo progress for session: ${DEMO_SESSION_ID}`);

  // Create / upsert session at Level 2 placement.
  await db.execute({
    sql: `INSERT INTO sessions (id, learner_name, tier, start_level, created_at, last_seen_at)
          VALUES (?, ?, 'free', 2, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            learner_name = excluded.learner_name,
            start_level = excluded.start_level,
            last_seen_at = excluded.last_seen_at`,
    args: [
      DEMO_SESSION_ID,
      "Demo Learner",
      new Date().toISOString(),
      Date.now(),
    ],
  });

  const tracks = await listTracks();
  const bySlug = new Map(tracks.map((t) => [t.slug, t]));
  const fundamentals = bySlug.get("fundamentals");
  const prompting = bySlug.get("prompting");
  if (!fundamentals || !prompting) {
    console.error("Tracks not seeded yet. Run `pnpm seed` first.");
    process.exit(1);
  }

  // Mark all of Level 1 (Fundamentals) as passed + task done, varied dates.
  const fmods = await listModules(fundamentals.id);
  const dayMs = 86_400_000;
  for (let i = 0; i < fmods.length; i++) {
    const m = fmods[i];
    // Spread passes over the last 10 days, one per day.
    const passedAt = Date.now() - (10 - i) * dayMs - 60 * 60 * 1000;
    await db.execute({
      sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, passed_at, time_spent_seconds)
            VALUES (?, ?, 'passed', 1.0, 1, ?, ?, ?)
            ON CONFLICT(session_id, module_id) DO UPDATE SET
              status = 'passed',
              score = 1.0,
              task_done = 1,
              passed_at = excluded.passed_at,
              time_spent_seconds = excluded.time_spent_seconds,
              updated_at = excluded.updated_at`,
      args: [
        DEMO_SESSION_ID,
        m.id,
        new Date(passedAt).toISOString(),
        passedAt,
        420 + i * 30, // 7-12 minutes per lesson
      ],
    });
  }

  // First three of Level 2 (Prompting) passed; module 4 in progress.
  const pmods = await listModules(prompting.id);
  for (let i = 0; i < Math.min(3, pmods.length); i++) {
    const m = pmods[i];
    const passedAt = Date.now() - (2 - i) * dayMs - 30 * 60 * 1000;
    await db.execute({
      sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, passed_at, time_spent_seconds)
            VALUES (?, ?, 'passed', 0.9, 1, ?, ?, ?)
            ON CONFLICT(session_id, module_id) DO UPDATE SET
              status = 'passed',
              score = 0.9,
              task_done = 1,
              passed_at = excluded.passed_at,
              time_spent_seconds = excluded.time_spent_seconds,
              updated_at = excluded.updated_at`,
      args: [
        DEMO_SESSION_ID,
        m.id,
        new Date(passedAt).toISOString(),
        passedAt,
        540,
      ],
    });
  }
  // Module 4 in-progress (started reading)
  if (pmods[3]) {
    await db.execute({
      sql: `INSERT INTO progress (session_id, module_id, status, score, task_done, updated_at, time_spent_seconds)
            VALUES (?, ?, 'in_progress', NULL, 0, ?, ?)
            ON CONFLICT(session_id, module_id) DO UPDATE SET
              status = 'in_progress',
              updated_at = excluded.updated_at,
              time_spent_seconds = excluded.time_spent_seconds`,
      args: [
        DEMO_SESSION_ID,
        pmods[3].id,
        new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        180,
      ],
    });
  }

  // Issue the Fundamentals certificate.
  await db.execute({
    sql: `INSERT INTO certificates (id, session_id, track_id, learner_name, issued_at, verify_token)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(session_id, track_id) DO NOTHING`,
    args: [
      "demo-cert-fundamentals",
      DEMO_SESSION_ID,
      fundamentals.id,
      "Demo Learner",
      new Date(Date.now() - 2 * dayMs).toISOString(),
      "demoverifyfundamentals1234567890",
    ],
  });

  // Recompute streak from those passes.
  const streak = await recomputeStreak(DEMO_SESSION_ID);
  console.log(`Streak recomputed: ${streak} days`);

  console.log(
    "[32m✓[0m Demo data seeded. Set learnai_sid cookie to "
      + `"${DEMO_SESSION_ID}" to view dashboard with progress.`,
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
