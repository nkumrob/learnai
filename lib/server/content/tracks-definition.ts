import type { Module, Track, TrackSlug } from "@/types/shared";

// Fixed, deterministic curriculum - a ladder from AI literacy to building with
// APIs/MCP, shaped by 2026 demand (prompt/context engineering, agents, no-code
// automation, tool calling, RAG, MCP). IDs derive from slug + order so the seed
// script is idempotent. Only the lesson/quiz prose is AI-authored.

interface TrackDef extends Omit<Track, "id"> {
  modules: Array<Omit<Module, "id" | "trackId">>;
}

export const TRACK_DEFS: TrackDef[] = [
  {
    slug: "fundamentals",
    title: "AI Fundamentals",
    description:
      "New to AI? Build the mental model and habits to use it confidently and safely.",
    order: 1,
    modules: [
      { order: 1, title: "What AI Can (and Can't) Do", outcome: "Describe what today's AI tools are good and bad at" },
      { order: 2, title: "Talking to AI: Prompting Basics", outcome: "Write clear prompts that get useful results" },
      { order: 3, title: "Judging AI Output", outcome: "Spot hallucinations and verify AI answers" },
      { order: 4, title: "Using AI Safely & Responsibly", outcome: "Use AI without leaking data or spreading errors" },
    ],
  },
  {
    slug: "productivity",
    title: "AI for Everyday Productivity",
    description:
      "Use AI to get daily work done faster - writing, research, planning, and reuse.",
    order: 2,
    modules: [
      { order: 1, title: "Drafting & Editing with AI", outcome: "Draft and polish documents and emails with AI" },
      { order: 2, title: "Summarizing & Research", outcome: "Summarize long material and research topics quickly" },
      { order: 3, title: "Planning & Organizing Your Work", outcome: "Turn messy notes into clear plans and checklists" },
      { order: 4, title: "Building Reusable Prompts", outcome: "Save and reuse prompts as repeatable tools" },
    ],
  },
  {
    slug: "prompting",
    title: "Prompt & Context Engineering",
    description:
      "Go from lucky prompts to reliable results - the skill behind every serious AI workflow.",
    order: 3,
    modules: [
      { order: 1, title: "Anatomy of a Great Prompt", outcome: "Structure prompts with role, context, and output format" },
      { order: 2, title: "System Prompts & Personas", outcome: "Steer AI behavior with system instructions" },
      { order: 3, title: "Few-Shot & Chain-of-Thought", outcome: "Boost accuracy with examples and step-by-step reasoning" },
      { order: 4, title: "Structured Output", outcome: "Get reliable JSON and formatted data out of AI" },
      { order: 5, title: "Context Engineering & Evals", outcome: "Feed AI the right context and test prompt quality" },
    ],
  },
  {
    slug: "automation",
    title: "AI Automation & Agents",
    description:
      "Automate repetitive work and build agents using no-code tools like Zapier, Make, and n8n.",
    order: 4,
    modules: [
      { order: 1, title: "Spotting Automatable Tasks", outcome: "Identify repetitive tasks worth automating with AI" },
      { order: 2, title: "No-Code Automation Tools", outcome: "Choose between Zapier, Make, and n8n for a job" },
      { order: 3, title: "Triggers, Actions & Connections", outcome: "Wire apps together with triggers and actions" },
      { order: 4, title: "Introducing AI Agents", outcome: "Explain how agents use tools, memory, and planning" },
      { order: 5, title: "Reliability & Guardrails", outcome: "Add checks so an AI workflow fails safely" },
    ],
  },
  {
    slug: "building",
    title: "Building with AI: APIs & MCP",
    description:
      "For the technically curious: call LLM APIs, use tool calling, RAG, and the Model Context Protocol.",
    order: 5,
    modules: [
      { order: 1, title: "Calling an LLM API", outcome: "Send prompts to an LLM API and read the response" },
      { order: 2, title: "Tool Calling & Function Calling", outcome: "Let an LLM call your functions with structured arguments" },
      { order: 3, title: "Retrieval-Augmented Generation (RAG)", outcome: "Explain how RAG grounds AI in your own data" },
      { order: 4, title: "Model Context Protocol (MCP)", outcome: "Describe what MCP is and why it standardizes AI tool access" },
      { order: 5, title: "Shipping an AI-Native Feature", outcome: "Plan a simple AI feature from prompt to production" },
    ],
  },
];

export function moduleId(slug: TrackSlug, order: number): string {
  return `${slug}-${order}`;
}

export function trackId(slug: TrackSlug): string {
  return `track-${slug}`;
}
