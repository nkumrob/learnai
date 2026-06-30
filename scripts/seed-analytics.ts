/**
 * Demo analytics seed. Inserts ~400 synthetic, anonymous sessions across the
 * last ~8 months with a realistic growth curve + funnel, so the admin
 * dashboard at /admin looks populated.
 *
 * Run: pnpm seed:analytics  (or `npm run seed:analytics`)
 *
 * Re-runnable: deletes all rows with the `demo-` id prefix first. Local file DB
 * only — refuses to run against a remote DATABASE_URL.
 */
import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { TRACK_DEFS, moduleId, trackId } from "@/lib/server/content/tracks-definition";
import { TRACK_ORDER } from "@/lib/core/track-meta";

const TARGET_SESSIONS = 400;
const MONTHS = 8;
const DAY_MS = 86_400_000;

// Deterministic PRNG (mulberry32) for reproducible demo data.
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = makeRng(20260626);
const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const chance = (p: number): boolean => rng() < p;
const randInt = (min: number, max: number): number =>
  Math.floor(rng() * (max - min + 1)) + min;

// Geo distribution: ~55% US (varied states/cities), rest international.
const US_LOCATIONS: Array<{ region: string; city: string }> = [
  { region: "CA", city: "San Francisco" },
  { region: "CA", city: "Los Angeles" },
  { region: "NY", city: "New York" },
  { region: "TX", city: "Austin" },
  { region: "WA", city: "Seattle" },
  { region: "FL", city: "Miami" },
  { region: "IL", city: "Chicago" },
  { region: "MA", city: "Boston" },
  { region: "GA", city: "Atlanta" },
  { region: "CO", city: "Denver" },
];
const INTL: Array<{ country: string; region: string | null; city: string }> = [
  { country: "GB", region: "ENG", city: "London" },
  { country: "IN", region: "KA", city: "Bengaluru" },
  { country: "CA", region: "ON", city: "Toronto" },
  { country: "DE", region: "BE", city: "Berlin" },
  { country: "NG", region: "LA", city: "Lagos" },
  { country: "AU", region: "NSW", city: "Sydney" },
  { country: "FR", region: "IDF", city: "Paris" },
  { country: "BR", region: "SP", city: "Sao Paulo" },
  { country: "NL", region: "NH", city: "Amsterdam" },
  { country: "ZA", region: "GP", city: "Johannesburg" },
];

interface Geo {
  country: string;
  region: string | null;
  city: string | null;
}
function makeGeo(): Geo {
  if (chance(0.55)) {
    const loc = pick(US_LOCATIONS);
    return { country: "US", region: loc.region, city: loc.city };
  }
  const loc = pick(INTL);
  return { country: loc.country, region: loc.region, city: loc.city };
}

// Growth curve: monthly weights, oldest -> newest (ramping up).
const MONTH_WEIGHTS = [0.04, 0.06, 0.08, 0.1, 0.13, 0.16, 0.2, 0.23];

