import "server-only";
import { getTrackBySlug, listModules } from "@/lib/server/db/tracks";
import { getTrackProgress } from "@/lib/server/db/progress";
import { TRACK_LEVEL, TRACK_TIER, type MasteryTier } from "@/lib/core/track-meta";
import type { Module, ProgressStatus, Track, TrackSlug } from "@/types/shared";

export interface ModuleView extends Module {
  status: ProgressStatus;
  score: number | null;
  taskDone: boolean;
  /** Fully done: quiz passed AND task self-attested. */
  complete: boolean;
  locked: boolean;
}

export interface TrackView {
  track: Track;
  level: number;
  tier: MasteryTier;
  modules: ModuleView[];
  passedCount: number;
  completeCount: number;
  /** Every module's quiz passed (unlocks the next level). */
  passedAll: boolean;
  /** Every module passed AND task done (earns the certificate). */
  completeAll: boolean;
}

/**
 * Assemble a level with each module's progress, task state, and lock status.
 * A module unlocks when it's first or the previous module's quiz is passed.
 */
export async function getTrackView(
  slug: TrackSlug,
  sessionId: string,
): Promise<TrackView | null> {
  const track = await getTrackBySlug(slug);
  if (!track) return null;

  const modules = await listModules(track.id);
  const progress = await getTrackProgress(sessionId, track.id);
  const byId = new Map(progress.map((p) => [p.moduleId, p]));

  let prevPassed = true; // first module is always unlocked
  const views: ModuleView[] = modules.map((m) => {
    const p = byId.get(m.id);
    const status = p?.status ?? "not_started";
    const taskDone = p?.taskDone ?? false;
    const view: ModuleView = {
      ...m,
      status,
      score: p?.score ?? null,
      taskDone,
      complete: status === "passed" && taskDone,
      locked: !prevPassed,
    };
    prevPassed = status === "passed";
    return view;
  });

  const passedCount = views.filter((v) => v.status === "passed").length;
  const completeCount = views.filter((v) => v.complete).length;
  return {
    track,
    level: TRACK_LEVEL[slug],
    tier: TRACK_TIER[slug],
    modules: views,
    passedCount,
    completeCount,
    passedAll: passedCount === views.length && views.length > 0,
    completeAll: completeCount === views.length && views.length > 0,
  };
}
