import { NextResponse } from "next/server";
import { z } from "zod";
import { computePlacement } from "@/lib/core/placement";

const bodySchema = z.object({
  answers: z.array(z.number().int().min(0)).max(10),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }
  return NextResponse.json(computePlacement(parsed.data.answers));
}
