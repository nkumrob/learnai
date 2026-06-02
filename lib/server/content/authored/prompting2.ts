import type { ModuleContent } from "@/types/shared";

// Level 2 - Prompt Engineering (Literacy to Fluency). Topics 16-20.
export const prompting2: Record<string, ModuleContent> = {
  "prompting-6": {
    lesson: `**TL;DR - A great prompt you use once is wasted. Save your best prompts as templates with fill-in slots and you build a personal toolkit that compounds.**

## Why it matters
If you write similar prompts every week - status updates, replies, summaries - you're re-solving a solved problem each time. A saved template turns a good prompt into a one-click tool, and a small library can cover most of your repetitive writing.

## Worked example
\`\`\`
[Weekly update template]
You are my comms assistant.
Turn these notes into a weekly update: [PASTE NOTES]
Format: 3 sections - Done, In progress, Blocked. Under 150 words, confident tone.
\`\`\`
Next week you change only the notes. The structure - which took effort to get right - stays.

## Steal this - build your library
\`\`\`
Keep 5-10 named templates for your most frequent tasks:
"Weekly update" · "Polite decline" · "Summarize a call"
"Reply from bullets" · "Rewrite for execs"
Each has clear [SLOTS] for the changing input. Improve and re-save over time.
\`\`\`

## Common mistakes (and the fix)
- **Never saving.** A brilliant one-off prompt is lost by tomorrow. **Fix:** paste it into a notes doc the moment it works.
- **Unnamed prompts.** **Fix:** name them by job so you can find them.
- **Set and forget.** **Fix:** when a result is slightly off, tweak the template and save the better version.

## Good to know
Every tool has a home for this: **ChatGPT** Custom GPTs and saved prompts, **Claude** Projects (with project instructions + files), **Gemini** Gems. Even a plain notes doc works. Teams often share a prompt library so everyone benefits from the best version.`,
    task: "Starter: build and save 5 named templates for your most frequent tasks, each with clear [SLOTS]. Stretch: turn your most-used one into a Custom GPT / Claude Project / Gem and use it for real this week.",
    quiz: [
      { prompt: "What makes a task worth a reusable template?", options: ["You repeat it regularly with small changes", "You'll only ever do it once", "It can never be structured", "It changes completely each time"], answerIndex: 0, explanation: "Repeated, similar tasks are exactly what templates are for." },
      { prompt: "What is a 'slot' in a template?", options: ["The changing input, like [PASTE NOTES]", "A random word", "The model's name", "An error"], answerIndex: 0, explanation: "Slots hold the variable part; the structure stays fixed." },
      { prompt: "How do you improve a prompt library over time?", options: ["Tweak and re-save prompts when results are slightly off", "Never change them", "Delete the good ones", "Keep them unnamed"], answerIndex: 0, explanation: "Iterating makes the library compound in value." },
      { prompt: "Where can you store reusable prompts?", options: ["Custom GPTs, Claude Projects, Gemini Gems, or a notes doc", "Only in your head", "Nowhere", "Only on paper"], answerIndex: 0, explanation: "Every assistant has a place to save reusable prompts." },
    ],
  },

  "prompting-7": {
    lesson: `**TL;DR - Most weak output is a format problem: too long, wrong shape, wrong voice. Direct the format, tone, and length explicitly and quality jumps immediately.**

## Why it matters
Beginners accept whatever shape the model returns. Pros specify it. The fastest path from "meh" to "professional" is telling the model exactly how the answer should look and sound.

## Worked example - one input, three shapes
> From the same notes:
\`\`\`
"...turn this into an executive email."        -> 5 tight sentences, formal.
"...turn this into a bulleted summary."        -> 5 scannable bullets.
"...turn this into a Slack message."           -> 2 lines, casual, an emoji.
\`\`\`
Same content, three deliverables, just by changing the format line.

## Steal this - the control trio
\`\`\`
Format: bullets | table | numbered steps | JSON | email
Tone:   formal | friendly | confident | cautious | playful
Length: one sentence | under 100 words | exactly 5 bullets
\`\`\`

## Common mistakes (and the fix)
- **No length limit** -> walls of text. **Fix:** "under 100 words" or "exactly 3 bullets".
- **Wrong format for the channel.** **Fix:** match it - a table for comparisons, bullets for scanning.
- **Tone mismatch.** **Fix:** name the tone, or paste a sample and say "match this voice".

## Good to know
Asking for a **table** or **JSON** is especially powerful: tables make comparisons instantly usable, and JSON is what lets AI feed spreadsheets and automations (Level 4-5). All major assistants honor explicit format requests - and for data, ChatGPT and Gemini can output straight into Sheets.`,
    task: "Starter: produce the same content as an exec email, a bullet summary, and a Slack message from one prompt. Stretch: ask for a comparison as a markdown table and paste it somewhere real.",
    quiz: [
      { prompt: "Which three things should you control explicitly?", options: ["Format, tone, and length", "Color, font, size", "Model, price, date", "Nothing"], answerIndex: 0, explanation: "These fix most weak-output problems." },
      { prompt: "How do you get a table instead of prose?", options: ["Ask for it explicitly: 'answer as a table'", "Hope for it", "Use a longer prompt", "Avoid instructions"], answerIndex: 0, explanation: "State the exact format you want." },
      { prompt: "Output is a wall of text. Best fix?", options: ["Add a length limit like 'under 100 words'", "Add more adjectives", "Change the topic", "Wait a day"], answerIndex: 0, explanation: "Explicit length keeps it tight and usable." },
      { prompt: "Why is asking for JSON useful?", options: ["It lets AI feed spreadsheets and automations", "It looks fancy", "It's shorter", "It changes the facts"], answerIndex: 0, explanation: "Structured output plugs into other tools." },
    ],
  },

  "prompting-8": {
    lesson: `**TL;DR - When output is wrong, vague, or off-tone, don't blame the AI - diagnose which prompt part failed and fix that. Bad output is feedback on your prompt.**

## Why it matters
Beginners give up after one bad result. Experts treat it like debugging: each failure points to a missing piece. Fix the piece and the next attempt works.

## Worked example - the diagnosis table
> | Symptom | Likely cause | Fix |
> Too generic -> missing context/persona -> add a role and specifics.
> Wrong length/shape -> no format -> state length + structure.
> Made-up facts -> asked for something it can't know -> give it the data, or use a tool that browses.
> Inconsistent -> no examples -> add few-shot examples or lower temperature.
> Off-tone -> tone unstated -> name the tone or paste a sample.

## Steal this - the fix checklist
\`\`\`
Bad output? Ask in order:
1. Did I give context/role?      -> add it
2. Did I state the format?       -> add length + structure
3. Did I give the input/facts?   -> paste them
4. Did I show an example?        -> add 1-2
5. Still off? -> refine in one small follow-up, don't restart
\`\`\`

## Common mistakes (and the fix)
- **Blaming the model.** **Fix:** assume the prompt is the lever.
- **Changing five things at once.** **Fix:** change one, re-run, learn what mattered.
- **Rewriting from scratch.** **Fix:** iterate on the existing prompt.

## Good to know
This diagnose-and-iterate habit is the difference between "AI is unreliable" and "AI is a power tool." It carries straight into building **evals** for prompts (testing across many cases) when you start shipping AI in workflows and apps.`,
    task: "Starter: take a prompt that gave a bad result and run it through the 5-step checklist; fix one cause and re-run. Stretch: collect three of your past 'AI failed' moments and identify the prompt flaw in each.",
    quiz: [
      { prompt: "Output is too generic. Most likely cause?", options: ["Missing context or persona", "Too much context", "Wrong model price", "Too many examples"], answerIndex: 0, explanation: "Generic output usually lacks context/role." },
      { prompt: "How should you treat a bad output?", options: ["As feedback on the prompt, not proof AI is useless", "As random noise", "As unfixable", "As the model's fault only"], answerIndex: 0, explanation: "Diagnose the prompt and iterate." },
      { prompt: "Best debugging approach?", options: ["Change one thing, re-run, learn what mattered", "Change five things at once", "Give up", "Rewrite from scratch each time"], answerIndex: 0, explanation: "Isolating one change tells you what worked." },
      { prompt: "Output invents facts. Fix?", options: ["Give it the real data, or use a tool that can browse", "Add adjectives", "Make it longer", "Trust it anyway"], answerIndex: 0, explanation: "It can't know what you don't provide (or it can't look up)." },
    ],
  },

  "prompting-9": {
    lesson: `**TL;DR - Three power-user controls: a system prompt (standing behavior), temperature (creativity vs consistency), and the context window (how much it can hold). They turn good prompting into reliable systems.**

## Why it matters
These don't change _what_ you ask - they change _how reliably_ you get it. They're what separates a competent user from someone who can make AI behave the same way every time, at scale.

## The three controls
- **System prompt** - a standing instruction applied to every reply: _"You are a concise support agent; never give legal advice."_ Set once, persists.
- **Temperature** - the creativity dial. **Low (0-0.3)** = consistent, factual. **High (0.8+)** = varied, creative.
- **Context window** - the model's working memory. Huge today, but for long inputs, put key instructions at the top _and_ restate them at the end.

## Worked example
> Building a support bot? Use a firm **system prompt** ("always apologize first, never promise refunds over $50") and a **low temperature** so answers stay consistent - you want reliability, not surprise.

## Steal this - settings by job
\`\`\`
Factual / templated work -> temperature LOW, firm system prompt
Brainstorming / creative -> temperature HIGH, loose prompt
Long document           -> instructions at top AND restated at end
\`\`\`

## Common mistakes (and the fix)
- **High temperature for factual work** -> inconsistent answers. **Fix:** turn it down.
- **Losing instructions in a long input.** **Fix:** restate the task at the end.
- **No system prompt for repeated tasks.** **Fix:** set the behavior once.

## Good to know
Temperature and system prompts live in the **APIs** for ChatGPT, Claude, and Gemini, and inside builder tools (Custom GPTs, Claude Projects). Context windows are large now - Claude and Gemini handle very long documents - but the "top and tail your instructions" rule still pays off. You'll use all three when you build with APIs in Level 5.`,
    task: "Starter: write a system prompt for a recurring use case (e.g., a support tone) and pick a temperature, explaining why. Stretch: paste a long document and test putting the instruction only at the top vs also at the end.",
    quiz: [
      { prompt: "What does a system prompt do?", options: ["Sets standing behavior for every reply", "Sends one message then vanishes", "Connects to the internet", "Stores a password"], answerIndex: 0, explanation: "It persists across the whole conversation." },
      { prompt: "When should temperature be low?", options: ["For consistent, factual, or templated work", "When brainstorming", "When you want surprises", "Never"], answerIndex: 0, explanation: "Low temperature is more deterministic." },
      { prompt: "For a very long input, you should...", options: ["Put key instructions at the top and restate them at the end", "Delete the instructions", "Use no format", "Make it longer"], answerIndex: 0, explanation: "Restating guards against losing the task in long context." },
      { prompt: "For a support bot, the best settings are...", options: ["Firm system prompt, low temperature", "No system prompt, high temperature", "Random everything", "Maximum creativity"], answerIndex: 0, explanation: "Consistency matters for support." },
    ],
  },

  "prompting-10": {
    lesson: `**TL;DR - What works for drafting emails fails for analyzing data. Each domain has its own prompt pattern; recognizing the domain and reaching for its pattern is a fluency milestone.**

## Why it matters
A single "good prompt" habit doesn't transfer cleanly across writing, data, coding, and decisions. Knowing the right pattern per domain lets you get a usable result on the first try, even outside your usual role.

## Patterns by domain
- **Writing** - persona + tone + format ("warm, 100 words, end with an ask").
- **Research** - ask for sources, opposing views, and a confidence note.
- **Data** - describe the columns, ask for specific calculations and one chart.
- **Coding** - state the language, inputs, expected output; ask for comments.
- **Decisions** - ask for options with trade-offs, not a single answer.

## Worked example - a data prompt
\`\`\`
Here is a sales export with columns: Date, Region, Product, Revenue.
Find the top region by month and flag any month that dropped >20%.
Output a short table plus 2 plain-English insights. Don't guess - if data is missing, say so.
\`\`\`
Notice how different that is from an email prompt.

## Steal this - domain switch
\`\`\`
Ask yourself: what KIND of task is this?
Writing -> role+tone+format   Research -> sources+counterviews
Data    -> columns+calcs      Coding  -> language+inputs+output
Decision-> options+trade-offs
Then reach for that pattern.
\`\`\`

## Common mistakes (and the fix)
- **Using the email pattern on a data task.** **Fix:** describe the data and the exact calculation.
- **Asking for one answer on a judgment call.** **Fix:** request options with pros/cons.
- **No "say so if unsure" guard** on research/data. **Fix:** add it to curb hallucination.

## Good to know
The right tool changes by domain too: **Claude/ChatGPT** for writing and reasoning, **ChatGPT data analysis** or **Gemini in Sheets** for data, **Cursor/Copilot** for code, **Perplexity** for sourced research. Same prompting principles, tuned to the job - which is exactly what the next three levels build on.`,
    task: "Starter: write an effective prompt for a task OUTSIDE your usual role (e.g., a data prompt if you're a writer) and get a usable result first try. Stretch: take one task and write the right prompt for it in two different domains' styles.",
    quiz: [
      { prompt: "Why adapt prompts by domain?", options: ["Each domain needs a different structure and asks", "All tasks are identical", "Longer is always better", "Domains don't matter"], answerIndex: 0, explanation: "Writing, data, and coding need different patterns." },
      { prompt: "A strong data prompt should...", options: ["Describe the columns and ask for specific calculations", "Say 'analyze this' vaguely", "Avoid mentioning the data", "Request a poem"], answerIndex: 0, explanation: "Specifying columns and calculations gives usable analysis." },
      { prompt: "For a decision/judgment call, ask for...", options: ["Options with trade-offs, not a single answer", "One answer with no reasoning", "A random pick", "Nothing"], answerIndex: 0, explanation: "Trade-off options support real judgment." },
      { prompt: "Which guard reduces hallucination on data/research?", options: ["'If data is missing, say so - don't guess'", "'Be creative'", "'Make it longer'", "'Pick any answer'"], answerIndex: 0, explanation: "Telling it to flag uncertainty curbs fabrication." },
    ],
  },
};
