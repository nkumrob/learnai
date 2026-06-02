import { describe, expect, it } from "vitest";
import { shuffleQuestion, shuffleQuiz } from "./quiz-shuffle";
import type { QuizQuestion } from "@/types/shared";

const q = (correct: string, others: string[]): QuizQuestion => ({
  prompt: "p",
  options: [correct, ...others],
  answerIndex: 0,
  explanation: "x",
});

describe("shuffleQuestion", () => {
  it("keeps the same option marked correct after shuffling", () => {
    const original = q("RIGHT", ["w1", "w2", "w3"]);
    const s = shuffleQuestion(original, "mod:0");
    expect(s.options[s.answerIndex]).toBe("RIGHT");
  });

  it("preserves the full set of options", () => {
    const original = q("RIGHT", ["w1", "w2", "w3"]);
    const s = shuffleQuestion(original, "mod:0");
    expect([...s.options].sort()).toEqual(["RIGHT", "w1", "w2", "w3"].sort());
  });

  it("is deterministic for the same seed key", () => {
    const original = q("RIGHT", ["w1", "w2", "w3"]);
    expect(shuffleQuestion(original, "mod:0")).toEqual(
      shuffleQuestion(original, "mod:0"),
    );
  });

  it("distributes the correct answer across positions (not always A)", () => {
    const counts = [0, 0, 0, 0];
    for (let i = 0; i < 100; i++) {
      const s = shuffleQuestion(q("RIGHT", ["w1", "w2", "w3"]), `m-${i}:0`);
      counts[s.answerIndex]++;
    }
    // Every position should be used a meaningful number of times.
    for (const c of counts) expect(c).toBeGreaterThan(10);
  });
});

describe("shuffleQuiz", () => {
  it("shuffles every question and keeps answers correct", () => {
    const content = {
      lesson: "l",
      task: "t",
      quiz: [q("A1", ["x", "y", "z"]), q("A2", ["x", "y", "z"])],
    };
    const s = shuffleQuiz(content, "mod-1");
    expect(s.quiz[0].options[s.quiz[0].answerIndex]).toBe("A1");
    expect(s.quiz[1].options[s.quiz[1].answerIndex]).toBe("A2");
  });
});
