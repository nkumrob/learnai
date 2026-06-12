import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 21-27.
export const productivity: Record<string, ModuleContent> = {
  "productivity-1": {
    lesson: `**Using AI for writing means letting a model like Claude, ChatGPT, or Gemini produce a first draft from rough notes, then steering it through small edits**, because editing a draft you can react to is faster than writing one hundred percent from a blank page. Writing is the most widely useful AI skill at work, and a Pew Research survey found nearly a fifth of US workers already use AI primarily for drafting and editing. The mechanism is the model's strength at language patterns: feed it a few bullets, a tone target, and a length limit, and it returns a near-final email in seconds. For instance, "turn these notes into a warm under-120-word email to a client asking to move Thursday's call to Friday, offer two times" produces something sendable. To get your own voice, paste two past messages and ask the model to "match this voice" rather than describing the style abstractly.

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
    lesson: `**AI research and summarization is the practice of feeding a long document into an assistant and asking for a purpose-built compression, specifying who the reader is and what they need to do with it, instead of asking the generic "summarize this."** Claude and Gemini handle very large inputs in a single context window, and dedicated research tools like Perplexity and NotebookLM ground their answers in real sources with footnoted citations, which is what makes them safer than a plain chatbot for facts. The mechanism is targeted extraction: telling the model "summarize this eight-page report for a busy exec as three bullets on what changed, one bullet on the biggest risk, and one bullet on the recommended next action" returns something usable in seconds. For instance, NotebookLM lets you upload your own PDFs and ask questions only those files can answer. Treat any AI research output as leads to verify, not as proof.

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
    lesson: `**Using AI for email means letting an assistant summarize incoming threads, draft replies from a few bullets, and templatize the messages you send every week**, turning one of the highest time-costs in knowledge work into minutes. The mechanism is task-specific prompting: instead of a vague request, ask "what is the decision in this thread, and what do they need from me," or "turn these three bullets into a professional reply under one hundred and twenty words, end with a clear next step." Gmail's "Help me write" (powered by Gemini) and Outlook with Microsoft Copilot now draft and summarize directly inside the inbox, while Claude and ChatGPT give you finer control over tone for high-stakes messages. For instance, save your recurring replies (polite decline, follow-up, intro) as templates with slots so weekly emails become near-instant. Always redact names and numbers before pasting sensitive threads into public tools.

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
    lesson: `**Using AI for meeting prep and follow-up means delegating the agenda, briefing, transcript summary, and recap email to an assistant or notetaker so you can focus on the conversation itself**, while the model produces decisions, action items with owners and due dates, and a follow-up draft. AI notetakers like Otter, Fireflies, and Granola, along with built-in tools in Zoom, Microsoft Teams, and Google Meet, transcribe and summarize calls automatically. For prep, Claude or ChatGPT can turn a goal into a thirty-minute time-boxed agenda or a one-page briefing on a person or company from a few notes. For instance, after a planning call, ask the assistant to extract decisions made, action items with owner plus due date, and open questions from the transcript, and you get a clean recap in minutes instead of typing for half an hour. Always tell attendees a notetaker is on, both as etiquette and as legal requirement in some jurisdictions.

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
    lesson: `**Using AI for brainstorming means treating Claude, ChatGPT, or Gemini as a tireless thought partner that generates fifteen options in the time it would take you to think of two, plays devil's advocate without ego, and reframes assumptions**, while you stay the judge of what is good. The mechanism is the model's pattern-rich generation: prompted for distinct unconventional options across multiple styles, it covers more of the idea space than a human alone, and prompted to find the three biggest holes in a plan, it surfaces weaknesses you would defend out of habit. For instance, naming a budgeting app for students can begin with "give me fifteen distinct names across playful, calm, and bold styles, pick your three favorites and say why, then poke holes for trademark or clarity problems," producing a real shortlist in one session. Always ask for distinct, unconventional options rather than just "ideas" to avoid bland defaults.

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
    lesson: `**Using AI for planning and project management means turning a vague goal into a structured plan with milestones, dependencies, risks, and concrete next actions in one session with Claude, ChatGPT, or Notion AI**, getting you out of your head and into doable steps. The mechanism is the model's strength at sequencing and pattern-matching against thousands of similar plans it has seen in training data, so it spots gaps that non-planners would hit weeks later. For instance, "turn 'launch a new service offering by Q3' into a ninety-day plan with milestones, dependencies, the top three risks with a mitigation for each, then ask me what I am forgetting" produces a working plan plus pressure-test questions. The practical move is to convert the AI's output into a checklist or table you paste into Notion, Asana, or your task manager so it becomes a living plan rather than a pretty document you do not act on.

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
    lesson: `**AI for data analysis means uploading a spreadsheet or CSV to a tool like ChatGPT Data Analysis or Gemini in Google Sheets and asking questions in plain English, with the tool finding trends, cleaning data, and producing charts without you writing formulas.** The mechanism matters: ChatGPT Data Analysis writes and runs real Python on your file, so the math is actual computation rather than predicted text, which is why its numbers are trustworthy (still verify the setup). For instance, uploading a sales CSV with columns Date, Region, Product, and Revenue and asking "summarize the top three trends, flag any month that dropped more than twenty percent, make a chart of monthly revenue and recommend one action, ask before assuming" returns a one-page brief in minutes. Always describe the columns up front so the model does not misread them, and anonymize any sensitive data or use a private enterprise tier before uploading.

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
