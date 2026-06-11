import "server-only";
import { getDb } from "./client";
import { ensureSchema } from "./schema";
import type {
  Module,
  ModuleContent,
  ModuleWithContent,
  Track,
  TrackSlug,
  TrackWithModules,
} from "@/types/shared";

type Row = Record<string, unknown>;

function toTrack(r: Row): Track {
  return {
    id: String(r.id),
    slug: r.slug as TrackSlug,
    title: String(r.title),
    description: String(r.description),
    order: Number(r.order),
  };
}

function toModule(r: Row): Module {
  return {
    id: String(r.id),
    trackId: String(r.track_id),
    order: Number(r.order),
    slug: r.slug == null ? "" : String(r.slug),
    title: String(r.title),
    outcome: String(r.outcome),
  };
}

export async function listTracks(): Promise<Track[]> {
  await ensureSchema();
  const res = await getDb().execute(`SELECT * FROM tracks ORDER BY "order"`);
  return res.rows.map((r) => toTrack(r as Row));
}

export async function getTrackBySlug(slug: TrackSlug): Promise<Track | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM tracks WHERE slug = ?`,
    args: [slug],
  });
  return res.rows[0] ? toTrack(res.rows[0] as Row) : null;
}

export async function listModules(trackId: string): Promise<Module[]> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM modules WHERE track_id = ? ORDER BY "order"`,
    args: [trackId],
  });
  return res.rows.map((r) => toModule(r as Row));
}

export async function listTracksWithModules(): Promise<TrackWithModules[]> {
  const tracks = await listTracks();
  return Promise.all(
    tracks.map(async (t) => ({ ...t, modules: await listModules(t.id) })),
  );
}

export async function getModuleByOrder(
  trackId: string,
  order: number,
): Promise<Module | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM modules WHERE track_id = ? AND "order" = ?`,
    args: [trackId, order],
  });
  return res.rows[0] ? toModule(res.rows[0] as Row) : null;
}

export async function getModuleById(id: string): Promise<Module | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT * FROM modules WHERE id = ?`,
    args: [id],
  });
  return res.rows[0] ? toModule(res.rows[0] as Row) : null;
}

export async function getModuleContent(
  moduleId: string,
): Promise<ModuleContent | null> {
  await ensureSchema();
  const res = await getDb().execute({
    sql: `SELECT content_json FROM content_cache WHERE module_id = ?`,
    args: [moduleId],
  });
  const row = res.rows[0] as Row | undefined;
  if (!row) return null;
  return JSON.parse(String(row.content_json)) as ModuleContent;
}

export async function getModuleWithContent(
  moduleId: string,
): Promise<ModuleWithContent | null> {
  const mod = await getModuleById(moduleId);
  if (!mod) return null;
  const content = await getModuleContent(moduleId);
  if (!content) return null;
  return { ...mod, content };
}

// --- Seed-time writes ---

export async function upsertTrack(t: Track): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO tracks (id, slug, title, description, "order")
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            slug=excluded.slug, title=excluded.title,
            description=excluded.description, "order"=excluded."order"`,
    args: [t.id, t.slug, t.title, t.description, t.order],
  });
}

export async function upsertModule(m: Module): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO modules (id, track_id, "order", slug, title, outcome)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            track_id=excluded.track_id, "order"=excluded."order",
            slug=excluded.slug, title=excluded.title, outcome=excluded.outcome`,
    args: [m.id, m.trackId, m.order, m.slug, m.title, m.outcome],
  });
}

export async function saveModuleContent(
  moduleId: string,
  content: ModuleContent,
): Promise<void> {
  await ensureSchema();
  await getDb().execute({
    sql: `INSERT INTO content_cache (module_id, content_json, generated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(module_id) DO UPDATE SET
            content_json=excluded.content_json,
            generated_at=excluded.generated_at`,
    args: [moduleId, JSON.stringify(content), new Date().toISOString()],
  });
}
