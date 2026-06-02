import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/server/session";
import { getModuleById } from "@/lib/server/db/tracks";
import { setTaskDone } from "@/lib/server/db/progress";

const bodySchema = z.object({
  moduleId: z.string().min(1),
  done: z.boolean(),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const module = await getModuleById(parsed.data.moduleId);
  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }
  await setTaskDone(session.id, module.id, parsed.data.done);
  return NextResponse.json({ ok: true, taskDone: parsed.data.done });
}
