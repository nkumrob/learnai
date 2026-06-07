import Link from "next/link";
import { JourneyPath } from "./JourneyPath";
import type { JourneyLevel } from "@/lib/server/journey";

export function EmptyDashboard({
  journey,
  currentLevel,
}: {
  journey: JourneyLevel[];
  currentLevel: number;
}) {
  return (
    <div className="space-y-10">
      <header className="mb-2">
        <h1 className="display-lg text-ink">
          Welcome to{" "}
          <span className="font-display italic text-accent">LearnAI</span>.
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-2">
          You haven&apos;t started yet. A 30-second placement quiz will route you
          to the level that fits.
        </p>
      </header>

      <div
        className="card relative grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
        style={{
          background:
            "linear-gradient(180deg, var(--surface) 0%, var(--accent-faint) 100%)",
        }}
      >
        <div>
          <span className="chip chip-accent">Start here</span>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Find your level.
          </h2>
          <p className="mt-2 text-ink-2">
            Three questions. About 30 seconds. We&apos;ll put you in the right
            spot.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/track/fundamentals" className="btn-ghost">
            Skip to Level 1
          </Link>
          <Link href="/placement" className="btn-primary">
            Take placement
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <JourneyPath journey={journey} currentLevel={currentLevel} />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
