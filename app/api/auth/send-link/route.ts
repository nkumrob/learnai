import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/server/session";
import { sendMagicLink } from "@/lib/server/auth";

const bodySchema = z.object({
  email: z.string().email().max(320),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  const result = await sendMagicLink({
    email: parsed.data.email,
    sessionId: session.id,
  });

  if (!result.ok) {
    if (result.reason === "rate_limited") {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Try again in an hour." },
        { status: 429 },
      );
    }
    if (result.reason === "invalid_email") {
      return NextResponse.json(
        { error: "Enter a valid email" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Couldn't send the sign-in link. Try again." },
      { status: 500 },
    );
  }

  // Surface the dev-mode token so the dev /signin flow can show it.
  return NextResponse.json({
    ok: true,
    ...(result.devToken ? { devToken: result.devToken } : {}),
  });
}
