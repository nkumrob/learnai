import type { ModuleContent, QuizQuestion } from "@/types/shared";

// Deterministically shuffle each quiz question's options so the correct answer
// is distributed across positions (not always option A). Deterministic per
// (moduleId, questionIndex) so the seeded cache and tests stay reproducible.

function hashString(s: string): number {
  let h = 2166136261 >>> 0; // FNV-1a
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleQuestion(
  q: QuizQuestion,
  seedKey: string,
): QuizQuestion {
  const rng = mulberry32(hashString(seedKey));
  const order = q.options.map((_, i) => i);
  // Fisher-Yates with a seeded RNG.
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answerIndex: order.indexOf(q.answerIndex),
  };
}

export function shuffleQuiz(
  content: ModuleContent,
  moduleId: string,
): ModuleContent {
  return {
    ...content,
    quiz: content.quiz.map((q, i) => shuffleQuestion(q, `${moduleId}:${i}`)),
  };
}
