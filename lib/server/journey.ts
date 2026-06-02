import "server-only";
import { listTracks, listModules } from "@/lib/server/db/tracks";
import { getTrackProgress } from "@/lib/server/db/progress";
import {
  TRACK_LEVEL,
  TRACK_TIER,
  TRACK_PROMISE,
  type MasteryTier,
} from "@/lib/core/track-meta";
import type { TrackSlug } from "@/types/shared";

export type LevelStatus = "complete" | "in_progress" | "available" | "locked";

export interface JourneyLevel {
  slug: TrackSlug;
  level: number;
  tier: MasteryTier;
  title: string;
  promise: string;
  moduleCount: number;
  passedCount: number;
  completeCount: number;
  status: LevelStatus;
}

export interface Journey {
  levels: JourneyLevel[];
  startLevel: number;
  /** The level the learner should head to next. */
  currentLevel: number;
}

/**
 * Build the full 5-level journey for a session. Levels open progressively:
 * everything up to the placed start level is available, and finishing a level's
 * quizzes unlocks the next. A level is "complete" only when every module is
 * passed AND its task is self-attested.
 */
export async function getJourney(
  sessionId: string,
  startLevel: number,
): Promise<Journey> {
  const tracks = (await listTracks()).sort(
    (a, b) => TRACK_LEVEL[a.slug] - TRACK_LEVEL[b.slug],
  );

  const raw = await Promise.all(
    tracks.map(async (t) => {
      const modules = await listModules(t.id);
      const progress = await getTrackProgress(sessionId, t.id);
      const passedCount = progress.filter((p) => p.status === "passed").length;
      const completeCount = progress.filter(
        (p) => p.status === "passed" && p.taskDone,
      ).length;
      return {
        slug: t.slug,
        level: TRACK_LEVEL[t.slug],
        tier: TRACK_TIER[t.slug],
        title: t.title,
        promise: TRACK_PROMISE[t.slug],
        moduleCount: modules.length,
        passedCount,
        completeCount,
      };
    }),
  );

  // A level is unlocked if it's within the placed start level, or the previous
  // level's quizzes are all passed.
  let prevPassedAll = true;
  const levels: JourneyLevel[] = raw.map((l) => {
    const unlocked = l.level <= startLevel || prevPassedAll;
    const passedAll = l.moduleCount > 0 && l.passedCount === l.moduleCount;
    const completeAll = l.moduleCount > 0 && l.completeCount === l.moduleCount;
    let status: LevelStatus;
    if (!unlocked) status = "locked";
    else if (completeAll) status = "complete";
    else if (l.passedCount > 0 || l.completeCount > 0) status = "in_progress";
    else status = "available";
    prevPassedAll = passedAll;
    return { ...l, status };
  });

  const current =
    levels.find((l) => l.status === "in_progress") ??
    levels.find((l) => l.status === "available") ??
    levels[levels.length - 1];

  return { levels, startLevel, currentLevel: current?.level ?? 1 };
}
