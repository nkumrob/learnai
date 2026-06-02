import type { TrackSlug } from "@/types/shared";

// Single source of truth for track ordering + presentation, usable on client
// and server. No emoji - the visual system uses numerals and type instead.

export const TRACK_ORDER: TrackSlug[] = [
  "fundamentals",
  "productivity",
  "prompting",
  "automation",
  "building",
];

export const TRACK_LABEL: Record<TrackSlug, string> = {
  fundamentals: "AI Fundamentals",
  productivity: "AI for Everyday Productivity",
  prompting: "Prompt & Context Engineering",
  automation: "AI Automation & Agents",
  building: "Building with AI: APIs & MCP",
};

/** Short editorial tag shown on cards. */
export const TRACK_TAG: Record<TrackSlug, string> = {
  fundamentals: "Begin here",
  productivity: "Most chosen",
  prompting: "The core skill",
  automation: "No-code power",
  building: "For builders",
};

export function isTrackSlug(value: string): value is TrackSlug {
  return (TRACK_ORDER as string[]).includes(value);
}
