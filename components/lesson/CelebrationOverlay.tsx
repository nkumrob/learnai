"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { EmailCapture } from "./EmailCapture";

interface CelebrationProps {
  open: boolean;
  passed: boolean;
  score: number;
  streak?: number;
  isFirstPass?: boolean;
  hasEmail?: boolean;
  slug: string;
  nextOrder: number | null;
  trackCompleted: boolean;
  trackReadyToCertify: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export function CelebrationOverlay({
  open,
  passed,
  score,
  streak,
  isFirstPass,
  hasEmail,
  slug,
  nextOrder,
  trackCompleted,
  trackReadyToCertify,
  onClose,
  onRetry,
}: CelebrationProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!open || !passed || firedRef.current) return;
    firedRef.current = true;
    // Respect reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Two-burst paper-toned confetti — warmer than neon.
    const palette = ["#1e5c45", "#c98a2a", "#fbfaf7", "#9a7b3f", "#3e6c8e"];
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.45 },
      colors: palette,
      gravity: 1.2,
      scalar: 0.85,
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.4 },
        colors: palette,
        gravity: 1.1,
        scalar: 0.7,
      });
    }, 220);
  }, [open, passed]);

  // Reset confetti firing flag when overlay closes.
  useEffect(() => {
    if (!open) firedRef.current = false;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-paper/85 backdrop-blur-sm no-print"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.92, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card relative mx-4 w-full max-w-md p-7 sm:p-9"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <CloseIcon />
            </button>

            {passed ? (
              <PassedBody
                score={score}
                streak={streak}
                isFirstPass={isFirstPass}
                hasEmail={hasEmail}
                slug={slug}
                nextOrder={nextOrder}
                trackCompleted={trackCompleted}
                trackReadyToCertify={trackReadyToCertify}
              />
            ) : (
              <FailedBody score={score} onRetry={onRetry} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PassedBody({
  score,
  streak,
  isFirstPass,
  hasEmail,
  slug,
  nextOrder,
  trackCompleted,
  trackReadyToCertify,
}: {
  score: number;
  streak?: number;
  isFirstPass?: boolean;
  hasEmail?: boolean;
  slug: string;
  nextOrder: number | null;
  trackCompleted: boolean;
  trackReadyToCertify: boolean;
}) {
  const pct = Math.round(score * 100);
  return (
    <>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-ink"
        >
          <CheckIcon />
        </motion.div>
        <h2 className="mt-5 display-md text-ink">
          {isFirstPass ? "Nicely done." : "Pass."}
        </h2>
        <p className="mt-1 font-display text-2xl italic text-accent">{pct}%</p>
      </div>

      {/* Streak callout */}
      {streak != null && streak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-sun-soft px-4 py-2 text-sm font-medium text-sun-ink"
        >
          <FlameIcon /> {streak} day streak
          {streak === 1 ? " starts now" : ", keep it going"}
        </motion.div>
      )}

      {/* What's next CTAs */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {trackReadyToCertify ? (
          <Link href={`/track/${slug}/certificate`} className="btn-primary">
            Claim certificate →
          </Link>
        ) : trackCompleted ? (
          <Link href={`/track/${slug}`} className="btn-primary">
            Finish remaining tasks →
          </Link>
        ) : nextOrder ? (
          <Link href={`/track/${slug}/${nextOrder}`} className="btn-primary">
            Next lesson →
          </Link>
        ) : (
          <Link href={`/track/${slug}`} className="btn-primary">
            Back to level →
          </Link>
        )}
        <Link href="/home" className="btn-ghost">
          Take a break
        </Link>
      </div>

      {/* Email capture — only on first pass and only if no email yet */}
      {isFirstPass && !hasEmail && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-7 border-t border-line pt-5"
        >
          <span className="font-display text-sm italic text-ink-3">
            ~ before you go
          </span>
          <EmailCapture compact />
        </motion.div>
      )}
    </>
  );
}

function FailedBody({
  score,
  onRetry,
}: {
  score: number;
  onRetry?: () => void;
}) {
  const pct = Math.round(score * 100);
  return (
    <>
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-soft text-sky-ink">
          <RetryIcon />
        </div>
        <h2 className="mt-5 display-md text-ink">Almost.</h2>
        <p className="mt-1 font-display text-2xl italic text-ink-3">
          {pct}% · 80% to pass
        </p>
      </div>
      <p className="mt-5 text-center text-ink-2">
        Review the explanations under each question, then try again. No
        penalty for retries.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try again
          </button>
        )}
      </div>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m5 12 5 5 9-10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function RetryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path
        d="M6 1c.5 2.5 3 3.5 3 6.5a3.5 3.5 0 1 1-7 0c0-1.4.7-2.4 1.5-3 .2 1 .8 1.7 1.5 1.7 0-1.7 0-3.3 1-5.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
