# Tuttorr - Learn AI. Prove it.

A free, public, AI-driven upskilling app that answers one question:
**"How do I learn to use AI fast - and prove I can do real work with it - starting
from wherever I am today?"**

Take a 30-second placement quiz → get routed to one of three tracks → work through
short, practical lessons → pass auto-graded quizzes → earn a shareable certificate.

> Product requirements: [`docs/prd.md`](docs/prd.md) · Architecture notes: [`docs/architecture.md`](docs/architecture.md)

## How it works (the core loop)

```
Place  →  Track  →  Learn  →  Prove  →  Certify
placement  one of   AI-written  auto-graded  certificate +
quiz       3 tracks lesson+task quiz (80%)   verify URL
```

1. **Place** - `/placement` routes you to a track based on experience + goals.
2. **Learn** - each module shows a concise lesson and a hands-on task.
3. **Prove** - an auto-graded quiz gates progress (need ≥ 80% to advance).
4. **Certify** - pass every module → claim a certificate with a public verify link.

The 5 tracks are **fixed** - a ladder from literacy to building:
AI Fundamentals → Everyday Productivity → Prompt & Context Engineering →
AI Automation & Agents → Building with AI (APIs & MCP). The lesson/quiz **prose** is
AI-authored once per module and cached, so at runtime the app serves static content
and makes **zero AI calls**. (Curriculum rationale + sources: [`docs/prd.md`](docs/prd.md) §5a.)

## Quick start

```bash
pnpm install
pnpm seed     # writes tracks/modules + lesson/quiz content into a local SQLite DB
pnpm dev      # http://localhost:3000
```

No API key is required - without `OPENAI_API_KEY`, the seed uses built-in fallback
content so the whole app works offline. To get AI-authored lessons, set a key before
seeding:

```bash
export OPENAI_API_KEY=sk-...      # optional
export OPENAI_MODEL=gpt-4o-mini   # optional (default)
pnpm seed                          # add FORCE=1 to regenerate existing modules
```

## Scripts

| Command | What it does |
|---|---|
| `pnpm seed` | Seed tracks/modules and generate+cache module content (idempotent) |
| `pnpm dev` | Run the app locally |
| `pnpm test` | Run unit tests (grading + placement logic) |
| `pnpm build` | Production build |

## Tech

- **Next.js (App Router) + TypeScript** - API routes double as a headless backend
- **OpenAI** (`gpt-4o-mini`-class) behind a swappable `lib/server/ai` wrapper
- **SQLite via libsql** - local file by default; point `DATABASE_URL` at Turso for hosting
- **Tailwind v4** - design system in `app/globals.css`
- No login: an anonymous cookie session (set in `middleware.ts`) persists progress

## Project structure

```
app/api/            # headless backend: place, grade, certify
app/(pages)/        # home, placement, track/[slug], track/[slug]/[order], certificate, verify
scripts/seed-content.ts  # one-time content seeding
lib/server/ai/      # OpenAI client + prompts + offline fallback
lib/server/db/      # SQLite schema + data access (tracks, sessions, progress, certificates)
lib/server/         # session + track-view helpers
lib/core/           # pure, tested logic (grading, placement)
components/         # React UI (Markdown, ModuleQuiz, Certificate*)
types/shared/      # shared domain types
```

## Environment variables

| Var | Required | Default | Purpose |
|---|---|---|---|
| `OPENAI_API_KEY` | no | – | Enables AI-authored content at seed time |
| `OPENAI_MODEL` | no | `gpt-4o-mini` | Model used for seeding |
| `DATABASE_URL` | no | `file:./tuttorr.db` | libsql/Turso connection |
| `DATABASE_AUTH_TOKEN` | no | – | Turso auth token (hosted only) |

## Status

MVP. Deferred to later: payments/premium gating, per-learner dynamic paths,
AI-graded open responses, true verifiable credentials. See [`docs/prd.md`](docs/prd.md).
