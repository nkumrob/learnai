import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 21-27.
export const productivity: Record<string, ModuleContent> = {
  "productivity-1": {
    lesson: `**TL;DR - Let AI write the first draft, then you steer. Editing 80% of a draft beats writing 100% from a blank page.**

## Why it matters
Writing is the most widely useful AI skill - nearly a fifth of US workers already use AI for it, mostly drafting and editing. The blank page is the slow part; reacting to a draft is fast.

## Worked example - rough notes to draft
\`\`\`
Turn these notes into a warm, under-120-word email to a client:
- need to push Thursday's call to Friday
- apologize briefly, offer two Friday times
\`\`\`
You get a near-final email in seconds. Then refine: "warmer", "shorter".

## Steal this - the three writing moves
\`\`\`
Draft:  "Draft a [type] from these notes: [paste]. [length] [tone]."
Edit:   "Tighten this by half, keep the key points."  /  "Fix grammar only - keep my wording."
Match:  paste 2 of your past messages -> "match this voice."
\`\`\`

## Common mistakes (and the fix)
- **Shipping the first draft** unread. **Fix:** you're the editor - always review.
- **"Make it better"** with no direction. **Fix:** name the change (shorter, warmer, add an ask).
- **Robotic voice.** **Fix:** give it samples of your writing to mirror.

## Good to know
For everyday writing, **ChatGPT**, **Claude**, and **Gemini** are all excellent; **Claude** is a favorite for natural tone and long pieces. In-app helpers (Gmail/Docs "Help me write", Notion AI) are handy for quick drafts right where you work.`,
    task: "Starter: from rough notes, produce a polished email, a plain-language summary, and a one-pager in under 15 minutes. Stretch: paste two of your real past messages and get AI to match your voice.",
    quiz: [
      { prompt: "Why is drafting with AI faster?", options: ["Editing a draft beats facing a blank page", "AI writes the final perfectly", "It removes review", "It writes slower"], answerIndex: 0, explanation: "Reacting to a draft is quicker than starting cold." },
      { prompt: "To keep your wording but fix grammar, ask...", options: ["'Fix grammar only - keep my wording'", "'Rewrite it completely'", "'Sound like a robot'", "'Translate it'"], answerIndex: 0, explanation: "Be explicit about what NOT to change." },
      { prompt: "Best way to get your own voice?", options: ["Paste past messages and say 'match this voice'", "Ask for maximum formality", "Give no examples", "Use long words"], answerIndex: 0, explanation: "Examples let the model mirror your style." },
      { prompt: "Who owns AI-written text you send?", options: ["You do - always review before sending", "The AI vendor", "No one", "The recipient"], answerIndex: 0, explanation: "You're accountable, so edit and verify." },
    ],
  },

  "productivity-2": {
    lesson: `**TL;DR - Don't say "summarize" - say who it's for and why. A purpose-built summary turns hours of reading into minutes.**

## Why it matters
Knowledge work is reading before doing. AI compresses that cycle - but a generic summary is nearly useless. Tell it the reader and the goal and you get exactly what you need to act.

## Worked example
\`\`\`
Summarize this 8-page report for a busy exec:
- 3 bullets on what changed
- 1 bullet on the biggest risk
- 1 bullet on what we should do next
\`\`\`
Far more useful than "summarize this report."

## Steal this - extract patterns
\`\`\`
"List every decision and who made it."
"Pull the 5 numbers a finance team would care about."
"Give me the action items with owners and dates."
"What are the 3 strongest arguments for and against?"
\`\`\`

## Common mistakes (and the fix)
- **Generic "summarize."** **Fix:** state the reader + purpose.
- **Trusting research as fact.** **Fix:** treat AI research as leads; verify what you'll rely on.
- **Forgetting the source's limits.** **Fix:** a non-browsing chat doesn't know today's news.

## Good to know
For sourced research use a tool that cites: **Perplexity** (live, footnoted answers) or **NotebookLM** (grounds answers in documents you upload - great for "ask my PDFs"). For summarizing long docs, **Claude** and **Gemini** handle very large inputs in one go.`,
    task: "Starter: take a long document and produce an exec summary with key findings and a recommended action in under 10 minutes - then verify one fact. Stretch: upload a few docs to NotebookLM and ask a question only those docs can answer.",
    quiz: [
      { prompt: "What makes a summary genuinely useful?", options: ["Telling AI the reader and the purpose", "Asking for the longest version", "Giving no context", "Adding new facts"], answerIndex: 0, explanation: "Purpose-built beats generic." },
      { prompt: "How should you treat AI research output?", options: ["As leads to verify, not as proof", "As citable truth", "As today's live news", "As never worth checking"], answerIndex: 0, explanation: "Confirm anything important in a real source." },
      { prompt: "Best tool for sourced, footnoted research?", options: ["Perplexity (or NotebookLM for your own docs)", "An image generator", "A spreadsheet", "A plain offline chat"], answerIndex: 0, explanation: "Research tools cite sources you can check." },
      { prompt: "A non-browsing chatbot's knowledge is...", options: ["Limited to its training data and cutoff date", "Always today's news", "Your private files", "Infinite and live"], answerIndex: 0, explanation: "Without browsing it can't know recent events." },
    ],
  },

  "productivity-3": {
    lesson: `**TL;DR - Email eats your day. Use AI to summarize threads, draft replies from bullets, and template the messages you send weekly.**

## Why it matters
Email is one of the highest time-costs in knowledge work. AI can read a thread, tell you what's needed, and draft a reply in the time it takes to read this sentence.

## Worked example - bullets to reply
\`\`\`
Reply to this client, professional but warm, under 120 words:
- yes we can deliver by the 14th
- need the brand assets by Monday
- end with a clear next step
\`\`\`
A sendable draft in under two minutes.

## Steal this - the email toolkit
\`\`\`
Summarize:  "What's the decision in this thread, and what do they need from me?"
Draft:      "Turn these bullets into a [tone] reply, under [N] words."
Template:   save your common replies (decline, follow-up, intro) with [SLOTS].
\`\`\`

## Common mistakes (and the fix)
- **Rewriting the same email weekly.** **Fix:** make it a template (Level 2 skill).
- **Pasting a whole sensitive thread** into a public tool. **Fix:** redact names/numbers.
- **Sending unread.** **Fix:** check the facts and tone first.

## Good to know
The AI is built right into inboxes now: **Gmail's "Help me write"** (Gemini) and **Outlook/Copilot** draft and summarize in place. For tricky or high-stakes emails, a dedicated assistant (Claude/ChatGPT) gives you more control over tone.`,
    task: "Starter: set up a reusable prompt that turns three bullets into a professional reply in under two minutes. Stretch: build templates for your three most-repeated emails and use one for real today.",
    quiz: [
      { prompt: "A strong 'summarize this thread' prompt asks for...", options: ["The decision and what's needed from you", "The weather", "A poem", "The font"], answerIndex: 0, explanation: "Extract the decision and your required action." },
      { prompt: "Fastest way to handle repeated emails?", options: ["A reusable template with slots", "Rewriting from scratch each time", "Ignoring them", "Forwarding with no instruction"], answerIndex: 0, explanation: "Templates make repeats near-instant." },
      { prompt: "Before pasting a sensitive thread, you should...", options: ["Redact names and numbers", "Post it publicly", "Send it to the vendor", "Do nothing"], answerIndex: 0, explanation: "Protect sensitive data first." },
      { prompt: "Where does AI email help now live?", options: ["Inside Gmail (Gemini) and Outlook (Copilot)", "Only in spreadsheets", "Only offline", "Nowhere"], answerIndex: 0, explanation: "Drafting/summarizing is built into major inboxes." },
    ],
  },

  "productivity-4": {
    lesson: `**TL;DR - Let AI handle the scaffolding around meetings - agendas, briefings, transcript summaries, and follow-ups - so you can focus on the actual conversation.**

## Why it matters
Prep, notes, and follow-up consume more time than the meeting itself. AI does the busywork; you do the thinking and the relationships.

## Worked example - transcript to recap
\`\`\`
From this transcript, produce:
- Decisions made
- Action items (with owner + due date)
- Open questions
\`\`\`
A clean recap in minutes instead of half an hour of typing.

## Steal this - before / after a meeting
\`\`\`
Before: "Draft a 30-minute agenda with time boxes for [goal]."
        "Make a one-page briefing on [person/company] for this call."
After:  "Summarize this transcript: decisions, action items+owners, follow-up email."
\`\`\`

## Common mistakes (and the fix)
- **Letting AI 'attend'** and trusting blindly. **Fix:** skim the recap; fix any misattributed action.
- **Recording without consent.** **Fix:** tell people a notetaker is on - it's basic etiquette (and law in some places).
- **No owners on action items.** **Fix:** always ask for owner + due date.

## Good to know
Dedicated notetakers - **Otter**, **Fireflies**, **Granola**, and built-in ones in **Zoom/Teams/Meet** - transcribe and summarize automatically. No transcript? Paste your rough notes into Claude/ChatGPT and ask for the same structure.`,
    task: "Starter: take a real meeting transcript (or rough notes) and produce decisions, action items with owners, and a follow-up email in under five minutes. Stretch: generate a time-boxed agenda + one-page briefing before your next meeting.",
    quiz: [
      { prompt: "What should an AI meeting recap extract?", options: ["Decisions, action items, and owners", "Only the small talk", "The room temperature", "A poem"], answerIndex: 0, explanation: "Decisions + actions + owners is the useful core." },
      { prompt: "Good pre-meeting use of AI?", options: ["Draft a time-boxed agenda and a briefing", "Cancel the meeting", "Ignore the goal", "Write nothing"], answerIndex: 0, explanation: "AI scaffolds prep quickly." },
      { prompt: "Before using an AI notetaker, you should...", options: ["Tell attendees it's recording", "Hide it", "Record secretly", "Skip consent"], answerIndex: 0, explanation: "Disclosure is etiquette and sometimes legally required." },
      { prompt: "Every action item should include...", options: ["An owner and a due date", "An emoji", "A font choice", "Nothing"], answerIndex: 0, explanation: "Owners + dates make follow-up real." },
    ],
  },

  "productivity-5": {
    lesson: `**TL;DR - Creativity stays human, but AI massively widens the option space you choose from. Use it as a tireless thought partner, not an answer machine.**

## Why it matters
You still judge and decide - but AI can generate 15 angles in the time it takes you to think of two, and play devil's advocate without ego. More options, better decisions.

## Worked example - a structured brainstorm
\`\`\`
I'm naming a budgeting app for students.
1) Give me 15 distinct name ideas across different styles (playful, calm, bold).
2) Pick your 3 favorites and say why.
3) Poke holes: which could have trademark or clarity problems?
\`\`\`

## Steal this - brainstorm moves
\`\`\`
Diverge:   "15 distinct options, include some unconventional ones."
Challenge: "Play devil's advocate - the 3 biggest holes in this plan."
Reframe:   "What assumptions am I making that might be wrong?"
Unstick:   "Ask me 5 questions to clarify what I actually want."
\`\`\`

## Common mistakes (and the fix)
- **Asking for "ideas"** and getting bland ones. **Fix:** ask for _distinct_, _unconventional_ options.
- **Letting AI pick.** **Fix:** it widens the funnel; you choose.
- **One round and done.** **Fix:** push back - "weirder", "more practical".

## Good to know
Any assistant brainstorms well; **Claude** and **ChatGPT** are strong thought partners, and **Gemini** can pull in fresh web context for trend-based ideation. For visual brainstorming, pair with an image tool to see concepts fast.`,
    task: "Starter: run a 20-minute AI brainstorm that yields 10+ distinct ideas, then pick the top 3 with reasons. Stretch: have AI devil's-advocate your favorite idea and refine it based on the critique.",
    quiz: [
      { prompt: "What does AI add to brainstorming?", options: ["A much wider option space to choose from", "The final decision", "Guaranteed good ideas", "Nothing"], answerIndex: 0, explanation: "It expands options; you judge them." },
      { prompt: "A strong 'challenge' prompt is...", options: ["'Play devil's advocate - find the holes'", "'Agree with me'", "'Say it's perfect'", "'Write less'"], answerIndex: 0, explanation: "Adversarial prompts surface weaknesses." },
      { prompt: "To get variety, ask for...", options: ["Distinct, unconventional options", "One safe idea", "The shortest answer", "A summary"], answerIndex: 0, explanation: "Requesting distinct options broadens output." },
      { prompt: "Who picks the winning idea?", options: ["You do - AI widens the funnel", "AI decides alone", "No one", "A coin flip"], answerIndex: 0, explanation: "Human judgment chooses." },
    ],
  },

  "productivity-6": {
    lesson: `**TL;DR - AI turns a vague goal into a structured plan with milestones, dependencies, and risks - getting you out of your head and into next actions in one session.**

## Why it matters
Planning quality determines execution quality. AI helps non-planners think in sequences and spot the gaps they'd otherwise hit later.

## Worked example - goal to plan
\`\`\`
Turn "launch a new service offering by Q3" into:
- a 90-day plan with milestones
- dependencies (what blocks what)
- the top 3 risks and a mitigation for each
\`\`\`
Then pressure-test: "What am I forgetting?"

## Steal this - pressure-test questions
\`\`\`
"What am I forgetting?"            (surfaces missing steps)
"Which tasks block others?"       (sequencing)
"If I had half the time, what would I cut?"  (priorities)
"What's the riskiest assumption here?"        (risk)
\`\`\`

## Common mistakes (and the fix)
- **A pretty plan you don't act on.** **Fix:** end with concrete next actions for this week.
- **No risk thinking.** **Fix:** always ask for risks + mitigations.
- **Over-planning.** **Fix:** plan enough to start, then adjust.

## Good to know
For living plans, paste AI's output into **Notion** (Notion AI can expand it), a doc, or a project tool. Some tools (ChatGPT, Notion) can output a checklist or table you drop straight into your task manager.`,
    task: "Starter: turn a vague goal into a 90-day plan with milestones, dependencies, and risks, then ask 'what am I forgetting?'. Stretch: convert the plan into a checklist and paste it into your task tool.",
    quiz: [
      { prompt: "A strong planning prompt turns a goal into...", options: ["Milestones, dependencies, and risks", "A single sentence", "A motivational quote", "A picture"], answerIndex: 0, explanation: "Concrete structure makes it actionable." },
      { prompt: "Why ask 'what am I forgetting?'", options: ["It surfaces obvious missing steps", "It deletes the plan", "It adds filler", "It hides risks"], answerIndex: 0, explanation: "A fast way to catch gaps." },
      { prompt: "Best 'pressure-test' for sequencing?", options: ["'Which tasks block others?'", "'Is this nice?'", "'Make it longer'", "'What font?'"], answerIndex: 0, explanation: "Identifying blockers orders the work." },
      { prompt: "The real goal of AI planning is to...", options: ["Get into concrete next actions fast", "Produce the longest document", "Avoid deciding", "Replace your judgment"], answerIndex: 0, explanation: "Speed from vague goal to next steps." },
    ],
  },

  "productivity-7": {
    lesson: `**TL;DR - Upload a spreadsheet and ask questions in plain English. AI data tools find trends, clean data, and make charts - no formulas required. Just verify the numbers.**

## Why it matters
Data analysis used to need SQL or Excel skills. Now anyone can ask "what does this tell me?" and get an answer - a genuine superpower for non-analysts.

## Worked example
\`\`\`
[Upload sales.csv] Columns: Date, Region, Product, Revenue.
- Summarize the top 3 trends.
- Flag any month that dropped more than 20%.
- Make a chart of monthly revenue and recommend one action.
- If anything's ambiguous, ask me before assuming.
\`\`\`

## Steal this - data asks
\`\`\`
Clean:   "Remove duplicates and standardize the date column."
Explore: "What are the 3 biggest patterns? Any anomalies?"
Decide:  "Given this, what one action would you recommend, and why?"
Always:  "Show how you calculated key numbers."
\`\`\`

## Common mistakes (and the fix)
- **Trusting the number blindly.** **Fix:** ask how it was calculated; spot-check one.
- **Letting it misread columns.** **Fix:** describe the columns up front.
- **Pasting sensitive data** into a public tool. **Fix:** anonymize or use a private/enterprise tool.

## Good to know
**ChatGPT's data analysis** (it writes and runs real Python on your file - actual computation, not guessing) and **Gemini in Google Sheets** are the go-tos. Because they compute rather than predict, their math is trustworthy - but still verify the setup and conclusions.`,
    task: "Starter: upload a spreadsheet and get an insight summary with 3 findings, one chart, and a recommended action - no manual formulas. Stretch: ask it to show its calculation for one key number and verify it.",
    quiz: [
      { prompt: "What can AI data tools now do for non-experts?", options: ["Answer data questions in plain English", "Remove the need to verify", "Read your mind", "Guarantee perfect judgment"], answerIndex: 0, explanation: "You can analyze without formulas - but still verify." },
      { prompt: "Why is ChatGPT's data-analysis math trustworthy-ish?", options: ["It runs real code (Python) rather than guessing", "It never makes errors", "It avoids numbers", "It's offline"], answerIndex: 0, explanation: "Actual computation beats predicted numbers - still verify setup." },
      { prompt: "Important caveat with AI data analysis?", options: ["Verify the numbers and how it calculated them", "Never look at the result", "Trust it blindly", "Avoid charts"], answerIndex: 0, explanation: "It can misread columns; check its work." },
      { prompt: "Before analyzing sensitive data, you should...", options: ["Anonymize it or use a private/enterprise tool", "Post it publicly", "Skip cleaning", "Email it to support"], answerIndex: 0, explanation: "Protect sensitive data first." },
    ],
  },
};
