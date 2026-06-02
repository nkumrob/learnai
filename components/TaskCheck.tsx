"use client";

import { useState } from "react";

export function TaskCheck({
  moduleId,
  task,
  initialDone,
}: {
  moduleId: string;
  task: string;
  initialDone: boolean;
}) {
  const [done, setDone] = useState(initialDone);
  const [saving, setSaving] = useState(false);

  async function toggle() {
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
