"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md px-5 py-28 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-danger/40 text-danger">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-2xl font-medium">Something went wrong</h1>
      <p className="mt-2 text-ink-2">
        An unexpected error occurred. You can try again.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-6 py-3 font-medium transition-colors hover:border-accent"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
