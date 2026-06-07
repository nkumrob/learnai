import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/server/session";
import { getModuleWithContent } from "@/lib/server/db/tracks";
import {
  isTrackComplete,
  isTrackPassed,
  upsertProgress,
} from "@/lib/server/db/progress";
import { recomputeStreak } from "@/lib/server/streak";
import { gradeQuiz } from "@/lib/core/grading";
import type { GradeResult } from "@/types/shared";

const bodySchema = z.object({
  moduleId: z.string().min(1),
  answers: z.array(z.number().int().min(-1)).max(20),
});

export async function POST(req: Request) {
  const session = await requireSession();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const module = await getModuleWithContent(parsed.data.moduleId);
  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  const graded = gradeQuiz(module.content.quiz, parsed.data.answers);
  const { wasFirstPass } = await upsertProgress(
    session.id,
    module.id,
    graded.passed ? "passed" : "in_progress",
    graded.score,
  );

  // On a pass, recompute streak (cheap; reads the small pass-timestamp list).
  let streak: number | undefined;
  if (graded.passed) {
    streak = await recomputeStreak(session.id);
  }

  const trackCompleted = graded.passed
    ? await isTrackPassed(session.id, module.trackId)
    : false;
  const trackReadyToCertify = trackCompleted
    ? await isTrackComplete(session.id, module.trackId)
    : false;

  const result: GradeResult = {
    score: graded.score,
    passed: graded.passed,
    correctAnswers: graded.correctAnswers,
    explanations: graded.explanations,
    trackCompleted,
    trackReadyToCertify,
    streak,
    isFirstPass: graded.passed ? wasFirstPass : false,
  };
  return NextResponse.json(result);
}
