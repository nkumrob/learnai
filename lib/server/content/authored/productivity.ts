import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 21-27.
export const productivity: Record<string, ModuleContent> = {
  "productivity-1": {
    lesson: `Writing is the most useful everyday AI skill. The trick: let AI produce a first draft, then you steer. Editing 80% beats writing 100%.

## Three moves
- **Draft**: "Draft a 5-line email asking to reschedule Thursday's call to Friday. Apologetic but brief."
- **Edit**: "Tighten this by half, keep the deadline." Or "Fix grammar only - don't change my wording."
- **Tone-match**: paste two of your past messages and say "match this voice."

> **Example.** Rough notes -> "turn these into a warm 100-word update" -> a near-final draft in seconds.

The goal isn't to sound like a robot - it's to get *your* message out faster.`,
    task: "From rough notes, produce a polished professional email, a plain-language summary, and a persuasive one-pager - in under 15 minutes.",
    quiz: [
      { prompt: "Why is drafting with AI faster?", options: ["Editing a draft beats facing a blank page", "AI writes the final perfectly", "It removes review", "It writes slower"], answerIndex: 0, explanation: "Reacting to a draft is quicker than starting cold." },
      { prompt: "To keep your wording but fix grammar, ask...", options: ["'Fix grammar only - don't change my wording'", "'Rewrite completely'", "'Sound like a robot'", "'Translate it'"], answerIndex: 0, explanation: "Be explicit about what not to change." },
      { prompt: "Best way to get your voice?", options: ["Paste past messages and say 'match this voice'", "Ask for maximum formality", "Give no examples", "Use long words"], answerIndex: 0, explanation: "Examples let the model mirror your style." },
      { prompt: "The goal of AI writing is to...", options: ["Get your message out faster, in your voice", "Sound robotic", "Avoid editing", "Write the longest version"], answerIndex: 0, explanation: "Speed and your authentic voice, not generic text." },
    ],
  },
  "productivity-2": {
    lesson: `Knowledge workers spend hours reading before they can act. AI compresses that - if you tell it the reader and purpose.

## Summarize with intent
> "Summarize this 8-page report for a busy exec: 3 bullets on what changed, 1 on risk, 1 on what to do."

A purpose-built summary beats a generic one every time.

## Extract what you need
- "List every decision and who made it."
- "Pull the 5 numbers a finance team cares about."

## Research safely
Use AI (and tools like Perplexity/NotebookLM) to map a topic fast - then verify any fact you'll rely on. It's a great starting point, a poor final source.`,
    task: "Take a 20-30 page document and produce a crisp executive summary with key findings and a recommended action in under 10 minutes - then verify one fact.",
    quiz: [
      { prompt: "What makes a summary useful?", options: ["Telling AI the reader and the purpose", "Making it as long as possible", "Giving no context", "Adding new facts"], answerIndex: 0, explanation: "Purpose-built beats generic." },
      { prompt: "How should you treat AI research?", options: ["A starting point to verify, not a final source", "Citable truth", "Today's live news", "Never worth checking"], answerIndex: 0, explanation: "Confirm important facts independently." },
      { prompt: "Best prompt to mine a document?", options: ["'List every decision and who made it'", "'Tell me something'", "'Write a poem'", "'Make it longer'"], answerIndex: 0, explanation: "Specific extraction yields usable output." },
      { prompt: "Why verify a fact from research output?", options: ["AI can fabricate or be outdated", "It's always wrong", "Verification is illegal", "Facts don't matter"], answerIndex: 0, explanation: "Treat stats as leads to confirm." },
    ],
  },
  "productivity-3": {
    lesson: `Email is one of the biggest time sinks. AI can draft replies, summarize threads, and turn bullet notes into polished messages.

## High-value moves
- **Summarize a thread**: "What's the decision and what do they need from me?"
- **Draft from bullets**: "Turn these 3 bullets into a friendly, concise reply."
- **Template repeat scenarios**: a reusable prompt for the email you write weekly.

> **Example.** Three bullets -> "professional but warm reply, under 120 words, end with a clear next step" -> a sendable draft in under two minutes.

Pair this with the prompt-library habit and email stops eating your morning.`,
    task: "Set up a reusable email workflow that turns three bullet points into a professional draft in under two minutes.",
    quiz: [
      { prompt: "A strong 'summarize this thread' prompt asks for...", options: ["The decision and what's needed from you", "The weather", "A poem", "The font"], answerIndex: 0, explanation: "Extract the decision and your action." },
      { prompt: "Fastest way to handle repeated emails?", options: ["A reusable template prompt", "Rewriting from scratch each time", "Ignoring them", "Forwarding to AI with no instruction"], answerIndex: 0, explanation: "Templates make repeats near-instant." },
      { prompt: "Turning bullets into a reply works best when you specify...", options: ["Tone, length, and a clear next step", "Nothing", "Only the recipient", "The model's price"], answerIndex: 0, explanation: "Tone + length + ask = sendable draft." },
      { prompt: "Combining email drafting with which habit compounds the benefit?", options: ["A saved prompt library", "Avoiding templates", "Never reviewing", "Longer emails"], answerIndex: 0, explanation: "Reusable prompts multiply the time saved." },
    ],
  },
  "productivity-4": {
    lesson: `Meeting overhead - prep, notes, follow-up - eats disproportionate time. AI handles the scaffolding so you can focus on the actual thinking.

## Before, during, after
- **Before**: "Draft a 30-minute agenda with time boxes for [goal]." Generate a briefing doc.
- **During/after**: paste a transcript (from Otter, Fireflies) and ask for a structured summary.
- **Follow-up**: "Turn this into decisions, action items with owners, and a follow-up email."

> **Example.** Raw transcript -> "Summary: decisions, action items (with owner), open questions" -> a clean recap in minutes.

The human still runs the meeting; AI just removes the busywork around it.`,
    task: "Take a raw meeting transcript and produce a structured summary with decisions, action items, and owner assignments in under five minutes.",
    quiz: [
      { prompt: "What should an AI meeting recap extract?", options: ["Decisions, action items, and owners", "Only the small talk", "The room temperature", "A poem"], answerIndex: 0, explanation: "Decisions + actions + owners is the useful core." },
      { prompt: "Good pre-meeting use of AI?", options: ["Draft a time-boxed agenda and briefing doc", "Cancel the meeting", "Ignore the goal", "Write nothing"], answerIndex: 0, explanation: "AI scaffolds prep quickly." },
      { prompt: "What does AI handle in meetings?", options: ["The scaffolding (notes, follow-up), not the thinking", "All the decisions", "The relationships", "The strategy"], answerIndex: 0, explanation: "Humans think; AI does the busywork." },
      { prompt: "To process a call, you can paste a...", options: ["Transcript from a tool like Otter or Fireflies", "Photo of the room", "Calendar invite only", "Blank page"], answerIndex: 0, explanation: "Transcripts are the input for summaries." },
    ],
  },
  "productivity-5": {
    lesson: `Creativity stays human - but AI dramatically expands the option space you choose from. Used well, it's a tireless thought partner.

## Ways to use it
- **Diverge**: "Give me 15 distinct angles on X, including some unconventional ones."
- **Challenge**: "Play devil's advocate - what are the three biggest holes in this plan?"
- **Reframe**: "What assumptions am I making that might be wrong?"
- **Unstick**: "I'm stuck on X. Ask me five questions to clarify it."

> **Example.** A 20-minute AI brainstorm can surface 10+ genuinely different ideas; your job is to judge and pick the top three.

AI widens the funnel; you still decide what's good.`,
    task: "Run a structured 20-minute AI brainstorm that generates at least 10 distinct ideas, then evaluate and select the top three with a rationale.",
    quiz: [
      { prompt: "What does AI add to brainstorming?", options: ["A wider option space to choose from", "The final decision", "Guaranteed good ideas", "Nothing"], answerIndex: 0, explanation: "It expands options; you judge them." },
      { prompt: "A good 'challenge' prompt is...", options: ["'Play devil's advocate - find the holes'", "'Agree with me'", "'Say it's perfect'", "'Write less'"], answerIndex: 0, explanation: "Adversarial prompts surface weaknesses." },
      { prompt: "Who selects the best ideas?", options: ["You do - AI widens the funnel", "AI decides alone", "No one", "A random pick"], answerIndex: 0, explanation: "Human judgment chooses the winners." },
      { prompt: "To get variety, ask for...", options: ["Distinct angles, including unconventional ones", "One safe idea", "The shortest answer", "A summary"], answerIndex: 0, explanation: "Requesting distinct, unconventional options broadens output." },
    ],
  },
  "productivity-6": {
    lesson: `Planning quality decides execution quality. AI helps non-planners think in structured sequences and spot gaps.

## From vague to concrete
> "Turn 'launch a new service by Q3' into a 90-day plan: milestones, dependencies, and the top risks."

Then pressure-test it:
- "What am I forgetting?" (surfaces the obvious missing step)
- "Which tasks block others?" (sequencing)
- "If I only had half the time, what would I cut?"

> **Example.** A messy goal becomes phases with owners and checkpoints in one session - something you can actually act on Monday.

The plan won't be perfect, but it gets you out of your head into next actions fast.`,
    task: "Take a vague goal and produce a structured 90-day plan with milestones, dependencies, and known risks in one session.",
    quiz: [
      { prompt: "Why ask 'what am I forgetting?' after a plan?", options: ["It surfaces obvious missing steps", "It deletes the plan", "It adds filler", "It hides risks"], answerIndex: 0, explanation: "A fast way to catch gaps." },
      { prompt: "A strong planning prompt turns a goal into...", options: ["Milestones, dependencies, and risks", "A single sentence", "A motivational quote", "A picture"], answerIndex: 0, explanation: "Concrete structure makes it actionable." },
      { prompt: "Planning quality affects...", options: ["Execution quality", "The weather", "The model's price", "Nothing"], answerIndex: 0, explanation: "Good plans drive good execution." },
      { prompt: "Best 'pressure-test' question for sequencing?", options: ["'Which tasks block others?'", "'Is this nice?'", "'Make it longer'", "'What font?'"], answerIndex: 0, explanation: "Identifying blockers orders the work." },
    ],
  },
  "productivity-7": {
    lesson: `Data analysis used to require SQL or Excel skills. Now you can upload a spreadsheet and ask questions in plain English.

## What's possible
With tools like ChatGPT's data analysis, Claude, or Gemini in Sheets:
- "What are the top 3 trends in this data?"
- "Clean this: remove duplicates and standardize the date column."
- "Make a chart of monthly sales and flag anomalies."

> **Example.** Upload a sales CSV -> "Summarize the key insights, show one chart, and recommend an action" -> findings without writing a single formula.

Caveat: **verify** the numbers and ask how it calculated them. AI can misread columns - you're still the analyst.`,
    task: "Upload a spreadsheet and produce an insight summary with at least three findings, one chart, and a recommended action - without writing a formula manually.",
    quiz: [
      { prompt: "What can AI data tools now do for non-experts?", options: ["Answer data questions in plain English", "Replace the need to verify", "Read your mind", "Guarantee perfect math"], answerIndex: 0, explanation: "You can analyze without formulas - but still verify." },
      { prompt: "Important caveat when analyzing data with AI?", options: ["Verify the numbers and how it calculated them", "Never look at the result", "Trust it blindly", "Avoid charts"], answerIndex: 0, explanation: "AI can misread columns; check its work." },
      { prompt: "A useful data-cleaning prompt?", options: ["'Remove duplicates and standardize the date column'", "'Make it pretty'", "'Do something'", "'Write a story'"], answerIndex: 0, explanation: "Specific cleaning instructions work best." },
      { prompt: "Who is still the analyst?", options: ["You are - AI assists, you judge", "The spreadsheet", "No one", "The chart"], answerIndex: 0, explanation: "Human judgment owns the conclusions." },
    ],
  },
};
