import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/server/session";
import { getSession, setEmail } from "@/lib/server/db/sessions";
import { getJourney } from "@/lib/server/journey";
import { listTracks } from "@/lib/server/db/tracks";
import { TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import { dispatchWelcome } from "@/lib/server/email/dispatch";

const bodySchema = z.object({
  email: z.string().email().max(320),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  await setEmail(session.id, parsed.data.email);

  // Re-read so emailMarketingOk + the new email are reflected.
  const fresh = await getSession(session.id);
  if (!fresh) {
    return NextResponse.json({ ok: true });
  }

  // Pick the current track for the welcome email subject line.
  let trackTitle = "the LearnAI journey";
  try {
    const tracks = await listTracks();
    const journey = await getJourney(fresh.id, fresh.startLevel);
    const slug = tracks
      .sort((a, b) => TRACK_LEVEL[a.slug] - TRACK_LEVEL[b.slug])
      [journey.currentLevel - 1]?.slug;
    if (slug) trackTitle = TRACK_LABEL[slug];
  } catch {
    /* fall back to the generic title */
  }

  // Fire and forget — keep the response fast.
  dispatchWelcome(fresh, trackTitle).catch(() => {});

  return NextResponse.json({ ok: true });
}
