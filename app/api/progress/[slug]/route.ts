import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackView } from "@/lib/server/track-view";
import { isTrackSlug } from "@/lib/core/track-meta";

// Read-only progress feed for client overlays on the (statically rendered)
// /track/[slug] and /track/[slug]/[order] pages. Anonymous/no-session callers
// (and crawlers) get an empty payload so the static shell stays in place.

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!isTrackSlug(slug)) {
    return NextResponse.json({ error: "Unknown track" }, { status: 404 });
  }

  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({
      modules: [],
      completeCount: 0,
      passedCount: 0,
      completeAll: false,
      passedAll: false,
    });
  }

  const view = await getTrackView(slug, session.id);
  if (!view) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  return NextResponse.json({
    modules: view.modules.map((m) => ({
      id: m.id,
      order: m.order,
      status: m.status,
      score: m.score,
      taskDone: m.taskDone,
      complete: m.complete,
      locked: m.locked,
    })),
    completeCount: view.completeCount,
    passedCount: view.passedCount,
    completeAll: view.completeAll,
    passedAll: view.passedAll,
  });
}
