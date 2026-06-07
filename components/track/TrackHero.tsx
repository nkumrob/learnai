import Link from "next/link";
import {
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_PROMISE,
  TRACK_TIER,
  TRACK_ORDER,
  levelToSlug,
} from "@/lib/core/track-meta";
import type { TrackSlug } from "@/types/shared";

const TIER_TINT = {
  Literacy: "chip-sky",
  Fluency: "chip-accent",
  Mastery: "chip-sun",
} as const;

export function TrackHero({
  slug,
  description,
  totalLessons,
}: {
  slug: TrackSlug;
  description: string;
  totalLessons: number;
}) {
  const level = TRACK_LEVEL[slug];
  const tier = TRACK_TIER[slug];
  const prevSlug = levelToSlug(level - 1);
  const nextSlug = levelToSlug(level + 1);

  return (
    <header className="pt-2 pb-10">
      <nav className="mb-8 flex items-center gap-3 text-sm">
        <Link
          href="/home"
          className="text-ink-3 transition-colors hover:text-ink"
        >
          Home
        </Link>
        <span className="text-line-strong">/</span>
        <Link
          href="/#journey"
          className="text-ink-3 transition-colors hover:text-ink"
        >
          Journey
        </Link>
        <span className="text-line-strong">/</span>
        <span className="text-ink-2">{TRACK_LABEL[slug]}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`chip ${TIER_TINT[tier]}`}>{tier}</span>
        <span className="chip">Level {level} of {TRACK_ORDER.length}</span>
        <span className="chip">{totalLessons} lessons</span>
      </div>

      <h1 className="display-lg mt-4 text-ink">
        {TRACK_LABEL[slug]}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        {description}
      </p>

      <div
        className="mt-7 rounded-[var(--r-lg)] border-l-2 px-5 py-4"
        style={{
          borderLeftColor: "var(--accent)",
          background: "var(--accent-faint)",
        }}
      >
        <span className="eyebrow text-accent">By the end of this level</span>
        <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
          {TRACK_PROMISE[slug]}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-sm">
        <div className="flex items-center gap-4 text-ink-3">
          {prevSlug ? (
            <Link
              href={`/track/${prevSlug}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
            >
              <ArrowLeft /> Level {level - 1}: {TRACK_LABEL[prevSlug]}
            </Link>
          ) : (
            <span>This is the first level</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-ink-3">
          {nextSlug ? (
            <Link
              href={`/track/${nextSlug}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-ink"
            >
              Level {level + 1}: {TRACK_LABEL[nextSlug]} <ArrowRight />
            </Link>
          ) : (
            <span>Final level</span>
          )}
        </div>
      </div>
    </header>
  );
}

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13 8H3M7 4 3 8l4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