async function main() {
  const url = process.env.DATABASE_URL;
  if (url && !url.startsWith("file:")) {
    console.error(`Refusing to seed: DATABASE_URL is "${url}" (not a file DB).`);
    process.exit(1);
  }

  await ensureSchema();
  const db = getDb();

  // Clean previous demo rows (order matters for FK-ish hygiene).
  await db.execute(`DELETE FROM certificates WHERE id LIKE 'demo-%'`);
  await db.execute(`DELETE FROM progress WHERE session_id LIKE 'demo-%'`);
  await db.execute(`DELETE FROM sessions WHERE id LIKE 'demo-%'`);

  // Build a flat list of modules with their track level for funnel writes.
  const modulesByLevel = TRACK_ORDER.map((slug, idx) => {
    const def = TRACK_DEFS.find((t) => t.slug === slug)!;
    return {
      level: idx + 1,
      slug,
      trackId: trackId(slug),
      moduleIds: def.modules.map((m) => moduleId(slug, m.order)),
    };
  });

  const now = Date.now();
  const totalWeight = MONTH_WEIGHTS.reduce((a, b) => a + b, 0);

  let counts = { sessions: 0, placed: 0, passed: 0, tasks: 0, certs: 0 };
  let seq = 0;

  for (let m = 0; m < MONTHS; m++) {
    const monthSessions = Math.round(
      (MONTH_WEIGHTS[m] / totalWeight) * TARGET_SESSIONS,
    );
    // Month window: m=0 is oldest (MONTHS months ago).
    const monthsAgo = MONTHS - 1 - m;
    for (let i = 0; i < monthSessions; i++) {
      seq++;
      const id = `demo-${seq}-${randUuidShort()}`;
      // Random day within that month-ish window.
      const dayOffset = monthsAgo * 30 + randInt(0, 29);
      const createdMs = now - dayOffset * DAY_MS - randInt(0, 23) * 3_600_000;
      const createdIso = new Date(createdMs).toISOString();
      const geo = makeGeo();

      // ~35% returning: last_seen a day or more after created.
      const returning = chance(0.35);
      const lastSeenMs = returning
        ? createdMs + randInt(1, 20) * DAY_MS
        : createdMs + randInt(0, 50) * 60_000;

      // Funnel: ~70% take placement.
      const placed = chance(0.7);
      const placedMs = placed ? createdMs + randInt(5, 120) * 60_000 : null;
      const startLevel = placed ? randInt(1, 3) : 1;

      await db.execute({
        sql: `INSERT INTO sessions
                (id, tier, start_level, created_at, last_seen_at,
                 country, region, city, placed_at)
              VALUES (?, 'free', ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          startLevel,
          createdIso,
          lastSeenMs,
          geo.country,
          geo.region,
          geo.city,
          placedMs,
        ],
      });
      counts.sessions++;
      if (placed) counts.placed++;

      // Of placed, ~75% pass >=1 lesson.
      if (!placed || !chance(0.75)) continue;

      // Decide how many levels deep this learner goes from their start level.
      const startIdx = startLevel - 1;
      const levelsToAttempt = randInt(1, Math.min(3, TRACK_ORDER.length - startIdx));
      let cursorMs = placedMs! + randInt(10, 240) * 60_000;
      let lessonsPassedThisSession = 0;

      // ~18% earn >=1 certificate; of those some earn multiple.
      const earnsCert = chance(0.18 / 0.75); // conditional on passing
      const certLevels = earnsCert
        ? randInt(1, Math.min(2, levelsToAttempt))
        : 0;

      for (let l = 0; l < levelsToAttempt; l++) {
        const lvl = modulesByLevel[startIdx + l];
        if (!lvl) break;
        const willComplete = l < certLevels; // complete fully -> cert
        const passCount = willComplete
          ? lvl.moduleIds.length
          : randInt(1, Math.max(1, lvl.moduleIds.length - 1));

        for (let k = 0; k < passCount; k++) {
          cursorMs += randInt(1, 36) * 3_600_000;
          const passedMs = Math.min(cursorMs, lastSeenMs);
          const taskDone = chance(0.8) ? 1 : 0;
          await db.execute({
            sql: `INSERT INTO progress
                    (session_id, module_id, status, score, task_done,
                     updated_at, passed_at, time_spent_seconds)
                  VALUES (?, ?, 'passed', ?, ?, ?, ?, ?)
                  ON CONFLICT(session_id, module_id) DO NOTHING`,
            args: [
              id,
              lvl.moduleIds[k],
              0.8 + rng() * 0.2,
              taskDone,
              new Date(passedMs).toISOString(),
              passedMs,
              randInt(240, 900),
            ],
          });
          counts.passed++;
          if (taskDone) counts.tasks++;
          lessonsPassedThisSession++;
        }

        if (willComplete) {
          const issuedMs = Math.min(cursorMs + 3_600_000, lastSeenMs);
          await db.execute({
            sql: `INSERT INTO certificates
                    (id, session_id, track_id, learner_name, issued_at, verify_token)
                  VALUES (?, ?, ?, 'Demo Learner', ?, ?)
                  ON CONFLICT(session_id, track_id) DO NOTHING`,
            args: [
              `demo-cert-${id}-${lvl.level}`,
              id,
              lvl.trackId,
              new Date(issuedMs).toISOString(),
              randomUUID(),
            ],
          });
          counts.certs++;
        }
      }
      void lessonsPassedThisSession;
    }
  }

  console.log("Demo analytics seeded:");
  console.log(`  sessions:     ${counts.sessions}`);
  console.log(`  placements:   ${counts.placed}`);
  console.log(`  lessons pass: ${counts.passed}`);
  console.log(`  tasks done:   ${counts.tasks}`);
  console.log(`  certificates: ${counts.certs}`);
  console.log("View at /admin");
  process.exit(0);
}

function randUuidShort(): string {
  return randomUUID().slice(0, 8);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
