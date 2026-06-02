import { PASS_THRESHOLD, type QuizQuestion } from "@/types/shared";

export interface GradedQuiz {
  score: number; // 0..1
  passed: boolean;
  correctAnswers: number[];
  explanations: string[];
}

/**
 * Pure quiz grading. `answers[i]` is the option index the learner chose for
 * question i (or -1/undefined if unanswered).
 */
export function gradeQuiz(
  questions: QuizQuestion[],
  answers: number[],
): GradedQuiz {
  if (questions.length === 0) {
    return { score: 0, passed: false, correctAnswers: [], explanations: [] };
  }
  let correct = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].answerIndex) correct++;
  }
  const score = correct / questions.length;
  return {
    score,
    passed: score >= PASS_THRESHOLD,
    correctAnswers: questions.map((q) => q.answerIndex),
    explanations: questions.map((q) => q.explanation),
  };
}
