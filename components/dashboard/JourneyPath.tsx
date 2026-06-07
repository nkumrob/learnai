import Link from "next/link";
import type { JourneyLevel } from "@/lib/server/journey";
import { TRACK_LABEL, TRACK_PROMISE } from "@/lib/core/track-meta";

/**
 * The journey strip is the page's identity moment. It tells a story:
 * "you've earned X, you're climbing Y, Z is ahead." The current level is
 * dominant (a hero card) and the others sit as smaller markers on either
 * side, connected by a hairline path.
 */
export function JourneyPath({
  journey,
  currentLevel,
}: {
  journey: JourneyLevel[];
  currentLevel: number;
}) {
  const current = journey.find((l) => l.level === currentLevel);
  const before = journey.filter((l) => l.level < currentLevel);
  const after = journey.filter((l) => l.level > currentLevel);

  return (
    <section>
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="display-md text-ink">Your journey</h2>
        <span className="font-display text-base italic text-ink-3">
          Literacy → Mastery
        </span>
      </div>

      {/* Mobile: vertical list with rail (reuses landing-page station feel) */}
      <ol className="space-y-3 sm:hidden">
        {journey.map((l) => (
          <li key={l.slug}>
            <MarkerCard level={l} isCurrent={l.level === currentLevel} mobile />
          </li>
        ))}
      </ol>

      {/* Desktop: asymmetric — small markers · hero · small markers */}
      <div className="hidden sm:block">
        <div className="relative grid items-center gap-4 sm:grid-cols-[auto_1fr_auto]">
          <ol className="flex flex-col gap-3">
            {before.map((l) => (
              <li key={l.slug}>
                <MarkerCard level={l} isCurrent={false} compact />
              </li>
            ))}
            {before.length === 0 && (
              <li className="text-xs text-ink-3">Starts here</li>
            )}
          </ol>

          <div className="relative">
            {/* Connector dashes flanking the hero card */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-6 -translate-y-1/2 sm:block"
              style={{
                background:
                  "repeating-linear-gradient(to right, var(--line-strong) 0 3px, transparent 3px 7px)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 sm:block"
              style={{
                background:
                  "repeating-linear-gradient(to right, var(--line-strong) 0 3px, transparent 3px 7px)",
              }}
            />
            {current ? (
              <HeroLevelCard level={current} />
            ) : (
              <div className="card p-6 text-center text-ink-3">
                All levels complete.
              </div>
            )}
          </div>

          <ol className="flex flex-col gap-3">
            {after.map((l) => (
              <li key={l.slug}>
                <MarkerCard level={l} isCurrent={false} compact />
              </li>
            ))}
            {after.length === 0 && (
              <li className="text-xs text-ink-3">Final level</li>
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}

function HeroLevelCard({ level: l }: { level: JourneyLevel }) {
  const pct = l.moduleCount > 0 ? (l.passedCount / l.moduleCount) * 100 : 0;
  const isDone = l.status === "complete";
  return (
    <Link
      href={`/track/${l.slug}`}
      className="card card-interactive group block p-6 ring-2 ring-accent ring-offset-2 ring-offset-paper sm:p-7"
      style={{
        background:
          "linear-gradient(180deg, var(--surface) 0%, var(--accent-faint) 100%)",
      }}
    >
      <div className="flex items-start gap-5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--r-md)] bg-accent text-accent-ink font-display text-2xl font-semibold tabular-nums shadow-sm">
          {isDone ? <CheckIcon /> : l.level}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-accent">You&apos;re here</span>
            <span className="chip">{l.tier}</span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {TRACK_LABEL[l.slug]}
          </h3>
          <p className="mt-1 text-ink-2">{TRACK_PROMISE[l.slug]}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <span
            className="block h-full rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-ink-3 tabular-nums">
          {l.passedCount}/{l.moduleCount}
        </span>
        <ArrowIcon className="text-accent transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function MarkerCard({
  level: l,
  isCurrent,
  compact,
  mobile,
}: {
  level: JourneyLevel;
  isCurrent: boolean;
  compact?: boolean;
  mobile?: boolean;
}) {
  const isLocked = l.status === "locked";
  const isDone = l.status === "complete";
  const isInProgress = l.status === "in_progress";
  const pct = l.moduleCount > 0 ? (l.passedCount / l.moduleCount) * 100 : 0;

  const body = (
    <div
      className={`card flex items-center gap-3 ${
        compact ? "p-3 sm:w-44" : "p-4"
      } ${isCurrent ? "ring-2 ring-accent" : ""} ${
        isLocked ? "opacity-60" : ""
      }`}
    >
      <span
        className={`grid place-items-center rounded-full font-display font-semibold tabular-nums ${
          compact ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
        } ${
          isDone
            ? "bg-accent text-accent-ink"
            : isCurrent || isInProgress
              ? "bg-accent-faint text-accent"
              : "bg-surface-2 text-ink-3"
        }`}
      >
        {isDone ? <CheckSmall /> : isLocked ? <LockSmall /> : l.level}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">
          Level {l.level}{mobile ? ` · ${l.tier}` : ""}
        </div>
        <div className="truncate font-medium text-ink leading-tight" style={compact ? { fontSize: "0.8125rem" } : undefined}>
          {TRACK_LABEL[l.slug]}
        </div>
        {(mobile || !compact) && l.moduleCount > 0 && (
          <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-accent transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) return body;
  return <Link href={`/track/${l.slug}`}>{body}</Link>;
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function CheckSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8 3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
