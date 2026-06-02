import type { ModuleContent } from "@/types/shared";

// Level 2 - Prompt Engineering (Literacy to Fluency). Topics 11-20.
export const prompting: Record<string, ModuleContent> = {
  "prompting-1": {
    lesson: `**TL;DR - A strong prompt has four parts: context, instruction, input, and output format. Add them and unreliable results become repeatable ones.**

## Why it matters
The exact same model can hand you junk or gold depending only on how you ask. "Rewrite this" gives a random paragraph; a structured prompt gives the email you'd actually send. Because every other AI skill - writing, research, automation - runs on prompts, this is the highest-leverage thing you can learn. In studies, structured prompts have cut task time dramatically and raised output quality across the board.

## The four parts
- **Context** - who the AI is and the situation. _"You are a support agent for a calm, premium brand."_
- **Instruction** - the one clear task. _"Reply to this unhappy customer."_
- **Input** - the raw material to work from.
- **Format** - the exact shape of the answer. _"Under 80 words. Apologize, give the fix, give a timeline."_

## Worked example
> **Weak:** \`write about onboarding\`
> You get a generic 400-word essay on why onboarding matters. Useless.

**Strong** - paste this and you'll see the difference:
\`\`\`
You are an HR lead at a 30-person startup (context).
Write a welcome email for a new designer starting Monday (instruction).
Details: their buddy is Sam, kickoff is 10am, bring a laptop and ID (input).
Format: warm but brief, under 120 words, end with one clear next step (format).
\`\`\`
You get a near-final email that needs a 5-second tweak, not a rewrite.

## Steal this template
Reuse this for almost anything - just fill the brackets:
\`\`\`
You are [role / expertise], helping with [situation].
Task: [the one thing you want].
Input: [paste your material].
Format: [length] | [structure] | [tone].
\`\`\`

## Common mistakes (and the fix)
- **Burying the instruction** in a wall of context. **Fix:** put the task on its own line, near the top.
- **No format.** "Make it good" isn't a format. **Fix:** name the length, structure, and tone.
- **One giant prompt.** **Fix:** get a draft, then refine with one small nudge - "shorter", "warmer", "add a call to action".

## Good to know - this works everywhere
The four-part structure is **model-agnostic**: it works the same in **ChatGPT**, **Claude**, **Gemini**, and **Copilot**. A few real-world notes:
- **Claude** and **ChatGPT** both reward a clearly stated role and structure; Claude is especially strong with long documents and careful instructions.
- For **long inputs**, paste the material _last_ and restate the instruction at the end - models pay most attention to the start and end.
- You learn prompting once, then carry it across every tool. That's why it's Level 2 of the journey.`,
    task: "Starter: take a message you actually need to write, and run it twice - once as a bare request, once with the four-part template. Compare how much you edit. Stretch: save your filled-in template as a reusable prompt for a task you do every week.",
    quiz: [
      {
        prompt: "Your prompt keeps giving vague, generic answers. Which fix helps most?",
        options: [
          "Add context, a specific instruction, and an output format",
          "Make the prompt longer with more adjectives",
          "Send the same prompt again and hope",
          "Switch to a different AI tool",
        ],
        answerIndex: 0,
        explanation: "Generic output almost always means missing context/instruction/format - structure fixes it.",
      },
      {
        prompt: "Which line is the 'format' part of a prompt?",
        options: [
          "Under 120 words, warm tone, end with a next step",
          "You are an HR lead at a startup",
          "Write a welcome email",
          "Their buddy is Sam, kickoff is 10am",
        ],
        answerIndex: 0,
        explanation: "Format specifies length, structure, and tone - the shape of the answer.",
      },
      {
        prompt: "You're pasting a long document for the AI to use. Best practice?",
        options: [
          "Put the material last and restate the instruction at the end",
          "Put the instruction only at the very top and hope",
          "Remove all formatting instructions",
          "Split it across ten separate prompts",
        ],
        answerIndex: 0,
        explanation: "Models attend most to the start and end, so restating the task at the end helps with long inputs.",
      },
      {
        prompt: "Does the four-part structure work across ChatGPT, Claude, and Gemini?",
        options: [
          "Yes - prompting structure is model-agnostic",
          "No, each needs a completely different approach",
          "Only ChatGPT understands structure",
          "Only on paid plans",
        ],
        answerIndex: 0,
        explanation: "The same structured approach works across the major assistants.",
      },
    ],
  },
  "prompting-2": {
    lesson: `Adding "You are a [role]" anchors the AI's tone, depth, and perspective - and dramatically changes the output.

> **Same task, different persona.** "Explain this budget" vs. "You are a CFO explaining this budget to a non-financial team." The second is clearer, better-pitched, and more useful.

## Why it works
A persona pulls the model toward the patterns of that role: a teacher simplifies, a lawyer flags risk, an editor tightens. You're choosing which "expert" shows up.

## How to write one
Name the **role**, the **audience**, and the **goal**: "You are a friendly Python tutor for total beginners. Explain with one tiny example, no jargon."`,
    task: "Write a persona prompt for three different workplace scenarios. For each, explain why that persona choice improves the output.",
    quiz: [
      { prompt: "What does persona prompting do?", options: ["Anchors the AI's tone, depth, and perspective", "Makes responses slower", "Hides the question", "Removes context"], answerIndex: 0, explanation: "A role pulls output toward that expertise." },
      { prompt: "A strong persona names the...", options: ["Role, audience, and goal", "Date and time", "Model's price", "Font and color"], answerIndex: 0, explanation: "Role + audience + goal shape the response well." },
      { prompt: "Why does 'You are a CFO explaining to a non-financial team' help?", options: ["It sets expertise and the right audience level", "It's longer", "It uses the word CFO", "It avoids the topic"], answerIndex: 0, explanation: "It pitches the explanation correctly." },
      { prompt: "A persona effectively lets you...", options: ["Choose which expert shows up", "Slow the model down", "Remove instructions", "Skip the task"], answerIndex: 0, explanation: "You select the relevant expertise pattern." },
    ],
  },
  "prompting-3": {
    lesson: `Want consistent, on-brand output? Show examples. **Few-shot prompting** gives the model a pattern to copy before the real input.

\`\`\`
Write product descriptions in this style:
"Cloud Mug - keeps coffee warm, feels like a hug."
"Trail Bottle - rugged, leakproof, ready for anything."
Now write one for: Desk Lamp ->
\`\`\`

> **Zero-shot vs few-shot.** Asked cold, you get five different tones. With two examples, all five match. Examples beat describing the style in words.

Use it whenever format or voice must stay consistent - labels, classifications, templated copy.`,
    task: "Produce a consistent-format deliverable (e.g., five items in the same tone) using a 2-3 example prompt, where a no-example attempt was inconsistent.",
    quiz: [
      { prompt: "What is few-shot prompting?", options: ["Giving examples before the real input", "Using the model briefly", "A short prompt", "Turning off context"], answerIndex: 0, explanation: "Examples teach the pattern to copy." },
      { prompt: "When is few-shot most useful?", options: ["When format or voice must stay consistent", "When you want randomness", "For a one-word reply", "Never"], answerIndex: 0, explanation: "Examples lock in a consistent style." },
      { prompt: "Examples are better than describing style because...", options: ["They show the exact pattern precisely", "They use fewer words always", "They hide the task", "They confuse the model"], answerIndex: 0, explanation: "A concrete sample communicates style clearly." },
      { prompt: "Few-shot helps most with which task?", options: ["Five product blurbs in one voice", "A casual hello", "Reading the news", "Doing your taxes"], answerIndex: 0, explanation: "Repeated, consistent format is the sweet spot." },
    ],
  },
  "prompting-4": {
    lesson: `For anything with reasoning or multiple steps, tell the model to **think step by step** before answering. This single phrase sharply improves accuracy.

> **Before / after.** "A meeting starts 2:45pm, runs 90 min, then a 20-min break, then 45 min - when does it end?" A snap answer often errs. Add "think step by step" and it works through each interval correctly.

## Why it works
Without it, the model jumps to a plausible-sounding answer. Reasoning out loud forces it to show its work, catching mistakes a guess would make.

Use it for math, logic, planning, and anything multi-step. Skip it for simple lookups where it just adds length.`,
    task: "Take a multi-step problem. Run it once normally and once with 'think step by step', and capture the before/after difference in accuracy or quality.",
    quiz: [
      { prompt: "What does chain-of-thought prompting do?", options: ["Makes the model reason step by step before answering", "Makes answers shorter", "Removes context", "Picks a font"], answerIndex: 0, explanation: "Step-by-step reasoning improves accuracy." },
      { prompt: "When does it help most?", options: ["Math, logic, planning, multi-step tasks", "Saying hello", "Copying text", "Choosing a color"], answerIndex: 0, explanation: "Reasoning helps where steps are involved." },
      { prompt: "Why does reasoning out loud help?", options: ["It catches mistakes a snap answer would make", "It looks nice", "It uses more tokens", "It hides the answer"], answerIndex: 0, explanation: "Showing work surfaces errors before the final answer." },
      { prompt: "When can you skip chain-of-thought?", options: ["Simple lookups where it just adds length", "Complex math", "Multi-step planning", "Logic puzzles"], answerIndex: 0, explanation: "Simple tasks don't need step-by-step reasoning." },
    ],
  },
  "prompting-5": {
    lesson: `The best AI users treat a chat as a **conversation**, not a vending machine. They ask, see the result, then refine - rather than expecting perfection in one shot.

## The loop
1. Get a rough draft.
2. React with one specific change: "shorter", "more formal", "add a call to action".
3. Repeat until it's right.

> **Example.** Draft an email -> "make it warmer" -> "cut the second paragraph" -> "add a clear ask". Three small turns beat one giant prompt, and you stay in control of the result.

Don't restart from scratch when an answer misses. Build on what's there.`,
    task: "Produce a polished output by iterating through at least three refinements. Note what you changed in each turn and why.",
    quiz: [
      { prompt: "How do expert users treat AI chats?", options: ["As an iterative conversation", "As a one-shot vending machine", "As a search engine only", "As a calculator"], answerIndex: 0, explanation: "Refining across turns produces the best results." },
      { prompt: "Best move when a draft misses?", options: ["Reply with one specific change", "Start over from scratch", "Give up", "Repeat the same prompt"], answerIndex: 0, explanation: "Small, specific refinements beat restarting." },
      { prompt: "Why iterate instead of one giant prompt?", options: ["You stay in control and reach a better result", "It uses more words", "It's slower for no reason", "It hides the goal"], answerIndex: 0, explanation: "Step-by-step refinement is more reliable." },
      { prompt: "A good refinement instruction is...", options: ["'Make it warmer' or 'add a clear ask'", "'Do better'", "'Something nice'", "'Fix it'"], answerIndex: 0, explanation: "Specific changes steer the next turn." },
    ],
  },
  "prompting-6": {
    lesson: `A great prompt you use once is wasted. Save your best ones as **reusable templates** with slots you fill each time.

\`\`\`
You are my comms assistant.
Write a weekly update from these notes: [PASTE NOTES]
Format: 3 sections - Done, In progress, Blocked. Under 150 words.
\`\`\`

Next week, only the notes change. The structure - which took effort to get right - stays.

## Build your library
- Keep a doc (or your tool's saved prompts) of 5+ templates for frequent tasks.
- Name them clearly: "Weekly update", "Polite decline", "Summarize call".
- Improve them over time; save the better version.

> **Payoff.** Templates turn occasional AI help into a repeatable part of how you work.`,
    task: "Build and save a personal prompt library of at least five templates for your most frequent tasks, each with a clear slot for the changing input.",
    quiz: [
      { prompt: "What is a prompt template?", options: ["A reusable prompt with slots you fill each time", "A one-time question", "A random word", "An error"], answerIndex: 0, explanation: "Templates keep the structure and swap the input." },
      { prompt: "What's a 'slot'?", options: ["The changing input, like [PASTE NOTES]", "The model's name", "A bug", "The temperature"], answerIndex: 0, explanation: "Slots hold the variable part." },
      { prompt: "How do you improve a library over time?", options: ["Refine and re-save prompts that underperform", "Never change them", "Delete the good ones", "Leave them unnamed"], answerIndex: 0, explanation: "Iterating makes the library compound." },
      { prompt: "The payoff of a prompt library is...", options: ["AI becomes a repeatable part of your workflow", "You stop reviewing output", "You never think again", "It removes context"], answerIndex: 0, explanation: "Reuse multiplies the value of good prompts." },
    ],
  },
  "prompting-7": {
    lesson: `Most beginner output is too long, in the wrong format, or the wrong voice. Explicit control fixes all three fast.

## Direct three things
- **Format**: bullets vs prose vs table vs JSON. "Answer as a 3-row table."
- **Tone**: formal/casual, confident/cautious. "Friendly but concise."
- **Length**: "Under 100 words." "One sentence."

> **One source, three shapes.** From the same notes: an executive email, a bullet summary, and a Slack message - just by changing the format and tone instructions.

Being explicit is the fastest path from "meh" to professional output.`,
    task: "Produce the same content in three formats (executive email, bullet summary, Slack message) from one underlying prompt, changing only format and tone.",
    quiz: [
      { prompt: "Which three things should you control explicitly?", options: ["Format, tone, and length", "Color, font, size", "Model, price, date", "Nothing"], answerIndex: 0, explanation: "These fix most beginner output problems." },
      { prompt: "How do you get a table instead of prose?", options: ["Ask for it: 'answer as a 3-row table'", "Hope for it", "Use a longer prompt", "Avoid instructions"], answerIndex: 0, explanation: "State the format you want." },
      { prompt: "Why control length?", options: ["Beginner output is often too long", "Longer is always better", "It changes the facts", "It's required by law"], answerIndex: 0, explanation: "Explicit length keeps it tight and usable." },
      { prompt: "Explicit format control is...", options: ["The fastest path to professional output", "A waste of time", "Only for coders", "Bad for tone"], answerIndex: 0, explanation: "Specifying format/tone/length raises quality quickly." },
    ],
  },
  "prompting-8": {
    lesson: `When output is wrong, vague, too long, or hallucinated, beginners blame the AI. Experts diagnose **which prompt element failed** and fix it.

## A quick diagnosis
- **Too generic?** Missing context or persona.
- **Wrong shape/length?** Missing format instruction.
- **Off-topic or invented facts?** Input unclear, or you asked for something it can't know.
- **Inconsistent?** Add examples (few-shot) or lower temperature.

> **Example.** "It's too formal" isn't the AI's fault - your prompt never specified tone. Add "casual, friendly" and it's fixed.

Treat a bad output as feedback on your prompt, not the model.`,
    task: "Take three poorly-performing prompts and their bad outputs. Identify the structural flaw in each and write a revised prompt that fixes it.",
    quiz: [
      { prompt: "Output is too generic. Likely cause?", options: ["Missing context or persona", "Too much context", "Wrong model price", "Too many examples"], answerIndex: 0, explanation: "Generic output usually lacks context/role." },
      { prompt: "Output is the wrong shape or length. Fix?", options: ["Add a format instruction", "Change the wifi", "Use a bigger screen", "Wait a day"], answerIndex: 0, explanation: "Specify the format explicitly." },
      { prompt: "How do experts treat a bad output?", options: ["As feedback on the prompt, not the model", "As proof AI is useless", "As random", "As unfixable"], answerIndex: 0, explanation: "Diagnose and revise the prompt." },
      { prompt: "Inconsistent results - best fix?", options: ["Add examples or lower temperature", "Ask vaguely", "Remove all instructions", "Give up"], answerIndex: 0, explanation: "Few-shot and lower temperature add consistency." },
    ],
  },
  "prompting-9": {
    lesson: `Three power-user controls separate competent from expert AI use.

- **System prompt** - a standing instruction that shapes *every* reply: "You are a concise support agent; never give legal advice." Set it once; it persists.
- **Temperature** - the creativity dial. **Low** (0-0.3) for consistent, factual work; **high** for brainstorming and variety.
- **Context window** - the model's working memory. For big inputs, put key instructions near the top *and* restate them at the end so they aren't lost.

> **Example.** For a support bot you'd set a firm system prompt and a low temperature - you want consistency, not surprise.

These don't change *what* you ask, but *how reliably* you get it.`,
    task: "Configure a system prompt for a specific use case (e.g., a support tone) and choose a temperature. Explain why that temperature fits the task.",
    quiz: [
      { prompt: "What does a system prompt do?", options: ["Sets standing behavior for every reply", "Sends one message then vanishes", "Connects to the internet", "Stores a password"], answerIndex: 0, explanation: "It persists across the conversation." },
      { prompt: "When should temperature be low?", options: ["When you want consistent, factual output", "When brainstorming", "When you want surprises", "Never"], answerIndex: 0, explanation: "Low temperature = more deterministic." },
      { prompt: "For very long inputs, you should...", options: ["Put key instructions at the top and restate them at the end", "Delete the instructions", "Use no format", "Make it longer"], answerIndex: 0, explanation: "Restating guards against losing key points in a long context." },
      { prompt: "For a support bot, the best settings are...", options: ["Firm system prompt, low temperature", "No system prompt, high temperature", "Random everything", "Maximum creativity"], answerIndex: 0, explanation: "Consistency matters for support." },
    ],
  },
  "prompting-10": {
    lesson: `What works for drafting emails doesn't work for analyzing data. Each domain has its own prompt patterns - learning to adapt is a fluency milestone.

## Patterns by domain
- **Writing**: persona + tone + format ("warm, 100 words").
- **Research**: ask for sources, opposing views, and a confidence note.
- **Data**: describe the columns, ask for specific calculations and one chart.
- **Coding**: state the language, inputs, and expected output; ask for comments.
- **Management**: ask for options with trade-offs, not a single answer.

> **Example.** A data task starts very differently: "Here are columns Date, Region, Sales. Find the top region by month and flag anomalies."

The skill is recognizing the domain and reaching for its pattern.`,
    task: "Write an effective prompt for a task in a domain outside your usual role (e.g., data if you're a writer) and get a usable result on the first try.",
    quiz: [
      { prompt: "Why adapt prompts by domain?", options: ["Each domain needs different structure and asks", "All tasks are identical", "Longer is always better", "Domains don't matter"], answerIndex: 0, explanation: "Writing, data, and coding need different patterns." },
      { prompt: "A good data prompt should...", options: ["Describe the columns and ask for specific calculations", "Say 'analyze this' vaguely", "Avoid mentioning the data", "Request a poem"], answerIndex: 0, explanation: "Specifying columns and calculations gets usable analysis." },
      { prompt: "For a management decision, ask for...", options: ["Options with trade-offs, not one answer", "A single answer with no reasoning", "A random pick", "Nothing"], answerIndex: 0, explanation: "Trade-off options support real judgment." },
      { prompt: "The core domain skill is...", options: ["Recognizing the domain and using its pattern", "Using one prompt for everything", "Ignoring format", "Avoiding examples"], answerIndex: 0, explanation: "Match the prompt pattern to the domain." },
    ],
  },
};
