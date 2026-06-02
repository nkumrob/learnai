import type { Module, ModuleContent, Track } from "@/types/shared";

// Deterministic offline content for any module without hand-authored content
// and without an OpenAI key. Authored content (lib/server/content/authored) is
// preferred; this is a clean, well-formatted safety net.
export function fallbackModuleContent(
  track: Track,
  module: Module,
): ModuleContent {
  const outcome = lower(module.outcome);
  const lesson = `## ${module.title}

In this module of _${track.title}_, you'll learn to **${outcome}**.

AI tools give their best results when you give them clear context and a specific goal. Describe who you are, what you're trying to produce, and the format you want back. That one habit dramatically improves the quality of what you get.

> **Example.** Instead of a vague "help me with this", try: "You're my assistant. Here are my notes: [paste]. Give me 3 bullet points and a one-line next step." Specific in, useful out.

## A pattern you can reuse
1. State your role and goal in one sentence.
2. Give the AI the raw material - notes, data, or an example.
3. Ask for a specific output format and length.
4. Review the result and refine with one small follow-up.

Keep iterating: small, specific follow-ups beat one giant prompt. Once you can ${outcome}, you can repeat the pattern across many everyday tasks.`;

  const task = `Apply the 4-step pattern above to a real task related to "${module.title}". Write your role and goal, paste in some context, request a specific output, then refine once.`;

  const quiz: ModuleContent["quiz"] = [
    {
      prompt: "What is the main outcome of this module?",
      options: [
        capitalize(outcome),
        "Memorizing AI model architectures",
        "Writing production machine-learning code",
        "Avoiding AI tools entirely",
      ],
      answerIndex: 0,
      explanation: `This module is about being able to ${outcome}.`,
    },
    {
      prompt: "What makes AI tools give their best results?",
      options: [
        "Clear context and a specific goal",
        "The longest possible prompt",
        "Never reviewing the output",
        "Avoiding examples",
      ],
      answerIndex: 0,
      explanation: "Clear context plus a specific goal is the habit that most improves results.",
    },
    {
      prompt: "What is the recommended first step in the reusable pattern?",
      options: [
        "State your role and goal in one sentence",
        "Paste data with no instructions",
        "Ask for a random idea",
        "Request a 5,000-word essay",
      ],
      answerIndex: 0,
      explanation: "Step one is stating your role and goal clearly.",
    },
    {
      prompt: "What beats writing one giant prompt?",
      options: [
        "Small, specific follow-up instructions",
        "Refusing to iterate",
        "Copying someone else's prompt exactly",
        "Turning off the tool",
      ],
      answerIndex: 0,
      explanation: "Iterating with small, specific follow-ups produces better results.",
    },
  ];

  return { lesson, task, quiz };
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
