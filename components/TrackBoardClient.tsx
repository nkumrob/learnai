"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProgressStatus, TrackSlug } from "@/types/shared";

interface StaticModule {
  /** moduleId, of the form `${slug}-${order}` */
  id: string;
  order: number;
  slug: string;
  title: string;
  outcome: string;
}

interface ProgressModule {
  id: string;
  order: number;
  status: ProgressStatus;
  score: number | null;
  taskDone: boolean;
  complete: boolean;
  locked: boolean;
}

interface ProgressPayload {
  modules: ProgressModule[];
  completeCount: number;
  passedCount: number;
  completeAll: boolean;
  passedAll: boolean;
}

export function TrackBoardClient({
  slug,
  modules,
}: {
  slug: TrackSlug;
  modules: StaticModule[];
}) {
  const [progress, setProgress] = useState<ProgressPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/progress/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ProgressPayload | null) => {
        if (!cancelled && data) setProgress(data);
      })
      .catch(() => {
        /* leave static shell */
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const byId = new Map(progress?.modules.map((m) => [m.id, m]) ?? []);
  const completeCount = progress?.completeCount ?? 0;
  const passedCount = progress?.passedCount ?? 0;
  const passedPct =
    modules.length > 0 ? (passedCount / modules.length) * 100 : 0;

  const nextUpId = modules.find((m) => {
    const p = byId.get(m.id);
    return !p?.complete && !p?.locked;
  })?.id;

  // Find the index of the last completed station for the rail-fill animation.
  const lastDoneIdx = modules.reduce((acc, m, i) => {
    const p = byId.get(m.id);
    return p?.complete ? i : acc;
  }, -1);
  const railFillPct =
    modules.length > 1
      ? Math.max(0, ((lastDoneIdx + 0.5) / modules.length) * 100)
      : 0;

  return (
    <>
      <div className="mt-3 grid items-end gap-4 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <motion.div
              initial={false}
              animate={{ width: `${passedPct}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
              className="h-full rounded-full bg-accent"
            />
          </div>
          <span className="text-sm font-medium text-ink-2 tabular-nums">
            {passedCount} / {modules.length} passed
          </span>
        </div>
      </div>

      {progress?.completeAll && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-7 flex flex-col gap-4 rounded-[var(--r-lg)] border-l-4 bg-accent-faint p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderLeftColor: "var(--accent)" }}
        >
          <div>
            <div className="font-display text-xl font-semibold text-accent">
              Level complete.
            </div>
            <div className="mt-0.5 text-sm text-ink-2">
              Every lesson passed and every task done. Your certificate is ready.
            </div>
          </div>
          <Link href={`/track/${slug}/certificate`} className="btn-primary shrink-0">
            Claim certificate →
          </Link>
        </motion.div>
      )}

      {/* THE CLIMB — vertical rail with stations offset left/right */}
      <div className="relative mt-12 pb-2">
        {/* SVG vertical rail behind the stations */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
        >
          {/* dashed rail full-length */}
          <line
            x1="1"
            y1="2"
            x2="1"
            y2="98"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="2 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Solid accent overlay for completed portion */}
        <motion.span
          aria-hidden
          initial={{ height: 0 }}
          animate={{ height: `${railFillPct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-accent"
        />

        <ol className="relative space-y-5">
          {modules.map((m, i) => {
            const p = byId.get(m.id);
            return (
              <ModuleStation
                key={m.id}
                slug={slug}
                order={m.order}
                moduleSlug={m.slug}
                title={m.title}
                outcome={m.outcome}
                progress={p ?? null}
                isNextUp={m.id === nextUpId}
                index={i}
                side={i % 2 === 0 ? "left" : "right"}
              />
            );
          })}
        </ol>
      </div>

      {!progress?.completeAll && (
        <div className="mt-10 rounded-[var(--r-lg)] border border-dashed border-line bg-surface-2/40 p-5 text-center">
          <div className="font-display text-lg italic text-ink-2">
            Finish all {modules.length} lessons to earn the certificate.
          </div>
          <div className="mt-1 text-sm text-ink-3">
            {completeCount === 0
              ? "Pass each quiz (≥80%) and complete each hands-on task."
              : `${completeCount} done · ${modules.length - completeCount} to go.`}
          </div>
        </div>
      )}
    </>
  );
}

function ModuleStation({
  slug,
  order,
  moduleSlug,
  title,
  outcome,
  progress,
  isNextUp,
  index,
  side,
}: {
  slug: string;
  order: number;
  moduleSlug: string;
  title: string;
  outcome: string;
  progress: ProgressModule | null;
  isNextUp: boolean;
  index: number;
  side: "left" | "right";
}) {
  const complete = progress?.complete ?? false;
  const locked = progress?.locked ?? false;
  const passed = progress?.status === "passed";
  const taskDone = progress?.taskDone ?? false;
  const inProgress = progress?.status === "in_progress";
  const score = progress?.score ?? null;

  // Strong visual differentiation:
  //  - Done: muted, smaller, lower contrast
  //  - Next up: dominant, bigger, pulsing ring
  //  - In progress: accent ring without scale up
  //  - Locked: dimmed, no hover
  //  - Available untouched: neutral
  const stateClass = locked
    ? "opacity-50"
    : complete
      ? "scale-[0.97] opacity-75"
      : isNextUp
        ? "scale-[1.02] sm:scale-[1.04]"
        : "";

  const dot = complete
    ? "border-accent bg-accent text-accent-ink"
    : passed
      ? "border-accent bg-accent-faint text-accent"
      : isNextUp
        ? "border-accent bg-paper text-accent"
        : inProgress
          ? "border-accent bg-paper text-accent"
          : locked
            ? "border-line-strong bg-surface-2 text-ink-3"
            : "border-line-strong bg-paper text-ink-3";

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="relative"
    >
      {/* Mobile: full-width card with left rail dot. Desktop: alternating sides. */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-6">
        {/* Left column */}
        <div className={side === "left" ? "sm:block hidden" : "hidden"} />

        {/* The station dot — sits on the rail */}
        <div className="relative flex justify-center pt-4">
          {/* Pulsing halo for next-up */}
          {isNextUp && !complete && !locked && (
            <span
              aria-hidden
              className="absolute h-12 w-12 animate-pulse rounded-full"
              style={{ background: "var(--accent)", opacity: 0.18 }}
            />
          )}
          <span
            className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 font-display text-sm font-semibold tabular-nums shadow-sm ${dot}`}
          >
            {complete ? <CheckIcon /> : locked ? <LockIcon /> : order}
          </span>
        </div>

        {/* The card — alternates side on desktop, full width on mobile */}
        <div
          className={`col-span-3 sm:col-span-1 ${
            side === "left" ? "sm:order-first" : ""
          }`}
        >
          <Link
            href={`/track/${slug}/${moduleSlug}`}
            className={`group block transition-transform ${stateClass} ${
              locked ? "pointer-events-none" : ""
            }`}
            tabIndex={locked ? -1 : 0}
          >
            <div
              className={`card card-interactive p-4 sm:p-5 ${
                isNextUp ? "ring-2 ring-accent" : ""
              } ${complete ? "border-line" : ""}`}
              style={
                isNextUp
                  ? { boxShadow: "var(--shadow-md)" }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                    {isNextUp && !complete && (
                      <span className="chip chip-accent">Next up</span>
                    )}
                    {complete && <span className="chip chip-accent">Done</span>}
                    {locked && (
                      <span className="chip">
                        <LockIcon /> Locked
                      </span>
                    )}
                    {inProgress && !passed && !locked && !isNextUp && (
                      <span className="chip chip-sky">In progress</span>
                    )}
                  </div>
                  <h3
                    className={`font-display font-semibold tracking-tight text-ink ${
                      isNextUp
                        ? "text-lg sm:text-xl"
                        : complete
                          ? "text-base text-ink-2"
                          : "text-base sm:text-lg"
                    }`}
                  >
                    {title}
                  </h3>
                  {(isNextUp || (!complete && !locked)) && (
                    <p className="mt-1 text-sm text-ink-2 leading-snug">
                      You&apos;ll be able to {lower(outcome)}.
                    </p>
                  )}
                </div>
                {!locked && (
                  <ArrowIcon className="mt-1 shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                )}
              </div>

              {(passed || isNextUp || taskDone) && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <ResultChip
                    label="Quiz"
                    passed={passed}
                    score={passed ? score : null}
                  />
                  <ResultChip label="Task" passed={taskDone} />
                  <span className="ml-auto text-ink-3 tabular-nums">
                    ~6 min
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Right column */}
        <div className={side === "right" ? "sm:block hidden" : "hidden"} />
      </div>
    </motion.li>
  );
}

function ResultChip({
  label,
  passed,
  score,
}: {
  label: string;
  passed: boolean;
  score?: number | null;
}) {
  return (
    <span className={passed ? "chip chip-accent" : "chip"}>
      {passed ? "✓ " : ""}
      {label}
      {passed && score != null ? ` ${Math.round(score * 100)}%` : ""}
    </span>
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
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.4" />
    </svg>
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
function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
