import type { ModuleContent } from "@/types/shared";

// Level 1 - AI Foundations (Literacy). Topics 6-10.
export const fundamentals2: Record<string, ModuleContent> = {
  "fundamentals-6": {
    lesson: `**TL;DR - AI learns from human data, so it absorbs human bias and can amplify it. You can't fix the model, but you can spot biased output and stop it before it ships.**

## Why it matters
Models are trained on the internet, which reflects the world's imbalances. A 2023 Bloomberg analysis found AI image generators exaggerated racial and gender stereotypes. Non-technical workers are often the _last_ human check before AI output reaches customers - so spotting bias is a practical skill, not a philosophy seminar.

## How bias gets in
The training data over- or under-represents groups and describes them in stereotyped ways. The model learns those patterns and reproduces them - sometimes more strongly than reality.

## Worked example
> **Prompt:** "Describe a nurse and a surgeon."
> **Watch for:** the nurse defaults to "she", the surgeon to "he". That gendered default is a bias signal straight from training data - not a coincidence.
> **Fix in your output:** make roles neutral, or specify, and sanity-check any AI text about people before it goes out.

## Steal this - the bias checklist
\`\`\`
Before publishing AI output about people, check:
- Defaults: did it assume gender/race/age for a role?
- Representation: who's missing or stereotyped?
- Claims: does it state something about a group as fact?
If yes -> rewrite, balance, or cut.
\`\`\`

## Common mistakes
- **Assuming neutral = unbiased.** "Just describe a CEO" still pulls a stereotype.
- **Shipping AI images/text about people unreviewed.**
- **Treating a confident answer about a group as objective fact.**

## Good to know
All the major tools (ChatGPT, Claude, Gemini) have guardrails, but none are bias-free. Anthropic, OpenAI, and Google publish usage policies and "model cards" describing known limitations - worth a skim if you'll use AI on people-related content at work.`,
    task: "Starter: prompt an AI to describe a few job roles and note any stereotyped defaults. Stretch: take one biased output and rewrite it to be fair, then note what in the training data likely caused the bias.",
    quiz: [
      { prompt: "Where does AI bias mainly come from?", options: ["Patterns in human-created training data", "The wifi connection", "The user's mood", "Random chance only"], answerIndex: 0, explanation: "Models learn the imbalances present in their training data." },
      { prompt: "'Describe a nurse and a surgeon' returns gendered defaults. That's...", options: ["A bias signal from training data", "A grammar error", "A hallucination of facts", "A privacy leak"], answerIndex: 0, explanation: "Stereotyped role defaults reveal learned bias." },
      { prompt: "Can an end user fix bias in the model itself?", options: ["No, but you can catch and correct the output", "Yes, with a button", "Only by retraining it", "It has no bias"], answerIndex: 0, explanation: "You review and correct outputs; you don't retrain the model." },
      { prompt: "Before publishing AI text about people, you should...", options: ["Check for stereotyped defaults and unfair claims", "Make it longer", "Add more adjectives", "Publish immediately"], answerIndex: 0, explanation: "A quick bias check prevents shipping harmful output." },
    ],
  },

  "fundamentals-7": {
    lesson: `**TL;DR - AI tends to _automate_ routine tasks, _augment_ many others, and _leave_ judgment, relationships, and creativity to humans. Map your job into those three buckets and you'll make smart moves instead of fearful ones.**

## Why it matters
Hype says "AI will take your job"; denial says "it's a toy". Both lead to bad decisions. A grounded, task-level view lets you offload the boring parts and double down on what's actually valued - which is where careers grow.

## The three buckets
- **Automate** - repetitive, rule-based work (data entry, sorting, basic formatting).
- **Augment** - drafts, summaries, first-pass analysis where _you_ still decide.
- **Human-only** - relationships, ethics, strategy, original creative direction.

## Worked example - a marketer's week
> "Paste weekly numbers into the report" -> **automate.**
> "Write 10 subject-line options" -> **augment** (you pick and polish).
> "Decide the brand's position for next quarter" -> **human-only.**

Notice it's _tasks_, not jobs, that get automated. Almost no role is all one bucket.

## Steal this - the task audit
\`\`\`
List your recurring tasks. For each, tag:
[A] Automate - rule-based, repetitive
[+] Augment - AI drafts, I decide
[H] Human - judgment, people, creativity
Then: push [A] to tools, use AI on [+], protect time for [H].
\`\`\`

## Common mistakes
- **Thinking in whole jobs, not tasks.** The task lens is where the opportunity is.
- **Automating judgment** because the draft looked good.
- **Refusing to offload routine work** and staying buried in it.

## Good to know
The roles growing fastest pair domain expertise with AI fluency - "AI won't replace you, but a person using AI might." Workers with AI skills command a real wage premium today, which is exactly why you're building these skills now.`,
    task: "Starter: list your main job tasks and tag each Automate / Augment / Human. Stretch: pick one Augment task and actually do it with AI this week; pick one Automate candidate to set up later in Level 4.",
    quiz: [
      { prompt: "Which work does AI most fully automate?", options: ["Repetitive, rule-based tasks", "Strategy and ethics", "Relationship building", "Original creative direction"], answerIndex: 0, explanation: "Routine, rule-based tasks are the most automatable." },
      { prompt: "'Augment' means...", options: ["AI assists but you still decide", "AI replaces you entirely", "AI does nothing", "You avoid AI"], answerIndex: 0, explanation: "Augmentation keeps humans in the decision seat." },
      { prompt: "What actually gets automated?", options: ["Specific tasks, not whole jobs", "Entire careers at once", "Only creativity", "Nothing"], answerIndex: 0, explanation: "Most roles are a mix; tasks move, not whole jobs." },
      { prompt: "The grounded career move is to...", options: ["Offload routine tasks and invest in human-only work", "Ignore AI", "Automate your judgment", "Quit"], answerIndex: 0, explanation: "Shift time toward valued, human-only work." },
    ],
  },

  "fundamentals-8": {
    lesson: `**TL;DR - Traditional software is deterministic (same input -> same output). Generative AI is probabilistic (same input -> _similar but different_ output). Miss this and you'll be confused and burned.**

## Why it matters
People expect AI to behave like a calculator and panic when it doesn't repeat exactly. Understanding _why_ it varies tells you when to lock it down and when to let it roam.

## How it works
Traditional code follows fixed rules: 2 + 2 is always 4. An LLM samples from likely next words, so there's natural variation - a feature for creativity, a risk for consistency.

## Worked example
> Run "summarize this in 3 bullets" twice and you'll get two valid but differently-worded summaries.
> A calculator never does that. An LLM always might. Neither is broken - they're different kinds of tools.

## Steal this - control the variation
\`\`\`
Need consistency (same format every time)?
- Lower "temperature" (creativity dial), if your tool exposes it.
- Give examples of the exact output you want (few-shot).
- Use a fixed template and ask it to fill the blanks.
Need fresh ideas? Let it run hot and ask for many options.
\`\`\`

## Common mistakes
- **Expecting pixel-perfect repeats** from a probabilistic tool.
- **Pasting AI output into a process that needs exactness** without verifying.
- **Blaming the model** for variation that's normal behavior.

## Good to know
"Temperature" is a real setting in the **APIs** (and some apps) for ChatGPT, Claude, and Gemini: low (0-0.3) for consistent/factual, higher for creative. You'll meet it again in Level 2 (system prompts & temperature) and Level 5 (building with APIs).`,
    task: "Starter: run the same prompt twice and note what changed. Stretch: take a task where variation would be a problem (e.g., a templated message) and write how you'd force consistency (examples, template, or low temperature).",
    quiz: [
      { prompt: "Generative AI is 'probabilistic', meaning...", options: ["Same input gives similar but not identical output", "Same input always gives identical output", "It never produces output", "It only works once"], answerIndex: 0, explanation: "It samples likely words, so results vary." },
      { prompt: "You need the SAME format every time. Best move?", options: ["Lower temperature, give examples, or use a fixed template", "Ask vaguely and hope", "Run it once", "Avoid giving context"], answerIndex: 0, explanation: "These constrain the natural variation." },
      { prompt: "Traditional software is deterministic because...", options: ["The same input always yields the same output", "It uses AI", "It's random", "It learns from data"], answerIndex: 0, explanation: "Deterministic = repeatable, identical results." },
      { prompt: "The 'temperature' setting controls...", options: ["How creative vs consistent the output is", "The model's price", "The font size", "Your internet speed"], answerIndex: 0, explanation: "Low temperature is consistent; high is creative." },
    ],
  },

  "fundamentals-9": {
    lesson: `**TL;DR - The most important habit in AI use is keeping a human in the loop: AI generates, you verify, judge, and refine. Build a personal verification habit and you'll never get caught out.**

## Why it matters
Every serious AI framework ranks oversight and critical thinking as the #1 non-technical skill. The people who get burned are the ones who paste AI output straight into the world. The fix is a small, consistent habit.

## How it works
Think of AI as a fast, eager intern: great at producing drafts, terrible at being accountable. You're the editor. The model proposes; you dispose.

## Worked example
> AI drafts a customer email that says "your refund of $250 was processed."
> **Human-in-the-loop:** you check - was it $250? was it processed? Only then send. One 10-second check prevents a public mistake.

## Steal this - your verification habit
\`\`\`
Before I share or act on AI output, I always check:
1. Facts & numbers (anything I'd be embarrassed to get wrong)
2. Names, quotes, links (do they exist?)
3. Tone & audience fit
Then I read it once as if I wrote it.
\`\`\`

## Common mistakes
- **Publishing unread** because it "looked confident."
- **Verifying nothing** on low-stakes work, then carrying the habit into high-stakes work.
- **Letting AI make the decision**, not just the draft.

## Good to know
This habit scales all the way up: in Level 4 (automation) and Level 5 (agents), "human-in-the-loop" becomes a literal design step - a checkpoint where a person approves before the system acts. The mindset you build here is the same one that keeps automations safe.`,
    task: "Starter: write your personal 3-point verification habit and stick it where you use AI. Stretch: use it on a real AI output today and catch at least one thing worth fixing.",
    quiz: [
      { prompt: "What is the human-in-the-loop mindset?", options: ["AI generates; humans verify, judge, and refine", "AI runs fully on its own", "Humans do all the work", "Never use AI output"], answerIndex: 0, explanation: "Oversight is the core of safe, effective AI use." },
      { prompt: "Best analogy for your role with AI?", options: ["The editor of a fast but unaccountable intern", "A passive reader", "A spectator", "A calculator"], answerIndex: 0, explanation: "The model proposes; you verify and decide." },
      { prompt: "A good verification habit checks...", options: ["Facts, names/links, and tone before sharing", "Only the font", "Only the length", "Nothing"], answerIndex: 0, explanation: "These are where AI most often slips." },
      { prompt: "Where does human-in-the-loop reappear later?", options: ["As an approval checkpoint in automations and agents", "Only in this lesson", "Never", "In billing"], answerIndex: 0, explanation: "It becomes a literal design step in Levels 4-5." },
    ],
  },

  "fundamentals-10": {
    lesson: `**TL;DR - You don't need deep theory, but you do need the vocabulary. Knowing ~15 core terms lets you follow AI conversations and make decisions instead of nodding along.**

## Why it matters
Workers who can't speak the language get left out of decisions about AI at work. These terms also unlock the rest of this journey - you'll see them in every later level.

## The essential terms
- **Model** - the AI system (GPT, Claude). **Prompt** - your input. **Token** - a chunk of text it reads/writes (you're billed by these).
- **Context window** - how much text it can consider at once. **Hallucination** - confident wrong output.
- **Zero-shot / few-shot** - no examples vs a few examples in your prompt. **Temperature** - the creativity dial.
- **System prompt** - standing instructions that shape every reply. **RAG** - feeding the model your own documents.
- **Agent** - AI that uses tools to take actions. **Multimodal** - handles text + images/audio. **Fine-tuning** - extra training on specific data. **MCP** - a standard way to connect AI to tools.

## Worked example - use them in a sentence
> "Let's give it a **few-shot** example and lower the **temperature** so the format stays consistent, and put the long input near the end because of the **context window**."

If that sentence makes sense, you can hold your own in an AI conversation.

## Steal this - the flashcard set
\`\`\`
model · prompt · token · context window · hallucination
zero-shot · few-shot · temperature · system prompt
RAG · agent · multimodal · fine-tuning · MCP
Goal: use 10 of these correctly in conversation.
\`\`\`

## Common mistakes
- **Nodding along** instead of asking "what does that mean?"
- **Confusing fine-tuning with RAG** - fine-tuning re-trains; RAG just feeds documents at answer time.
- **Thinking "agent" = chatbot** - an agent _acts_ using tools.

## Good to know
You'll go deep on most of these later: prompting terms in Level 2, agents and automation in Level 4, RAG and MCP in Level 5. Here, just get comfortable saying them - fluency in the words is the on-ramp to fluency in the skills.`,
    task: "Starter: use 5 of these terms correctly in a short written explanation, as if answering a colleague. Stretch: teach two terms to someone who's never used AI and have them use one back correctly.",
    quiz: [
      { prompt: "What is a 'token'?", options: ["A chunk of text the model reads or writes (and is billed by)", "A password", "A type of model", "A prompt template"], answerIndex: 0, explanation: "Usage is measured in tokens." },
      { prompt: "How does RAG differ from fine-tuning?", options: ["RAG feeds documents at answer time; fine-tuning re-trains the model", "They're identical", "RAG is a password", "Fine-tuning feeds documents"], answerIndex: 0, explanation: "RAG supplies context; fine-tuning adjusts the model's weights." },
      { prompt: "An 'agent' is AI that...", options: ["Uses tools to take multi-step actions", "Only chats", "Cannot do anything", "Is a spreadsheet"], answerIndex: 0, explanation: "Agents act via tools toward a goal." },
      { prompt: "The 'context window' is...", options: ["How much text the model can consider at once", "The app's window size", "The temperature", "The model's age"], answerIndex: 0, explanation: "It's the model's working-memory limit." },
    ],
  },
};
