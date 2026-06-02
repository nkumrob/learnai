import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/server/session";
import { getTrackBySlug } from "@/lib/server/db/tracks";
import { isTrackPassed } from "@/lib/server/db/progress";
import { issueCertificate } from "@/lib/server/db/certificates";
import { setLearnerName } from "@/lib/server/db/sessions";
import type { TrackSlug } from "@/types/shared";

const bodySchema = z.object({
  trackSlug: z.enum([
    "fundamentals",
    "productivity",
    "prompting",
    "automation",
    "building",
  ]),
  name: z.string().trim().min(1).max(80),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter your name" }, { status: 400 });
  }

  const track = await getTrackBySlug(parsed.data.trackSlug as TrackSlug);
  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const completed = await isTrackPassed(session.id, track.id);
  if (!completed) {
    return NextResponse.json(
      { error: "Finish all modules before claiming your certificate." },
      { status: 403 },
    );
  }

  await setLearnerName(session.id, parsed.data.name);
  const cert = await issueCertificate({
    sessionId: session.id,
    trackId: track.id,
    learnerName: parsed.data.name,
  });
  return NextResponse.json(cert);
}
