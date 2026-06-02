import type { ModuleContent } from "@/types/shared";

// Hand-authored, example-driven content for the AI Fundamentals track.
export const fundamentals: Record<string, ModuleContent> = {
  "fundamentals-1": {
    lesson: `Today's AI chat tools - ChatGPT, Claude, Gemini - are **language models**. They work by predicting the most likely next words from patterns learned across huge amounts of text. That single fact explains both their superpowers and their blind spots.

## What they're great at
- **Drafting** - emails, posts, outlines, a first version of almost anything.
- **Transforming text** - summarize, rewrite, simplify, translate, change the tone.
- **Explaining** - break a confusing topic down to the level you ask for.
- **Brainstorming** - lots of options, fast.

> **Good ask.** Paste a long, rambling email and say: "Summarize this in 3 bullets and suggest a one-line reply." You get a useful result in seconds, because it plays to the model's strengths.

## What they're weak at (today)
- **Live facts** - today's prices, news, the current time. It doesn't browse unless the tool adds that.
- **Exact math and counting** - it approximates; verify numbers yourself.
- **Sources** - it can invent realistic-looking citations. This is called a *hallucination*.
- **Your private data** - it only knows what you paste in, not your inbox or files.

> **Bad ask.** "How much did our Q3 revenue grow?" The model has no access to your numbers, so it may confidently make one up. Paste the figures and ask it to do the calculation instead.

## The mental model
Treat AI like a fast, eager junior assistant: brilliant at producing and reshaping text, but **you** supply the facts and **you** check the result. Stay in that lane and it rarely lets you down.`,
    task: "Take one real task from today - an email to summarize, or a concept to explain - and ask an AI tool to do it. Then deliberately ask it something it can't know (a live fact about your work) and watch how it responds.",
    quiz: [
      {
        prompt: "Why are AI chat tools so good at drafting and rewriting text?",
        options: [
          "They predict likely text from patterns they learned",
          "They are wired into a live fact database",
          "They count every word with precision",
          "They can read your private files",
        ],
        answerIndex: 0,
        explanation: "They're language models - they generate text from learned patterns, which is exactly what drafting and rewriting need.",
      },
      {
        prompt: "Which task is AI LEAST reliable at today?",
        options: [
          "Rewriting an email in a friendlier tone",
          "Quoting an exact source with a real, working link",
          "Brainstorming names for a project",
          "Summarizing a long document",
        ],
        answerIndex: 1,
        explanation: "Models can fabricate citations that look real - always verify sources and links yourself.",
      },
      {
        prompt: "When a model invents a realistic-looking but fake source, that's called a:",
        options: ["Hallucination", "Summary", "Prompt", "Token"],
        answerIndex: 0,
        explanation: "A hallucination is confident output that isn't grounded in fact.",
      },
      {
        prompt: "What's the safest mental model for using AI at work?",
        options: [
          "A fast junior assistant whose output you check",
          "An all-knowing oracle you can trust blindly",
          "A calculator for exact math",
          "A live news feed",
        ],
        answerIndex: 0,
        explanation: "You supply the facts and verify the output; the AI does the fast text work.",
      },
    ],
  },

  "fundamentals-2": {
    lesson: `A vague prompt gives a vague answer. The fix is structure. Almost every strong prompt has four parts: **Role, Task, Context, and Format.**

## Weak vs strong
> **Weak.** "Write about onboarding."
> **Strong.** "You're an HR lead. Write a warm welcome email for a new designer starting Monday. Mention their buddy (Sam), the 10am kickoff, and to bring ID. Keep it under 120 words, friendly tone."

The second one tells the model *who to be*, *what to do*, *the facts*, and *the shape* of the answer. That's the whole game.

## A template you can reuse
\`\`\`
Role: You are a [role / expertise].
Task: [exactly what you want produced].
Context: [facts, audience, constraints].
Format: [length, structure, tone].
\`\`\`

## Three habits that compound
1. **Be specific.** "3 bullets" beats "some thoughts."
2. **Show an example.** Paste one good sample and say "match this style."
3. **Iterate.** Don't rewrite the whole prompt - just add one instruction: "shorter," "less formal," "add a call to action."

> **Tip.** If an answer misses, don't start over. Reply with the single change you want. Small, specific follow-ups beat one giant prompt.`,
    task: "Write a prompt using all four parts (Role, Task, Context, Format) for something you actually need - a message, a summary, or a plan. Run it, then improve the result with exactly one follow-up instruction.",
    quiz: [
      {
        prompt: "What are the four parts of a well-structured prompt?",
        options: [
          "Role, Task, Context, Format",
          "Hello, Question, Thanks, Bye",
          "Who, What, When, Where",
          "Title, Body, Footer, Link",
        ],
        answerIndex: 0,
        explanation: "Role, Task, Context, and Format together remove the guesswork for the model.",
      },
      {
        prompt: "Why is 'Write about onboarding' a weak prompt?",
        options: [
          "It gives no role, facts, or format - so the output is generic",
          "It is too long",
          "It uses the word onboarding",
          "It asks for bullet points",
        ],
        answerIndex: 0,
        explanation: "Without context and a target format the model has to guess, and you get something generic.",
      },
      {
        prompt: "Your draft is close but too formal. What's the best next move?",
        options: [
          "Reply with one instruction: 'make it less formal'",
          "Start a brand-new prompt from scratch",
          "Give up and write it yourself",
          "Ask the same prompt again unchanged",
        ],
        answerIndex: 0,
        explanation: "Iterating with a small, specific follow-up is faster and more reliable than restarting.",
      },
      {
        prompt: "What's a reliable way to control the style of the output?",
        options: [
          "Paste a good example and say 'match this style'",
          "Ask for 'something nice'",
          "Use as few words as possible",
          "Avoid giving any examples",
        ],
        answerIndex: 0,
        explanation: "A concrete example is the clearest way to communicate the style you want.",
      },
    ],
  },

  "fundamentals-3": {
    lesson: `AI sounds confident even when it's wrong. That tone is the danger - it's easy to trust a fluent answer. Judging output is a skill, and it's mostly about a few quick checks.

## Red flags to slow down on
- **Oddly specific numbers** - "sales rose 23.7%" with no source.
- **Perfect quotes or citations** - especially papers, laws, or links you can't find.
- **Claims about recent events** - the model may not know, or may guess.
- **Anything you'll act on** - money, legal, medical, or public-facing content.

## How to verify, fast
1. **Separate facts from phrasing.** The writing can be great while a fact is wrong.
2. **Check the load-bearing claim** - the one number or name the whole thing rests on.
3. **Ask it to show its work**: "Which parts are you unsure about?" Models will often flag their own weak spots.
4. **Confirm anything external** in a real source - search, a doc, a colleague.

> **Example.** It writes: "Per the 2019 Smith study, 80% of teams adopted X." Before you cite that, find the study. If you can't, treat the stat as unverified - it may be invented.

## The rule
Use AI to **produce and structure**, then you **verify what matters**. The higher the stakes, the harder you check.`,
    task: "Ask an AI for a few facts or stats on a topic you know well. Spot at least one claim that's vague, wrong, or unverifiable - then ask the model 'which of these are you unsure about?' and compare.",
    quiz: [
      {
        prompt: "What makes a confidently-written AI answer risky?",
        options: [
          "Fluent, certain tone can hide a wrong fact",
          "It is always too short",
          "It refuses to answer",
          "It only ever uses bullet points",
        ],
        answerIndex: 0,
        explanation: "Confidence isn't accuracy - a smooth answer can still contain an invented fact.",
      },
      {
        prompt: "Which is a red flag worth double-checking?",
        options: [
          "A precise statistic with no source",
          "A friendly greeting",
          "A request to clarify",
          "A short summary",
        ],
        answerIndex: 0,
        explanation: "Oddly specific numbers without sources are a classic hallucination signal.",
      },
      {
        prompt: "What's a good first step to verify an AI claim?",
        options: [
          "Check the single load-bearing fact the answer rests on",
          "Re-read it until it sounds right",
          "Ask it to make the answer longer",
          "Trust it if it's well written",
        ],
        answerIndex: 0,
        explanation: "Focus your check on the key fact everything else depends on.",
      },
      {
        prompt: "When should you check AI output the hardest?",
        options: [
          "When the stakes are high - money, legal, or public content",
          "Only when it's short",
          "Never, if it sounds confident",
          "Only on weekends",
        ],
        answerIndex: 0,
        explanation: "Scale your scrutiny with the consequences of being wrong.",
      },
    ],
  },

  "fundamentals-4": {
    lesson: `AI is powerful, but it's a tool you're responsible for. Two risks matter most for everyday work: **leaking data** and **spreading errors**. Both are easy to avoid with a few habits.

## Protect your data
- **Don't paste secrets** - passwords, customer PII, unreleased financials, anything confidential - into consumer tools that may train on your input.
- **Know your company's policy.** Many orgs offer an approved, private AI tool for exactly this reason. Use it.
- **Anonymize when you can.** Replace real names and numbers with placeholders if you just need help with structure.

> **Safer move.** Instead of pasting a real contract, paste a redacted version: "Company A pays Company B $X per month." You still get useful help without exposing the deal.

## Don't spread errors
- **Review before you send.** You own anything you publish, even if AI wrote it.
- **Be transparent** where it matters - some teams expect you to note AI-assisted work.
- **Watch for bias.** Models reflect their training data; sanity-check anything about people or groups.

## A 10-second checklist
1. Would I be okay if this input were public? If not, redact.
2. Did I verify the facts I'm relying on?
3. Did I read the final output as if I wrote it?

Do those three and you'll use AI responsibly without slowing down.`,
    task: "Look at something you'd want AI's help with that contains sensitive details. Rewrite the input with placeholders for the private parts, then ask for help on the safe version.",
    quiz: [
      {
        prompt: "What should you avoid pasting into a consumer AI tool?",
        options: [
          "Confidential data like customer PII or unreleased financials",
          "A question about grammar",
          "A public blog post draft",
          "A made-up example",
        ],
        answerIndex: 0,
        explanation: "Sensitive or confidential data shouldn't go into tools that may train on your input.",
      },
      {
        prompt: "You need help with a real contract. What's the safer approach?",
        options: [
          "Paste a redacted version with placeholders",
          "Paste the full contract as-is",
          "Email it to the AI company",
          "Post it publicly first",
        ],
        answerIndex: 0,
        explanation: "Redacting keeps the useful structure while protecting the sensitive details.",
      },
      {
        prompt: "Who is responsible for AI-written content you publish?",
        options: ["You are", "The AI vendor", "No one", "The reader"],
        answerIndex: 0,
        explanation: "You own what you send or publish - always review it first.",
      },
      {
        prompt: "Which is part of the 10-second responsibility checklist?",
        options: [
          "Would I be okay if this input were public?",
          "Is the answer at least 500 words?",
          "Did I use the most expensive model?",
          "Did I skip reading the output?",
        ],
        answerIndex: 0,
        explanation: "If you wouldn't want the input public, redact it before sending.",
      },
    ],
  },
};
