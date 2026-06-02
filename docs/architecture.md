# LearnAI - Architecture

A single Next.js app where the **API routes are the headless backend**. Strict
separation: backend in `lib/server` + `app/api`, UI in `components` + pages, and
pure framework-free logic in `lib/core` (unit-tested).

## Layers

```
                 ┌─────────────────────────────────────────┐
  Browser  ◀────▶│  app/(pages)  +  components (React UI)   │
                 └───────────────┬─────────────────────────┘
                                 │ fetch JSON
                 ┌───────────────▼─────────────────────────┐
  Headless API   │  app/api/{place,grade,certify}/route.ts  │
                 └───────────────┬─────────────────────────┘
                                 │
        ┌────────────────────────┼───────────────────────────┐
        ▼                        ▼                            ▼
  lib/core (pure)        lib/server (node only)        lib/server/ai
  grading, placement     session, track-view,          OpenAI wrapper +
  (unit tested)          db/* (libsql access)          offline fallback
                                 │
                                 ▼
                         SQLite (libsql)  ──  tracks, modules,
                         content_cache, sessions, progress, certificates
```

## Key decisions

- **Deterministic content.** Tracks/modules are hand-defined
  (`lib/server/content/tracks-definition.ts`). The lesson + quiz prose is generated
  **once per module** by `scripts/seed-content.ts` and stored in `content_cache`.
  Runtime serves cached content - **no AI calls per request**.
- **Offline-first AI.** `lib/server/ai/generate.ts` calls OpenAI when
  `OPENAI_API_KEY` is set, validating output with zod (`ai/schema.ts`). Otherwise it
  returns deterministic `ai/fallback.ts` content so the app runs with zero setup.
- **Anonymous sessions.** `middleware.ts` assigns a `learnai_sid` cookie; the DB row
  is created lazily by `lib/server/session.ts`. No login, no email.
- **Answer-key safety.** Quiz answer indexes never reach the client before grading;
  `/api/grade` re-reads them from the DB (`lib/core/grading.ts`).
- **Gating.** `lib/server/track-view.ts` computes per-module lock state (a module
  unlocks when the previous one is `passed`); pages enforce it server-side.

## Data model (SQLite)

| Table | Purpose |
|---|---|
| `tracks` | The 3 fixed tracks |
| `modules` | Ordered modules per track (title + outcome) |
| `content_cache` | `module_id → {lesson, task, quiz}` JSON (seeded) |
| `sessions` | Anonymous learners (id, optional name, tier) |
| `progress` | Per (session, module) status + best score |
| `certificates` | Issued certs with unique verify token |

## Swapping the AI provider

All generation goes through `lib/server/ai/generate.ts`. To change models or
providers, edit that one file (and `ai/schema.ts` if the shape changes). Nothing in
the feature code or UI depends on the provider.

## Hosting notes

- Default DB is a local file (`file:./learnai.db`). For Vercel, set `DATABASE_URL`
  to a Turso libsql URL + `DATABASE_AUTH_TOKEN`, then run the seed against it.
- Next 16 deprecates the `middleware` filename in favor of `proxy`; functionally
  unchanged for now (tracked in the PRD's next steps).
