import type { TrackSlug } from "@/types/shared";

// Single source of truth for level ordering + presentation, usable on client
// and server. The 5 tracks are the 5 levels of one journey.

export type MasteryTier = "Literacy" | "Fluency" | "Mastery";

// Ordered by level (1..5). Prompt Engineering is Level 2 per the curriculum.
export const TRACK_ORDER: TrackSlug[] = [
  "fundamentals",
  "prompting",
  "productivity",
  "automation",
  "building",
];

export const TRACK_LABEL: Record<TrackSlug, string> = {
  fundamentals: "AI Foundations",
  prompting: "Prompt Engineering",
  productivity: "AI for Everyday Productivity",
  automation: "AI Automation",
  building: "Advanced & Specialized AI",
};

/** Mastery tier each level belongs to. */
export const TRACK_TIER: Record<TrackSlug, MasteryTier> = {
  fundamentals: "Literacy",
  prompting: "Fluency",
  productivity: "Fluency",
  automation: "Mastery",
  building: "Mastery",
};

/** One-line "what you'll be able to do" promise per level. */
export const TRACK_PROMISE: Record<TrackSlug, string> = {
  fundamentals: "Understand AI and use it safely and confidently.",
  prompting: "Get reliable, high-quality results from any AI tool.",
  productivity: "Get real work and life tasks done faster with AI.",
  automation: "Build workflows and agents that run without you.",
  building: "Design, combine, and teach advanced AI skills.",
};

export const TRACK_LEVEL: Record<TrackSlug, number> = {
  fundamentals: 1,
  prompting: 2,
  productivity: 3,
  automation: 4,
  building: 5,
};

export function isTrackSlug(value: string): value is TrackSlug {
  return (TRACK_ORDER as string[]).includes(value);
}

export function levelToSlug(level: number): TrackSlug | null {
  return TRACK_ORDER[level - 1] ?? null;
}
