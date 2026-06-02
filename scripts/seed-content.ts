/**
 * One-time content seed. Inserts the track definitions + their modules, then
 * stores the lesson + quiz for each module and caches it. Content priority:
 *   1. hand-authored content (lib/server/content/authored) - preferred
 *   2. OpenAI generation (if OPENAI_API_KEY is set)
 *   3. deterministic offline fallback
 *
 * Run: pnpm seed
 * Safe to re-run: definitions upsert; content is only written when missing
 * unless FORCE=1 is set.
 */
import { TRACK_DEFS, moduleId, trackId } from "@/lib/server/content/tracks-definition";
import {
  getModuleContent,
  saveModuleContent,
  upsertModule,
  upsertTrack,
} from "@/lib/server/db/tracks";
import { generateModuleContent } from "@/lib/server/ai/generate";
import { getAuthoredContent } from "@/lib/server/content/authored";
import { shuffleQuiz } from "@/lib/core/quiz-shuffle";
import { ensureSchema } from "@/lib/server/db/schema";
import type { Module, Track } from "@/types/shared";

async function main() {
  const force = process.env.FORCE === "1";
  const hasKey = Boolean(process.env.OPENAI_API_KEY);
  console.log(
    `Seeding content (${hasKey ? "OpenAI" : "offline fallback"} mode)...`,
  );
  await ensureSchema();

  for (const def of TRACK_DEFS) {
    const track: Track = {
      id: trackId(def.slug),
      slug: def.slug,
      title: def.title,
      description: def.description,
      order: def.order,
    };
    await upsertTrack(track);

    for (const m of def.modules) {
      const module: Module = {
        id: moduleId(def.slug, m.order),
        trackId: track.id,
        order: m.order,
        title: m.title,
        outcome: m.outcome,
      };
      await upsertModule(module);

      const existing = await getModuleContent(module.id);
      if (existing && !force) {
        console.log(`  = ${module.id} (cached)`);
        continue;
      }
      const authored = getAuthoredContent(module.id);
      const base = authored ?? (await generateModuleContent(track, module));
      // Distribute correct answers across A/B/C/D so positions can't be gamed.
      const content = shuffleQuiz(base, module.id);
      const source = authored ? "authored" : hasKey ? "openai" : "fallback";
      await saveModuleContent(module.id, content);
      console.log(`  + ${module.id} (${source}, ${content.quiz.length} q)`);
    }
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
