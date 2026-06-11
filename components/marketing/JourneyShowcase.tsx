import Link from "next/link";
import {
  TRACK_ORDER,
  TRACK_LABEL,
  TRACK_TIER,
} from "@/lib/core/track-meta";
import type { TrackSlug } from "@/types/shared";

interface JourneyShowcaseProps {
  currentLevel?: number | null;
  completedSlugs?: TrackSlug[];
}

const TIER_TINT: Record<string, { chip: string; rule: string }> = {
  Literacy: { chip: "chip-sky", rule: "bg-sky" },
  Fluency: { chip: "chip-accent", rule: "bg-accent" },
  Mastery: { chip: "chip-sun", rule: "bg-sun" },
};

// One-line promise — what you'll actually be able to do at the end.
const TRACK_OUTCOME: Record<TrackSlug, string> = {
  fundamentals: "Use ChatGPT and Claude safely and well",
  prompting: "Write prompts that get reliable, useful results",
  productivity: "Cut hours off your weekly tasks with AI",
  automation: "Build no-code workflows in Zapier, Make, n8n",
  building: "Ship agents, RAG systems, and MCP integrations",
};

const TRACK_SKILLS: Record<TrackSlug, string[]> = {
  fundamentals: ["How LLMs work", "Safe use", "Limits"],
  prompting: ["Roles", "Few-shot", "Chain-of-thought"],
  productivity: ["Email", "Docs", "Research"],
  automation: ["Zapier", "Make", "n8n"],
  building: ["RAG", "Agents", "MCP"],
};

export function JourneyShowcase({
  currentLevel,
  completedSlugs = [],
}: JourneyShowcaseProps) {
  const completed = new Set(completedSlugs);
  return (
    <section id="journey" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mb-12 grid items-end gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="eyebrow tabular-nums text-ink-3">§ 03 — the journey</span>
          <h2 className="display-md mt-2 text-ink">
            Five levels.{" "}
            <span className="font-display italic text-accent">Literacy</span>{" "}
            to Mastery.
          </h2>
        </div>
        <p className="text-ink-2 sm:text-right">
          Skip what you know. The placement quiz puts you where you&apos;ll
          actually learn something.
        </p>
      </div>

      <ol className="overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface shadow-sm">
        {TRACK_ORDER.map((slug, i) => {
          const level = i + 1;
          const tier = TRACK_TIER[slug];
          const tint = TIER_TINT[tier];
          const isCurrent = level === currentLevel;
          const isDone = completed.has(slug);
          const isLast = i === TRACK_ORDER.length - 1;
          return (
            <li
              key={slug}
              className={`relative ${isLast ? "" : "border-b border-line"}`}
            >
              <Link
                href={`/track/${slug}`}
                className="group relative flex items-stretch gap-5 px-5 py-6 transition-colors hover:bg-surface-2/40 sm:px-8 sm:py-7"
              >
                {/* Left: tier rule + big numeral */}
                <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                  <span
                    className={`h-full w-[3px] rounded-full ${tint.rule} ${
                      tier === "Mastery" ? "" : "opacity-90"
                    }`}
                    aria-hidden
                  />
                  <span className="numeral w-12 text-center sm:w-16">
                    {isDone ? (
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink sm:h-14 sm:w-14">
                        <CheckIcon />
                      </span>
                    ) : (
                      <span
                        className={
                          isCurrent ? "text-accent" : "text-ink-3"
                        }
                      >
                        {`0${level}`.slice(-2)}
                      </span>
                    )}
                  </span>
                </div>

                {/* Middle: title + outcome */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`chip ${tint.chip}`}>{tier}</span>
                    {isCurrent && (
                      <span className="chip chip-accent">You&apos;re here</span>
                    )}
                    {isDone && (
                      <span className="chip chip-accent">Certificate earned</span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {TRACK_LABEL[slug]}
                  </h3>
                  <p className="mt-1.5 text-ink-2">{TRACK_OUTCOME[slug]}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-3">
                    {TRACK_SKILLS[slug].map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1.5 before:block before:h-1 before:w-1 before:rounded-full before:bg-line-strong"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: arrow + module count */}
                <div className="hidden shrink-0 flex-col items-end justify-between text-right sm:flex">
                  <span className="text-xs text-ink-3">
                    10 lessons
                  </span>
                  <ArrowIcon className="text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
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
