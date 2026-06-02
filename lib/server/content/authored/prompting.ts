import type { ModuleContent } from "@/types/shared";

// Hand-authored content for the Prompt & Context Engineering track.
export const prompting: Record<string, ModuleContent> = {
  "prompting-1": {
    lesson: `Reliable results come from structure, not magic words. A strong prompt makes three things explicit: **who the model is, what you want, and the exact shape of the output.**

## The anatomy
\`\`\`
Role:    You are a senior support agent.
Task:    Reply to this angry customer email.
Context: They were double-charged $40. We refund within 3 days.
Format:  Under 80 words. Apologize, state the fix, give a timeline.
\`\`\`
Each line removes a guess. The model no longer has to invent a persona, infer the goal, or pick a random length.

## Why "format" is the secret weapon
Most disappointing answers are really *format* failures - too long, wrong structure, missing a part. Spell it out:
- "Exactly 3 bullets."
- "A table with columns Name, Risk, Action."
- "First the answer, then a one-line why."

> **Before / after.** "Help me prioritize these tasks" → vague. "Rank these 6 tasks by impact-vs-effort. Output a table: Task, Impact (H/M/L), Effort (H/M/L), Do-now? (yes/no)" → instantly usable.

## The mindset
You're not chatting, you're **specifying**. The clearer the spec, the less you have to fix afterward.`,
    task: "Take a request you'd normally type casually and rewrite it as a 4-line spec (Role, Task, Context, Format). Run both versions and compare how much editing each result needs.",
    quiz: [
      {
        prompt: "Which three things should a strong prompt make explicit?",
        options: [
          "Who the model is, what you want, and the output's shape",
          "The model's name, the date, and the weather",
          "Your password, your email, your files",
          "Nothing - keep it vague for creativity",
        ],
        answerIndex: 0,
        explanation: "Role, task, and format remove the guesswork that causes weak answers.",
      },
      {
        prompt: "Most disappointing AI answers are really failures of what?",
        options: ["Format", "Spelling", "Color", "Font"],
        answerIndex: 0,
        explanation: "Wrong length or structure is usually a format problem - so specify the format.",
      },
      {
        prompt: "Which is the more reliable instruction?",
        options: [
          "'Output a table: Task, Impact, Effort, Do-now?'",
          "'Help me prioritize somehow'",
          "'Do your best'",
          "'Write something'",
        ],
        answerIndex: 0,
        explanation: "A precise output spec produces a directly usable result.",
      },
      {
        prompt: "The right mindset for prompting is:",
        options: [
          "Specifying, not casually chatting",
          "Being as vague as possible",
          "Never stating the format",
          "Hiding the context",
        ],
        answerIndex: 0,
        explanation: "Treat it like writing a clear spec - clarity in, quality out.",
      },
    ],
  },

  "prompting-2": {
    lesson: `Many tools let you set a **system prompt** - a standing instruction that shapes every reply in a conversation. It's how you give the AI a consistent persona and rules, instead of repeating yourself each message.

## System vs user messages
- The **system** message sets *who it is and how it behaves*: "You are a concise legal-aware editor. Never give legal advice; flag risky phrases."
- The **user** message is the actual task: "Review this clause."

The system instruction persists, so every turn follows the same rules.

## What to put in a persona
1. **Role & expertise** - "a friendly Python tutor for beginners."
2. **Rules & boundaries** - "explain in plain words, no jargon, always show a tiny example."
3. **Tone** - "encouraging, never condescending."

> **Example system prompt.**
> "You are a brand copy assistant for a calm, premium product. Write in short, confident sentences. Avoid hype words like 'revolutionary' or 'unlock.' If a request is off-brand, say so."

## Why it matters
A good persona makes outputs consistent and on-brand without you re-explaining context every time. In custom GPTs, assistants, and apps, the system prompt *is* the product's behavior.`,
    task: "Write a system prompt that defines a persona for a recurring need (a tutor, an editor, a brand voice). Include role, two rules, and a tone. Use it for a few messages and notice the consistency.",
    quiz: [
      {
        prompt: "What does a system prompt do?",
        options: [
          "Sets standing behavior and persona for every reply",
          "Sends one message then disappears",
          "Connects the model to the internet",
          "Stores your password",
        ],
        answerIndex: 0,
        explanation: "It's a persistent instruction that shapes the whole conversation.",
      },
      {
        prompt: "Which belongs in the system message, not the user message?",
        options: [
          "'You are a concise editor; never give legal advice'",
          "'Review this specific clause for me'",
          "'Here is the document text'",
          "'What did you change?'",
        ],
        answerIndex: 0,
        explanation: "Persona and rules go in the system message; the specific task is the user message.",
      },
      {
        prompt: "A good persona usually defines:",
        options: [
          "Role, rules/boundaries, and tone",
          "Only the model's favorite color",
          "The current date",
          "Nothing specific",
        ],
        answerIndex: 0,
        explanation: "Role, boundaries, and tone together produce consistent, on-brand output.",
      },
      {
        prompt: "Why do system prompts matter for AI apps?",
        options: [
          "The system prompt largely defines the product's behavior",
          "They make responses slower",
          "They replace the need for any user input",
          "They store training data",
        ],
        answerIndex: 0,
        explanation: "In assistants and apps, the system prompt is where the behavior lives.",
      },
    ],
  },

  "prompting-3": {
    lesson: `Two techniques reliably boost accuracy: **few-shot examples** and **chain-of-thought**. Both work by showing or asking the model to reason more carefully.

## Few-shot: teach by example
Give a couple of input→output pairs, then the real input. The model copies the pattern.
\`\`\`
Classify the sentiment as POSITIVE, NEGATIVE, or NEUTRAL.

Review: "Shipped late but great product." -> POSITIVE
Review: "Stopped working in a week." -> NEGATIVE
Review: "It's fine, nothing special." -> NEUTRAL
Review: "Support ignored me for days." ->
\`\`\`
Examples pin down exactly the labels and format you want - far more reliable than describing them.

## Chain-of-thought: ask for steps
For anything with reasoning or math, ask it to **work step by step** before answering.
> "A meeting starts 2:45pm, runs 90 min, then a 20-min break, then 45 min. Think step by step, then give the end time."

Walking through steps catches mistakes that a snap answer would make.

## When to use which
- **Few-shot** when you need a consistent format or label.
- **Chain-of-thought** when the task needs reasoning, not just recall.

> **Tip.** Combine them: a couple of worked examples *that show the reasoning*, then the real question.`,
    task: "Pick a small classification or extraction task. Write a 3-example few-shot prompt for it, run it, then try a reasoning question with 'think step by step' and compare against a no-steps answer.",
    quiz: [
      {
        prompt: "What is 'few-shot' prompting?",
        options: [
          "Showing a few input→output examples before the real input",
          "Asking the model to be brief",
          "Using the model only a few times",
          "Turning off the system prompt",
        ],
        answerIndex: 0,
        explanation: "Examples teach the exact pattern and format you want.",
      },
      {
        prompt: "When does chain-of-thought help most?",
        options: [
          "Tasks that need reasoning or multi-step math",
          "Simple greetings",
          "Copying text exactly",
          "Choosing a font",
        ],
        answerIndex: 0,
        explanation: "Asking for step-by-step work reduces reasoning mistakes.",
      },
      {
        prompt: "Why are examples often better than describing a format?",
        options: [
          "They pin down the labels and shape precisely",
          "They use fewer tokens always",
          "They hide the task",
          "They prevent the model from answering",
        ],
        answerIndex: 0,
        explanation: "A concrete example is clearer than an abstract description.",
      },
      {
        prompt: "How can you combine both techniques?",
        options: [
          "Show worked examples that include the reasoning, then ask",
          "Never give examples and never reason",
          "Only greet the model",
          "Ask for the shortest answer",
        ],
        answerIndex: 0,
        explanation: "Examples that demonstrate reasoning give you both pattern and rigor.",
      },
    ],
  },

  "prompting-4": {
    lesson: `When AI output feeds another tool - a spreadsheet, a script, a form - you need **structured output**, not prose. The trick is to demand a strict format and show the exact shape.

## Ask for JSON (or CSV) explicitly
\`\`\`
Extract the contact info. Respond with ONLY valid JSON, no commentary:
{ "name": string, "email": string, "company": string | null }

Text: "Hi, I'm Dana from Acme - reach me at dana@acme.co."
\`\`\`
Two rules make this reliable: **show the schema**, and say **"only JSON, no extra text."**

## Make it robust
- **Constrain values**: "priority must be one of: low, medium, high."
- **Allow null**: tell it what to do when a field is missing, so it doesn't invent one.
- **One object per line (JSONL)** for lists you'll process row by row.

> **Why it matters.** A program can't parse "Sure! Here's the data:" - that friendly preamble breaks the next step. Strict output is what lets AI plug into real workflows and automations.

## Verify
Even with a schema, validate before you trust it: check required fields exist and values are in range. In code, parsing into a schema (and rejecting bad output) is standard - you'll see this again in the building track.`,
    task: "Take a few lines of messy text (an email signature, a list) and ask AI to return ONLY JSON matching a schema you define. Then add a constraint like an allowed value list and re-run.",
    quiz: [
      {
        prompt: "When do you need structured output instead of prose?",
        options: [
          "When the output feeds another tool or program",
          "When you're just chatting",
          "When you want a long essay",
          "Never",
        ],
        answerIndex: 0,
        explanation: "Programs need predictable structure (JSON/CSV), not conversational text.",
      },
      {
        prompt: "Which two rules make JSON output reliable?",
        options: [
          "Show the schema and say 'only JSON, no extra text'",
          "Ask politely and hope",
          "Use the longest prompt possible",
          "Never define fields",
        ],
        answerIndex: 0,
        explanation: "A concrete schema plus 'no commentary' prevents preambles that break parsing.",
      },
      {
        prompt: "Why is a friendly 'Sure! Here's the data:' preamble a problem?",
        options: [
          "A program can't parse it - it breaks the next step",
          "It's too polite",
          "It uses the wrong font",
          "It's always inaccurate",
        ],
        answerIndex: 0,
        explanation: "Extra text around the data breaks automated parsing.",
      },
      {
        prompt: "Even with a schema, what should you still do?",
        options: [
          "Validate fields and value ranges before trusting it",
          "Assume it's always correct",
          "Delete the schema",
          "Make the output longer",
        ],
        answerIndex: 0,
        explanation: "Validation catches missing fields or out-of-range values.",
      },
    ],
  },

  "prompting-5": {
    lesson: `Prompt wording matters, but in real systems **context** matters more. Context engineering is the craft of giving the model the right information, in the right amount, at the right time - and then **testing** that it works.

## Give the right context
- **Relevant, not everything.** Dumping 50 pages buries the key facts and costs more. Include what the task actually needs.
- **Fresh and specific.** The model only knows what you provide about *your* world - product details, policies, the customer's history.
- **Ordered.** Put the most important instructions and facts where they're easy to follow (often near the top, restated at the end for long inputs).

> **Example.** A support bot answers badly not because the prompt is weak, but because it wasn't given the customer's plan and recent tickets. Add that context and the same prompt suddenly works.

## Test like an engineer (evals)
Don't judge a prompt by one lucky run. Build a small set of test cases:
1. Collect 5-10 real inputs, including tricky ones.
2. Write down what a good answer looks like for each.
3. Run your prompt across all of them and score pass/fail.
4. Change one thing, re-run, compare.

This is an **eval** - the difference between a demo that works once and a system you can trust. As you move toward building, evals and good context become more important than clever wording.`,
    task: "Take a prompt you use and gather 5 varied real inputs. Define what a good answer looks like for each, run the prompt across all 5, and note where it fails. Improve the context (not just wording) and re-run.",
    quiz: [
      {
        prompt: "What is context engineering?",
        options: [
          "Giving the model the right information at the right time",
          "Choosing the model's font",
          "Making prompts as long as possible",
          "Avoiding all context",
        ],
        answerIndex: 0,
        explanation: "It's about supplying the relevant facts the task actually needs.",
      },
      {
        prompt: "Why not just dump 50 pages of context in?",
        options: [
          "It buries the key facts and costs more",
          "It's always more accurate",
          "Models prefer maximum text",
          "It improves speed",
        ],
        answerIndex: 0,
        explanation: "Too much irrelevant context hides what matters and wastes budget.",
      },
      {
        prompt: "What is an 'eval'?",
        options: [
          "A set of test cases you score a prompt against",
          "A single lucky test run",
          "A type of model",
          "A system prompt",
        ],
        answerIndex: 0,
        explanation: "Evals test a prompt across many cases so you can trust it, not just hope.",
      },
      {
        prompt: "A support bot answers poorly. The likeliest real fix is:",
        options: [
          "Give it the missing context (plan, recent tickets)",
          "Add more exclamation marks",
          "Make the prompt shorter randomly",
          "Switch fonts",
        ],
        answerIndex: 0,
        explanation: "Often the wording is fine - the model just lacked the needed context.",
      },
    ],
  },
};
