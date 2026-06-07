"use client";

import { useState } from "react";

interface EmailCaptureProps {
  onSubmit?: (email: string) => void;
  onSkip?: () => void;
  /** Show a compact inline variant (inside celebration overlay). */
  compact?: boolean;
}

export function EmailCapture({ onSubmit, onSkip, compact }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"ask" | "saving" | "done" | "error">("ask");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setPhase("error");
      return;
    }
    setPhase("saving");
    try {
      const res = await fetch("/api/email/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error();
      setPhase("done");
      onSubmit?.(trimmed);
    } catch {
      setPhase("error");
    }
  }

  if (phase === "done") {
    return (
      <div className={compact ? "mt-3" : "mt-5"}>
        <div className="rounded-[var(--r-md)] bg-positive-faint px-4 py-3 text-sm">
          <span className="inline-flex items-center gap-2 font-medium text-positive">
            <CheckIcon /> Saved.
          </span>
          <span className="ml-1 text-ink-2">
            We&apos;ll send you a resume link if cookies clear.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      <p className={`text-ink-2 ${compact ? "text-sm" : ""}`}>
        Drop your email so your streak doesn&apos;t disappear if cookies clear.
        Optional. Never spam.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="flex-1 rounded-[var(--r-pill)] border border-line bg-paper px-5 py-3 text-base text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus-visible:ring-0"
        />
        <button
          type="submit"
          disabled={phase === "saving"}
          className="btn-primary disabled:opacity-60"
        >
          {phase === "saving" ? "Saving…" : "Save my progress"}
        </button>
      </form>
      {phase === "error" && (
        <p className="mt-2 text-sm text-danger">
          Hmm, that didn&apos;t look like an email. Try again?
        </p>
      )}
      {onSkip && (
        <button
          onClick={onSkip}
          className="mt-2 text-xs text-ink-3 transition-colors hover:text-ink"
        >
          Not now
        </button>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8 3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
