"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProgressStatus, TrackSlug } from "@/types/shared";

interface StaticModule {
  /** moduleId, of the form `${slug}-${order}` */
  id: string;
  order: number;
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
        /* leave static shell; not a fatal UX failure */
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const byId = new Map(progress?.modules.map((m) => [m.id, m]) ?? []);
  const completeCount = progress?.completeCount ?? 0;
  const pct =
    modules.length > 0 ? Math.round((completeCount / modules.length) * 100) : 0;

  return (
    <>
      <div className="rise rise-4 mt-7 flex items-center gap-4">
        <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-medium text-ink-2 tabular-nums">
          {completeCount} / {modules.length} done
        </span>
      </div>

      {progress?.completeAll && (
        <div className="rise mt-7 flex flex-col gap-4 rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium text-accent">Level complete</div>
            <div className="text-sm text-ink-2">
              Every lesson passed and every task done. Your certificate is ready.
            </div>
          </div>
          <Link
            href={`/track/${slug}/certificate`}
            className="shrink-0 rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Get certificate
          </Link>
        </div>
      )}

      <ol className="mt-9 space-y-3">
        {modules.map((m) => {
          const p = byId.get(m.id);
          return (
            <ModuleRow
              key={m.id}
              slug={slug}
              order={m.order}
              title={m.title}
              outcome={m.outcome}
              progress={p ?? null}
            />
          );
        })}
      </ol>
    </>
  );
}

function ModuleRow({
  slug,
  order,
  title,
  outcome,
  progress,
}: {
  slug: string;
  order: number;
  title: string;
  outcome: string;
  progress: ProgressModule | null;
}) {
  const complete = progress?.complete ?? false;
  const locked = progress?.locked ?? false;
  const passed = progress?.status === "passed";
  const taskDone = progress?.taskDone ?? false;
  const score = progress?.score ?? null;

  return (
    <li>
      <Link href={`/track/${slug}/${order}`}>
        <div
          className={`flex items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface px-5 py-4 transition-all hover:border-accent hover:shadow-sm ${
            complete ? "border-accent/30" : ""
          } ${locked ? "opacity-80" : ""}`}
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-sm ${
              complete ? "border-accent bg-accent text-accent-ink" : "border-line text-ink-2"
            }`}
          >
            {complete ? "✓" : order}
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-medium tracking-tight">{title}</div>
            <div className="truncate text-sm text-ink-2">
              You&apos;ll be able to {lower(outcome)}.
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {locked ? (
              <span className="flex items-center gap-1 rounded-[var(--r-sm)] bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-3">
                <LockIcon /> Quiz
              </span>
            ) : (
              <Pill
                on={passed}
                label={passed ? `Quiz ${Math.round((score ?? 0) * 100)}%` : "Quiz"}
              />
            )}
            <Pill on={taskDone} label="Task" />
          </div>
        </div>
      </Link>
    </li>
  );
}

function Pill({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`rounded-[var(--r-sm)] px-2 py-0.5 text-[11px] font-medium tabular-nums ${
        on ? "bg-accent-faint text-accent" : "bg-surface-2 text-ink-3"
      }`}
    >
      {on ? "✓ " : ""}
      {label}
    </span>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
