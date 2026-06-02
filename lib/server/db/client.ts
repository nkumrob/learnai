import "server-only";
import { createClient, type Client } from "@libsql/client";

// Single libsql client for the app. Defaults to a local SQLite file so the
// project runs end-to-end with zero external setup. Point DATABASE_URL at a
// Turso/libsql URL (with DATABASE_AUTH_TOKEN) for hosted deployments.
let client: Client | null = null;

export function getDb(): Client {
  if (client) return client;
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "DATABASE_URL is not set. Point it at a hosted libsql/Turso database " +
          "(e.g. libsql://<db>.turso.io) and set DATABASE_AUTH_TOKEN. The local " +
          "file fallback only works in development."
      );
    }
  }
  client = createClient({
    url: url ?? "file:./learnai.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return client;
}
