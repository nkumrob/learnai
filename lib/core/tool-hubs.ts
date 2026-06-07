import type { TrackSlug } from "@/types/shared";

export interface ToolHub {
  slug: string;
  name: string;
  category: "Automation" | "Coding" | "AI assistant" | "Protocol";
  tagline: string;
  /** Sub-heading shown on the hub page. */
  intro: string;
  /** Why a working professional would learn this in 2026. */
  why: string[];
  /** 1-line FAQ for "How to learn X". */
  howToLearn: string;
  /** Lessons in the LearnAI curriculum that touch this tool. */
  lessons: Array<{ trackSlug: TrackSlug; order: number; title: string }>;
  faqs: Array<{ question: string; answer: string }>;
  externalDocs: { label: string; url: string };
}

export const TOOL_HUBS: ToolHub[] = [
  {
    slug: "n8n",
    name: "n8n",
    category: "Automation",
    tagline: "The open-source workflow automation platform for AI-native teams.",
    intro:
      "n8n is the most powerful no/low-code automation tool for working professionals in 2026. It runs anywhere — your laptop, a $5 VPS, or the n8n cloud — and connects 400+ apps with branching logic, error handling, and built-in AI nodes for OpenAI, Anthropic, and Ollama. LearnAI's Level 4 (AI Automation) teaches n8n as the bridge from Zapier-style 'one-trigger-one-action' automations to real branching workflows.",
    why: [
      "Self-hostable: keep customer data on infrastructure you control, which most legal/compliance teams now require.",
      "First-class AI nodes: OpenAI, Anthropic, Ollama, and HuggingFace work out of the box; no glue code.",
      "Branching + error handling: the missing capability when you outgrow Zapier or Make.",
      "Fair-code licensing: free for self-hosters, paid for hosted/team features. No vendor lock-in.",
    ],
    howToLearn:
      "Start with LearnAI Level 4 Module 4 ('n8n for intermediate automation'). Build the branching workflow it walks through in 20 minutes. Then add an AI judgment step (Module 5).",
    lessons: [
      { trackSlug: "automation", order: 3, title: "No-Code Automation with Zapier or Make" },
      { trackSlug: "automation", order: 4, title: "n8n for Intermediate Automation" },
      { trackSlug: "automation", order: 5, title: "Connecting AI to Your Workflows" },
      { trackSlug: "automation", order: 8, title: "Build an AI-Powered Content Workflow" },
      { trackSlug: "automation", order: 11, title: "Building a Personal AI Agent (No-Code)" },
    ],
    faqs: [
      {
        question: "Is n8n free?",
        answer:
          "Yes. n8n is fair-code licensed and free to self-host with unlimited workflows and executions. The n8n cloud plan starts at €20/month for managed hosting.",
      },
      {
        question: "Do I need to know how to code to use n8n?",
        answer:
          "No. n8n's visual editor is no-code for the majority of workflows. You can drop into a Code node for JavaScript when you need custom logic, but the LearnAI lessons cover only the visual builder.",
      },
      {
        question: "n8n vs Zapier — which should I learn first?",
        answer:
          "Learn Zapier or Make first if you've never automated anything (LearnAI Level 4 Module 3). Move to n8n when you need branching, error handling, or self-hosting — typically when you have 3+ automations or any compliance requirement.",
      },
      {
        question: "Can n8n connect to ChatGPT and Claude?",
        answer:
          "Yes. n8n has dedicated nodes for OpenAI (GPT-4o, GPT-5) and Anthropic (Claude Sonnet, Opus) with chat, structured output, and tool-use support. You can also hit any custom AI API via the HTTP node.",
      },
      {
        question: "Do I earn a certificate for learning n8n on LearnAI?",
        answer:
          "Yes — finishing Level 4 (AI Automation) earns the verifiable AI Automation certificate, which covers n8n alongside Zapier, Make, APIs, and no-code AI agents.",
      },
    ],
    externalDocs: { label: "n8n official docs", url: "https://docs.n8n.io" },
  },
  {
    slug: "mcp",
    name: "Model Context Protocol (MCP)",
    category: "Protocol",
    tagline: "The open protocol that lets AI assistants talk to your tools and data.",
    intro:
      "The Model Context Protocol (MCP) is Anthropic's open standard for connecting AI assistants to external systems — local files, SaaS APIs, databases, dev tools. Released late 2024 and adopted by Anthropic, OpenAI, and Microsoft Copilot in 2025–2026, MCP is the missing layer that turns chat AI into agent AI without custom integration code. LearnAI's Level 5 covers MCP at the level a working professional needs to use it (not the protocol internals).",
    why: [
      "Vendor-neutral: a single MCP server works across Claude, ChatGPT, Cursor, Windsurf, and Copilot.",
      "Right-sized for working professionals: most people use MCP servers, not build them — and using is straightforward.",
      "The bridge from 'AI chats' to 'AI does things' without writing integrations from scratch.",
      "Open spec, open source: no vendor can rugpull it.",
    ],
    howToLearn:
      "Start with LearnAI Level 5 (Advanced & Specialized AI) — the RAG and chatbots lessons cover the same patterns MCP exposes. Then install one production MCP server (e.g., the filesystem or GitHub server) inside Claude Desktop or Cursor.",
    lessons: [
      { trackSlug: "building", order: 1, title: "RAG: Retrieval-Augmented Generation" },
      { trackSlug: "building", order: 2, title: "No-Code AI Chatbots and Assistants" },
      { trackSlug: "automation", order: 11, title: "Building a Personal AI Agent (No-Code)" },
    ],
    faqs: [
      {
        question: "What is MCP in plain English?",
        answer:
          "MCP (Model Context Protocol) is a common language that AI assistants use to ask external tools for help — 'read this file', 'query this database', 'open this PR'. Without MCP, every AI/tool combination needs a custom integration. With MCP, one server works everywhere.",
      },
      {
        question: "Do I need to know how to code to use MCP?",
        answer:
          "No. Using a pre-built MCP server (filesystem, GitHub, Notion, Postgres) is point-and-click in Claude Desktop, Cursor, or Windsurf. Building your own MCP server requires Python or TypeScript — but that's only ~5% of MCP users.",
      },
      {
        question: "Who supports MCP in 2026?",
        answer:
          "Anthropic (Claude apps, Claude API), Microsoft (GitHub Copilot, VS Code), OpenAI (ChatGPT desktop, agents), Cursor, Windsurf, Zed, and a growing list of community implementations. The spec is open at modelcontextprotocol.io.",
      },
      {
        question: "Is MCP the same as a plugin or extension?",
        answer:
          "It's the standard that plugins use. A 'Notion plugin for Claude' in 2026 is, under the hood, a Notion MCP server. The advantage: the same Notion MCP server also works with ChatGPT, Cursor, and Copilot.",
      },
      {
        question: "How do I learn MCP free?",
        answer:
          "LearnAI's Level 5 is the free option. Anthropic's official MCP tutorials are also free but assume you can code. Most paid alternatives ($30–$200) on Udemy are videos of the same Anthropic tutorials.",
      },
    ],
    externalDocs: { label: "Model Context Protocol spec", url: "https://modelcontextprotocol.io" },
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    category: "Coding",
    tagline: "Anthropic's terminal-native AI coding assistant.",
    intro:
      "Claude Code is Anthropic's command-line AI coding tool. It edits your repo directly, runs tests, opens PRs, and works inside your existing workflow without a separate IDE. By mid-2026 it's the default tool of choice for engineers who want AI assistance without changing editors. LearnAI's vibe-coding lesson (Level 5, Module 4) is the fastest way to get capable with Claude Code without prior coding background.",
    why: [
      "Lives in your terminal — no new editor, no context switch.",
      "Reads your actual codebase before suggesting changes (no hallucinated APIs).",
      "Has Claude Skills, MCP support, and direct tool use — it can run tests, hit your DB, deploy.",
      "Pricing: $20/mo Pro plan or pay-per-use via the Anthropic API.",
    ],
    howToLearn:
      "LearnAI Level 5 Module 4 (Vibe Coding) walks through using Claude Code to build a working tool from a plain-language description — no prior coding required.",
    lessons: [
      { trackSlug: "building", order: 4, title: "AI for Coding and Vibe Coding" },
    ],
    faqs: [
      {
        question: "Is Claude Code free?",
        answer:
          "There is a free tier with limited daily usage. The $20/mo Pro plan removes most limits. Heavy users may prefer the pay-as-you-go API plan via console.anthropic.com.",
      },
      {
        question: "Do I need to know how to code to use Claude Code?",
        answer:
          "No, but a basic mental model of files, folders, and terminals helps. LearnAI's vibe coding lesson is designed for people with zero prior programming background.",
      },
      {
        question: "Claude Code vs Cursor vs Copilot — which to learn?",
        answer:
          "Claude Code if you live in the terminal or want a project-level agent. Cursor if you want an IDE with AI built in. Copilot if you already use VS Code or JetBrains and want lightweight inline suggestions. LearnAI covers the principles — once you know one, the others are easy.",
      },
      {
        question: "Can Claude Code use MCP servers?",
        answer:
          "Yes. Claude Code reads your ~/.claude.json and any project-level .claude/config — MCP servers configured there get full tool access.",
      },
    ],
    externalDocs: {
      label: "Claude Code documentation",
      url: "https://docs.claude.com/en/docs/claude-code/overview",
    },
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "Coding",
    tagline: "The AI-first code editor built on VS Code.",
    intro:
      "Cursor is a fork of VS Code with AI baked in at the editor level — inline edits, multi-file refactors, an agent pane that runs tools and tests, and tab-complete that understands your whole codebase. It's what most engineers reach for when they want an IDE-shaped product (not a terminal tool like Claude Code).",
    why: [
      "Familiar VS Code keymap and extension ecosystem.",
      "Multi-file refactors that actually work, with diff preview.",
      "MCP server support — same tool integrations as Claude Code and ChatGPT.",
      "Free tier covers light use; Pro is $20/mo.",
    ],
    howToLearn:
      "LearnAI Level 5 Module 4 (Vibe Coding) teaches the prompting patterns that work in any AI coding tool, Cursor included.",
    lessons: [
      { trackSlug: "building", order: 4, title: "AI for Coding and Vibe Coding" },
    ],
    faqs: [
      {
        question: "Is Cursor free?",
        answer:
          "Yes for light use (Hobby plan). Cursor Pro is $20/mo with higher request limits and access to frontier models.",
      },
      {
        question: "Do I need to know how to code to use Cursor?",
        answer:
          "Not for basic use — the chat pane works like ChatGPT but with file context. LearnAI's vibe coding lesson teaches the prompting patterns that get useful output without prior programming.",
      },
      {
        question: "Cursor vs Claude Code — what's the difference?",
        answer:
          "Cursor is an IDE; Claude Code is a CLI. Use Cursor if you want a visual editor, Claude Code if you want a project-level agent in your terminal. Both use the same underlying models.",
      },
    ],
    externalDocs: { label: "Cursor documentation", url: "https://docs.cursor.com" },
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Automation",
    tagline: "The original no-code automation platform — 7,000+ app integrations.",
    intro:
      "Zapier is the easiest place to start with automation. Its 'one trigger, one or two actions' Zaps cover 80% of small-team needs and connect to 7,000+ apps. LearnAI's Level 4 introduces Zapier as the on-ramp before moving to Make and n8n for branching workflows.",
    why: [
      "Easiest learning curve of any automation tool — most people build their first useful Zap in 10 minutes.",
      "Massive integration catalog: if it's a SaaS app, Zapier connects to it.",
      "Built-in AI by Zapier features for chat, structured output, and document parsing.",
      "Free tier covers 100 tasks/month; paid plans start at $19.99/mo.",
    ],
    howToLearn:
      "LearnAI Level 4 Module 3 builds a complete trigger-to-action Zap from scratch. Add Module 5 to insert an AI judgment step.",
    lessons: [
      { trackSlug: "automation", order: 1, title: "What Automation Is and When to Use It" },
      { trackSlug: "automation", order: 2, title: "APIs and How Data Moves Between Tools" },
      { trackSlug: "automation", order: 3, title: "No-Code Automation with Zapier or Make" },
      { trackSlug: "automation", order: 5, title: "Connecting AI to Your Workflows" },
      { trackSlug: "automation", order: 7, title: "Build a Lead Capture / Intake Automation" },
    ],
    faqs: [
      {
        question: "Is Zapier free?",
        answer:
          "Yes for up to 100 tasks/month on the free tier — enough for one or two personal workflows. Paid plans start at $19.99/mo (Professional) for higher limits and multi-step Zaps.",
      },
      {
        question: "Do I need to know how to code to use Zapier?",
        answer:
          "No. Zapier is fully no-code with a drag-and-drop builder. The LearnAI lessons cover only the visual builder.",
      },
      {
        question: "Zapier vs Make vs n8n — which to learn?",
        answer:
          "Zapier for the simplest learning curve and the biggest integration catalog. Make for multi-step workflows on a budget. n8n when you need self-hosting, advanced branching, or AI workflows you control end-to-end.",
      },
    ],
    externalDocs: { label: "Zapier Help Center", url: "https://help.zapier.com" },
  },
  {
    slug: "make",
    name: "Make",
    category: "Automation",
    tagline: "Visual workflow automation — Zapier's nearest competitor.",
    intro:
      "Make (formerly Integromat) is a visual automation platform that sits between Zapier and n8n in complexity. Its scenario editor lets you build multi-branch workflows visually with deeper logic than Zapier, often at a lower price for the same workload. LearnAI Level 4 covers Make alongside Zapier.",
    why: [
      "Visual scenario editor with branching, iterators, and aggregators built in.",
      "Cheaper than Zapier for multi-step workflows (Make's pricing per 'operation' is more generous).",
      "Built-in OpenAI, Anthropic, and document parsing modules.",
      "Free tier covers 1,000 ops/month; paid plans from $10.59/mo.",
    ],
    howToLearn:
      "LearnAI Level 4 Module 3 covers Zapier and Make as the no-code on-ramp. Build the same workflow in both to see which fits your brain.",
    lessons: [
      { trackSlug: "automation", order: 3, title: "No-Code Automation with Zapier or Make" },
      { trackSlug: "automation", order: 5, title: "Connecting AI to Your Workflows" },
      { trackSlug: "automation", order: 9, title: "Guardrails and Human Checkpoints" },
    ],
    faqs: [
      {
        question: "Is Make free?",
        answer:
          "Yes for up to 1,000 operations/month. Paid plans start at $10.59/mo (Core) — typically 2-3x cheaper than Zapier for the same multi-step workload.",
      },
      {
        question: "Make vs Zapier — what's the difference?",
        answer:
          "Make has a more powerful visual editor and is cheaper for multi-step workflows. Zapier has more integrations and an easier learning curve. Most teams start on Zapier and migrate complex workflows to Make.",
      },
      {
        question: "Make vs n8n — what's the difference?",
        answer:
          "Make is hosted-only and proprietary. n8n is self-hostable and open-source. Choose Make for simplicity, n8n for control and AI-native features.",
      },
    ],
    externalDocs: { label: "Make Help Center", url: "https://www.make.com/en/help" },
  },
];

export const TOOL_SLUGS = TOOL_HUBS.map((t) => t.slug);

export function findToolHub(slug: string): ToolHub | undefined {
  return TOOL_HUBS.find((t) => t.slug === slug);
}
