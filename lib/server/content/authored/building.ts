import type { ModuleContent } from "@/types/shared";

// Level 5 - Advanced & Specialized AI (Mastery). Topics 45-50.
export const building: Record<string, ModuleContent> = {
  "building-1": {
    lesson: `**Retrieval-augmented generation (RAG) is a technique where, instead of relying only on what a large language model learned during training, you first retrieve the most relevant chunks from your own documents and paste them into the prompt as context**, so the model answers from your knowledge with citations. The mechanism has four steps: prepare your docs by splitting them into chunks and storing them in a search index (often a vector database like Pinecone or pgvector that searches by meaning), retrieve the few most relevant chunks for a question, augment the prompt with those chunks, then generate the grounded answer. For instance, asking "what is our refund window" makes the system fetch the policy chunk and the model answers from your real policy. NotebookLM, Custom GPTs, and Claude Projects let you try RAG today without code, while developers build with LangChain or LlamaIndex. RAG is cheaper and more updatable than fine-tuning for "answer from our docs" problems.

## How it works (4 steps)
\`\`\`
1. Prepare  - split your docs into chunks; store them in a search index
              (often a "vector database" that searches by meaning, not keywords).
2. Retrieve - for a question, find the few most relevant chunks.
3. Augment  - paste those chunks into the prompt as context.
4. Generate - the model answers using them, and can cite which chunk it used.
\`\`\`

## Worked example
> **Question:** "What's our refund window?"
> RAG retrieves the policy chunk ("refunds within 30 days...") -> the model answers from _your real policy_, not a guess, and can point to the source.

## Steal this - keep RAG honest
\`\`\`
System instruction: "Answer ONLY from the provided context.
If the answer isn't there, say you don't know. Cite the source."
\`\`\`

## Common mistakes (and the fix)
- **Garbage retrieval -> garbage answer.** **Fix:** good chunking + the right index matter more than the model.
- **No grounding instruction.** **Fix:** force "answer only from context".
- **Reaching for fine-tuning** for a knowledge problem. **Fix:** RAG is cheaper and updatable for "answer from our docs".

## Good to know
You don't have to code it: **NotebookLM** is RAG you can use today (upload docs, ask grounded questions), and **Custom GPTs** / **Claude Projects** let you attach files for the same effect. Builders use vector DBs (Pinecone, pgvector) + frameworks (LangChain, LlamaIndex).`,
    task: "Starter: explain in plain English how RAG differs from a normal prompt, and one use case where it changes the answer. Stretch: upload a set of your own docs to NotebookLM (or a Custom GPT) and ask a question only those docs can answer.",
    quiz: [
      { prompt: "What problem does RAG solve?", options: ["The model doesn't know your private or current data", "The model writes slowly", "The model can't form sentences", "Prompts are impossible"], answerIndex: 0, explanation: "RAG injects your relevant data at answer time." },
      { prompt: "RAG's steps in order?", options: ["Prepare/index, retrieve, augment, generate", "Generate then index", "Delete then guess", "Only generate"], answerIndex: 0, explanation: "Index docs, retrieve chunks, add to prompt, generate." },
      { prompt: "Best instruction to keep RAG honest?", options: ["'Answer only from the provided context; else say you don't know'", "'Make something up'", "'Ignore the context'", "'Cite a random source'"], answerIndex: 0, explanation: "Grounding reduces hallucination." },
      { prompt: "Easiest way to try RAG with no code?", options: ["NotebookLM, a Custom GPT, or a Claude Project with files", "Write a vector database from scratch", "A spreadsheet", "A spam filter"], answerIndex: 0, explanation: "These give RAG behavior with uploaded documents." },
    ],
  },

  "building-2": {
    lesson: `**Building a no-code AI chatbot means connecting an assistant to a specific document source through RAG, giving it a narrow scope, and setting it to gracefully admit uncertainty with a human handoff**, so non-developers can ship internal FAQ bots, onboarding guides, or policy assistants without writing code. The mechanism is platform-provided: Custom GPTs (ChatGPT), Claude Projects, and dedicated builders like Flowise, Voiceflow, and n8n let you upload documents, write a system prompt that defines the scope ("answer only from the handbook"), and share the bot via link or embed. For instance, an HR assistant scoped to the employee handbook can answer questions about leave, benefits, and policies, while saying "I am not sure, contact HR" when a question falls outside scope. The hard part is not building, it is testing and scoping: start narrow, test with five real questions including a tricky edge case, and only expand the scope once the bot is solid.

## Worked example - an HR assistant
\`\`\`
Source:  the employee handbook (uploaded)
Scope:   "Answer questions about leave, benefits, and policies."
Behavior:"Answer only from the handbook. If unsure, say so and offer to contact HR."
Test:    ask 5 real questions, including a tricky/edge one.
\`\`\`

## Steal this - chatbot checklist
\`\`\`
[ ] One clear job (not "knows everything")
[ ] A document source via RAG
[ ] A grounding + graceful-failure instruction
[ ] 5+ real test questions, including edge cases
[ ] A note of where it fails -> narrow scope or improve the docs
\`\`\`

## Common mistakes (and the fix)
- **Unbounded scope.** **Fix:** narrow it; a focused bot is a reliable bot.
- **No "I don't know".** **Fix:** make it admit uncertainty and hand off to a human.
- **Shipping without testing.** **Fix:** real-question testing reveals the failure points.

## Good to know
No-code builders: **Custom GPTs** (attach files, share), **Claude Projects**, and dedicated tools like **Flowise**, **Voiceflow**, or **n8n**. The hard part isn't building - it's testing and scoping. Start narrow, test with real users, expand only when it's solid.`,
    task: "Starter: plan a chatbot - pick a document source, define its scope, list 5 test questions, and note likely failure points. Stretch: build it as a Custom GPT (attach a doc) and test it with those 5 questions.",
    quiz: [
      { prompt: "What grounds a no-code chatbot in real answers?", options: ["A document source via RAG", "Guessing", "A bigger logo", "More colors"], answerIndex: 0, explanation: "Connected docs let it answer from real content." },
      { prompt: "What's the hard part of building a chatbot?", options: ["Testing and scoping it", "Picking a name", "The logo", "The font"], answerIndex: 0, explanation: "Real-question testing reveals failure points." },
      { prompt: "Good scope for a first chatbot?", options: ["Narrow and specific (e.g., the leave policy)", "Knows everything", "No defined scope", "All company data"], answerIndex: 0, explanation: "Narrow scope is reliable and testable." },
      { prompt: "What should it do when unsure?", options: ["Say so and offer a human handoff", "Make up an answer", "Crash", "Stay silent"], answerIndex: 0, explanation: "Graceful failure builds trust." },
    ],
  },

  "building-3": {
    lesson: `**Intermediate AI data analysis means connecting real datasets to a tool that runs actual computation, then prompting for trends, anomalies, and a recommended action with a clear "show your work" requirement**, going past one-off copy-paste into repeatable analysis you can defend. The strongest non-developer combo today is ChatGPT Data Analysis (which writes and runs real Python on your uploaded file, so the math is computed rather than predicted) and Gemini in Google Sheets or BigQuery (which brings AI to where your data lives). The mechanism that keeps it honest: describe the tabs and columns up front, ask for trends plus anomalies (not just a summary), require a recommendation tied to the data, and have it show how it computed the key numbers. For instance, "upload this multi-tab sales workbook, flag the region with the unusual dip and a likely cause, output a one-page findings brief with two recommended actions" produces something you can present. Verify one number by hand before sharing.

## Worked example
\`\`\`
[Upload a multi-tab sales workbook]
- Analyze across tabs: top trends, any anomalies.
- Flag the region with an unusual dip and a likely cause to investigate.
- Output a 1-page findings brief with 2 recommended actions.
- Show how you computed the key numbers.
\`\`\`

## Steal this - analysis workflow
\`\`\`
1. Describe the data (tabs, columns) up front.
2. Ask for trends + anomalies, not just a summary.
3. Demand a recommendation tied to the data.
4. "Show your work" on key numbers, then spot-check one.
\`\`\`

## Common mistakes (and the fix)
- **Trusting the conclusion blindly.** **Fix:** you own it - verify the setup and one number.
- **Vague asks.** **Fix:** specify the calculation and the output format.
- **Sensitive data in public tools.** **Fix:** anonymize or use a private/enterprise option.

## Good to know
**ChatGPT's data analysis** runs real Python on your files (trustworthy math, not guessing), and **Gemini in Sheets/BigQuery** brings AI to where your data already lives. For recurring dashboards, pair analysis with an automation (Level 4) that refreshes it on a schedule.`,
    task: "Starter: run an AI-assisted analysis on a multi-tab spreadsheet and produce a findings brief with 2 data-backed recommendations. Stretch: have it show its calculation for one key figure and verify it by hand.",
    quiz: [
      { prompt: "Intermediate AI data work means...", options: ["Connecting real data for repeatable insight and anomaly detection", "Only copy-pasting once", "Avoiding data", "Guessing trends"], answerIndex: 0, explanation: "It goes beyond one-off copy-paste." },
      { prompt: "The enduring rule with AI data analysis?", options: ["Verify and understand how it got the number", "Trust it blindly", "Skip the chart", "Never look"], answerIndex: 0, explanation: "You own the conclusion." },
      { prompt: "Why is ChatGPT's data-analysis math trustworthy-ish?", options: ["It runs real code rather than guessing", "It never errs", "It avoids numbers", "It's offline"], answerIndex: 0, explanation: "Actual computation beats predicted numbers - still verify." },
      { prompt: "A good analysis prompt asks for...", options: ["Trends, anomalies, and data-backed recommendations", "'Something interesting'", "A poem", "The font"], answerIndex: 0, explanation: "Specific asks produce actionable output." },
    ],
  },

  "building-4": {
    lesson: `**Vibe coding is the practice of building working software by describing it in plain language and iterating against errors, using AI coding tools like Cursor, Claude Code, GitHub Copilot, Replit, or Lovable**, where clear thinking and relentless testing matter more than memorizing syntax. The mechanism is a tight loop: describe the goal, inputs, and outputs in plain English, let the AI generate the code, run it, paste any error back to the AI for a fix, and repeat in small steps. Cursor and GitHub Copilot live inside a real editor (VS Code style), while Replit, Lovable, and Bolt build and host whole apps from a description, and Claude and ChatGPT are great for scripts and explaining existing code. For instance, "build a web page that takes a list of names and emails one per line and outputs a formatted CSV with a copy button" works as a starting prompt, then you iterate until it runs. Build small, test always.

## Worked example - build in small steps
\`\`\`
"Build a web page that takes a list of names and emails (one per line)
and outputs a formatted CSV with columns Name, Email. Add a 'copy' button."
\`\`\`
Run it, see what's wrong, paste the error back, iterate until it works.

## Steal this - the vibe-coding loop
\`\`\`
1. Describe the goal, inputs, and outputs clearly (it's prompting, applied to code).
2. Build one small piece; run it.
3. Hit an error? Paste it back and ask for the fix.
4. Repeat. Test each piece before adding the next.
\`\`\`

## Common mistakes (and the fix)
- **Asking for the whole app at once.** **Fix:** build and test in small steps.
- **Not running it.** **Fix:** test constantly; working > looks-right.
- **Giving up on errors.** **Fix:** errors are feedback - paste them back.

## Good to know
**Cursor** and **GitHub Copilot** assist inside a real editor; **Replit** and **Lovable/Bolt** build and host apps from a description; **Claude** and **ChatGPT** are great for scripts and explaining code. You don't need to memorize syntax - you need to describe clearly and test relentlessly.`,
    task: "Starter: build and run one working tool (a script, a simple page, or an automation) from a plain-language description. Stretch: when it breaks, paste the error back and iterate until it actually runs.",
    quiz: [
      { prompt: "What is 'vibe coding'?", options: ["Building software by describing it in plain language", "Memorizing syntax", "Avoiding all tools", "Only for experts"], answerIndex: 0, explanation: "You describe; AI helps build." },
      { prompt: "How should you build with AI coding tools?", options: ["Small steps, run and test each piece", "All at once, never test", "Without describing the goal", "By guessing"], answerIndex: 0, explanation: "Incremental, tested steps work best." },
      { prompt: "When something breaks, you should...", options: ["Paste the error back and ask for a fix", "Give up", "Ignore it", "Delete everything"], answerIndex: 0, explanation: "Errors are feedback for the next iteration." },
      { prompt: "What do you really need to vibe code?", options: ["Clear thinking and willingness to test", "A CS degree", "Memorized syntax", "Nothing"], answerIndex: 0, explanation: "Clarity and testing beat syntax recall." },
    ],
  },

  "building-5": {
    lesson: `**Teaching AI to others is the clearest signal you have mastered the material yourself, because it forces you to organize what you know, exposes gaps in your understanding, and turns a personal skill into team capability.** Every serious AI fluency framework treats "can teach it" as the top mastery indicator. The mechanism for a useful twenty-minute session is short and concrete: ask the learner their actual task ("the email you dread writing"), do it together with one prompt to ChatGPT or Claude so they get a real win in ten minutes, show the four-part prompt structure on that real example, answer their privacy and accuracy concerns honestly, and leave them with one reusable template they will actually use. For instance, helping a teammate draft a polite decline turns into both a finished email and a template they keep. Skip jargon, use their context not abstract demos, and address worries directly because that is where trust is built.

## Worked example - a 20-minute session
\`\`\`
1. Ask their actual task ("the email you dread writing").
2. Do it together with one prompt - get them a win in 10 minutes.
3. Show the four-part prompt structure on that real example.
4. Answer their worries (privacy, accuracy) honestly.
5. Send them one reusable template to keep.
\`\`\`

## Steal this - teaching principles
\`\`\`
- Meet them where they are - no jargon.
- Show, don't lecture - a real task in the first 10 minutes.
- Use THEIR context, not abstract demos.
- Address the "but what about...?" - that's where trust is built.
- Leave them with one thing they'll actually reuse.
\`\`\`

## Common mistakes (and the fix)
- **Lecturing.** **Fix:** get them doing immediately.
- **Abstract examples.** **Fix:** use their real work.
- **Dodging concerns.** **Fix:** answer privacy/accuracy honestly - it builds trust.

## Good to know
The "explain it to a colleague" test is the same bar this whole journey uses for mastery. If you can get a true beginner to one useful AI result and answer their follow-ups accurately, you've genuinely learned the material - and that's a rare, valued skill at work.`,
    task: "Starter: run a 20-minute session with someone new to AI - get them to complete one useful task and answer their questions. Stretch: hand them a reusable template and have them use it back to you correctly.",
    quiz: [
      { prompt: "Why is teaching a sign of mastery?", options: ["It forces you to organize knowledge and reveals gaps", "It's easy", "It's unrelated to skill", "It avoids learning"], answerIndex: 0, explanation: "Teaching deepens and tests understanding." },
      { prompt: "Best way to teach a beginner AI?", options: ["Get them a real win in the first 10 minutes", "Lecture for an hour", "Use abstract demos", "Start with jargon"], answerIndex: 0, explanation: "An early real win builds confidence." },
      { prompt: "What builds a learner's trust?", options: ["Honestly answering privacy and accuracy concerns", "Ignoring questions", "Hiding the risks", "Rushing"], answerIndex: 0, explanation: "Addressing worries openly builds trust." },
      { prompt: "Which examples should you use when teaching?", options: ["The learner's own real context", "Abstract textbook ones", "None", "Random topics"], answerIndex: 0, explanation: "Personal relevance drives engagement." },
    ],
  },

  "building-6": {
    lesson: `**A long-term AI learning system is a small, sustainable habit for staying current as the tools change: a few trusted sources skimmed on a fixed cadence, a rule for evaluating new tools, a maintained prompt library, and a hype filter that keeps you from chasing every shiny launch.** The mechanism is a twenty-minute weekly ritual rather than a course: skim two or three trusted sources (the official blogs of OpenAI, Anthropic, and Google DeepMind for what is actually shipping, plus a curated newsletter like Ben's Bites or Latent Space for the broader picture), note one thing to try next week, update your prompt library if something improved, and decide whether each new trend solves a real problem you have. For instance, a Friday afternoon ritual takes twenty minutes and beats two hours of weekday doomscrolling. A certificate ages, a learning habit compounds, and that is the actual mark of mastery.

## Worked example - a weekly ritual
\`\`\`
Every Friday, 20 minutes:
- Skim 2 trusted sources for what changed.
- Note ONE thing to try next week.
- Update my prompt library if I found something better.
- Decide: adopt this trend, or ignore it for now?
\`\`\`

## Steal this - your learning system
\`\`\`
Sources:  2-3 trusted newsletters/communities (skim weekly, don't doomscroll).
Evaluate: "Does this solve a real problem I have? Worth switching?"
Library:  keep your prompt templates current.
Filter:   adopt a trend only once it proves useful in YOUR work.
\`\`\`

## Common mistakes (and the fix)
- **Chasing every shiny tool.** **Fix:** the hype filter - wait for real usefulness.
- **Doomscrolling AI news.** **Fix:** a few curated sources, a fixed cadence.
- **Letting your prompt library rot.** **Fix:** update it as you learn.

## Good to know
Good signal-over-noise sources include a couple of reputable newsletters and the official blogs of **OpenAI**, **Anthropic**, and **Google DeepMind** for what's actually shipping. The aim isn't to know everything - it's a sustainable habit that keeps you capable as the tools change. That's mastery: you can now learn the next thing on your own.`,
    task: "Starter: write your learning system - your weekly sources, how you'll evaluate new tools, your prompt library, and your adopt-vs-ignore rule. Stretch: run your first 20-minute weekly review and note one thing to try.",
    quiz: [
      { prompt: "Why is a learning system the final skill?", options: ["AI changes faster than any course; a habit keeps you current", "Tools never change", "Credentials never age", "Learning is one-time"], answerIndex: 0, explanation: "A renewing habit beats a static credential." },
      { prompt: "What's a 'hype filter'?", options: ["A rule for when to adopt vs ignore a trend", "A type of model", "A newsletter", "A password"], answerIndex: 0, explanation: "It stops you chasing every shiny tool." },
      { prompt: "How should you handle sources?", options: ["A few trusted ones, skimmed on a fixed cadence", "Doomscroll everything", "Ignore all news", "Only one tweet"], answerIndex: 0, explanation: "Curated, regular skimming is sustainable." },
      { prompt: "How to evaluate a new tool?", options: ["Does it solve a real problem worth switching for?", "Is it trending?", "Does it have a logo?", "Is it new?"], answerIndex: 0, explanation: "Adopt based on real value, not novelty." },
    ],
  },
};
