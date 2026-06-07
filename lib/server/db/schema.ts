import "server-only";
import { getDb } from "./client";

// Idempotent schema creation. Called by the seed script and lazily by data
// access so the app self-initializes on first run.
const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS tracks (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS modules (
    id TEXT PRIMARY KEY,
    track_id TEXT NOT NULL REFERENCES tracks(id),
    "order" INTEGER NOT NULL,
    title TEXT NOT NULL,
    outcome TEXT NOT NULL,
    UNIQUE(track_id, "order")
  )`,
  `CREATE TABLE IF NOT EXISTS content_cache (
    module_id TEXT PRIMARY KEY REFERENCES modules(id),
    content_json TEXT NOT NULL,
    generated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    learner_name TEXT,
    tier TEXT NOT NULL DEFAULT 'free',
    start_level INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS progress (
    session_id TEXT NOT NULL REFERENCES sessions(id),
    module_id TEXT NOT NULL REFERENCES modules(id),
    status TEXT NOT NULL,
    score REAL,
    task_done INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (session_id, module_id)
  )`,
  `CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    track_id TEXT NOT NULL REFERENCES tracks(id),
    learner_name TEXT NOT NULL,
    issued_at TEXT NOT NULL,
    verify_token TEXT NOT NULL UNIQUE,
    UNIQUE(session_id, track_id)
  )`,
  `CREATE TABLE IF NOT EXISTS email_events (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    type TEXT NOT NULL,
    sent_at TEXT NOT NULL,
    opened_at TEXT,
    clicked_at TEXT
  )`,
];

// Additive columns introduced by the v2 redesign. Each is applied with a
// best-effort ALTER TABLE; SQLite errors with "duplicate column name" when
// the column already exists, which we silently ignore so the migration is
// idempotent across reseeds and existing prod data.
interface AddColumn {
  table: string;
  column: string;
  spec: string;
}

const ADDITIVE_COLUMNS: AddColumn[] = [
  // sessions — identity recovery + streak tracking
  { table: "sessions", column: "email", spec: "TEXT" },
  { table: "sessions", column: "email_marketing_ok", spec: "INTEGER NOT NULL DEFAULT 1" },
  { table: "sessions", column: "timezone", spec: "TEXT" },
  { table: "sessions", column: "streak_count", spec: "INTEGER NOT NULL DEFAULT 0" },
  { table: "sessions", column: "last_passed_at", spec: "INTEGER" },
  { table: "sessions", column: "last_seen_at", spec: "INTEGER" },
  // progress — streak source + time-on-task
  { table: "progress", column: "passed_at", spec: "INTEGER" },
  { table: "progress", column: "time_spent_seconds", spec: "INTEGER NOT NULL DEFAULT 0" },
];

let initialized = false;

export async function ensureSchema(): Promise<void> {
  if (initialized) return;
  const db = getDb();
  for (const sql of STATEMENTS) {
    await db.execute(sql);
  }
  for (const col of ADDITIVE_COLUMNS) {
    try {
      await db.execute(
        `ALTER TABLE ${col.table} ADD COLUMN ${col.column} ${col.spec}`,
      );
    } catch (e) {
      // Column already exists — expected on subsequent runs.
      const msg = String((e as Error)?.message ?? e);
      if (!/duplicate column|already exists/i.test(msg)) {
        throw e;
      }
    }
  }
  initialized = true;
}
