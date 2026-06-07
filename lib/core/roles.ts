import type { TrackSlug } from "@/types/shared";

export interface Role {
  slug: string;
  name: string;
  /** Plural noun for the audience, e.g. "teachers". */
  plural: string;
  headline: string;
  intro: string;
  /** Concrete, specific AI use cases for this role. */
  useCases: Array<{ title: string; detail: string }>;
  /** Lessons in the LearnAI curriculum most relevant to this role. */
  recommendedLessons: Array<{ trackSlug: TrackSlug; order: number; title: string; why: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const ROLES: Role[] = [
  {
    slug: "teachers",
    name: "Teachers",
    plural: "teachers",
    headline: "AI for teachers: a free, hands-on starting path",
    intro:
      "Teachers, professors, and instructional designers are using AI to plan units, generate differentiated practice, draft IEP-aligned content, give faster formative feedback, and stay one step ahead of students who are already using it. LearnAI's free curriculum is built for working professionals — no math, no coding, and a verifiable certificate for your professional-development records.",
    useCases: [
      {
        title: "Generate differentiated practice in minutes, not hours",
        detail:
          "Use a single template prompt to produce three reading levels of the same passage, or three difficulty tiers of the same math problem set. Lesson 2 in Level 3 (AI Research and Summarization) shows the prompt pattern.",
      },
      {
        title: "Draft and adapt rubrics, IEP-aligned tasks, and lesson plans",
        detail:
          "Persona prompting (Level 2 Module 2) lets you say 'act as a 4th-grade ELA teacher in a district using EngageNY' and get usable first drafts that you edit, not start from scratch.",
      },
      {
        title: "Give faster, higher-quality feedback on student writing",
        detail:
          "Use AI as a feedback drafter you review and edit. Level 2 Module 7 (Controlling Tone, Style, and Format) covers writing feedback that sounds like you, not generic AI.",
      },
      {
        title: "Spot AI-generated student work without false positives",
        detail:
          "Detection tools are unreliable. Level 1 Module 6 (AI Ethics and Bias Awareness) covers what AI generation patterns actually look like and how to design AI-resilient assignments instead.",
      },
      {
        title: "Build your personal AI workflow system",
        detail:
          "Level 3 Module 12 walks you through designing your own AI workflow — what you delegate, what you keep, your verification habit.",
      },
    ],
    recommendedLessons: [
      { trackSlug: "fundamentals", order: 4, title: "Safe and Responsible AI Use", why: "Critical for FERPA + student data" },
      { trackSlug: "fundamentals", order: 6, title: "AI Ethics and Bias Awareness", why: "Detecting AI-generated student work + bias in classroom AI" },
      { trackSlug: "prompting", order: 2, title: "Role-Playing and Persona Prompting", why: "Get usable first drafts for lesson plans" },
      { trackSlug: "prompting", order: 7, title: "Controlling Tone, Style, and Format", why: "Feedback that sounds like you, not AI" },
      { trackSlug: "productivity", order: 8, title: "AI for Learning and Development", why: "Use AI as your own subject-matter tutor" },
    ],
    faqs: [
      {
        question: "Will using AI feel like cheating?",
        answer:
          "If you use AI as a thinking partner and edit its output, no. If you copy-paste verbatim, yes. LearnAI's framing throughout is 'use AI to think faster, then verify'.",
      },
      {
        question: "Is this aligned with district policy?",
        answer:
          "LearnAI's curriculum is policy-neutral but emphasizes safe-use practices (Level 1 Module 4) that align with most district AI policies — no student PII in prompts, verify output, disclose AI assistance.",
      },
      {
        question: "Can I use the certificate for PD credit?",
        answer:
          "Many districts accept verifiable platform-issued certificates for professional development hours. LearnAI's certificate is publicly verifiable at a URL you can share with your PD coordinator.",
      },
    ],
  },
  {
    slug: "marketers",
    name: "Marketers",
    plural: "marketers",
    headline: "AI for marketers: from prompting to agent-powered workflows",
    intro:
      "Marketing was the first function to absorb AI at scale — and the bar for what AI can do moves up every quarter. LearnAI's free curriculum takes you from prompting that actually works to building no-code automations that draft, route, and publish content with human review checkpoints.",
    useCases: [
      {
        title: "Stop writing 'rewrite this' prompts that produce slop",
        detail:
          "Level 2 (Prompt Engineering) teaches the four-part prompt and persona patterns that turn AI from a writing assistant into a brand-voice ghostwriter.",
      },
      {
        title: "Build a content production line with quality gates",
        detail:
          "Level 4 Module 8 walks through a no-code content workflow with an explicit human-review checkpoint — the missing ingredient most agencies skip.",
      },
      {
        title: "Auto-summarize meetings and turn them into briefs",
        detail:
          "Level 3 Module 4 (AI for Meeting Prep and Follow-Up) covers the workflow most marketing teams adopt in their first AI month.",
      },
      {
        title: "Connect AI to your CRM, CMS, and analytics",
        detail:
          "Level 4 (AI Automation) shows you how to wire ChatGPT or Claude into Zapier, Make, or n8n — the integration layer between AI and your existing martech stack.",
      },
      {
        title: "Build a no-code AI agent for content briefs",
        detail:
          "Level 4 Module 11 walks through building a personal AI agent that takes a topic and returns a brief with sources, keyword research, and outline.",
      },
    ],
    recommendedLessons: [
      { trackSlug: "prompting", order: 1, title: "Prompt Engineering Fundamentals", why: "The four-part prompt — the marketing baseline" },
      { trackSlug: "prompting", order: 7, title: "Controlling Tone, Style, and Format", why: "Brand voice consistency" },
      { trackSlug: "productivity", order: 9, title: "AI for Content: Posts, Slides, Visuals", why: "Cross-format content production" },
      { trackSlug: "automation", order: 3, title: "No-Code Automation with Zapier or Make", why: "The integration layer" },
      { trackSlug: "automation", order: 8, title: "Build an AI-Powered Content Workflow", why: "End-to-end with human review" },
      { trackSlug: "automation", order: 11, title: "Building a Personal AI Agent (No-Code)", why: "Your first agent" },
    ],
    faqs: [
      {
        question: "Will AI-generated content rank in Google?",
        answer:
          "Yes — Google's official position (March 2026) is that AI-assisted content with named human review, original perspective, and topical depth performs well. Thin, unattributed AI content is what gets penalized.",
      },
      {
        question: "What tools should I learn first?",
        answer:
          "ChatGPT or Claude for the writing/research workflow, then Zapier or Make for connecting AI into your existing martech stack. LearnAI Levels 2 and 4 cover both.",
      },
      {
        question: "How long until I can ship something useful?",
        answer:
          "Most marketers ship a useful AI-assisted workflow in under 90 minutes — typically a meeting-notes-to-brief flow or an SEO brief generator. Level 4 lessons walk through real examples.",
      },
    ],
  },
  {
    slug: "recruiters",
    name: "Recruiters",
    plural: "recruiters",
    headline: "AI for recruiters: write better outreach, screen smarter, save 5 hours a week",
    intro:
      "Recruiting is high-volume, repetitive, and language-heavy — the exact shape of work AI is good at. LearnAI's free curriculum covers prompting, automation, and the safe-use practices recruiters need given EEOC scrutiny on AI screening.",
    useCases: [
      {
        title: "Stop sending obvious AI outreach",
        detail:
          "Level 2 (Prompt Engineering) teaches few-shot and persona patterns that produce outreach that reads like you wrote it — not like a generic AI template.",
      },
      {
        title: "Summarize 200-line resumes in one paragraph with consistency",
        detail:
          "Level 3 Module 2 (AI Research and Summarization) covers the prompt patterns that give consistent summaries across hundreds of resumes — the basis for fair comparison.",
      },
      {
        title: "Use AI safely without violating EEOC or NYC AEDT rules",
        detail:
          "Level 1 Modules 4 and 6 cover responsible AI use, bias awareness, and the human-in-the-loop discipline regulators expect.",
      },
      {
        title: "Build a no-code intake automation",
        detail:
          "Level 4 Module 7 walks through a real lead-capture automation that maps directly to candidate intake — form → ATS → first-touch email.",
      },
      {
        title: "Run AI-assisted candidate research",
        detail:
          "Level 3 Module 2 + Level 5 Module 1 (RAG) cover how to use AI on a candidate's public materials without scraping or storing private data.",
      },
    ],
    recommendedLessons: [
      { trackSlug: "fundamentals", order: 4, title: "Safe and Responsible AI Use", why: "PII, candidate data, employer policies" },
      { trackSlug: "fundamentals", order: 6, title: "AI Ethics and Bias Awareness", why: "EEOC + NYC AEDT compliance baseline" },
      { trackSlug: "prompting", order: 2, title: "Role-Playing and Persona Prompting", why: "Outreach that sounds like you" },
      { trackSlug: "prompting", order: 3, title: "Few-Shot and Example-Based Prompting", why: "Consistent resume summaries" },
      { trackSlug: "productivity", order: 3, title: "AI for Email and Communication", why: "Outreach + reply workflows" },
      { trackSlug: "automation", order: 7, title: "Build a Lead Capture / Intake Automation", why: "Candidate intake workflow" },
    ],
    faqs: [
      {
        question: "Can I use AI to screen candidates?",
        answer:
          "Depends on jurisdiction. NYC AEDT requires bias audits for automated decision tools. EEOC has issued guidance that disparate-impact rules apply. LearnAI's framing throughout: use AI to assist your decisions, not make them — keep the human in the loop.",
      },
      {
        question: "What about AI-generated resumes from candidates?",
        answer:
          "They're a fact of life. Focus your screening on outcomes (portfolio, work samples, structured interviews) rather than written-document polish, which has been gameable since long before AI.",
      },
      {
        question: "Will recruiters be replaced by AI?",
        answer:
          "Not the role — but the work shape changes. Recruiters who fluently use AI for the high-volume parts (sourcing, summarization, scheduling, outreach) free up time for the parts that matter most: candidate experience, hiring-manager partnership, and reference-checking judgment.",
      },
    ],
  },
  {
    slug: "lawyers",
    name: "Lawyers",
    plural: "lawyers",
    headline: "AI for lawyers: practical skills, safe-use practices, and what the bar actually expects",
    intro:
      "Multiple bar associations have issued guidance (2024–2026) that lawyers must understand AI well enough to use it competently and supervise it appropriately. LearnAI's free curriculum is structured exactly for this: working knowledge, with strong emphasis on safe use, bias awareness, and verification — without assuming prior technical background.",
    useCases: [
      {
        title: "Use AI for first-pass document review without leaking privileged data",
        detail:
          "Level 1 Module 4 (Safe and Responsible AI Use) covers what data should and should not go into a public AI tool, and what to ask your firm's IT before using a tool with client matters.",
      },
      {
        title: "Draft and refine — never publish unedited AI output",
        detail:
          "Level 2 Module 8 (Diagnosing and Fixing Bad Outputs) is the verification discipline the bar guidance assumes you have.",
      },
      {
        title: "Summarize depositions, briefs, and discovery efficiently",
        detail:
          "Level 3 Module 2 + Level 5 Module 1 (RAG) cover how to use AI on long documents — and how RAG-based legal tools (Harvey, CoCounsel, Lexis+ AI) actually work under the hood.",
      },
      {
        title: "Spot AI hallucinations before they cite a non-existent case",
        detail:
          "Level 1 Module 2 (How LLMs Work) explains why hallucinations happen and where they're most likely — the foundation for the verification habit you need.",
      },
      {
        title: "Understand what your firm's AI tools (Harvey, CoCounsel) actually do",
        detail:
          "Level 5 covers RAG and agents — the architecture under every major legal AI product. Learn the patterns once and you can evaluate any vendor demo.",
      },
    ],
    recommendedLessons: [
      { trackSlug: "fundamentals", order: 2, title: "How Large Language Models Work", why: "Why hallucinations happen" },
      { trackSlug: "fundamentals", order: 4, title: "Safe and Responsible AI Use", why: "Privilege + confidentiality discipline" },
      { trackSlug: "fundamentals", order: 6, title: "AI Ethics and Bias Awareness", why: "Bar guidance + client communications" },
      { trackSlug: "fundamentals", order: 9, title: "The Human-in-the-Loop Mindset", why: "The verification discipline" },
      { trackSlug: "prompting", order: 8, title: "Diagnosing and Fixing Bad Outputs", why: "Don't publish bad output" },
      { trackSlug: "building", order: 1, title: "RAG: Retrieval-Augmented Generation", why: "How Harvey/CoCounsel/Lexis+ work" },
    ],
    faqs: [
      {
        question: "Will my bar's competence rule require AI knowledge?",
        answer:
          "Many state bars have already issued guidance (e.g., California, New York, Florida) that the duty of competence includes AI literacy. LearnAI's curriculum is structured to meet that competence bar without making you a technologist.",
      },
      {
        question: "Can I use ChatGPT for client work?",
        answer:
          "Not the consumer ChatGPT with client data — those inputs may be used for training. Use enterprise plans (ChatGPT Enterprise, Claude for Work) or firm-deployed RAG tools that contractually exclude training. Level 1 Module 4 covers this in detail.",
      },
      {
        question: "Is there a certificate I can show the bar?",
        answer:
          "LearnAI's certificate is publicly verifiable and demonstrates completion of a structured AI-literacy curriculum. It's not bar-accredited CLE — for that you'll want to check your state bar's approved providers — but it's a credible demonstration of working knowledge.",
      },
    ],
  },
  {
    slug: "founders",
    name: "Founders",
    plural: "founders",
    headline: "AI for founders: build, ship, and operate without hiring a data scientist",
    intro:
      "Solo founders and small teams have a unique advantage in 2026: every part of running a company — marketing, support, ops, hiring, even initial code — can be done by a capable founder + AI. LearnAI's free curriculum takes you from prompting basics to building automation and no-code agents that run parts of your business while you work on something else.",
    useCases: [
      {
        title: "Ship first versions without engineering hires",
        detail:
          "Level 5 Module 4 (Vibe Coding) walks through using Claude Code or Cursor to build working tools from plain-language descriptions. Many MVPs ship this way now.",
      },
      {
        title: "Replace 10+ hours/week of repetitive ops work",
        detail:
          "Level 4 Module 6 (Spotting Automatable Tasks at Work) is the audit-your-week exercise that most founders use to identify the first 3 workflows to automate.",
      },
      {
        title: "Build your own marketing content production line",
        detail:
          "Level 4 Module 8 walks through a no-code AI content workflow with a human-review checkpoint — exactly what a solo founder needs to publish consistently without an editor.",
      },
      {
        title: "Use AI as your operating system, not just a chat",
        detail:
          "Level 3 Module 12 (Building a Personal AI Workflow System) is the lesson founders cite most as the one that changed how they work.",
      },
      {
        title: "Build a customer-facing AI feature without an ML team",
        detail:
          "Level 5 Module 2 (No-Code AI Chatbots and Assistants) and Module 1 (RAG) cover the patterns under every AI-feature SaaS launched in 2025–2026.",
      },
    ],
    recommendedLessons: [
      { trackSlug: "prompting", order: 6, title: "Prompt Templates and Libraries", why: "Reusable prompts = your founding team's playbook" },
      { trackSlug: "productivity", order: 12, title: "Building a Personal AI Workflow System", why: "Founders' favourite lesson" },
      { trackSlug: "automation", order: 6, title: "Spotting Automatable Tasks at Work", why: "Audit your week" },
      { trackSlug: "automation", order: 8, title: "Build an AI-Powered Content Workflow", why: "Marketing without a marketing hire" },
      { trackSlug: "automation", order: 11, title: "Building a Personal AI Agent (No-Code)", why: "Your first agent" },
      { trackSlug: "building", order: 4, title: "AI for Coding and Vibe Coding", why: "Ship MVPs without engineering hires" },
    ],
    faqs: [
      {
        question: "Should I learn to code now that AI can write it?",
        answer:
          "You should learn enough to read code, run it, and debug obvious mistakes — even when AI writes the first draft. Level 5 Module 4 (Vibe Coding) covers exactly this level: capable user, not engineer.",
      },
      {
        question: "What AI tools should a solo founder pay for?",
        answer:
          "A common 2026 stack: Claude or ChatGPT Pro ($20), Cursor or Claude Code ($20), one automation tool (Zapier/Make/n8n, $10–20), one writing tool (or just Claude). ~$70/mo for an entire AI-augmented operations layer.",
      },
      {
        question: "Will AI build my product for me?",
        answer:
          "It will help you build it 3–10x faster than you would alone. It won't replace product judgment, distribution skill, or the discipline of shipping. Founders who ship AI-augmented products win — not founders who wait for AI to do it for them.",
      },
    ],
  },
];

export const ROLE_SLUGS = ROLES.map((r) => r.slug);

export function findRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
