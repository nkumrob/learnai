import type { ModuleContent } from "@/types/shared";

// Level 1 - AI Foundations (Literacy). Topics 1-10.
export const fundamentals: Record<string, ModuleContent> = {
  "fundamentals-1": {
    lesson: `"AI" is used for everything from spam filters to ChatGPT. A clear mental model helps you judge when it'll help and when it'll fail.

## The family tree
- **AI** - the broad idea of machines doing tasks that seem to need intelligence.
- **Machine learning (ML)** - systems that learn patterns from data instead of being hand-coded.
- **Deep learning** - ML using large neural networks; powers modern image and language tools.
- **Generative AI** - deep learning that *creates* text, images, or audio (ChatGPT, Claude, image generators).

> **Example.** A spam filter is AI but not generative - it sorts, it doesn't write. ChatGPT is generative AI. Knowing the difference tells you what to expect from each.

Most "AI" in products today is one of these, or just clever marketing. When someone says "it's AI", ask: *is it learning from data, and is it generating something new?*`,
    task: "Explain to a friend (or in a note) why a chatbot sometimes gives wrong answers, and name one kind of AI that is NOT a chatbot.",
    quiz: [
      { prompt: "Which best describes generative AI?", options: ["Deep learning that creates new text, images, or audio", "Any computer program", "A spam filter that sorts email", "A spreadsheet formula"], answerIndex: 0, explanation: "Generative AI produces new content, unlike systems that only sort or classify." },
      { prompt: "How is machine learning different from traditional code?", options: ["It learns patterns from data instead of being hand-coded", "It runs faster", "It never makes mistakes", "It needs no data"], answerIndex: 0, explanation: "ML learns from examples rather than following hand-written rules." },
      { prompt: "A spam filter is AI but not generative because it...", options: ["Sorts email rather than creating content", "Is written in Python", "Uses the internet", "Is always correct"], answerIndex: 0, explanation: "It classifies; it doesn't generate new content." },
      { prompt: "Good question to test if something is really 'AI'?", options: ["Is it learning from data and generating something new?", "Is it expensive?", "Does it have a logo?", "Is it on a phone?"], answerIndex: 0, explanation: "Learning from data and/or generating content is what distinguishes real AI from marketing." },
    ],
  },
  "fundamentals-2": {
    lesson: `Large language models (LLMs) like ChatGPT and Claude feel like they "know" things. They don't look facts up - they **predict the next likely word** based on patterns in their training data.

## Why this matters
That one idea explains their quirks:
- **Hallucinations** - if a plausible-sounding word comes next, the model may produce it even if it's false. It's completing a pattern, not checking a database.
- **Inconsistency** - ask twice, get two phrasings, because it's sampling likely words, not retrieving a fixed answer.
- **Context dependence** - what you put in the prompt heavily steers what comes out.

> **Example.** Ask "Who won the 2027 award?" and a model with no such data may invent a confident, wrong name - it's predicting what an answer *looks* like, not recalling a fact.

The fix isn't to distrust AI entirely - it's to verify anything factual and treat output as a draft.`,
    task: "Write a one-sentence explanation of what a 'hallucination' is, plus one example of when you'd verify AI output versus trust it.",
    quiz: [
      { prompt: "How does an LLM produce text?", options: ["By predicting the next likely word from patterns", "By searching a fact database", "By copying Wikipedia exactly", "By asking a human"], answerIndex: 0, explanation: "LLMs complete patterns; they don't look up facts." },
      { prompt: "Why do hallucinations happen?", options: ["The model completes a plausible pattern even if it's false", "The model is broken", "The internet is down", "It always tells the truth"], answerIndex: 0, explanation: "Predicting likely text can produce confident but false statements." },
      { prompt: "Why might the same prompt give two different answers?", options: ["It samples likely words rather than retrieving one fixed answer", "Your wifi changed", "The model forgot", "It never does"], answerIndex: 0, explanation: "Generation is probabilistic, so phrasing varies." },
      { prompt: "Best response to this behavior?", options: ["Verify anything factual; treat output as a draft", "Never use AI", "Trust everything it says", "Only use it for math"], answerIndex: 0, explanation: "Verification plus a draft mindset gets the value safely." },
    ],
  },
  "fundamentals-3": {
    lesson: `Most people either over-trust AI or dismiss it. Knowing the boundaries makes you instantly more useful - and harder to burn.

## Strong at
- Drafting, rewriting, summarizing, translating, brainstorming, changing format or tone.

## Weak at
- **Live facts** (today's prices/news) unless the tool browses.
- **Exact math and counting** - it approximates.
- **Citations** - it can fabricate sources.
- **Nuanced judgment** - ethics, strategy, people decisions.

> **Sort these.** "Draft a reply" (great), "What's our current stock price?" (needs live data), "Decide who to promote" (human judgment). Same tool, very different reliability.

The rule: AI **produces and reshapes**; **you** supply facts and judgment.`,
    task: "Take five real tasks from your week and label each: 'AI handles well', 'AI assists but verify', or 'keep human'. Note one reason each.",
    quiz: [
      { prompt: "Which is AI strongest at?", options: ["Drafting and reshaping text", "Reporting today's news", "Exact arithmetic", "Final hiring decisions"], answerIndex: 0, explanation: "Producing and transforming text is its core strength." },
      { prompt: "Which needs a human, not AI?", options: ["A nuanced judgment like who to promote", "Rewriting an email", "Summarizing notes", "Brainstorming names"], answerIndex: 0, explanation: "People and judgment calls stay human." },
      { prompt: "Why verify AI math?", options: ["It approximates rather than calculating exactly", "It refuses math", "It's always right", "Math is illegal"], answerIndex: 0, explanation: "LLMs estimate; check the numbers." },
      { prompt: "The core rule of AI's boundaries?", options: ["AI produces and reshapes; you supply facts and judgment", "AI replaces all thinking", "Never give AI context", "AI knows everything live"], answerIndex: 0, explanation: "Stay in the produce-vs-judge lane." },
    ],
  },
  "fundamentals-4": {
    lesson: `AI tools are powerful, but you're responsible for what goes in and what comes out. The biggest everyday risk is **leaking sensitive data**.

## Never paste into a public AI tool
- Customer or employee personal data (PII).
- Trade secrets, unreleased financials, passwords, contracts.
- Anything you couldn't post publicly.

Many consumer tools may use your input to improve their models - so treat the box like a public forum.

## A safe-use checklist
1. Would I be okay if this input were public? If not, **redact**.
2. Is there an approved/private AI tool at my org? Use it.
3. Did I review the output before sharing?

> **Example.** Instead of pasting a real contract, paste a redacted version: "Company A pays Company B $X monthly." You get help without exposing the deal.`,
    task: "Apply the safe-use checklist to three real scenarios you might use AI for. For each, say whether it passes or what you'd redact.",
    quiz: [
      { prompt: "What should never go into a public AI tool?", options: ["Customer PII, trade secrets, or confidential data", "A grammar question", "A public blog draft", "A made-up example"], answerIndex: 0, explanation: "Sensitive data may be retained or used for training." },
      { prompt: "First question in the safe-use checklist?", options: ["Would I be okay if this input were public?", "Is the model expensive?", "Is it Monday?", "Is the answer long?"], answerIndex: 0, explanation: "If you wouldn't make it public, redact it." },
      { prompt: "Safer way to get help with a real contract?", options: ["Paste a redacted version with placeholders", "Paste it in full", "Email it to the vendor", "Post it online"], answerIndex: 0, explanation: "Redaction keeps structure while protecting specifics." },
      { prompt: "Why treat the chat box like a public forum?", options: ["Consumer tools may use your input to train models", "It's connected to TV", "It prints your text", "It's always offline"], answerIndex: 0, explanation: "Assume inputs may be stored or reused." },
    ],
  },
  "fundamentals-5": {
    lesson: `The tool landscape is overwhelming. A simple map removes the paralysis - you mostly need to know the *category* for a task, then pick a popular tool in it.

## The main categories
- **General assistants** - ChatGPT, Claude, Gemini. Your default for writing, thinking, Q&A.
- **Research tools** - Perplexity, NotebookLM. Synthesize sources with citations.
- **Image tools** - Midjourney, DALL-E. Generate visuals.
- **Meeting/transcription** - Otter, Fireflies. Capture and summarize calls.
- **Coding tools** - Cursor, Replit, Copilot. Build and edit code.
- **Automation platforms** - Zapier, Make, n8n. Connect apps into workflows.

> **Match the task.** Need a contract summarized? General assistant. Need sourced research? A research tool. Need a recurring task to run itself? An automation platform.

You don't need them all - start with one general assistant and add categories as needs appear.`,
    task: "Name the right tool category for five different tasks you actually face, without looking them up.",
    quiz: [
      { prompt: "Best category for sourced research with citations?", options: ["Research tools (Perplexity, NotebookLM)", "Image tools", "Meeting transcription", "Automation platforms"], answerIndex: 0, explanation: "Research tools synthesize sources and cite them." },
      { prompt: "Your default tool for writing and Q&A?", options: ["A general assistant (ChatGPT, Claude, Gemini)", "An image generator", "A spreadsheet", "A transcription tool"], answerIndex: 0, explanation: "General assistants handle most everyday text tasks." },
      { prompt: "Which category makes a recurring task run itself?", options: ["Automation platforms (Zapier, Make, n8n)", "Image tools", "Research tools", "Coding tools"], answerIndex: 0, explanation: "Automation platforms connect apps into workflows." },
      { prompt: "Smart way to start with AI tools?", options: ["Begin with one general assistant; add categories as needed", "Buy every tool at once", "Avoid all of them", "Only use image tools"], answerIndex: 0, explanation: "Start simple and expand by need." },
    ],
  },
  "fundamentals-6": {
    lesson: `AI learns from human-created data, so it can absorb and even amplify human bias. Non-technical workers are often the last check before biased output reaches the public.

## How bias gets in
- **Training data** reflects the world's imbalances (who's represented, how groups are described).
- The model learns those patterns and reproduces them - sometimes exaggerated.

## What to watch for
- Stereotyped defaults (e.g., assuming a "nurse" is a woman, a "CEO" a man).
- Skewed image generation across race, gender, or age.
- Confident claims about groups of people.

> **Example.** Ask for "a photo of a doctor" and if results skew one gender, that's a training-data bias signal - not a coincidence.

You can't fix the model, but you can **spot it, name it, and correct the output** before it ships.`,
    task: "Find or recall an AI output about people. Identify at least two bias signals and explain what in the training process likely caused each.",
    quiz: [
      { prompt: "Where does AI bias mainly come from?", options: ["Patterns in human-created training data", "The wifi connection", "The user's mood", "Random chance only"], answerIndex: 0, explanation: "Models learn imbalances present in their training data." },
      { prompt: "Which is a bias signal to watch for?", options: ["Stereotyped defaults for jobs or groups", "Correct grammar", "A fast response", "A short answer"], answerIndex: 0, explanation: "Stereotyped defaults reveal learned bias." },
      { prompt: "Can you fix bias in the model itself?", options: ["No, but you can spot and correct the output", "Yes, by clicking a button", "Only by retraining it yourself", "It never has bias"], answerIndex: 0, explanation: "End users correct outputs; they don't retrain the model." },
      { prompt: "Why do non-technical workers matter here?", options: ["They're often the last check before output reaches people", "They write the model", "They own the data", "They set prices"], answerIndex: 0, explanation: "Human review is the practical safeguard." },
    ],
  },
  "fundamentals-7": {
    lesson: `Fear and hype both cause bad career decisions. A grounded view: AI tends to **automate** routine tasks, **augment** many others, and **leave** judgment, relationships, and creativity to humans.

## The three buckets
- **Automate** - repetitive, rule-based work (data entry, basic sorting).
- **Augment** - drafts, summaries, first-pass analysis where you still decide.
- **Human-only** - relationships, ethics, strategy, original creative direction.

> **Example.** A marketer's "write 10 subject line options" is augmented; "decide the brand's position" stays human; "paste weekly numbers into a report" can be automated.

The opportunity: let AI take the routine so you spend more time on the human-only work that's actually valued - and that's where careers grow.`,
    task: "List your main job responsibilities and sort each into 'will likely automate', 'AI will assist me', or 'AI won't touch this', with a reason for each.",
    quiz: [
      { prompt: "Which work does AI most fully automate?", options: ["Repetitive, rule-based tasks", "Strategy and ethics", "Relationship building", "Original creative direction"], answerIndex: 0, explanation: "Routine, rule-based work is the most automatable." },
      { prompt: "What does 'augment' mean here?", options: ["AI assists but you still decide", "AI replaces you entirely", "AI does nothing", "You avoid AI"], answerIndex: 0, explanation: "Augmentation keeps humans in the decision seat." },
      { prompt: "Which stays human-only?", options: ["Judgment, relationships, and creativity", "Sorting spreadsheet rows", "Reformatting text", "Generating draft options"], answerIndex: 0, explanation: "These need human judgment and connection." },
      { prompt: "The career opportunity in AI is to...", options: ["Let AI take routine work so you focus on valued human work", "Stop working", "Do only repetitive tasks", "Ignore the change"], answerIndex: 0, explanation: "Shifting time to human-only work is where growth is." },
    ],
  },
  "fundamentals-8": {
    lesson: `Traditional software is **deterministic**: same input, same output, every time. Generative AI is **probabilistic**: same input, *similar but not identical* output. People who miss this get burned.

## Why it happens
The model samples from likely next words, so there's natural variation. It's a feature (creativity, flexibility) and a risk (inconsistency).

## What it means for you
- Don't expect pixel-perfect repeatability. For consistency, lower "temperature", give examples, or use a fixed template.
- Always verify when the task needs exactness.

> **Example.** Run "summarize this in 3 bullets" twice and you'll get two valid but different summaries. A calculator never does that - an LLM always might.

Treat AI like a skilled collaborator who phrases things differently each time, not a machine stamping identical parts.`,
    task: "Run the same prompt twice and note what changed. Then describe one work task where that variability would matter and how you'd reduce it.",
    quiz: [
      { prompt: "Generative AI is 'probabilistic' - meaning?", options: ["Same input gives similar but not identical output", "Same input always gives identical output", "It never produces output", "It only works once"], answerIndex: 0, explanation: "Outputs vary because generation samples likely words." },
      { prompt: "Traditional software is deterministic because...", options: ["The same input always yields the same output", "It uses AI", "It's random", "It learns from data"], answerIndex: 0, explanation: "Deterministic = repeatable, identical results." },
      { prompt: "How can you increase consistency from AI?", options: ["Lower temperature, give examples, use a template", "Ask vaguely", "Run it once and hope", "Avoid context"], answerIndex: 0, explanation: "These constrain the variation." },
      { prompt: "Best analogy for an LLM?", options: ["A collaborator who phrases things differently each time", "A calculator", "A printer", "A clock"], answerIndex: 0, explanation: "It varies like a person, unlike a deterministic machine." },
    ],
  },
  "fundamentals-9": {
    lesson: `The single most important habit in AI use is keeping a **human in the loop**: AI generates, you verify, judge, and refine. AI is a collaborator, not an autopilot.

## Why it's foundational
Every framework on AI skills lists oversight and critical thinking as the top non-technical skill. The people who get burned are the ones who paste AI output straight into the world.

## Build a verification habit
Decide what you *always* check before sharing AI output:
- Facts and numbers
- Names, quotes, and links
- Tone and appropriateness for the audience

> **Example.** "Before I send anything AI helped write, I reread it as if I wrote it and confirm any fact I'd be embarrassed to get wrong."

A consistent verification habit is what separates confident AI users from the ones who get caught out.`,
    task: "Write down your personal verification habit - the specific things you'll always check before sharing or acting on AI output.",
    quiz: [
      { prompt: "What is the human-in-the-loop mindset?", options: ["AI generates; humans verify, judge, and refine", "AI runs fully on its own", "Humans do all the work", "Never use AI output"], answerIndex: 0, explanation: "Oversight is the core of safe, effective AI use." },
      { prompt: "Why is verification foundational?", options: ["It's the top non-technical AI skill and prevents mistakes", "It's optional decoration", "It slows you down for no reason", "It's only for engineers"], answerIndex: 0, explanation: "Critical oversight is consistently ranked most important." },
      { prompt: "What belongs in a verification habit?", options: ["Checking facts, names, links, and tone", "Nothing", "Only the font", "Only the length"], answerIndex: 0, explanation: "These are the things AI most often gets wrong." },
      { prompt: "Who gets burned by AI?", options: ["People who publish AI output without checking", "People who verify", "People who use templates", "People who give context"], answerIndex: 0, explanation: "Skipping the human check is the main risk." },
    ],
  },
  "fundamentals-10": {
    lesson: `If you can't speak the language, you're left out of decisions about AI at work. You don't need depth - just confident, correct use of the core terms.

## The essential dozen
- **Model** - the AI system (e.g., GPT, Claude). **Prompt** - your input. **Token** - a chunk of text the model reads/writes (you're billed by these).
- **Context window** - how much text the model can consider at once. **Hallucination** - confident wrong output.
- **Zero-shot / few-shot** - giving no examples vs. a few examples. **Temperature** - randomness/creativity dial.
- **RAG** - feeding the model your own documents. **Agent** - AI that uses tools to act. **Multimodal** - handles text + images/audio. **Fine-tuning** - extra training on specific data.

> **Use it in a sentence.** "Let's give it a few-shot example and lower the temperature so the format stays consistent."

You'll meet most of these again in later levels - here, just get comfortable saying them.`,
    task: "Use at least 5 of these terms correctly in a short written explanation, as if answering a colleague who asked 'what does that mean?'",
    quiz: [
      { prompt: "What is a 'token'?", options: ["A chunk of text the model reads or writes (and is billed by)", "A password", "A type of model", "A prompt template"], answerIndex: 0, explanation: "Usage is measured in tokens." },
      { prompt: "'Few-shot' means...", options: ["Giving the model a few examples", "Using it a few times", "A short prompt", "A small model"], answerIndex: 0, explanation: "Few-shot = providing example input/outputs." },
      { prompt: "The 'context window' is...", options: ["How much text the model can consider at once", "The app's window size", "The temperature", "The model's age"], answerIndex: 0, explanation: "It's the model's working memory limit." },
      { prompt: "An 'agent' is AI that...", options: ["Uses tools to take multi-step actions", "Only chats", "Cannot do anything", "Is a spreadsheet"], answerIndex: 0, explanation: "Agents act via tools toward a goal." },
    ],
  },
};
