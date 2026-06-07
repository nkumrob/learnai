"use client";

import { useEffect, useRef, useState } from "react";
import type { TrackSlug } from "@/types/shared";

export function TaskCheck({
  moduleId,
  task,
  slug,
  initialDone = false,
}: {
  moduleId: string;
  task: string;
  /** Optional: when provided, the component self-fetches the learner's task
   *  status from `/api/progress/[slug]` after mount. Lets the page render
   *  statically for crawlers/anonymous visitors. */
  slug?: TrackSlug;
  initialDone?: boolean;
}) {
  const [done, setDone] = useState(initialDone);
  const [saving, setSaving] = useState(false);
  const userTouched = useRef(false);

  useEffect(() => {
    if (!slug || userTouched.current) return;
    let cancelled = false;
    fetch(`/api/progress/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { modules?: { id: string; taskDone: boolean }[] } | null) => {
        if (cancelled || !data?.modules) return;
        const mine = data.modules.find((m) => m.id === moduleId);
        if (mine && !userTouched.current) setDone(mine.taskDone);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug, moduleId]);

  async function toggle() {
    userTouched.current = true;
    const next = !done;
    setDone(next); // optimistic
    setSaving(true);
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, done: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setDone(!next); // revert on failure
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className={`mt-9 rounded-[var(--r-lg)] border p-5 transition-colors ${
        done ? "border-accent/40 bg-accent-faint" : "border-line bg-surface-2"
      }`}
    >
      <div className="eyebrow text-accent">Do it · prove it</div>
      <p className="mt-2 leading-relaxed text-ink">{task}</p>
      <button
        onClick={toggle}
        disabled={saving}
        aria-pressed={done}
        className="mt-4 flex items-center gap-3 text-left"
      >
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-[var(--r-sm)] border transition-colors ${
            done ? "border-accent bg-accent text-accent-ink" : "border-line-strong bg-surface"
          }`}
        >
          {done && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-sm font-medium">
          {done ? "Task completed" : "I completed this task"}
        </span>
      </button>
    </div>
  );
}
