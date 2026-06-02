"use client";

import { useState } from "react";
import Link from "next/link";
import { PLACEMENT_QUESTIONS } from "@/lib/core/placement";
import { TRACK_LABEL } from "@/lib/core/track-meta";
import type { PlacementResult } from "@/types/shared";

export default function PlacementPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<PlacementResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: next }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <p className="eyebrow rise rise-1">Your starting point</p>
        <h1 className="rise rise-2 mt-4 font-display text-3xl font-medium tracking-tight">
          {TRACK_LABEL[result.recommendedTrack]}
        </h1>
        <p className="rise rise-3 mt-4 text-lg leading-relaxed text-ink-2">
          {result.rationale}
        </p>
        <div className="rise rise-4 mt-9 flex flex-wrap gap-3">
          <Link
            href={`/track/${result.recommendedTrack}`}
            className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
          >
            Start this track
          </Link>
          <Link
            href="/#curriculum"
            className="rounded-[var(--r-md)] px-4 py-3 font-medium text-ink-2 transition-colors hover:text-ink"
          >
            Browse all tracks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:py-20">
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-ink-3">
          <span>
            Question {step + 1} of {total}
          </span>
          <span>{loading ? "Finding your track…" : ""}</span>
        </div>
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${((step + (loading ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <h1 key={step} className="rise font-display text-3xl font-medium leading-tight tracking-tight">
        {question.prompt}
      </h1>

      <div className="mt-8 space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={loading}
            onClick={() => choose(i)}
            className="group flex w-full items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface px-5 py-4 text-left transition-all hover:border-accent hover:shadow-sm disabled:opacity-50"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[var(--r-sm)] border border-line text-sm text-ink-3 transition-colors group-hover:border-accent group-hover:text-accent">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="font-medium">{opt}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-6 text-sm text-danger">
          Something went wrong. Please pick an option again.
        </p>
      )}

      {step > 0 && !loading && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-8 text-sm text-ink-3 transition-colors hover:text-ink"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
