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
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS progress (
    session_id TEXT NOT NULL REFERENCES sessions(id),
    module_id TEXT NOT NULL REFERENCES modules(id),
    status TEXT NOT NULL,
    score REAL,
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
];

let initialized = false;

export async function ensureSchema(): Promise<void> {
  if (initialized) return;
  const db = getDb();
  for (const sql of STATEMENTS) {
    await db.execute(sql);
  }
  initialized = true;
}
