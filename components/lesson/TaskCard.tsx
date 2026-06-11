"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TrackSlug } from "@/types/shared";

interface TaskCardProps {
  moduleId: string;
  task: string;
  slug?: TrackSlug;
  initialDone?: boolean;
}

// Short canned hints — concrete templates the learner can paste into ChatGPT/
// Claude to make the task less abstract. Optional and dismissable.
function exampleFor(task: string): string {
  const lower = task.toLowerCase();
  if (lower.includes("system prompt") || lower.includes("system message")) {
    return `Try this in ChatGPT or Claude:

  System: "You are a senior editor for a tech magazine. You optimize
  for clarity, removing 30% of words without losing meaning."

  User: "<paste 3 paragraphs of your own writing>"

Compare the edit to your original. What did the model cut?`;
  }
  if (lower.includes("prompt") || lower.includes("ask")) {
    return `Open ChatGPT or Claude. Paste your task verbatim into the
chat box. Then, when the model responds, ask a follow-up:

  "Tell me what you assumed about my context. What's missing?"

That follow-up alone usually unlocks a much better second answer.`;
  }
  if (lower.includes("zapier") || lower.includes("workflow")) {
    return `On zapier.com, create a new Zap. Pick "Schedule by Zapier"
as the trigger (every day, 9am). Add an OpenAI action: "Send
prompt." Set the prompt to:

  "Summarize today's calendar in 3 bullet points: {{calendar}}"

Save and turn it on. It'll send to email by default.`;
  }
  return `Open the AI tool of your choice (ChatGPT, Claude, Gemini). Paste
this task as a starting prompt:

  "${task.replace(/"/g, "'").slice(0, 200)}${task.length > 200 ? "…" : ""}"

Iterate on what the model says. The doing is the point.`;
}

export function TaskCard({
  moduleId,
  task,
  slug,
  initialDone = false,
}: TaskCardProps) {
  const [done, setDone] = useState(initialDone);
  const [saving, setSaving] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const userTouched = useRef(false);

  useEffect(() => {
    if (!slug || userTouched.current) return;
    let cancelled = false;
    fetch(`/api/progress/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { modules?: { id: string; taskDone: boolean }[] } | null) => {
        if (cancelled || !d?.modules) return;
        const mine = d.modules.find((m) => m.id === moduleId);
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
    setDone(next);
    setSaving(true);
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, done: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setDone(!next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-10 border-t border-line pt-10">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
        Your task
      </h2>
      <p className="mt-3 text-lg leading-relaxed text-ink-2">{task}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={toggle}
          disabled={saving}
          aria-pressed={done}
          className={`group inline-flex items-center gap-3 rounded-[var(--r-pill)] border px-5 py-2.5 text-sm font-medium transition-all ${
            done
              ? "border-accent bg-accent text-accent-ink"
              : "border-line bg-surface text-ink hover:border-accent hover:bg-accent-faint"
          }`}
        >
          <span
            className={`grid h-5 w-5 place-items-center rounded-full border ${
              done
                ? "border-accent-ink bg-accent-ink/10"
                : "border-line-strong"
            }`}
          >
            {done && (
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="m3 8 3.5 3.5L13 4.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {done ? "I did it" : "Mark as done"}
        </button>

        <button
          onClick={() => setExampleOpen((s) => !s)}
          className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
        >
          {exampleOpen ? "Hide example ↑" : "Show an example ↓"}
        </button>

        <span className="ml-auto text-xs text-ink-3">
          Task is optional but needed for the certificate.
        </span>
      </div>

      <AnimatePresence>
        {exampleOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-[var(--r-lg)] border border-line bg-surface-2/40 p-5">
              <div className="eyebrow mb-2 text-ink-3">An example to copy</div>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-ink-2">
                {exampleFor(task)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
