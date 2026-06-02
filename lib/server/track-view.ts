import "server-only";
import {
  getTrackBySlug,
  listModules,
} from "@/lib/server/db/tracks";
import { getTrackProgress } from "@/lib/server/db/progress";
import type { Module, ProgressStatus, Track, TrackSlug } from "@/types/shared";

export interface ModuleView extends Module {
  status: ProgressStatus;
  score: number | null;
  locked: boolean;
}

export interface TrackView {
  track: Track;
  modules: ModuleView[];
  completed: boolean;
  passedCount: number;
}

/**
 * Assemble a track with each module's progress and lock state for a session.
 * A module is unlocked when it is the first module or the previous one passed.
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
    const view: ModuleView = {
      ...m,
      status,
      score: p?.score ?? null,
      locked: !prevPassed,
    };
    prevPassed = status === "passed";
    return view;
  });

  const passedCount = views.filter((v) => v.status === "passed").length;
  return {
    track,
    modules: views,
    completed: passedCount === views.length && views.length > 0,
    passedCount,
  };
}
