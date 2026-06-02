# LearnAI - Product Requirements (MVP)

_Last updated: 2026-06-01_

## 1. Problem

People keep hearing "learn AI" but don't know **where to start** or how to **prove**
they can do useful things with it. They want practical, work-relevant wins
(productivity, automation) - not theory - and a credential to show for it.

## 2. Goal

Help anyone upskill with AI quickly and **prove it**, via a short loop:
**place → learn → prove → certify.** Free and public.

## 3. Target user

Someone who has *heard of* AI, has used it a little or not at all, and wants to be
able to *do things* with it at work. Not researchers or ML engineers.

## 4. Principles

- **Practical over theoretical** - every module ends with a task you could do today.
- **Deterministic structure + content** - fixed curriculum so certificates mean
  something. Every module's lesson + quiz is **hand-authored** (example-driven, with
  worked examples and code samples) in `lib/server/content/authored`, seeded once and
  cached. OpenAI generation and an offline template remain as fallbacks for new
  modules. Lessons separate **learn** from **prove**: the quiz is gated behind an
  explicit "Start the quiz" step.
- **No friction** - no signup, no email. An anonymous session persists progress.
- **Cheap to run** - content is generated once at seed time, not per request.

## 5. Scope - In (v1)

- **One journey, 5 levels, 50 micro-topics** mapping onto the Literacy → Fluency →
  Mastery model. Each topic is one bite-sized module; its mastery indicator is the
  module's outcome and hands-on task. (Curriculum from the "Top 50 AI & Automation
  Topics" doc; see §5a.)
  - **Level 1 - AI Foundations** (Literacy, 10) - what AI is, LLMs, can/can't, safe use,
    tools, bias, jobs, probabilistic vs deterministic, human-in-the-loop, terminology.
  - **Level 2 - Prompt Engineering** (Literacy→Fluency, 10) - the 4-part prompt, personas,
    few-shot, chain-of-thought, iteration, templates, format control, debugging, system
    prompts/temperature, domain prompting.
  - **Level 3 - AI for Everyday Productivity** (Fluency, 13) - writing, research, email,
    meetings, brainstorming, planning, data, learning, content, finance, careers,
    personal systems, health.
  - **Level 4 - AI Automation** (Fluency→Mastery, 11) - when to automate, APIs, Zapier/Make,
    n8n, AI-in-workflow, task audits, intake & content builds, guardrails, monitoring, agents.
  - **Level 5 - Advanced & Specialized** (Mastery, 6) - RAG, no-code chatbots, data
    analysis, vibe coding, teaching others, a long-term learning system.
- **Journey map home**: a visual path of the 5 levels with mastery-tier labels, progress,
  and progressive unlocking. The **placement quiz** (3 questions) sets the learner's
  starting level; everything up to it opens, and finishing a level's quizzes unlocks the next.
- **Prove-it per module**: each module has a short MCQ quiz (gates the next module at 80%)
  **plus** a hands-on task with an "I completed this" self-check. A **level certificate**
  requires every module's quiz passed **and** task checked - so the credential reflects real
  practice, not just recall.

## 5a. Curriculum rationale (research-backed, 2026)

The track ladder reflects what people are actually trying to learn in 2026:

- **Prompt & context engineering** is repeatedly cited as the non-negotiable starting
  skill, now extended with context engineering, structured output, and evals.
- **AI agents & agentic workflows** are where product teams are moving (reflection,
  tool use, planning).
- **No-code automation** (Zapier, Make, n8n) is the most accessible way for
  non-technical people to get real wins; n8n 2.0 added 70+ AI nodes and agent memory.
- **APIs, tool calling, and RAG** are the core of the GenAI build stack.
- **MCP (Model Context Protocol)** has exploded - 97M+ monthly SDK downloads and
  cross-vendor support (OpenAI, Microsoft, Google, Amazon) - making it essential
  literacy for anyone building agentic AI.

