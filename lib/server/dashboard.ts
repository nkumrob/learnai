import "server-only";
import { listTracks, listModules } from "@/lib/server/db/tracks";
import {
  getTrackProgress,
  getSessionStats,
  getMostRecentModule,
} from "@/lib/server/db/progress";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { getJourney, type JourneyLevel } from "@/lib/server/journey";
import { isStreakAtRisk } from "@/lib/server/streak";
import {
  TRACK_LEVEL,
  TRACK_LABEL,
  TRACK_PROMISE,
} from "@/lib/core/track-meta";
import type { Session } from "@/lib/server/db/sessions";
import type { TrackSlug } from "@/types/shared";

export interface DashboardResume {
  trackSlug: TrackSlug;
  trackLabel: string;
  level: number;
  moduleOrder: number;
  moduleTitle: string;
  moduleOutcome: string;
  /** Estimated minutes to next quiz pass at typical reading pace. */
  estMinutes: number;
  /** 0..1 — share of the current track that is already passed. */
  trackProgress: number;
  passedInTrack: number;
  totalInTrack: number;
  href: string;
}

export interface DashboardStats {
  streak: number;
  streakAtRisk: boolean;
  modulesPassed: number;
  modulesTotal: number;
  totalMinutes: number;
  thisWeekMinutes: number;
}

export interface DashboardUpNext {
  trackSlug: TrackSlug;
  trackLabel: string;
  level: number;
  moduleOrder: number;
  moduleTitle: string;
  estMinutes: number;
  href: string;
}

export interface DashboardCert {
  id: string;
  trackSlug: TrackSlug;
  trackLabel: string;
  level: number;
  learnerName: string;
  issuedAt: string;
  verifyToken: string;
}

export interface DashboardData {
  resume: DashboardResume | null;
  stats: DashboardStats;
  journey: JourneyLevel[];
  currentLevel: number;
  upNext: DashboardUpNext[];
  certs: DashboardCert[];
  isFirstVisit: boolean;
  daysSinceLastSeen: number;
}

async function fetchCerts(sessionId: string): Promise<DashboardCert[]> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT c.id, c.track_id, c.learner_name, c.issued_at, c.verify_token,
                 t.slug, t.title
          FROM certificates c JOIN tracks t ON t.id = c.track_id
          WHERE c.session_id = ?
          ORDER BY c.issued_at DESC`,
    args: [sessionId],
  });
  return res.rows.map((r) => {
    const row = r as Record<string, unknown>;
    const slug = String(row.slug) as TrackSlug;
    return {
      id: String(row.id),
      trackSlug: slug,
      trackLabel: TRACK_LABEL[slug] ?? String(row.title),
      level: TRACK_LEVEL[slug] ?? 0,
      learnerName: String(row.learner_name),
      issuedAt: String(row.issued_at),
      verifyToken: String(row.verify_token),
    };
  });
}

export async function getDashboardData(
  session: Session,
): Promise<DashboardData> {
  const sessionId = session.id;
  const tracks = await listTracks();
  const sortedTracks = tracks.sort(
    (a, b) => TRACK_LEVEL[a.slug] - TRACK_LEVEL[b.slug],
  );

  const [journey, stats, recent, certs] = await Promise.all([
    getJourney(sessionId, session.startLevel),
    getSessionStats(sessionId),
    getMostRecentModule(sessionId),
    fetchCerts(sessionId),
  ]);

  const currentLevel = journey.currentLevel;
  const currentTrack = sortedTracks[currentLevel - 1];

  // Build resume card and upNext from the current level's module list.
  let resume: DashboardResume | null = null;
  const upNext: DashboardUpNext[] = [];
  if (currentTrack) {
    const modules = await listModules(currentTrack.id);
    const progressRows = await getTrackProgress(sessionId, currentTrack.id);
    const passedIds = new Set(
      progressRows.filter((p) => p.status === "passed").map((p) => p.moduleId),
    );
    const passedInTrack = passedIds.size;
    const totalInTrack = modules.length;

    // Resume = the in-progress module if there is one, else the first untouched.
    let resumeModule = recent
      ? modules.find(
          (m) => m.id === recent.moduleId && !passedIds.has(m.id),
        ) ?? null
      : null;
    if (!resumeModule) {
      resumeModule = modules.find((m) => !passedIds.has(m.id)) ?? null;
    }

    if (resumeModule) {
      resume = {
        trackSlug: currentTrack.slug,
        trackLabel: TRACK_LABEL[currentTrack.slug],
        level: TRACK_LEVEL[currentTrack.slug],
        moduleOrder: resumeModule.order,
        moduleTitle: resumeModule.title,
        moduleOutcome: resumeModule.outcome,
        estMinutes: 6,
        trackProgress: totalInTrack > 0 ? passedInTrack / totalInTrack : 0,
        passedInTrack,
        totalInTrack,
        href: `/track/${currentTrack.slug}/${resumeModule.slug}`,
      };
    }

    // Up next = the next 3 untouched modules after resume.
    const startOrder = resumeModule?.order ?? 1;
    const untouched = modules
      .filter((m) => m.order >= startOrder && !passedIds.has(m.id))
      .slice(0, 3);
    for (const m of untouched) {
      upNext.push({
        trackSlug: currentTrack.slug,
        trackLabel: TRACK_LABEL[currentTrack.slug],
        level: TRACK_LEVEL[currentTrack.slug],
        moduleOrder: m.order,
        moduleTitle: m.title,
        estMinutes: 6,
        href: `/track/${currentTrack.slug}/${m.slug}`,
      });
    }
  }

  // Aggregate modules total across all 5 tracks for the "12 / 50" stat.
  const modulesTotal = journey.levels.reduce(
    (sum, l) => sum + l.moduleCount,
    0,
  );

  const streakAtRisk = isStreakAtRisk(
    session.streakCount,
    session.lastPassedAt,
  );

  // Time signals — clamp to whole minutes.
  const totalMinutes = Math.max(0, Math.floor(stats.totalTimeSeconds / 60));
  const thisWeekMinutes = Math.max(
    0,
    Math.floor(stats.thisWeekTimeSeconds / 60),
  );

  const lastSeenAt = session.lastSeenAt ?? Date.now();
  const daysSinceLastSeen = Math.max(
    0,
    Math.floor((Date.now() - lastSeenAt) / 86_400_000),
  );

  const isFirstVisit =
    stats.modulesPassed === 0 &&
    !recent &&
    session.streakCount === 0;

  return {
    resume,
    stats: {
      streak: session.streakCount,
      streakAtRisk,
      modulesPassed: stats.modulesPassed,
      modulesTotal,
      totalMinutes,
      thisWeekMinutes,
    },
    journey: journey.levels,
    currentLevel,
    upNext,
    certs,
    isFirstVisit,
    daysSinceLastSeen,
  };
}

/** Just for tests / preview — derive the welcome-back banner copy. */
export function greetingFor(
  data: DashboardData,
  hour: number = new Date().getHours(),
): string {
  if (data.isFirstVisit) return "Welcome.";
  if (data.daysSinceLastSeen >= 7) return "Good to see you again.";
  const partOfDay =
    hour < 5 || hour >= 22
      ? "Up late"
      : hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";
  return `${partOfDay}.`;
}

/** Re-export so consumers don't have to reach into the db layer. */
export type { JourneyLevel } from "@/lib/server/journey";
