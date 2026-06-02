import { describe, expect, it } from "vitest";
import { gradeQuiz } from "./grading";
import type { QuizQuestion } from "@/types/shared";

const q = (answerIndex: number): QuizQuestion => ({
  prompt: "p",
  options: ["a", "b", "c", "d"],
  answerIndex,
  explanation: "because",
});

const questions = [q(0), q(1), q(2), q(3)];

describe("gradeQuiz", () => {
  it("scores all correct as 1.0 and passes", () => {
    const r = gradeQuiz(questions, [0, 1, 2, 3]);
    expect(r.score).toBe(1);
    expect(r.passed).toBe(true);
  });

  it("passes at exactly the 80% threshold (3/4 wait -> need >=0.8)", () => {
    // 4 questions: 3 correct = 0.75 -> fails; threshold is 0.8
    const r = gradeQuiz(questions, [0, 1, 2, 0]);
    expect(r.score).toBe(0.75);
    expect(r.passed).toBe(false);
  });

  it("passes when 5/5 correct meets threshold", () => {
    const five = [q(0), q(0), q(0), q(0), q(1)];
    const r = gradeQuiz(five, [0, 0, 0, 0, 0]); // 4/5 = 0.8
    expect(r.score).toBe(0.8);
    expect(r.passed).toBe(true);
  });

  it("treats missing answers as wrong", () => {
    const r = gradeQuiz(questions, []);
    expect(r.score).toBe(0);
    expect(r.passed).toBe(false);
  });

  it("returns correct answers and explanations for review", () => {
    const r = gradeQuiz(questions, [0, 0, 0, 0]);
    expect(r.correctAnswers).toEqual([0, 1, 2, 3]);
    expect(r.explanations).toHaveLength(4);
  });

  it("handles empty quiz safely", () => {
    const r = gradeQuiz([], []);
    expect(r.score).toBe(0);
    expect(r.passed).toBe(false);
  });
});
