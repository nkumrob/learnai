"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SignInFormProps {
  initialError?: string | null;
}

type Phase = "ask" | "sending" | "sent" | "error";

export function SignInForm({ initialError }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>(initialError ? "error" : "ask");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [devUrl, setDevUrl] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setPhase("sending");
    setError(null);
    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't send the link.");
        setPhase("error");
        return;
      }
      if (data.devToken) {
        setDevUrl(`/api/auth/verify?token=${data.devToken}`);
      }
      setPhase("sent");
    } catch {
      setError("Couldn't reach the server.");
      setPhase("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="card p-7"
        >
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-accent-faint text-accent">
            <MailIcon />
          </div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Check your inbox.
          </h2>
          <p className="mt-2 text-ink-2">
            We sent a sign-in link to{" "}
            <span className="font-medium text-ink">{email}</span>. The link
            works once and expires in 15 minutes.
          </p>
          <button
            onClick={() => setPhase("ask")}
            className="mt-5 text-sm text-ink-3 transition-colors hover:text-ink"
          >
            ← Use a different email
          </button>

          {devUrl && (
            <div className="mt-6 rounded-[var(--r-md)] border border-dashed border-line bg-surface-2/30 p-4 text-xs">
              <div className="eyebrow mb-1 text-ink-3">Dev only</div>
              <p className="text-ink-2">
                No RESEND_API_KEY set, so no real email was sent. Click to
                verify locally:
              </p>
              <a
                href={devUrl}
                className="mt-2 inline-block break-all font-mono text-accent hover:underline"
              >
                {devUrl}
              </a>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.form
          key="ask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={submit}
          className="card p-7"
        >
          <label htmlFor="email" className="block font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
            autoComplete="email"
            disabled={phase === "sending"}
            className="mt-3 w-full rounded-[var(--r-pill)] border border-line bg-paper px-5 py-3.5 text-base text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
          />
          {error && (
            <p className="mt-3 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={phase === "sending" || !email.trim()}
            className="btn-primary mt-5 w-full justify-center disabled:opacity-60"
          >
            {phase === "sending" ? "Sending link…" : "Send sign-in link →"}
          </button>
          <p className="mt-4 text-xs text-ink-3">
            We&apos;ll never use your email for anything besides sign-in and
            opt-in reminders. Unsubscribe in one click.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m3 7 9 6 9-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
