import type { ModuleContent } from "@/types/shared";

// Level 1 - AI Foundations (Literacy). Topics 1-5.
export const fundamentals: Record<string, ModuleContent> = {
  "fundamentals-1": {
    lesson: `**Artificial intelligence (AI) is the broad field of building machines that perform tasks normally requiring human intelligence**, and today most "AI" products are powered by machine learning, deep learning, or generative AI, which are nested subfields rather than separate technologies. Machine learning lets systems learn patterns from data instead of following hand-coded rules, deep learning is machine learning using large neural networks, and generative AI is a slice of deep learning that creates new text, images, or code. In practice, that means when Gmail's spam filter flags a message it is using classic machine learning, when ChatGPT, Claude, or Gemini drafts an email it is generative AI, and when Netflix recommends a show it is a different recommendation algorithm. Knowing which kind of AI a product uses tells you what it can reliably do and where it tends to fail, which is the foundation for every other skill in this course.

## The family tree
- **Artificial intelligence (AI)** - the broad goal: machines doing things that seem to need intelligence.
- **Machine learning (ML)** - systems that learn patterns from data instead of being hand-coded (your spam filter).
- **Deep learning** - ML using large neural networks; powers image and language understanding.
- **Generative AI** - deep learning that _creates_ new text, images, audio, or code (ChatGPT, Claude, Midjourney).

Generative AI is a small branch of a big tree - but it's the branch that changed everyday work.

## Worked example - same word, different tech
> "AI flagged this as spam." -> a classic ML classifier. It sorts; it doesn't write.
> "AI wrote me a draft reply." -> generative AI. It produces new text.
> "AI recommended this show." -> a recommendation system. Different again.

Same word, three different tools, three different failure modes.

## Steal this - the 2-question test
When someone says "it's AI", ask:
\`\`\`
1. Is it learning from data, or following fixed rules?
2. Is it generating something new, or sorting/scoring things that exist?
\`\`\`
Those answers tell you what to expect and where it might break.

## Common mistakes
- **Thinking all AI is ChatGPT.** Most "AI" in products is narrow ML, not a chatbot.
- **Assuming "AI" means accurate.** It usually means "a pattern-matcher trained on data" - which can be confidently wrong.
- **Believing the label.** "AI-powered" is sometimes a rules engine with a logo.

## Good to know - the tools you'll meet
The big generative assistants are **ChatGPT** (OpenAI), **Claude** (Anthropic), and **Gemini** (Google). They're all LLMs and behave similarly, so the skills here transfer across all of them - no need to pick a favorite yet.`,
    task: "Starter: name one AI tool you use that is NOT a chatbot (autocomplete, maps, spam filter, photo tagging). Stretch: explain to someone why ChatGPT can write a poem but can't reliably tell you today's weather.",
    quiz: [
      { prompt: "Which of these is generative AI?", options: ["ChatGPT drafting an email", "A spam filter sorting mail", "A thermostat", "A calculator"], answerIndex: 0, explanation: "Generative AI creates new content; the others sort, control, or compute." },
      { prompt: "A product says it's 'AI-powered.' Best first question?", options: ["Is it learning from data, or following fixed rules?", "Is it expensive?", "Does it have an app?", "Who designed the logo?"], answerIndex: 0, explanation: "That distinguishes real ML from a relabelled rules engine." },
      { prompt: "Why can generative AI be confidently wrong?", options: ["It's a pattern-matcher trained on data, not a fact-checker", "It is broken", "The internet is slow", "It is always right"], answerIndex: 0, explanation: "It predicts plausible patterns, which can be false." },
      { prompt: "ChatGPT, Claude, and Gemini are mainly...", options: ["Large language models that behave similarly", "Totally different technologies", "Spam filters", "Spreadsheets"], answerIndex: 0, explanation: "They're all LLMs, so prompting skills transfer across them." },
    ],
  },

  "fundamentals-2": {
    lesson: `**A large language model (LLM) is a neural network trained on huge amounts of text that produces output by predicting the most likely next token**, one piece at a time, based on patterns it learned during training. Models like GPT-4 from OpenAI, Claude from Anthropic, and Gemini from Google DeepMind are not databases and do not look anything up by default, which is why they can sound confident while inventing facts, a failure called hallucination. The mechanism is statistical pattern completion, so the same prompt can yield slightly different wording each time, and accuracy drops on names, numbers, quotes, and recent events. For instance, ask a plain chatbot for an Einstein quote and it may produce a polished sentence Einstein never said. Understanding this single idea, that an LLM predicts likely text rather than retrieving facts, is what turns hallucinations and inconsistency from mysteries into things you can steer around.

## How it works (no math)
The model read a huge amount of text and learned which words tend to follow which. When you prompt it, it generates one likely word at a time. That's it. It's astonishingly good at language because language is full of patterns - and unreliable on facts because a plausible-sounding word isn't always a true one.

## Worked example
> **Prompt:** "Give me a quote about persistence from Albert Einstein."
> **Risk:** the model produces a clean, inspiring quote... that Einstein never said. It sounds right, so it generated it. That's a **hallucination** - confident output not grounded in fact.
> **Safer prompt:** "If you're not sure the quote is real, say so and give me a verified one with the source."

## Steal this - the trust dial
\`\`\`
Predicting words is reliable for: phrasing, structure, rewriting, brainstorming.
Predicting words is risky for: names, numbers, quotes, citations, recent events.
Rule: the more factual/verifiable the claim, the harder you check.
\`\`\`

## Common mistakes
- **Treating it as a database.** It has no live lookup unless the tool adds web access.
- **Expecting identical answers.** Ask twice, get two phrasings - it's sampling, not retrieving.
- **Trusting specifics.** Exact stats and quotes are where hallucinations hide.

## Good to know
Some tools now _do_ search the web (ChatGPT with browsing, **Perplexity**, Gemini) and cite sources - much safer for facts. Plain chat without browsing is working from memory of its training data, which has a cutoff date. Check whether the tool you're using can actually look things up.`,
    task: "Starter: ask an AI a factual question in your field and check one detail - was it right? Stretch: get it to hallucinate on purpose (ask for an obscure quote or stat), then ask it 'are you sure that's real?' and watch it walk it back.",
    quiz: [
      { prompt: "How does an LLM produce its answer?", options: ["By predicting the next likely word from learned patterns", "By searching a live database", "By copying Wikipedia exactly", "By asking a human"], answerIndex: 0, explanation: "It generates text token by token from patterns, not lookups." },
      { prompt: "It gives you an inspiring 'Einstein quote' you can't find anywhere. Likely?", options: ["A hallucination - it generated a plausible but fake quote", "A verified fact", "A live web result", "A spelling error"], answerIndex: 0, explanation: "Confident, unverifiable specifics are classic hallucinations." },
      { prompt: "When should you check AI output hardest?", options: ["On names, numbers, quotes, and recent events", "On its grammar", "On its friendliness", "Never"], answerIndex: 0, explanation: "Verifiable specifics are where it's least reliable." },
      { prompt: "A plain chatbot with no web access answers from...", options: ["Its training data, up to a cutoff date", "The live internet", "Your private files", "Today's news"], answerIndex: 0, explanation: "Without browsing it relies on what it was trained on." },
    ],
  },

  "fundamentals-3": {
    lesson: `**Generative AI is reliably strong at producing and reshaping language, including drafting emails, summarizing documents, explaining concepts, translating, and brainstorming, and reliably weak at live facts, exact arithmetic, citations, and judgment calls about people.** The reason traces back to how large language models work: tools like Claude, ChatGPT, and Gemini predict likely text rather than retrieve verified data, so they excel where fluent patterns matter and slip where precise truth matters. For instance, "draft a reply to this customer email" is a near-perfect fit, while "what is our current stock price" needs live data the model does not have, and "total these 38 numbers exactly" should go to a calculator or to ChatGPT's data-analysis mode that actually runs Python. The practical rule for everyday work is simple: AI produces and reshapes, you supply the facts and the judgment, and you verify anything you would bet money on.

## Great at
- **Drafting** - emails, posts, outlines, first versions of anything.
- **Transforming** - summarize, rewrite, simplify, translate, change tone or format.
- **Explaining** - break a topic down to any level.
- **Brainstorming** - many options, fast.

## Weak at (today)
- **Live facts** - prices, news, "what time is it" (unless the tool browses).
- **Exact math & counting** - it approximates; verify numbers.
- **Sources** - it can fabricate realistic citations.
- **Judgment** - ethics, strategy, people calls stay human.

## Worked example - sort these
> "Draft a reply to this email" -> **great fit.**
> "What's our current stock price?" -> **needs live data**, not the model's memory.
> "Total this column of 38 numbers exactly" -> **verify**, or use a real calculator/Sheets.
> "Decide who to promote" -> **human judgment.**

Same tool, four very different reliability levels.

## Steal this - the delegation rule
\`\`\`
AI produces and reshapes.  You supply the facts and the judgment.
Before using output, ask: would I bet money this fact is right?
If yes-but-unsure -> verify. If it's a judgment call -> that's your job.
\`\`\`

## Common mistakes
- **Asking it to be a calculator.** Use Sheets, or AI's data/code tools that actually compute.
- **Trusting a cited source without opening it.** Open the link; it may not exist.
- **Outsourcing the decision**, not just the draft.

## Good to know
**Claude** and **ChatGPT** are strong at the "produce and reshape" zone - drafting, summarizing, explaining. For numbers, ChatGPT's data-analysis mode and Gemini in Google Sheets actually run calculations rather than guessing. Pick the mode that fits the job.`,
    task: "Starter: take five real tasks from your week and label each 'AI handles well', 'AI assists - verify', or 'keep human'. Stretch: take one 'verify' task and write the exact check you'd do before trusting the output.",
    quiz: [
      { prompt: "Which task is the best fit for AI?", options: ["Drafting and reshaping text", "Reporting today's news from memory", "Exact arithmetic", "Final hiring decisions"], answerIndex: 0, explanation: "Producing and transforming language is its core strength." },
      { prompt: "You need an exact total of 38 numbers. Best move?", options: ["Use a calculator/Sheets, or AI's compute mode - then verify", "Trust the chatbot's estimate", "Ask it twice and average", "Skip it"], answerIndex: 0, explanation: "Plain LLMs approximate; use real computation and verify." },
      { prompt: "The delegation rule says AI provides ___ and you provide ___.", options: ["Production/reshaping; facts and judgment", "Facts; nothing", "Decisions; nothing", "Everything; nothing"], answerIndex: 0, explanation: "You stay responsible for facts and judgment." },
      { prompt: "AI gives a confident citation. What should you do?", options: ["Open the link - it may not exist", "Trust it because it looks real", "Add more citations", "Ignore the topic"], answerIndex: 0, explanation: "Fabricated sources look real; always verify them." },
    ],
  },

  "fundamentals-4": {
    lesson: `**Safe AI use means never pasting confidential or personally identifying data into a public AI tool, redacting anything sensitive before you ask for help, and reading every output before you act on it.** Free consumer tools like ChatGPT, Claude, and Gemini may use what you type to improve their models, and a single pasted contract, customer list, or set of API keys can leak in ways that are hard to undo. The mechanism is simple: text you send is stored, sometimes used for training, and can surface again in unpredictable ways. For instance, instead of pasting "Acme Corp pays Jane Doe $8,500 a month," replace it with "Company A pays Person B $X" and you keep the structural help without exposing the deal. Business tiers like ChatGPT Enterprise, Claude for Work, and Gemini for Workspace add privacy guarantees and admin controls, which is what teams handling client data should default to.

## Never paste into a public AI tool
- Customer or employee personal data (names, emails, IDs).
- Trade secrets, unreleased financials, source code you don't own the rights to share.
- Passwords, API keys, anything confidential.
- Basically: anything you wouldn't post on a public forum.

## Worked example - redact, don't expose
> **Risky:** paste a real contract: "Acme Corp pays Jane Doe $8,500/month..."
> **Safe:** "Company A pays Person B $X per month..." - you still get help with the structure and risks, without exposing the deal.

## Steal this - the safe-use checklist
\`\`\`
1. Would I be okay if this input were public? If not -> redact.
2. Is there an approved/private AI tool at work? Use it for sensitive stuff.
3. Did I read the OUTPUT before sharing it? (You own it.)
\`\`\`

## Common mistakes
- **Pasting the whole document** when you only needed help with the format.
- **Assuming "private chat" means private.** Free tools often train on inputs.
- **Shipping AI output unread** - including a hallucinated fact or wrong tone.

## Good to know
Many tools have a safer enterprise/business tier: **ChatGPT Enterprise/Team**, **Claude for Work**, and **Gemini for Workspace** typically do _not_ train on your data and add admin controls. If your company has one, use it for work content. On free consumer tiers, check the data settings - some let you turn off training.`,
    task: "Starter: apply the 3-line checklist to three things you'd use AI for; for each, say pass or what you'd redact. Stretch: find your AI tool's data-controls setting and decide whether to turn off training.",
    quiz: [
      { prompt: "What should never go into a public AI tool?", options: ["Confidential data like customer PII or trade secrets", "A grammar question", "A public blog draft", "A made-up example"], answerIndex: 0, explanation: "Sensitive data may be retained or used for training." },
      { prompt: "You need help with a real contract. Safer approach?", options: ["Paste a redacted version with placeholders", "Paste it in full", "Email it to the AI vendor", "Post it publicly first"], answerIndex: 0, explanation: "Redaction keeps the useful structure while protecting specifics." },
      { prompt: "First line of the safe-use checklist?", options: ["Would I be okay if this input were public?", "Is the model fast?", "Is it the weekend?", "Is the answer long?"], answerIndex: 0, explanation: "If it shouldn't be public, redact before pasting." },
      { prompt: "Which option usually does NOT train on your data?", options: ["Enterprise/business tiers (ChatGPT Enterprise, Claude for Work)", "Any free tool, always", "A public forum", "A shared password"], answerIndex: 0, explanation: "Business tiers add privacy guarantees and admin controls." },
    ],
  },

  "fundamentals-5": {
    lesson: `**The AI tools landscape sorts into a few clear categories: general-purpose assistants like ChatGPT, Claude, and Gemini for writing and thinking, sourced research tools like Perplexity and NotebookLM, image generators like Midjourney, DALL-E, and Ideogram, meeting notetakers like Otter, Fireflies, and Granola, coding tools like Cursor and GitHub Copilot, and automation platforms like Zapier, Make, and n8n.** Each category exists because a different shape of work benefits from a different model, interface, or set of integrations. For instance, asking ChatGPT to research a topic gives you a confident summary with no sources, while Perplexity returns the same answer with footnoted citations you can verify. The practical move for any new user is to pick one general assistant as a daily default, learn it deeply, and add a specialist only when a recurring task clearly needs one, which prevents the wasted spend that comes with collecting tools you never master.

## The map
- **General assistants** - ChatGPT, Claude, Gemini. Your default for writing, thinking, Q&A.
- **Research** - Perplexity, NotebookLM. Synthesize sources _with citations_.
- **Images** - Midjourney, DALL-E, Ideogram. Generate visuals.
- **Meetings/notes** - Otter, Fireflies, Granola. Transcribe and summarize calls.
- **Coding** - Cursor, GitHub Copilot, Replit. Build and edit software.
- **Automation** - Zapier, Make, n8n. Connect apps into workflows (Level 4).

## Worked example - match the task
> "Summarize this contract" -> **general assistant** (Claude is great with long docs).
> "What do experts say about X, with sources?" -> **research tool** (Perplexity).
> "Turn this call into action items" -> **meeting tool**, or paste the transcript into an assistant.
> "Make this run automatically every day" -> **automation** (Zapier/n8n).

## Steal this - your starter stack
\`\`\`
Default assistant: one of ChatGPT / Claude / Gemini (pick one, learn it deeply).
Add when needed:   Perplexity (sourced research), a meeting tool, Zapier (automation).
Rule: master one general assistant before collecting specialists.
\`\`\`

## Common mistakes
- **Tool-hopping** instead of getting good at one assistant.
- **Using a chatbot for sourced research** when a research tool would cite real links.
- **Paying for ten tools** you use once.

## Good to know
The three general assistants are close in quality and trade leads often. **Claude** is loved for writing and long documents, **ChatGPT** for its huge feature set and data analysis, **Gemini** for tight Google Workspace integration. Any of them is a fine default - the skills you build here work across all three.`,
    task: "Starter: name the right tool category for five real tasks without looking them up. Stretch: write your personal starter stack (one default assistant + 2 specialists you'd add) and one sentence on why.",
    quiz: [
      { prompt: "Best category for sourced research with citations?", options: ["Research tools (Perplexity, NotebookLM)", "Image tools", "Meeting tools", "Automation platforms"], answerIndex: 0, explanation: "Research tools synthesize sources and cite them." },
      { prompt: "The smart way to start with AI tools?", options: ["Master one general assistant, add specialists by need", "Buy every tool at once", "Avoid all of them", "Only use image tools"], answerIndex: 0, explanation: "Depth in one assistant beats shallow tool-hopping." },
      { prompt: "Which category makes a task run automatically every day?", options: ["Automation platforms (Zapier, Make, n8n)", "Image tools", "Research tools", "Coding tools"], answerIndex: 0, explanation: "Automation tools schedule and connect app workflows." },
      { prompt: "Among ChatGPT, Claude, and Gemini, which should you pick first?", options: ["Any one - they're close, and skills transfer", "Only ChatGPT works", "You must use all three at once", "None are usable"], answerIndex: 0, explanation: "They're comparable; pick one and learn it well." },
    ],
  },
};
