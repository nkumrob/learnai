"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLACEMENT_QUESTIONS } from "@/lib/core/placement";
import type { PlacementResult } from "@/types/shared";
import { PlacementResultCard } from "./PlacementResult";

type Phase = "ask" | "loading" | "done" | "error";

export function PlacementFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [phase, setPhase] = useState<Phase>("ask");
  const total = PLACEMENT_QUESTIONS.length;
  const question = PLACEMENT_QUESTIONS[step];

  async function choose(optionIndex: number) {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);

    if (step < total - 1) {
      setStep(step + 1);
      return;
    }
    setPhase("loading");
    try {
      const res = await fetch("/api/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: next }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as PlacementResult;
      setResult(data);
      setPhase("done");
    } catch {
      setPhase("error");
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  if (phase === "done" && result) {
    return <PlacementResultCard result={result} />;
  }

  const progressPct = phase === "loading"
    ? 100
    : ((step + (answers[step] != null ? 1 : 0)) / total) * 100;

  return (
    <div className="relative">
      {/* Header with progress + back */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-mono tabular-nums text-ink-3">
            {phase === "loading"
              ? "Finding your level…"
              : `${String(step + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
          </span>
          {step > 0 && phase === "ask" && (
            <button
              onClick={back}
              className="text-ink-3 transition-colors hover:text-ink"
            >
              ← Back
            </button>
          )}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          />
        </div>
      </div>

      {/* Question + options sliding */}
      <AnimatePresence mode="wait">
        {phase === "ask" && question && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-display text-base italic text-ink-3"
              aria-hidden
            >
              ~ question {step + 1}
            </span>
            <h2 className="display-lg mt-2 text-ink">{question.prompt}</h2>

            <ol className="mt-8 space-y-3">
              {question.options.map((opt, i) => (
                <li key={i}>
                  <motion.button
                    onClick={() => choose(i)}
                    whileTap={{ scale: 0.99 }}
                    className="group flex w-full items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface px-5 py-4 text-left text-base transition-all hover:border-accent hover:shadow-sm sm:px-6 sm:py-5 sm:text-lg"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line font-medium text-ink-3 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 font-medium text-ink">{opt}</span>
                    <ArrowIcon className="text-ink-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
                  </motion.button>
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <Spinner />
            <p className="mt-6 font-display text-xl italic text-ink-2">
              Finding the right starting point…
            </p>
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            <p className="text-danger">
              Something went wrong. Please try the last question again.
            </p>
            <button
              onClick={() => setPhase("ask")}
              className="btn-primary mt-4"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="mx-auto animate-spin text-accent"
      aria-hidden
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <path
        d="M36 20a16 16 0 0 0-16-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
