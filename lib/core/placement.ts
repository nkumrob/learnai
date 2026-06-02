import type { PlacementResult, TrackSlug } from "@/types/shared";

// A short placement quiz that routes a learner to one of the 5 tracks.
// Pure + deterministic so it can be unit tested and run without AI.

export interface PlacementQuestion {
  id: string;
  prompt: string;
  options: string[];
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "experience",
    prompt: "How familiar are you with AI tools like ChatGPT or Claude?",
    options: [
      "I've barely used them",
      "I've tried them a few times",
      "I use them most days",
      "I already build things with AI",
    ],
  },
  {
    id: "goal",
    prompt: "What are you most hoping to be able to do?",
    options: [
      "Understand AI and use it with confidence",
      "Get my everyday work done faster",
      "Write prompts that work reliably, every time",
      "Automate repetitive tasks and build agents",
      "Build AI into apps with APIs and MCP",
    ],
  },
  {
    id: "technical",
    prompt: "How do you feel about code?",
    options: [
      "I'd rather avoid it",
      "I can follow along",
      "I write code comfortably",
    ],
  },
];

// goal option index -> track
const GOAL_TO_TRACK: TrackSlug[] = [
  "fundamentals",
  "productivity",
  "prompting",
  "automation",
  "building",
];

/**
 * Route to a track from placement answers (option indexes, in question order:
 * experience, goal, technical). Two guardrails keep certificates meaningful:
 *  - total beginners start at fundamentals regardless of goal;
 *  - the developer track (APIs & MCP) requires some comfort with code, else we
 *    route to the no-code automation track instead.
 */
export function computePlacement(answers: number[]): PlacementResult {
  const experience = answers[0] ?? 0;
  const goal = clampGoal(answers[1] ?? 0);
  const technical = answers[2] ?? 0;

  const goalTrack = GOAL_TO_TRACK[goal];
  const beginner = experience === 0;

  if (beginner && goalTrack !== "fundamentals") {
    return {
      recommendedTrack: "fundamentals",
      startModuleOrder: 1,
      rationale:
        "Since AI tools are still new to you, we'll start with the fundamentals so everything after clicks faster. Your goal track will be waiting right after.",
    };
  }

  if (goalTrack === "building" && technical === 0) {
    return {
      recommendedTrack: "automation",
      startModuleOrder: 1,
      rationale:
        "You want to build with AI - let's start no-code. You'll ship real automations and agents first, then APIs and MCP will feel natural.",
    };
  }

  return {
    recommendedTrack: goalTrack,
    startModuleOrder: 1,
    rationale: rationaleFor(goalTrack),
  };
}

function clampGoal(i: number): number {
  return Math.min(Math.max(i, 0), GOAL_TO_TRACK.length - 1);
}

function rationaleFor(track: TrackSlug): string {
  switch (track) {
    case "fundamentals":
      return "We'll build a solid foundation so you can use AI with confidence.";
    case "productivity":
      return "You're ready to put AI to work on everyday tasks and move faster.";
    case "prompting":
      return "You're past the basics - let's make your prompts reliable, not lucky.";
    case "automation":
      return "You're ready to go beyond one-off prompts and automate real work.";
    case "building":
      return "You're ready to build AI into software with APIs, tool calling, and MCP.";
  }
}
