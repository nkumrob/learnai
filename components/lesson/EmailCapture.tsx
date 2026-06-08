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
  const [phase, setPhase] = useState<"ask" | "saving" | "sent" | "error">("ask");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [devUrl, setDevUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setPhase("error");
      setErrorMsg("Enter a valid email.");
      return;
    }
    setPhase("saving");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Couldn't save your progress.");
        setPhase("error");
        return;
      }
      if (data.devToken) {
        setDevUrl(`/api/auth/verify?token=${data.devToken}`);
      }
      setPhase("sent");
      onSubmit?.(trimmed);
    } catch {
      setErrorMsg("Couldn't reach the server.");
      setPhase("error");
    }
  }

  if (phase === "sent") {
    return (
      <div className={compact ? "mt-3" : "mt-5"}>
        <div className="rounded-[var(--r-md)] bg-positive-faint px-4 py-3 text-sm">
          <div className="flex items-center gap-2 font-medium text-positive">
            <CheckIcon /> Sign-in link sent.
          </div>
          <p className="mt-1 text-ink-2">
            Check{" "}
            <span className="font-medium text-ink">{email}</span> for the link.
            Click it to save this progress to a permanent account. Works on
            any device.
          </p>
          {devUrl && (
            <p className="mt-2 text-xs text-ink-3">
              <span className="font-mono">Dev:</span>{" "}
              <a href={devUrl} className="text-accent hover:underline">
                Verify locally
              </a>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "mt-3" : "mt-5"}>
      <p className={`text-ink-2 ${compact ? "text-sm" : ""}`}>
        Drop your email and we&apos;ll send a one-tap sign-in link. Your
        progress carries to any device. No password.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={phase === "saving"}
          className="flex-1 rounded-[var(--r-pill)] border border-line bg-paper px-5 py-3 text-base text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={phase === "saving"}
          className="btn-primary disabled:opacity-60"
        >
          {phase === "saving" ? "Sending…" : "Save my progress"}
        </button>
      </form>
      {errorMsg && (
        <p className="mt-2 text-sm text-danger" role="alert">
          {errorMsg}
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
