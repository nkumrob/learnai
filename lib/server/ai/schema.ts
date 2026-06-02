import { z } from "zod";

// Validation schema for AI-authored module content. Used to guard against
// malformed model output before it is cached and served to learners.
export const quizQuestionSchema = z.object({
  prompt: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(6),
  answerIndex: z.number().int().min(0),
  explanation: z.string().min(1),
});

export const moduleContentSchema = z.object({
  lesson: z.string().min(1),
  task: z.string().min(1),
  quiz: z.array(quizQuestionSchema).min(1),
});

export type ParsedModuleContent = z.infer<typeof moduleContentSchema>;

/** Reject questions whose answerIndex falls outside their options. */
export function validateAnswerIndexes(content: ParsedModuleContent): boolean {
  return content.quiz.every(
    (q) => q.answerIndex >= 0 && q.answerIndex < q.options.length,
  );
}
