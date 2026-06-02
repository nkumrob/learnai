import type { ModuleContent } from "@/types/shared";

// Hand-authored content for the AI for Everyday Productivity track.
export const productivity: Record<string, ModuleContent> = {
  "productivity-1": {
    lesson: `The fastest win with AI is drafting and editing. A blank page is slow; reacting to a draft is fast. Let AI produce the first version, then you steer.

## Drafting from scratch
Give it the four parts (role, task, context, format) and let it rough things out.
> **Example.** "You're my assistant. Draft a 5-line email asking a client to reschedule Thursday's call to Friday. Apologetic but brief."

You'll rarely ship the first draft as-is - but editing 80% beats writing 100%.

## Editing what you already have
AI is a tireless editor. Paste your text and ask for a specific change:
- "Tighten this to half the length, keep the key points."
- "Make this friendlier without losing the deadline."
- "Fix grammar only - don't change my wording or tone."

> **Tip.** Ask for **options**: "Give me 3 subject lines: one direct, one warm, one curious." Choosing is faster than writing.

## Keep your voice
Paste two of your own past messages and say "match this tone." The model mirrors your style instead of sounding generic. The goal isn't to sound like a robot - it's to get *your* message out faster.`,
    task: "Take an email or message you need to write. Ask AI for a first draft, then make exactly two edit requests (e.g. 'shorter' and 'warmer'). Compare the time to writing it yourself.",
    quiz: [
      {
        prompt: "Why is drafting with AI faster than writing from scratch?",
        options: [
          "Editing a draft is quicker than facing a blank page",
          "AI always writes the final version perfectly",
          "It removes the need to review",
          "It writes slower but better",
        ],
        answerIndex: 0,
        explanation: "Reacting to a draft is much faster than producing one from nothing.",
      },
      {
        prompt: "You want grammar fixed but your wording kept. What do you ask?",
        options: [
          "'Fix grammar only - don't change my wording or tone'",
          "'Rewrite this completely'",
          "'Make it sound like a robot'",
          "'Translate it to French'",
        ],
        answerIndex: 0,
        explanation: "Be explicit about what NOT to change, so the edit stays surgical.",
      },
      {
        prompt: "What's a good way to get a message that sounds like you?",
        options: [
          "Paste past messages and say 'match this tone'",
          "Ask for the most formal version possible",
          "Never give examples",
          "Use the longest words available",
        ],
        answerIndex: 0,
        explanation: "Examples of your own writing let the model mirror your voice.",
      },
      {
        prompt: "Why ask for several options (e.g. 3 subject lines)?",
        options: [
          "Choosing is faster than writing",
          "More text is always better",
          "It uses fewer words",
          "It avoids editing",
        ],
        answerIndex: 0,
        explanation: "Picking from options is quicker and often sparks a better final choice.",
      },
    ],
  },

  "productivity-2": {
    lesson: `Drowning in long documents, threads, and articles? Summarizing and research are where AI saves the most time - if you ask the right way.

## Summarize with a purpose
Don't just say "summarize." Tell it *why* you're reading.
> **Example.** "Summarize this 8-page report for a busy exec: 3 bullets on what changed, 1 on the risk, 1 on what we should do."

A purpose-driven summary is far more useful than a generic one.

## Pull out exactly what you need
- "List every action item and who owns it."
- "What decisions were made in this thread?"
- "Give me the 5 numbers a finance team would care about."

## Research safely
AI is a great *starting point* and a poor *final source*. Use it to map a topic, then verify.
1. "Explain [topic] like I'm new to it, with the key terms."
2. "What are the main viewpoints, and the strongest argument for each?"
3. Then confirm any fact you'll rely on in a real source.

> **Reminder.** If the tool can't browse, it doesn't know today's news. And any statistic it gives needs checking - treat research output as leads, not proof.`,
    task: "Find a long document or email thread. Ask AI to summarize it for a specific reader and purpose, then ask it to 'list every action item and owner.' Verify one fact it gives you.",
    quiz: [
      {
        prompt: "What makes a summary genuinely useful?",
        options: [
          "Telling the AI the reader and the purpose",
          "Asking for the longest possible summary",
          "Never giving any context",
          "Asking it to add new facts",
        ],
        answerIndex: 0,
        explanation: "A summary aimed at a specific reader and goal beats a generic one.",
      },
      {
        prompt: "How should you treat AI research output?",
        options: [
          "As leads to verify, not as proof",
          "As final, citable truth",
          "As today's breaking news",
          "As something never worth checking",
        ],
        answerIndex: 0,
        explanation: "Use it to orient yourself, then confirm anything important in a real source.",
      },
      {
        prompt: "Which prompt best extracts what you need from a meeting thread?",
        options: [
          "'List every action item and who owns it'",
          "'Tell me something interesting'",
          "'Write a poem about the meeting'",
          "'Make this longer'",
        ],
        answerIndex: 0,
        explanation: "Specific extraction prompts turn long text into the exact output you need.",
      },
      {
        prompt: "If a tool can't browse the web, what's true?",
        options: [
          "It doesn't know today's news or live facts",
          "It knows everything happening right now",
          "It can read your private files",
          "Its statistics never need checking",
        ],
        answerIndex: 0,
        explanation: "Without browsing, it's limited to training data and what you paste in.",
      },
    ],
  },

  "productivity-3": {
    lesson: `AI is excellent at turning chaos into structure. Messy notes, a brain-dump, a tangled goal - it can shape them into a plan you'll actually follow.

## From brain-dump to plan
Paste everything in your head and let it organize.
> **Example.** "Here are my scattered notes for launching a newsletter: [paste]. Turn this into a step-by-step plan with phases and a checklist for week one."

## Make work concrete
- **Break down a goal**: "Turn 'improve onboarding' into 6 concrete tasks."
- **Sequence it**: "Put these tasks in order and flag what blocks what."
- **Right-size it**: "Which of these can I drop if I only have 2 hours?"

## Build checklists and agendas
- "Make a pre-meeting checklist for a client kickoff."
- "Draft a 30-minute agenda with time boxes."

> **Tip.** Ask "what am I forgetting?" after it makes a plan. The model is good at surfacing the obvious step you skipped - a confirmation email, a backup, a deadline buffer.

The point isn't a perfect plan - it's getting out of your head and into clear next actions in two minutes.`,
    task: "Brain-dump everything about a project into the chat, then ask AI to turn it into a phased plan with a week-one checklist. Finish by asking 'what am I forgetting?'",
    quiz: [
      {
        prompt: "What is AI especially good at when you're overwhelmed?",
        options: [
          "Turning messy notes into clear structure",
          "Remembering your private deadlines on its own",
          "Doing the tasks for you physically",
          "Knowing your team's internal status",
        ],
        answerIndex: 0,
        explanation: "It excels at converting a brain-dump into organized steps and checklists.",
      },
      {
        prompt: "Which prompt best turns a vague goal into action?",
        options: [
          "'Turn improve onboarding into 6 concrete tasks'",
          "'Tell me about onboarding'",
          "'Is onboarding good?'",
          "'Write 2000 words on onboarding'",
        ],
        answerIndex: 0,
        explanation: "Asking for concrete, countable tasks produces something you can act on.",
      },
      {
        prompt: "Why ask 'what am I forgetting?' after a plan is made?",
        options: [
          "The model surfaces obvious steps you skipped",
          "It makes the plan longer for no reason",
          "It deletes the plan",
          "It hides the deadlines",
        ],
        answerIndex: 0,
        explanation: "It's a quick way to catch the missing email, buffer, or backup step.",
      },
      {
        prompt: "What's the real goal of planning with AI?",
        options: [
          "Get out of your head into clear next actions fast",
          "Produce the longest possible document",
          "Avoid ever making decisions",
          "Replace your judgment entirely",
        ],
        answerIndex: 0,
        explanation: "Speed from chaos to concrete next actions is the win.",
      },
    ],
  },

  "productivity-4": {
    lesson: `If you find yourself typing similar prompts over and over, you've found a tool worth saving. A reusable prompt is a small productivity machine.

## Spot the pattern
Any task you repeat weekly is a candidate: weekly updates, meeting notes, replying to a common request, formatting data.

## Turn it into a template
Write the prompt once with **slots** you fill each time.
\`\`\`
You are my comms assistant.
Write a weekly update from these notes: [PASTE NOTES]
Format: 3 sections - Done, In progress, Blocked.
Tone: concise, confident. Under 150 words.
\`\`\`
Next week you only change the notes - the structure stays.

## Save and reuse
- Keep a simple doc of your best prompts.
- Name them clearly: "Weekly update," "Polite decline," "Summarize call."
- Many tools let you save these as presets or custom instructions.

> **Tip.** Improve templates over time. When a prompt gives a slightly-off result, tweak the wording and save the better version. Your library compounds.

A handful of solid templates can cover most of your repetitive writing - that's the difference between using AI occasionally and building it into how you work.`,
    task: "Pick one task you do every week. Write a reusable prompt with a clear slot for the changing input, run it, refine the wording once, and save the final version somewhere you'll find it.",
    quiz: [
      {
        prompt: "What makes a task a good candidate for a reusable prompt?",
        options: [
          "You repeat it regularly with small changes",
          "You only ever do it once",
          "It can never be structured",
          "It changes completely every time",
        ],
        answerIndex: 0,
        explanation: "Repeated, similar tasks are exactly what templates are for.",
      },
      {
        prompt: "What is a 'slot' in a prompt template?",
        options: [
          "The part you swap out each time, like [PASTE NOTES]",
          "A random word the AI ignores",
          "The model's name",
          "A type of error",
        ],
        answerIndex: 0,
        explanation: "Slots hold the changing input while the structure stays fixed.",
      },
      {
        prompt: "How do you make your prompt library better over time?",
        options: [
          "Tweak and re-save prompts when results are slightly off",
          "Never change a prompt once written",
          "Delete prompts that work",
          "Keep them all unnamed",
        ],
        answerIndex: 0,
        explanation: "Refining and saving better versions makes the library compound in value.",
      },
      {
        prompt: "What's the payoff of building reusable prompts?",
        options: [
          "AI becomes part of how you work, not an occasional trick",
          "You can stop reviewing output",
          "You never have to think again",
          "It removes the need for context",
        ],
        answerIndex: 0,
        explanation: "Templates turn one-off help into a repeatable part of your workflow.",
      },
    ],
  },
};
