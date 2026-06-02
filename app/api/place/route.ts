import { NextResponse } from "next/server";
import { z } from "zod";
import { computePlacement } from "@/lib/core/placement";
import { TRACK_LEVEL } from "@/lib/core/track-meta";
import { requireSession } from "@/lib/server/session";
import { setStartLevel } from "@/lib/server/db/sessions";

const bodySchema = z.object({
  answers: z.array(z.number().int().min(0)).max(10),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  const result = computePlacement(parsed.data.answers);
  // Persist the placed level so the journey opens the right levels.
  await setStartLevel(session.id, TRACK_LEVEL[result.recommendedTrack]);
  return NextResponse.json(result);
}
