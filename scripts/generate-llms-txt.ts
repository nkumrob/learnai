#!/usr/bin/env -S node --conditions=react-server --import tsx
// Regenerates public/llms.txt and public/llms-full.txt from the authored
// curriculum. Wired into `npm run build` (prebuild) so each deploy ships
// fresh AI-discovery artifacts. The /llms-full.txt format is consumed by
// Anthropic and Perplexity; /llms.txt is the abbreviated index.
//
// Spec: https://llmstxt.org/

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "../lib/core/site";
import { TRACK_DEFS, moduleId } from "../lib/server/content/tracks-definition";
import { TRACK_LEVEL, TRACK_TIER } from "../lib/core/track-meta";
import { TRACK_DURATION_HUMAN } from "../lib/core/track-faqs";
import { getAuthoredContent } from "../lib/server/content/authored";

const root = join(import.meta.dirname, "..");
const publicDir = join(root, "public");

function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(
    `> ${SITE_NAME} (${SITE_URL}) is a free, guided learning journey that takes complete beginners to genuine, demonstrable AI capability. It has five progressive levels and 50 short, hands-on lessons. Every lesson ends with a real task and a quick quiz; finishing a level earns a verifiable certificate. No signup or login is required.`,
  );
  lines.push("");
  lines.push(`Tagline: ${SITE_TAGLINE}`);
  lines.push("");
  lines.push(
    `${SITE_NAME} is for non-technical professionals and curious beginners who want practical, work-relevant AI skills — not theory. A short placement quiz routes each learner to the right starting level. Content is hand-authored and example-driven. The learning model follows the Literacy → Fluency → Mastery framework.`,
  );
  lines.push("");
  lines.push("## Start here");
  lines.push(
    `- [${SITE_NAME} home — the journey map](${SITE_URL}/): Overview of the five-level journey and your progress.`,
  );
  lines.push(
    `- [Placement quiz](${SITE_URL}/placement): A 3-question quiz that recommends where to start.`,
  );
  lines.push(`- [About the curriculum team](${SITE_URL}/about): How lessons are written, reviewed, and updated.`);
  lines.push("");
  lines.push("## The five levels");
  for (const t of TRACK_DEFS) {
    const level = TRACK_LEVEL[t.slug];
    const tier = TRACK_TIER[t.slug];
    lines.push(
      `- [Level ${level} — ${t.title} (${tier})](${SITE_URL}/track/${t.slug}): ${t.description.replace(/^Level \d+ - [A-Za-z ]+\.\s*/, "")} ${TRACK_DURATION_HUMAN[t.slug]}.`,
    );
  }
  lines.push("");
  lines.push("## All lessons");
  for (const t of TRACK_DEFS) {
    const level = TRACK_LEVEL[t.slug];
    lines.push(`### Level ${level}: ${t.title}`);
    for (const m of t.modules) {
      lines.push(
        `- [${m.title}](${SITE_URL}/track/${t.slug}/${m.order}): You'll be able to ${m.outcome}.`,
      );
    }
    lines.push("");
  }
  lines.push("## Key facts");
  lines.push("- Cost: Free. No account or email required.");
  lines.push("- Format: 50 micro-lessons (about 2-4 minutes each) across 5 levels.");
  lines.push("- Assessment: An auto-graded quiz (pass at 80%) plus a hands-on task per lesson.");
  lines.push("- Credential: A shareable, publicly verifiable certificate per level.");
  lines.push(
    "- Topics covered include: prompt engineering, AI agents, no-code automation (Zapier, Make, n8n), APIs, RAG, and the Model Context Protocol (MCP).",
  );
  lines.push("");
  lines.push("## Optional");
  lines.push(`- [Full curriculum text](${SITE_URL}/llms-full.txt): Every lesson's full text in a single document.`);
  lines.push("");
  lines.push("## Contact");
  lines.push(`- Website: ${SITE_URL}`);
  lines.push("");
  return lines.join("\n");
}

function buildLlmsFullTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${SITE_NAME} — Full Curriculum`);
  lines.push("");
  lines.push(
    `> The complete text of every ${SITE_NAME} lesson, hands-on task, and quiz question. Generated from the same authored content that powers ${SITE_URL}. Free to read; pass each quiz at 80% and complete each task to earn a verifiable certificate.`,
  );
  lines.push("");
  lines.push(`Site: ${SITE_URL}`);
  lines.push(`Tagline: ${SITE_TAGLINE}`);
  lines.push(`Generated: ${new Date().toISOString().split("T")[0]}`);
  lines.push("");

  for (const t of TRACK_DEFS) {
    const level = TRACK_LEVEL[t.slug];
    const tier = TRACK_TIER[t.slug];
    lines.push(`---`);
    lines.push("");
    lines.push(`# Level ${level} — ${t.title} (${tier})`);
    lines.push("");
    lines.push(t.description);
    lines.push("");
    lines.push(`Track URL: ${SITE_URL}/track/${t.slug}`);
    lines.push("");

    for (const m of t.modules) {
      const id = moduleId(t.slug, m.order);
      const content = getAuthoredContent(id);
      lines.push(`## Lesson ${m.order}: ${m.title}`);
      lines.push("");
      lines.push(`Lesson URL: ${SITE_URL}/track/${t.slug}/${m.order}`);
      lines.push(`Outcome: You'll be able to ${m.outcome}.`);
      lines.push("");
      if (!content) {
        lines.push("> Content not yet authored.");
        lines.push("");
        continue;
      }
      lines.push("### Lesson");
      lines.push("");
      lines.push(content.lesson);
      lines.push("");
      lines.push("### Hands-on task");
      lines.push("");
      lines.push(content.task);
      lines.push("");
      lines.push("### Quiz");
      lines.push("");
      content.quiz.forEach((q, qi) => {
        lines.push(`${qi + 1}. ${q.prompt}`);
        q.options.forEach((opt, oi) => {
          const letter = String.fromCharCode(65 + oi);
          lines.push(`   ${letter}. ${opt}`);
        });
        lines.push("");
      });
    }
  }

  return lines.join("\n");
}

const llmsTxt = buildLlmsTxt();
const llmsFullTxt = buildLlmsFullTxt();

writeFileSync(join(publicDir, "llms.txt"), llmsTxt, "utf8");
writeFileSync(join(publicDir, "llms-full.txt"), llmsFullTxt, "utf8");

console.log(
  `✓ Wrote public/llms.txt (${llmsTxt.length} chars) and public/llms-full.txt (${llmsFullTxt.length} chars)`,
);
