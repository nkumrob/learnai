"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GradeResult } from "@/types/shared";

interface ClientQuestion {
  prompt: string;
  options: string[];
}

export function ModuleQuiz({
  moduleId,
  slug,
  nextOrder,
  questions,
  alreadyPassed: alreadyPassedProp,
  locked: lockedProp,
  selfFetchProgress = false,
}: {
  moduleId: string;
  slug: string;
  nextOrder: number | null;
  questions: ClientQuestion[];
  alreadyPassed?: boolean;
  locked?: boolean;
  /** When true, fetches /api/progress/[slug] after mount to hydrate
   *  `alreadyPassed` and `locked`. Lets the lesson page render statically. */
  selfFetchProgress?: boolean;
}) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [result, setResult] = useState<GradeResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [alreadyPassed, setAlreadyPassed] = useState(alreadyPassedProp ?? false);
  const [locked, setLocked] = useState(lockedProp ?? false);
  const quizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selfFetchProgress) return;
    let cancelled = false;
    fetch(`/api/progress/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          data: {
            modules?: { id: string; status: string; locked: boolean }[];
          } | null,
        ) => {
          if (cancelled || !data?.modules) return;
          const mine = data.modules.find((m) => m.id === moduleId);
          if (!mine) return;
          setAlreadyPassed(mine.status === "passed");
          setLocked(mine.locked);
        },
      )
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [selfFetchProgress, slug, moduleId]);

  const allAnswered = answers.every((a) => a >= 0);
  const graded = result !== null;

  function start() {
    setStarted(true);
    requestAnimationFrame(() =>
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  if (locked) {
    return (
      <section className="mt-12 border-t border-line pt-10">
        <div className="flex items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface-2 p-6">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <div>
            <h2 className="font-display text-lg font-medium tracking-tight">
              The quiz is locked
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              Read this lesson freely. To take the quiz and earn credit, pass the
              earlier lessons in this level first.{" "}
              <Link href={`/track/${slug}`} className="text-accent underline">
                Back to the level
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <section className="mt-12 border-t border-line pt-10">
        <div className="rounded-[var(--r-lg)] border border-line bg-surface p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="eyebrow">Prove it</p>
            <h2 className="mt-1 font-display text-xl font-medium tracking-tight">
              Ready to check your understanding?
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              {questions.length} quick questions. Score 80% to{" "}
              {alreadyPassed ? "keep your pass" : "unlock the next module"}.
              {alreadyPassed && " You've already passed this one."}
            </p>
          </div>
          <button
            onClick={start}
            className="mt-4 shrink-0 rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover sm:mt-0"
          >
            {alreadyPassed ? "Retake quiz" : "Start the quiz"}
          </button>
        </div>
      </section>
    );
  }

  function select(qi: number, oi: number) {
    if (result?.passed) return;
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  }

  async function submit() {
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, answers }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function retry() {
    setResult(null);
    setError(false);
    setAnswers(Array(questions.length).fill(-1));
  }

  return (
    <section ref={quizRef} className="mt-12 scroll-mt-20 border-t border-line pt-10">
      <p className="eyebrow">Check your understanding</p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
        {questions.length}-question quiz
      </h2>
      <p className="mt-1 text-sm text-ink-2">
        Score 80% or higher to {alreadyPassed ? "keep your pass" : "unlock the next module"}.
      </p>

      <div className="mt-8 space-y-8">
        {questions.map((q, qi) => (
          <fieldset key={qi}>
            <legend className="font-medium leading-snug">
              <span className="mr-2 text-ink-3 tabular-nums">{qi + 1}.</span>
              {q.prompt}
            </legend>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const chosen = answers[qi] === oi;
                const isCorrect = graded && result!.correctAnswers[qi] === oi;
                const isWrongChoice = graded && chosen && !isCorrect;
                return (
                  <button
                    key={oi}
                    onClick={() => select(qi, oi)}
                    disabled={graded && result!.passed}
                    className={[
                      "flex w-full items-center gap-3 rounded-[var(--r-md)] border px-4 py-3 text-left text-sm transition-all",
                      isCorrect
                        ? "border-accent bg-accent-faint"
                        : isWrongChoice
                          ? "border-danger bg-danger-faint"
                          : chosen
                            ? "border-accent bg-surface"
                            : "border-line bg-surface hover:border-line-strong",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px]",
                        chosen || isCorrect ? "border-accent text-accent" : "border-line text-ink-3",
                      ].join(" ")}
                    >
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className={chosen || isCorrect ? "text-ink" : "text-ink-2"}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
            {graded && (
              <p className="mt-2 pl-1 text-sm text-ink-2">{result!.explanations[qi]}</p>
            )}
          </fieldset>
        ))}
      </div>

      <div className="mt-9">
        {error && (
          <p className="mb-4 text-sm text-danger">
            Couldn&apos;t submit. Check your connection and try again.
          </p>
        )}
        {!graded ? (
          <button
            onClick={submit}
            disabled={!allAnswered || submitting}
            className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Grading…" : allAnswered ? "Submit answers" : "Answer every question"}
          </button>
        ) : (
          <ResultBanner result={result!} slug={slug} nextOrder={nextOrder} onRetry={retry} />
        )}
      </div>
    </section>
  );
}

function ResultBanner({
  result,
  slug,
  nextOrder,
  onRetry,
}: {
  result: GradeResult;
  slug: string;
  nextOrder: number | null;
  onRetry: () => void;
}) {
  const pct = Math.round(result.score * 100);

  if (!result.passed) {
    return (
      <div className="rounded-[var(--r-lg)] border border-danger/40 bg-danger-faint p-6">
        <div className="font-display text-xl font-medium text-danger">
          Not yet - {pct}%
        </div>
        <p className="mt-1 text-sm text-ink-2">
          Review the notes under each question, then try again. You need 80%.
        </p>
        <button
          onClick={onRetry}
          className="mt-5 rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Try again
        </button>
      </div>
    );
  }

  // All quizzes passed but some hands-on tasks are still unchecked.
  const tasksRemain = result.trackCompleted && !result.trackReadyToCertify;

  return (
    <div className="rise rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-6">
      <div className="font-display text-xl font-medium text-accent">Passed - {pct}%</div>
      <p className="mt-1 text-sm text-ink-2">
        {result.trackReadyToCertify
          ? "That was the final step. Every quiz passed and every task done - your certificate is ready."
          : tasksRemain
            ? "All quizzes in this level are passed. Check off your remaining hands-on tasks to earn the certificate."
            : "Nicely done. The next module is unlocked."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {result.trackReadyToCertify ? (
          <Link
            href={`/track/${slug}/certificate`}
            className="rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Claim your certificate
          </Link>
        ) : tasksRemain ? (
          <Link
            href={`/track/${slug}`}
            className="rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Review remaining tasks
          </Link>
        ) : nextOrder ? (
          <Link
            href={`/track/${slug}/${nextOrder}`}
            className="rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Next module →
          </Link>
        ) : null}
        <Link
          href={`/track/${slug}`}
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          Back to level
        </Link>
      </div>
    </div>
  );
}
