import "server-only";
import { createClient, type Client } from "@libsql/client";

// Single libsql client for the app. Defaults to a local SQLite file so the
// project runs end-to-end with zero external setup. Point DATABASE_URL at a
// Turso/libsql URL (with DATABASE_AUTH_TOKEN) for hosted deployments.
let client: Client | null = null;

export function getDb(): Client {
  if (client) return client;
  const url = process.env.DATABASE_URL ?? "file:./learnai.db";
  client = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return client;
}
