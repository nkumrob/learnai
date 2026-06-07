"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { GradeResult } from "@/types/shared";
import { CelebrationOverlay } from "./CelebrationOverlay";

interface ClientQuestion {
  prompt: string;
  options: string[];
}

interface QuizRunnerProps {
  moduleId: string;
  slug: string;
  nextOrder: number | null;
  questions: ClientQuestion[];
}

export function QuizRunner({
  moduleId,
  slug,
  nextOrder,
  questions,
}: QuizRunnerProps) {
  const [started, setStarted] = useState(false);
  const [alreadyPassed, setAlreadyPassed] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1),
  );
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/progress/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          d: {
            modules?: { id: string; status: string; locked: boolean }[];
            hasEmail?: boolean;
          } | null,
        ) => {
          if (cancelled || !d) return;
          if (d.hasEmail) setHasEmail(true);
          const mine = d.modules?.find((m) => m.id === moduleId);
          if (mine) {
            if (mine.status === "passed") setAlreadyPassed(true);
            if (mine.locked) setLocked(true);
          }
        },
      )
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug, moduleId]);

  function start() {
    setStarted(true);
    setStep(0);
    setResult(null);
    setAnswers(Array(questions.length).fill(-1));
    requestAnimationFrame(() =>
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function select(idx: number) {
    if (submitting || result) return;
    const next = [...answers];
    next[step] = idx;
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
      const data = (await res.json()) as GradeResult;
      setResult(data);
      setShowCelebration(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else if (answers.every((a) => a >= 0)) {
      submit();
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  if (locked) {
    return (
      <section className="mt-12 border-t border-line pt-10">
        <div className="card flex items-start gap-4 bg-surface-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-3">
            <LockIcon />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
              The quiz is locked
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              Read this lesson freely. To take the quiz, pass the earlier
              lessons in this level first.{" "}
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
      <section ref={rootRef} className="mt-12 border-t border-line pt-10">
        <div className="card grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:p-8">
          <div>
            <span className="font-display text-base italic text-ink-3">
              ~ check
            </span>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
              Check your understanding
            </h2>
            <p className="mt-2 text-ink-2">
              {questions.length} questions. Score 80% to{" "}
              {alreadyPassed
                ? "keep your pass"
                : "unlock the next lesson"}
              . No timer, no penalty.
            </p>
          </div>
          <button onClick={start} className="btn-primary shrink-0">
            {alreadyPassed ? "Retake quiz" : "Start quiz"} →
          </button>
        </div>
      </section>
    );
  }

  const question = questions[step];
  const chosen = answers[step];
  const allAnswered = answers.every((a) => a >= 0);
  const progressPct = ((step + (chosen >= 0 ? 0.5 : 0)) / questions.length) * 100;

  return (
    <>
      <section ref={rootRef} className="mt-12 border-t border-line pt-10">
        {/* Stepper */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-sm tabular-nums text-ink-3">
            Q{String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
          </div>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <motion.div
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
              className="h-full rounded-full bg-accent"
            />
          </div>
          {step > 0 && (
            <button
              onClick={back}
              className="text-sm text-ink-3 transition-colors hover:text-ink"
            >
              ← Back
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28 }}
          >
            <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
              {question.prompt}
            </h3>

            <ol className="mt-7 space-y-3">
              {question.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                return (
                  <li key={oi}>
                    <motion.button
                      onClick={() => select(oi)}
                      whileTap={{ scale: 0.99 }}
                      className={`group flex w-full items-center gap-4 rounded-[var(--r-lg)] border bg-surface px-5 py-4 text-left transition-all hover:border-accent sm:px-6 sm:py-5 ${
                        isChosen
                          ? "border-accent bg-accent-faint shadow-sm"
                          : "border-line"
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-medium transition-colors ${
                          isChosen
                            ? "border-accent bg-accent text-accent-ink"
                            : "border-line text-ink-3 group-hover:border-accent"
                        }`}
                      >
                        {isChosen ? <CheckIcon /> : String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1 text-base font-medium text-ink sm:text-lg">
                        {opt}
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 text-sm text-danger">
            Couldn&apos;t submit. Check your connection and try again.
          </p>
        )}

        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            onClick={next}
            disabled={chosen < 0 || submitting}
            className="btn-primary disabled:opacity-50"
          >
            {step < questions.length - 1
              ? "Next question"
              : submitting
                ? "Grading…"
                : allAnswered
                  ? "Submit answers"
                  : "Answer all questions"}{" "}
            →
          </button>
        </div>
      </section>

      {/* Celebration overlay */}
      <CelebrationOverlay
        open={showCelebration}
        passed={!!result?.passed}
        score={result?.score ?? 0}
        streak={result?.streak}
        isFirstPass={result?.isFirstPass}
        hasEmail={hasEmail}
        slug={slug}
        nextOrder={nextOrder}
        trackCompleted={result?.trackCompleted ?? false}
        trackReadyToCertify={result?.trackReadyToCertify ?? false}
        onClose={() => setShowCelebration(false)}
        onRetry={() => {
          setShowCelebration(false);
          setResult(null);
          setStep(0);
          setAnswers(Array(questions.length).fill(-1));
        }}
      />
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8 3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
