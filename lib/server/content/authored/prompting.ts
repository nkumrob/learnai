import type { ModuleContent } from "@/types/shared";

// Level 2 - Prompt Engineering (Literacy to Fluency). Topics 11-15.
export const prompting: Record<string, ModuleContent> = {
  "prompting-1": {
    lesson: `**Prompt engineering is the practice of writing inputs for a large language model that reliably produce the output you want, and the foundational technique is to include four parts in every prompt: context, instruction, input, and format.** Context describes who the AI is and the situation ("you are a support agent for a calm, premium brand"). Instruction is the one clear task. Input is the raw material to work from. Format is the exact shape of the answer ("under eighty words, apologize, give the fix, give a timeline"). This four-part structure is model-agnostic and works the same in ChatGPT, Claude, Gemini, and Copilot. For instance, "write about onboarding" returns a generic essay, while the same request wrapped in context, instruction, input, and format returns a near-final email that needs a five-second tweak. Because every other AI skill from research to automation runs on prompts, this is the highest-leverage thing to learn early.

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
- **One giant prompt.** **Fix:** get a draft, then refine with one small nudge - "shorter", "warmer".

## Good to know - this works everywhere
The four-part structure is **model-agnostic**: it works the same in **ChatGPT**, **Claude**, **Gemini**, and **Copilot**. A few notes: Claude and ChatGPT both reward a clearly stated role; for long inputs, paste the material _last_ and restate the instruction at the end. You learn prompting once and carry it across every tool.`,
    task: "Starter: take a message you actually need to write, and run it twice - once as a bare request, once with the four-part template. Compare how much you edit. Stretch: save your filled-in template as a reusable prompt for a task you do every week.",
    quiz: [
      { prompt: "Your prompt keeps giving vague, generic answers. Which fix helps most?", options: ["Add context, a specific instruction, and an output format", "Make the prompt longer with more adjectives", "Send the same prompt again and hope", "Switch to a different AI tool"], answerIndex: 0, explanation: "Generic output almost always means missing context/instruction/format." },
      { prompt: "Which line is the 'format' part of a prompt?", options: ["Under 120 words, warm tone, end with a next step", "You are an HR lead at a startup", "Write a welcome email", "Their buddy is Sam, kickoff is 10am"], answerIndex: 0, explanation: "Format specifies length, structure, and tone." },
      { prompt: "You're pasting a long document for the AI to use. Best practice?", options: ["Put the material last and restate the instruction at the end", "Put the instruction only at the very top and hope", "Remove all formatting instructions", "Split it across ten separate prompts"], answerIndex: 0, explanation: "Models attend most to the start and end of long inputs." },
      { prompt: "Does the four-part structure work across ChatGPT, Claude, and Gemini?", options: ["Yes - prompting structure is model-agnostic", "No, each needs a completely different approach", "Only ChatGPT understands structure", "Only on paid plans"], answerIndex: 0, explanation: "The same structured approach works across the major assistants." },
    ],
  },

  "prompting-2": {
    lesson: `**Persona prompting (also called role prompting) is the technique of starting a prompt with "you are a [specific role]" so the AI anchors its tone, depth, and perspective to the patterns of that expertise**, often delivering a bigger quality jump than any other single change. Without a role, models like ChatGPT, Claude, and Gemini default to a bland average voice. With a role, they pull from the patterns of that specialist, so a CFO prompt leads with the numbers that matter, a senior editor tightens prose, and a B2B copywriter prompt frames messages for busy founders. For instance, "explain this budget" returns a flat summary, while "you are a CFO explaining this budget to a smart non-financial team, lead with the three things that matter and flag one risk" returns something clearer and better pitched. Save your best personas as Custom GPTs, Claude Projects, or Gemini Gems so they persist.

## Worked example - same task, different persona
> **Bare:** "Explain this budget." -> a flat, generic summary.
> **With persona:**
\`\`\`
You are a CFO explaining this budget to a smart but non-financial team.
Avoid jargon, lead with the 3 things that matter, and flag one risk.
\`\`\`
Same data, a far clearer and better-pitched result.

## Steal this template
\`\`\`
You are [specific role] with [experience/POV].
You are speaking to [audience], who care about [their priority].
Be [tone]. Avoid [what to skip].
\`\`\`

## Common mistakes (and the fix)
- **Vague roles.** "You are an expert" barely helps. **Fix:** be specific - "a senior B2B copywriter for fintech".
- **Forgetting the audience.** The role shapes the voice; the audience shapes the level. Name both.
- **Persona theater.** Don't add a backstory it doesn't need - role + audience + tone is enough.

## Good to know
In **ChatGPT** you can bake a persona into "Custom Instructions" or a Custom GPT; in **Claude** you set it as the system prompt or a Project's instructions; in **Gemini** as a saved Gem. Set the persona once and every reply follows it - you'll formalize this in the "system prompts" lesson later this level.`,
    task: "Starter: write a persona prompt (role + audience + tone) for a real task and compare it to a bare request. Stretch: turn your best persona into a saved Custom GPT / Claude Project / Gem so you can reuse it.",
    quiz: [
      { prompt: "What does a persona prompt mainly do?", options: ["Anchors the AI's tone, depth, and perspective", "Makes responses slower", "Hides the question", "Removes the need for context"], answerIndex: 0, explanation: "A role pulls output toward that expertise." },
      { prompt: "Which persona is strongest?", options: ["A senior B2B copywriter for fintech, writing for busy founders", "An expert", "A helper", "A smart person"], answerIndex: 0, explanation: "Specific role + audience beats a vague 'expert'." },
      { prompt: "Besides the role, what else should you name?", options: ["The audience and the tone", "The model's price", "The date", "The font"], answerIndex: 0, explanation: "Role sets the voice; audience sets the level." },
      { prompt: "How do you make a persona persist across replies?", options: ["Save it as a system prompt / Custom GPT / Project / Gem", "Retype it every message only", "Hope the model remembers", "Use a longer prompt once"], answerIndex: 0, explanation: "System-level instructions persist across the conversation." },
    ],
  },

  "prompting-3": {
    lesson: `**Few-shot prompting is a technique where you include two to four worked examples of the input-and-output pattern you want before the real request**, teaching the model the exact format and voice through demonstration rather than description. The approach was popularized in the 2020 GPT-3 paper from OpenAI, which showed that frontier models can learn a new task from a handful of examples in the prompt itself, no fine-tuning needed. The mechanism works because language models are pattern completers, so a clean, consistent pattern in the prompt pulls the next output toward the same shape. For instance, to classify customer reviews as POSITIVE, NEGATIVE, or NEUTRAL, three labeled examples followed by an unlabeled review will produce a one-word answer in the same format every time. Few-shot is the backbone of reliable automations and API calls, because when AI feeds another system, examples are how you guarantee the shape.

## Worked example
\`\`\`
Classify each review as POSITIVE, NEGATIVE, or NEUTRAL.

"Shipped late but the product is great." -> POSITIVE
"Stopped working in a week." -> NEGATIVE
"It's fine, nothing special." -> NEUTRAL
"Support ignored me for days." ->
\`\`\`
The examples pin the labels and format exactly. Ask cold (zero-shot) and you'll get inconsistent wording instead.

## Steal this skeleton
\`\`\`
[Instruction].
Here are examples of the format I want:
[input 1] -> [ideal output 1]
[input 2] -> [ideal output 2]
Now do the same for: [real input]
\`\`\`

## Common mistakes (and the fix)
- **Zero examples for a format-critical task.** **Fix:** give 2-3 representative ones, including a tricky case.
- **Inconsistent examples.** If your samples disagree, so will the output. Keep them clean.
- **Too many examples.** 2-4 is usually enough; more just costs tokens.

## Good to know
Few-shot works in every assistant and is the backbone of reliable **automations** (Level 4) and **API** calls (Level 5) - when AI feeds another system, examples are how you guarantee the shape. Pair it with chain-of-thought (next lesson): show examples that include the reasoning.`,
    task: "Starter: pick a small repeated task (classify, format, label) and write a 3-example few-shot prompt; compare it to a no-example attempt. Stretch: add one tricky 'edge case' example and see if accuracy improves.",
    quiz: [
      { prompt: "What is few-shot prompting?", options: ["Giving 2-3 examples before the real request", "Using the model briefly", "A very short prompt", "Turning off context"], answerIndex: 0, explanation: "Examples teach the exact pattern to copy." },
      { prompt: "Why are examples better than describing a format?", options: ["They pin the labels and shape precisely", "They always use fewer tokens", "They hide the task", "They confuse the model"], answerIndex: 0, explanation: "A concrete sample is clearer than an abstract description." },
      { prompt: "When is few-shot most valuable?", options: ["When format/voice must stay consistent across items", "For a one-word hello", "When you want randomness", "Never"], answerIndex: 0, explanation: "Repeated, consistent output is the sweet spot." },
      { prompt: "How many examples are usually enough?", options: ["About 2-4, including a tricky case", "Zero, always", "At least 50", "Exactly 1, never more"], answerIndex: 0, explanation: "A few clean, representative examples do the job." },
    ],
  },

  "prompting-4": {
    lesson: `**Chain-of-thought (CoT) prompting is a technique where you instruct a large language model to reason through a problem step by step before giving a final answer**, instead of jumping straight to the result. The approach was introduced in the 2022 Wei et al. paper from Google Research and reliably improves accuracy on math, logic, and multi-part questions because models trained on internet text are better at solving problems when they generate intermediate reasoning ahead of the conclusion. In practice, that looks like adding "think step by step" to the prompt, or providing a few examples that include the reasoning. The technique is supported in Claude, ChatGPT, and Gemini, and newer reasoning models like OpenAI's o-series and Claude's extended thinking do it internally. For everyday work, anywhere you would say "the AI rushed and got it wrong," chain-of-thought is the simplest reliability win you can get without changing tools or paying more.

## Worked example - before / after
> **Prompt:** "A meeting starts at 2:45pm, runs 90 minutes, then a 20-minute break, then 45 minutes. When does it end?"
> **Cold answer:** often wrong - it guesses.
> **With "think step by step":** 2:45 + 90 = 4:15; + 20 = 4:35; + 45 = **5:20pm.** Correct, because it showed the steps.

## Steal this - when to use it
\`\`\`
Use "think step by step" (or "show your reasoning, then answer") for:
- math, dates, logic, comparisons, multi-part questions, decisions with trade-offs.
Skip it for:
- simple lookups or one-line rewrites (it just adds length).
\`\`\`

## Common mistakes (and the fix)
- **Using it for trivial tasks.** It bloats simple answers. **Fix:** reserve it for real reasoning.
- **Not asking for the steps separately.** **Fix:** "Reason first, then give the final answer on its own line."
- **Trusting the reasoning blindly** - skim it; it can reason wrongly too.

## Good to know
Newer **reasoning models** - OpenAI's o-series and **Claude's extended thinking** - do this internally, so you don't always have to ask. But for everyday models (GPT-4-class, Gemini), "think step by step" is still one of the highest-return tricks. Combine it with few-shot: show examples that include the reasoning.`,
    task: "Starter: take a multi-step problem, run it cold, then run it with 'think step by step' and compare. Stretch: write a prompt that asks for the reasoning first and the final answer on its own line.",
    quiz: [
      { prompt: "What does chain-of-thought prompting do?", options: ["Makes the model reason step by step before answering", "Makes answers shorter", "Removes context", "Picks a font"], answerIndex: 0, explanation: "Reasoning out loud catches mistakes a snap answer makes." },
      { prompt: "When should you skip it?", options: ["Simple lookups or one-line rewrites", "Multi-step math", "Logic puzzles", "Decisions with trade-offs"], answerIndex: 0, explanation: "It only adds length on trivial tasks." },
      { prompt: "Which models do this reasoning automatically?", options: ["Reasoning models (OpenAI o-series, Claude extended thinking)", "All models, always", "No models ever", "Only image tools"], answerIndex: 0, explanation: "Reasoning models think internally before answering." },
      { prompt: "Best way to combine techniques?", options: ["Show few-shot examples that include the reasoning", "Never give examples", "Only greet the model", "Ask for the shortest answer"], answerIndex: 0, explanation: "Examples that demonstrate reasoning give pattern + rigor." },
    ],
  },

  "prompting-5": {
    lesson: `**Iterative prompting is the practice of treating an AI chat as a conversation rather than a single vending-machine request, where you get a rough draft and then refine it across two to four short follow-ups instead of trying to write one perfect prompt.** The mechanism is that Claude, ChatGPT, and Gemini use the whole conversation as context, so each turn builds on the last, and small specific nudges ("warmer," "cut by half," "lead with the ask") steer the result more precisely than a giant up-front instruction. For instance, drafting a follow-up email to a quiet lead goes: ask for a draft, reply "warmer and shorter, four sentences max," then "add one specific reason to reconnect this week," and you reach a sendable result in three turns. The best AI users operate in this loop because every small correction stays easy to judge and they keep control of the final output.

## Worked example - the refine loop
\`\`\`
You: Draft a follow-up email to a lead who went quiet.
AI:  [draft]
You: Warmer, and shorter - 4 sentences max.
AI:  [tighter draft]
You: Add one specific reason to reconnect this week.
AI:  [final - ready to send]
\`\`\`
Three small turns beat one giant prompt, and each step is easy to judge.

## Steal this - refinement nudges
\`\`\`
Length:  "cut by half" · "one paragraph"
Tone:    "warmer" · "more direct" · "less salesy"
Focus:   "lead with the ask" · "drop the second point"
Form:    "make it a bulleted list" · "add a subject line"
\`\`\`

## Common mistakes (and the fix)
- **Restarting from scratch** when a draft misses. **Fix:** reply with the single change you want.
- **Vague feedback** ("make it better"). **Fix:** name the specific change.
- **Losing good earlier versions.** **Fix:** "keep the last version but only change X."

## Good to know
This is why **chat history matters** - the model uses the whole conversation as context, so each turn builds on the last. In **Claude Projects** and **ChatGPT** threads, you can keep iterating on the same material for a long session. Start a fresh chat only when you want a clean slate.`,
    task: "Starter: produce a finished piece by iterating at least three times; note what you changed each turn and why. Stretch: do it in one continuous chat and notice how the model uses earlier turns as context.",
    quiz: [
      { prompt: "How do expert users treat an AI chat?", options: ["As an iterative conversation, refining across turns", "As a one-shot vending machine", "As a search engine only", "As a calculator"], answerIndex: 0, explanation: "Refining across turns produces the best results." },
      { prompt: "Best move when a draft is close but off?", options: ["Reply with the one specific change you want", "Start over from scratch", "Give vague feedback", "Repeat the same prompt"], answerIndex: 0, explanation: "Small, specific nudges steer the result." },
      { prompt: "Why does keeping the same chat help?", options: ["The model uses the whole conversation as context", "It's faster wifi", "It saves money only", "It hides the goal"], answerIndex: 0, explanation: "Each turn builds on the prior context." },
      { prompt: "A good refinement nudge is...", options: ["'Cut by half' or 'lead with the ask'", "'Make it better'", "'Do something nice'", "'Fix it'"], answerIndex: 0, explanation: "Specific instructions steer the next turn." },
    ],
  },
};
