"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TRACK_LABEL, TRACK_LEVEL, TRACK_TIER, TRACK_PROMISE } from "@/lib/core/track-meta";
import type { PlacementResult } from "@/types/shared";

const TIER_TINT = {
  Literacy: "chip-sky",
  Fluency: "chip-accent",
  Mastery: "chip-sun",
} as const;

const WHAT_YOULL_LEARN: Record<string, string[]> = {
  fundamentals: [
    "How LLMs actually predict text (and why they hallucinate)",
    "When to use ChatGPT vs Claude vs Gemini",
    "Safe, considered AI habits that don't lock you in",
  ],
  prompting: [
    "Role + context + constraint scaffolds that just work",
    "Few-shot, chain-of-thought, and system prompts",
    "How to debug an answer that's almost right",
  ],
  productivity: [
    "Email triage in one minute, not twenty",
    "Meeting prep, follow-ups, and decision memos",
    "Research that actually cites real sources",
  ],
  automation: [
    "Zapier and Make basics — visual workflows",
    "n8n for power users; multi-step agents",
    "Webhooks, branching, and scheduled runs",
  ],
  building: [
    "RAG architecture from scratch",
    "Agentic loops with tool use and evals",
    "The Model Context Protocol (MCP) end to end",
  ],
};

export function PlacementResultCard({ result }: { result: PlacementResult }) {
  const slug = result.recommendedTrack;
  const level = TRACK_LEVEL[slug];
  const tier = TRACK_TIER[slug];
  const skills = WHAT_YOULL_LEARN[slug] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7 inline-flex items-center gap-3"
      >
        <span className="font-display text-base italic text-ink-3">
          ~ start here
        </span>
        <span className={`chip ${TIER_TINT[tier]}`}>{tier}</span>
        <span className="chip">Level {level}</span>
      </motion.div>

      <h1 className="display-lg text-ink">
        {TRACK_LABEL[slug]}
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
        {result.rationale}
      </p>

      <div className="card mt-8 max-w-xl border-l-4 bg-surface p-6" style={{ borderLeftColor: "var(--accent)" }}>
        <span className="eyebrow text-accent">By the end of this level</span>
        <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
          You will: {TRACK_PROMISE[slug].replace(/\.$/, "").toLowerCase()}.
        </p>
        <ul className="mt-4 space-y-2 text-ink-2">
          {skills.map((s) => (
            <li key={s} className="flex items-start gap-2.5">
              <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link href={`/track/${slug}`} className="btn-primary">
          Start Lesson 1
          <ArrowIcon />
        </Link>
        <Link href="/#journey" className="btn-ghost">
          See all five levels
        </Link>
      </div>

      <p className="mt-6 text-sm text-ink-3">
        Change your mind? You can move levels at any time from the journey
        page.
      </p>
    </motion.div>
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
