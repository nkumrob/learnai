/**
 * Purge zero-signal "junk" sessions (bot/bounce page-views) from the database.
 *
 * A junk session has NO engagement: no email, no name, no placement, default
 * start level, and is referenced by no progress / certificate / account /
 * magic-link / email-event row.
 *
 * SAFETY:
 *   - Dry run by default — prints the count and a sample, deletes nothing.
 *   - Set CONFIRM=1 to actually delete. Before deleting it writes a JSON
 *     backup of every row it will remove to ./backups/.
 *
 * Usage (run in YOUR terminal, against prod):
 *   pnpm purge:sessions              # dry run
 *   CONFIRM=1 pnpm purge:sessions    # back up + delete
 *
 * Reads DATABASE_URL / DATABASE_AUTH_TOKEN from the environment, falling back
 * to parsing .env.local.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";

function loadEnv(): { url: string; token?: string } {
  let url = process.env.DATABASE_URL;
  let token = process.env.DATABASE_AUTH_TOKEN;
  if (!url && fs.existsSync(".env.local")) {
    for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
      if (!line.includes("=") || line.startsWith("#")) continue;
      const i = line.indexOf("=");
      const k = line.slice(0, i).trim();
      const v = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      if (k === "DATABASE_URL") url = v;
      if (k === "DATABASE_AUTH_TOKEN") token = v;
    }
  }
  if (!url) throw new Error("DATABASE_URL not set");
  return { url, token };
}

const JUNK = `FROM sessions WHERE
  email IS NULL AND learner_name IS NULL AND placed_at IS NULL AND start_level = 1
  AND id NOT IN (SELECT session_id FROM progress)
  AND id NOT IN (SELECT session_id FROM certificates)
  AND id NOT IN (SELECT primary_session_id FROM accounts)
  AND id NOT IN (SELECT pending_session_id FROM magic_links)
  AND id NOT IN (SELECT session_id FROM email_events)`;

async function main() {
  const { url, token } = loadEnv();
  const c = createClient({ url, authToken: token });
  const confirm = process.env.CONFIRM === "1";

  const total = (await c.execute("SELECT COUNT(*) n FROM sessions")).rows[0].n;
  const junkRows = (await c.execute(`SELECT * ${JUNK}`)).rows;
  console.log(`DB: ${url.replace(/\/\/.*@/, "//")}`);
  console.log(`Total sessions: ${total}`);
  console.log(`Junk (zero-signal) sessions: ${junkRows.length}`);
  console.log(`Would keep: ${Number(total) - junkRows.length}`);

  if (!confirm) {
    console.log("\nDRY RUN — nothing deleted. Re-run with CONFIRM=1 to delete.");
    return;
  }
  if (junkRows.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  fs.mkdirSync("backups", { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = path.join("backups", `sessions-purge-${stamp}.json`);
  fs.writeFileSync(backup, JSON.stringify(junkRows, null, 2));
  console.log(`\nBacked up ${junkRows.length} rows to ${backup}`);

  const res = await c.execute(`DELETE ${JUNK}`);
  console.log(`Deleted: ${res.rowsAffected}`);
  console.log(
    `After: ${(await c.execute("SELECT COUNT(*) n FROM sessions")).rows[0].n} sessions`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
