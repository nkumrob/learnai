import "server-only";
import OpenAI from "openai";
import type { Module, ModuleContent, Track } from "@/types/shared";
import { moduleContentSchema, validateAnswerIndexes } from "./schema";
import { fallbackModuleContent } from "./fallback";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

function getClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `You are an expert instructional designer building a short,
practical AI-upskilling course. Write content that helps a learner DO real work,
not just understand theory. Be concrete, friendly, and concise.

Return ONLY valid JSON matching this TypeScript type:
{
  "lesson": string,   // markdown, ~250-450 words, practical, with examples
  "task": string,     // one concrete hands-on task the learner should try now
  "quiz": Array<{
    "prompt": string,
    "options": string[],      // 3-4 options
    "answerIndex": number,    // 0-based index of the correct option
    "explanation": string     // why the answer is correct
  }>                  // exactly 4 questions, each with one correct answer
}`;

function userPrompt(track: Track, module: Module): string {
  return `Track: ${track.title} - ${track.description}
Module ${module.order}: ${module.title}
Learning outcome: ${module.outcome}

Write the lesson, hands-on task, and a 4-question multiple-choice quiz that
checks the learner actually achieved the outcome.`;
}

/**
 * Generate (or fall back to) the lesson + quiz for a module.
 * Uses OpenAI when OPENAI_API_KEY is set; otherwise returns deterministic
 * fallback content so the app runs fully offline.
 */
export async function generateModuleContent(
  track: Track,
  module: Module,
): Promise<ModuleContent> {
  const client = getClient();
  if (!client) return fallbackModuleContent(track, module);

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt(track, module) },
      ],
    });
    const raw = completion.choices[0]?.message?.content;
    if (!raw) return fallbackModuleContent(track, module);

    const parsed = moduleContentSchema.safeParse(JSON.parse(raw));
    if (!parsed.success || !validateAnswerIndexes(parsed.data)) {
      return fallbackModuleContent(track, module);
    }
    return parsed.data;
  } catch {
    // Network/auth/parse failures degrade gracefully to fallback content.
    return fallbackModuleContent(track, module);
  }
}
