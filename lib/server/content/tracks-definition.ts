import type { Module, Track, TrackSlug } from "@/types/shared";

// The "Zero to Mastery" curriculum: 5 progressive levels mapping onto the
// Literacy -> Fluency -> Mastery model, 50 topics total. Each topic becomes one
// micro-module; its `outcome` is the topic's mastery indicator. IDs derive from
// slug + order so the seed script is idempotent.

interface TrackDef extends Omit<Track, "id"> {
  modules: Array<Omit<Module, "id" | "trackId">>;
}

export const TRACK_DEFS: TrackDef[] = [
  {
    slug: "fundamentals",
    title: "AI Foundations",
    description:
      "Level 1 - Literacy. Understand what AI is, what it can and can't do, and how to use it safely.",
    order: 1,
    modules: [
      { order: 1, title: "What AI Actually Is (and Is Not)", outcome: "explain what AI is versus ML, deep learning, and generative AI in plain language" },
      { order: 2, title: "How Large Language Models Work", outcome: "explain how an LLM predicts text and why it hallucinates" },
      { order: 3, title: "What AI Can and Cannot Do", outcome: "sort work tasks into what AI handles well versus what needs a human" },
      { order: 4, title: "Safe and Responsible AI Use", outcome: "apply a safe-use checklist so you never leak sensitive data" },
      { order: 5, title: "The AI Tools Landscape", outcome: "pick the right category of AI tool for a given task" },
      { order: 6, title: "AI Ethics and Bias Awareness", outcome: "spot bias signals in AI output and explain their likely cause" },
      { order: 7, title: "AI and Your Job", outcome: "map your job tasks into automate, assist, and human-only" },
      { order: 8, title: "Generative AI vs. Traditional Software", outcome: "explain why the same prompt can return different answers" },
      { order: 9, title: "The Human-in-the-Loop Mindset", outcome: "define your personal verification habit for AI output" },
      { order: 10, title: "Speaking the Language of AI", outcome: "use core AI terms correctly in a conversation" },
    ],
  },
  {
    slug: "prompting",
    title: "Prompt Engineering",
    description:
      "Level 2 - Literacy to Fluency. Get reliable, high-quality results from any AI tool. No coding.",
    order: 2,
    modules: [
      { order: 1, title: "Prompt Engineering Fundamentals", outcome: "write prompts with context, instructions, input, and output format" },
      { order: 2, title: "Role-Playing and Persona Prompting", outcome: "use a persona to raise the quality of the output" },
      { order: 3, title: "Few-Shot and Example-Based Prompting", outcome: "teach the AI a format with examples for consistent output" },
      { order: 4, title: "Chain-of-Thought Prompting", outcome: "use step-by-step reasoning to improve accuracy" },
      { order: 5, title: "Iterative and Multi-Turn Prompting", outcome: "reach a polished result by refining across turns" },
      { order: 6, title: "Prompt Templates and Libraries", outcome: "build a saved library of reusable prompts" },
      { order: 7, title: "Controlling Tone, Style, and Format", outcome: "produce the same content in multiple formats and tones" },
      { order: 8, title: "Diagnosing and Fixing Bad Outputs", outcome: "diagnose which part of a prompt failed and fix it" },
      { order: 9, title: "System Prompts, Temperature, and Context", outcome: "configure a system prompt and temperature for a use case" },
      { order: 10, title: "Prompting for Different Work Domains", outcome: "write an effective prompt for a task outside your usual role" },
    ],
  },
  {
    slug: "productivity",
    title: "AI for Everyday Productivity",
    description:
      "Level 3 - Fluency. Use AI to get real work (and life) done faster. No technical background.",
    order: 3,
    modules: [
      { order: 1, title: "AI Writing: Drafting, Editing, Tone", outcome: "turn rough notes into a polished email, summary, and one-pager fast" },
      { order: 2, title: "AI Research and Summarization", outcome: "summarize a long document into key findings and actions" },
      { order: 3, title: "AI for Email and Communication", outcome: "set up a reusable email workflow from a few bullets" },
      { order: 4, title: "AI for Meeting Prep and Follow-Up", outcome: "turn a transcript into decisions, action items, and owners" },
      { order: 5, title: "AI for Brainstorming and Ideation", outcome: "run a structured brainstorm and select the best ideas" },
      { order: 6, title: "AI for Planning and Project Management", outcome: "turn a vague goal into a milestone plan with risks" },
      { order: 7, title: "AI for Summarizing and Analyzing Data", outcome: "get insights from a spreadsheet without writing a formula" },
      { order: 8, title: "AI for Learning and Development", outcome: "use AI as a tutor pitched at the right level for you" },
      { order: 9, title: "AI for Content: Posts, Slides, Visuals", outcome: "produce aligned content across formats from one topic" },
      { order: 10, title: "AI for Personal Finance and Decisions", outcome: "summarize the key terms and risks in a real document" },
      { order: 11, title: "AI for Job Search and Career", outcome: "tailor a resume and run a mock interview with feedback" },
      { order: 12, title: "Building a Personal AI Workflow System", outcome: "describe your personal AI system: tools, prompts, verification" },
      { order: 13, title: "AI for Health, Wellness, and Goals", outcome: "design a personalized 30-day plan with safe verification" },
    ],
  },
  {
    slug: "automation",
    title: "AI Automation",
    description:
      "Level 4 - Fluency to Mastery. Connect tools and build workflows that run without you. Low/no code.",
    order: 4,
    modules: [
      { order: 1, title: "What Automation Is and When to Use It", outcome: "classify a task as automate now, use AI manually, or keep human" },
      { order: 2, title: "APIs and How Data Moves Between Tools", outcome: "explain in plain words how a trigger moves data between apps" },
      { order: 3, title: "No-Code Automation with Zapier or Make", outcome: "build a trigger to action to result workflow" },
      { order: 4, title: "n8n for Intermediate Automation", outcome: "build a branching workflow with error handling" },
      { order: 5, title: "Connecting AI to Your Workflows", outcome: "add an AI judgment step inside an automation" },
      { order: 6, title: "Spotting Automatable Tasks at Work", outcome: "audit your week and write an automation spec" },
      { order: 7, title: "Build a Lead Capture / Intake Automation", outcome: "build an end-to-end intake automation" },
      { order: 8, title: "Build an AI-Powered Content Workflow", outcome: "build a content workflow with a human review checkpoint" },
      { order: 9, title: "Guardrails and Human Checkpoints", outcome: "add safety checks that prevent specific failures" },
      { order: 10, title: "Scheduling, Monitoring, Maintaining", outcome: "schedule, monitor, and fix a broken automation" },
      { order: 11, title: "Building a Personal AI Agent (No-Code)", outcome: "build a no-code agent that completes a multi-step task" },
    ],
  },
  {
    slug: "building",
    title: "Advanced & Specialized AI",
    description:
      "Level 5 - Mastery. Design, combine, and innovate: RAG, chatbots, data, coding, and teaching others.",
    order: 5,
    modules: [
      { order: 1, title: "RAG: Retrieval-Augmented Generation", outcome: "explain how RAG grounds AI in your own data" },
      { order: 2, title: "No-Code AI Chatbots and Assistants", outcome: "plan a chatbot connected to a document source" },
      { order: 3, title: "AI for Data Analysis (Intermediate)", outcome: "run an AI-assisted analysis and produce a findings brief" },
      { order: 4, title: "AI for Coding and Vibe Coding", outcome: "build a working tool from a plain-language description" },
      { order: 5, title: "Teaching AI to Others", outcome: "teach a beginner to complete one useful AI task" },
      { order: 6, title: "Your Long-Term AI Learning System", outcome: "set up a self-renewing AI learning habit" },
    ],
  },
];

export function moduleId(slug: TrackSlug, order: number): string {
  return `${slug}-${order}`;
}

export function trackId(slug: TrackSlug): string {
  return `track-${slug}`;
}
