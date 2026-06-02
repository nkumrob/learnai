import type { ModuleContent } from "@/types/shared";

// Level 5 - Advanced & Specialized AI (Mastery). Topics 45-50.
export const building: Record<string, ModuleContent> = {
  "building-1": {
    lesson: `A normal LLM only knows its training data. **RAG (Retrieval-Augmented Generation)** connects it to *your* documents so it answers from your knowledge.

## The flow
1. **Prepare** - split your docs into chunks, store them in a search index (often a *vector database* that searches by meaning).
2. **Retrieve** - for a question, find the most relevant chunks.
3. **Augment** - paste those chunks into the prompt.
4. **Generate** - the model answers using them.

> **Example.** "What's our refund window?" -> retrieve the policy chunk ("within 30 days") -> answer grounded in your real policy, not a guess.

RAG = an open-book exam: the model is smart, but you hand it the right page. It powers internal chatbots and document Q&A. Keep it honest: "answer only from the provided context; if it's not there, say you don't know."`,
    task: "Explain in plain language what RAG does differently from a standard prompt, and describe one real use case where it would change the output quality significantly.",
    quiz: [
      { prompt: "What problem does RAG solve?", options: ["The model doesn't know your private/current data", "The model writes slowly", "The model can't form sentences", "Prompts are impossible"], answerIndex: 0, explanation: "RAG injects your relevant data." },
      { prompt: "RAG's steps in order?", options: ["Prepare/index, retrieve, augment, generate", "Generate then index", "Delete then guess", "Only generate"], answerIndex: 0, explanation: "Index, retrieve relevant chunks, add to prompt, generate." },
      { prompt: "Best analogy for RAG?", options: ["An open-book exam - hand it the right page", "A closed memory test", "A coin flip", "A calculator"], answerIndex: 0, explanation: "It supplies reference material at answer time." },
      { prompt: "Instruction that keeps RAG honest?", options: ["'Answer only from the provided context, else say you don't know'", "'Make something up'", "'Ignore the context'", "'Cite a random source'"], answerIndex: 0, explanation: "Grounding reduces hallucination." },
    ],
  },
  "building-2": {
    lesson: `Chatbots are the most visible AI application - and you can now build a useful one with no-code tools (Flowise, Voiceflow, n8n) connected to your documents via RAG.

## What it takes
- **A document source** - FAQ, policies, product docs.
- **RAG retrieval** - so it answers from those docs.
- **A clear scope** - "answers questions about our return policy", not "knows everything".
- **Failure handling** - "if unsure, say so and offer a human".

> **Example.** An internal HR assistant connected to the employee handbook: ask "how many vacation days do I get?" and it answers from the real policy.

The hard part isn't building - it's testing. Try real questions, find where it fails, and narrow its scope or improve the source docs.`,
    task: "Plan a chatbot: pick a document source, define its scope, list five real questions you'd test it with, and note its likely failure points.",
    quiz: [
      { prompt: "What grounds a no-code chatbot in real answers?", options: ["A document source via RAG retrieval", "Guessing", "A bigger logo", "More colors"], answerIndex: 0, explanation: "Connected docs let it answer from real content." },
      { prompt: "What's the hard part of building a chatbot?", options: ["Testing and finding where it fails", "Picking a name", "The logo", "The font"], answerIndex: 0, explanation: "Real-question testing reveals failure points." },
      { prompt: "Good scope for a first chatbot?", options: ["Narrow and specific (e.g., return policy)", "Knows everything", "No defined scope", "All company data"], answerIndex: 0, explanation: "Narrow scope is reliable and testable." },
      { prompt: "What should it do when unsure?", options: ["Say so and offer a human", "Make up an answer", "Crash", "Stay silent"], answerIndex: 0, explanation: "Graceful failure builds trust." },
    ],
  },
  "building-3": {
    lesson: `Beyond copy-pasting a table, intermediate data work means connecting real data to AI for repeatable insight, anomaly detection, and simple dashboards.

## What's possible
- Connect spreadsheets, CSVs, or a database to an AI tool.
- "Analyze this multi-tab sheet: top trends, anomalies, and two recommendations."
- Generate a chart or a recurring summary.

> **Example.** A monthly sales export -> AI flags an unusual dip in one region and recommends investigating shipping delays - a finding you'd have missed scanning rows.

Data fluency is one of the most in-demand AI-adjacent skills. The rule stays: **verify** the analysis and understand how it reached a number before you act. AI assists; you own the conclusion.`,
    task: "Take a multi-tab spreadsheet, run an AI-assisted analysis, and produce a findings brief with at least two actionable recommendations backed by the data.",
    quiz: [
      { prompt: "Intermediate AI data work means...", options: ["Connecting real data for repeatable insight and anomaly detection", "Only copy-pasting once", "Avoiding data", "Guessing trends"], answerIndex: 0, explanation: "It goes beyond one-off copy-paste." },
      { prompt: "The enduring rule with AI data analysis?", options: ["Verify and understand how it got the number", "Trust it blindly", "Skip the chart", "Never look"], answerIndex: 0, explanation: "You own the conclusion." },
      { prompt: "A good analysis prompt asks for...", options: ["Trends, anomalies, and recommendations", "'Something interesting'", "A poem", "The font"], answerIndex: 0, explanation: "Specific asks produce actionable output." },
      { prompt: "Why is data fluency valuable?", options: ["It's one of the most in-demand AI-adjacent skills", "It's obsolete", "It's only for engineers", "It's banned"], answerIndex: 0, explanation: "Data skills are sought across industries." },
    ],
  },
  "building-4": {
    lesson: `"Vibe coding" means building working software by describing it in plain language - using tools like Cursor, Replit, or Claude - without being a trained developer.

## What you can build
- A small script to automate a personal chore.
- A simple web app or internal tool.
- A custom calculator or form.

## How to do it well
- Describe the goal, inputs, and outputs clearly (it's prompting, applied to code).
- Build in small steps; run and test each piece.
- When something breaks, paste the error back and ask for a fix.

> **Example.** "Build a web page that takes a list of names and emails and outputs a formatted CSV." Iterate until it runs.

You don't need to memorize syntax - you need clear thinking and the willingness to test. Non-developers can now solve their own software problems.`,
    task: "Build and run one working tool (a script, a simple web app, or an automation) that solves a real problem - starting from a plain-language description.",
    quiz: [
      { prompt: "What is 'vibe coding'?", options: ["Building software by describing it in plain language", "Memorizing syntax", "Avoiding all tools", "Only for experts"], answerIndex: 0, explanation: "You describe; AI helps build." },
      { prompt: "How should you build with AI coding tools?", options: ["Small steps, run and test each piece", "All at once, never test", "Without describing the goal", "By guessing"], answerIndex: 0, explanation: "Incremental, tested steps work best." },
      { prompt: "When something breaks, you should...", options: ["Paste the error back and ask for a fix", "Give up", "Ignore it", "Delete everything"], answerIndex: 0, explanation: "Errors are feedback for the next iteration." },
      { prompt: "What do you really need to vibe code?", options: ["Clear thinking and willingness to test", "A CS degree", "Memorized syntax", "Nothing"], answerIndex: 0, explanation: "Clarity and testing matter more than syntax." },
    ],
  },
  "building-5": {
    lesson: `Teaching others is the clearest signal of real mastery - it forces you to organize what you know and reveals your own gaps.

## How to teach AI well
- **Meet them where they are** - no jargon; start from their actual task.
- **Show, don't lecture** - have them do one useful thing with AI in the first 10 minutes.
- **Use their context** - their email, their report, not an abstract demo.
- **Answer the "but what about..."** - the worries (privacy, accuracy) are where trust is built.

> **Example.** Sit with a colleague, take a real email they dread, and prompt it together. Their first "oh, that's it?" moment is the lesson.

If you can get a true beginner to a win and answer their follow-ups accurately, you've mastered the material.`,
    task: "Run a 20-minute informal session with someone who's never used AI: get them to complete one useful task and answer their follow-up questions accurately.",
    quiz: [
      { prompt: "Why is teaching a sign of mastery?", options: ["It forces you to organize knowledge and reveals gaps", "It's easy", "It's unrelated to skill", "It avoids learning"], answerIndex: 0, explanation: "Teaching deepens and tests understanding." },
      { prompt: "Best way to teach a beginner AI?", options: ["Have them do one useful thing in the first 10 minutes", "Lecture for an hour", "Use abstract demos", "Start with jargon"], answerIndex: 0, explanation: "An early real win builds confidence." },
      { prompt: "What builds a learner's trust?", options: ["Answering their worries about privacy and accuracy", "Ignoring questions", "Hiding the risks", "Rushing"], answerIndex: 0, explanation: "Addressing concerns honestly builds trust." },
      { prompt: "Use which examples when teaching?", options: ["The learner's own real context", "Abstract textbook ones", "None", "Random topics"], answerIndex: 0, explanation: "Personal relevance drives engagement." },
    ],
  },
  "building-6": {
    lesson: `AI changes faster than any course can track. The final meta-skill is a **self-renewing learning system** - so you stay current without chasing every shiny tool.

## Build your system
- **Sources** - 2-3 trusted newsletters or communities; skim weekly, don't doomscroll.
- **A way to evaluate new tools** - "Does it solve a real problem I have? Is it worth switching?"
- **A maintained prompt library** - update it as you learn.
- **A hype filter** - a rule for when to adopt vs. ignore a trend (wait for it to prove useful in *your* work).

> **Example.** "Every Friday, 20 minutes: skim two newsletters, note one thing to try, update my prompt doc."

A static credential ages fast; a learning habit compounds. This is how you stay capable for the long run.`,
    task: "Document your long-term AI learning system: your weekly sources, how you'll evaluate new tools, your prompt library, and your rule for when to adopt vs. ignore a trend.",
    quiz: [
      { prompt: "Why is a learning system the final skill?", options: ["AI changes faster than any course; habits keep you current", "Tools never change", "Credentials never age", "Learning is one-time"], answerIndex: 0, explanation: "A renewing habit beats a static credential." },
      { prompt: "What's a 'hype filter'?", options: ["A rule for when to adopt vs. ignore a trend", "A type of model", "A newsletter", "A password"], answerIndex: 0, explanation: "It stops you chasing every shiny tool." },
      { prompt: "How should you handle sources?", options: ["A few trusted ones, skimmed weekly", "Doomscroll everything", "Ignore all news", "Only one tweet"], answerIndex: 0, explanation: "Curated, regular skimming stays current sustainably." },
      { prompt: "How to evaluate a new tool?", options: ["Does it solve a real problem worth switching for?", "Is it trending?", "Does it have a logo?", "Is it new?"], answerIndex: 0, explanation: "Adopt based on real value, not novelty." },
    ],
  },
};
