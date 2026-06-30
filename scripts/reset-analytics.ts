/**
 * Reset the admin dashboard to track REAL data.
 *
 * Removes every synthetic row created by the demo seeds (`seed:analytics` and
 * `seed:demo`). All seeded rows carry a `demo-` id prefix, so this only ever
 * deletes demo data — genuine learner sessions, progress and certificates are
 * never touched. Safe to run against any DB (production has no demo rows).
 *
 * SAFETY:
 *   - Dry run by default — prints what it WOULD delete, deletes nothing.
 *   - Set CONFIRM=1 to actually delete.
 *
 * Usage:
 *   pnpm reset:analytics              # dry run (counts only)
 *   CONFIRM=1 pnpm reset:analytics    # delete the demo rows
 *
 * Reads DATABASE_URL / DATABASE_AUTH_TOKEN from the environment, falling back
 * to parsing .env.development.local then .env.local.
 */
import fs from "node:fs";
import { createClient } from "@libsql/client";

function loadEnv(): { url: string; token?: string } {
  let url = process.env.DATABASE_URL;
  let token = process.env.DATABASE_AUTH_TOKEN;
  for (const file of [".env.development.local", ".env.local"]) {
    if (url) break;
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line.includes("=") || line.trim().startsWith("#")) continue;
      const i = line.indexOf("=");
      const k = line.slice(0, i).trim();
      const v = line
        .slice(i + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (k === "DATABASE_URL") url = v;
      if (k === "DATABASE_AUTH_TOKEN") token = v;
    }
  }
  if (!url) throw new Error("DATABASE_URL not set");
  return { url, token };
}

// Order matters: child rows (certificates, progress) before parent (sessions).
const TARGETS: Array<{ label: string; sql: string }> = [
  { label: "certificates", sql: `FROM certificates WHERE id LIKE 'demo-%'` },
  { label: "progress", sql: `FROM progress WHERE session_id LIKE 'demo-%'` },
  { label: "sessions", sql: `FROM sessions WHERE id LIKE 'demo-%'` },
];

async function main() {
  const { url, token } = loadEnv();
  const c = createClient({ url, authToken: token });
  const confirm = process.env.CONFIRM === "1";

  console.log(`DB: ${url.replace(/\/\/.*@/, "//")}`);

  let total = 0;
  for (const t of TARGETS) {
    const n = Number(
      (await c.execute(`SELECT COUNT(*) AS n ${t.sql}`)).rows[0].n,
    );
    total += n;
    console.log(`  ${t.label.padEnd(13)} demo rows: ${n}`);
  }

  if (total === 0) {
    console.log("\nNothing to reset — no demo rows found. Dashboard is clean.");
    process.exit(0);
  }

  if (!confirm) {
    console.log(
      `\nDry run. ${total} demo rows would be deleted. Re-run with CONFIRM=1 to delete.`,
    );
    process.exit(0);
  }

  for (const t of TARGETS) {
    await c.execute(`DELETE ${t.sql}`);
  }
  console.log(`\nDeleted ${total} demo rows. Dashboard now tracks real data.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