Sources: in-demand AI skills 2026 ([HGS](https://www.joinhgs.com/us/en/insights/hgs-digital-blogs/ai-skills-in-demand-us), [Coursera](https://www.coursera.org/articles/high-income-skills)),
MCP adoption ([Digital Applied](https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol), [MCP roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)),
no-code automation ([n8n blog](https://blog.n8n.io/best-ai-workflow-automation-tools/), [aimultiple](https://research.aimultiple.com/no-code-ai-agent-builders/)),
course topics ([DataCamp](https://www.datacamp.com/blog/best-prompt-engineering-courses), [Coursera prompt eng](https://www.coursera.org/courses?query=prompt+engineering)).
- **Module experience**: AI-written lesson + a hands-on task + an auto-graded quiz.
- **Gating**: a module unlocks only when the previous one is passed (≥ 80%).
- **Certificate**: issued when all modules in a track are passed; rendered on screen,
  printable to PDF, with a **public verification URL**.
- **Anonymous sessions** via cookie; best quiz score retained per module.

## 6. Scope - Out (deferred)

- Payments / premium paywall (premium exists only as a future feature flag).
- Per-learner dynamically generated paths.
- AI-graded open-ended responses or project submissions.
- Bring-your-own-key, multi-provider switching (wrapper exists; not exposed).
- Verifiable/Open-Badge credentials, LinkedIn integration.
- Accounts, social features, leaderboards.

## 7. User flows

1. **Onboarding** - Home → "Find where to start" → placement quiz → recommended track.
2. **Learning** - Track overview (progress + locks) → module (lesson, task, quiz) →
   pass → next module unlocks.
3. **Certification** - Last module passed → certificate page → enter name → issue →
   download/print + shareable verify link.
4. **Verification** - Anyone opens `/verify/<token>` → sees the certificate + a
   "Verified by LearnAI" badge, or a not-found state.

## 8. Functional requirements

- Placement is pure + deterministic (`lib/core/placement.ts`).
- Quizzes are auto-graded server-side; correct answers are **never sent to the client**
  before submission (`/api/grade` re-reads the answer key from the DB).
- Pass threshold = 80% (`PASS_THRESHOLD` in `types/shared`).
- Certificates are idempotent per (session, track) and carry a unique verify token.
- A locked module cannot be opened directly (server-enforced).

## 9. Non-functional

- Runs end-to-end with **no external services** (local SQLite + offline content).
- No personal data collected beyond an optional name on the certificate.
- Files kept small and layered (backend in `lib/server` + `app/api`, UI in
  `components` + `app`, pure logic in `lib/core`).

## 9a. Design system

Premium, editorial, calm - closer to a high-end learning instrument than a startup
landing page. Defined as CSS tokens in `app/globals.css`.

- **Type**: Fraunces (display serif, characterful) + Hanken Grotesk (humanist body) +
  Geist Mono (verification IDs). No Inter/Roboto/system fonts.
- **Color**: warm neutral base (bone paper / warm ink) with **one** restrained
  evergreen accent. Gold appears only as the certificate foil. Deliberately not the
  blue-purple "AI" cliché. **Light / dark / system theme toggle** (header), persisted
  to localStorage with a no-flash inline script; system mode follows the OS.
- **Read your way**: each lesson has a **Listen** control (browser Web Speech TTS -
  free, no key) and a **Focus** distraction-free reading view with larger type and the
  current sentence highlighted as it's read aloud.
- **Surface**: hairline borders, fine grain texture, low-opacity layered shadows;
  restrained radii (no pill overload), generous spacing.
- **Motion**: one orchestrated staggered load reveal; gentle state transitions;
  honors `prefers-reduced-motion`.
- **States**: distinct locked / in-progress / passed styling; polished pass/fail
  banners; `not-found`, `error`, `loading`, blocked, and invalid-input states.
- **Responsive**: mobile-first, verified at 390px and 1280px.

## 10. Success criteria

- A new visitor can go from landing page to a verified certificate in one sitting.
- Failing a quiz blocks progress; passing unlocks the next module.
- Re-running the seed does not duplicate content; runtime makes zero AI calls.

## 11. Verification (current state - all passing)

- Unit tests: 15 passing - grading thresholds + placement routing across 5 tracks
  including both guardrails (`pnpm test`).
- End-to-end (curl + Playwright): home → placement → grade all modules → certify →
  verify, confirmed on both a 4-module and a 5-module track.
- Negative cases: certify-before-complete → 403; failed quiz → not passed; locked
  module direct access → blocked; invalid input → 400; unknown verify token → not found.
- Visual: screenshots captured for home (light/dark/mobile), placement, track,
  module, and certificate to confirm the premium design.

## 12. Open questions / next steps

- Replace deprecated `middleware.ts` with Next 16 `proxy.ts` convention.
- Decide hosting DB (Turso) + deploy to Vercel.
- Generate real AI content by seeding with an `OPENAI_API_KEY`.
- Add remaining tracks/modules depth and a "what's next" recommendation after a cert.
