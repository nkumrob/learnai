import type { ModuleContent } from "@/types/shared";

// Level 4 - AI Automation (Fluency to Mastery). Topics 34-44.
export const automation: Record<string, ModuleContent> = {
  "automation-1": {
    lesson: `Using AI manually means *you* prompt and it responds. **Automation** means systems run without you. Knowing when to automate is a judgment skill - many people automate too early.

## The decision
A task is worth automating when it's **repetitive, rule-based, frequent, and low-judgment.**
- **Automate now**: same steps, clear trigger, happens often.
- **Use AI manually**: needs your judgment each time.
- **Keep fully human**: high-stakes, relationship, or one-off.

> **Example.** "Log every form submission to a sheet" - automate. "Decide our pricing" - keep human. "Draft a tricky reply" - use AI manually.

Hidden cost: a poorly-built automation that breaks silently can be worse than doing it by hand. Start small and reliable.`,
    task: "Audit five recurring tasks and classify each as 'automate now', 'use AI manually', or 'keep fully human' - with a reason for each.",
    quiz: [
      { prompt: "When is a task worth automating?", options: ["Repetitive, rule-based, frequent, low-judgment", "Rare and high-judgment", "One-off and creative", "Relationship-based"], answerIndex: 0, explanation: "Predictable, frequent tasks pay off." },
      { prompt: "Difference between manual AI use and automation?", options: ["Automation runs without you; manual needs your prompt", "They're identical", "Manual is faster always", "Automation needs no setup"], answerIndex: 0, explanation: "Automation removes you from the loop." },
      { prompt: "A hidden cost of automation?", options: ["It can break silently and cause harm", "It's always free", "It never fails", "It needs no monitoring"], answerIndex: 0, explanation: "Unmonitored automation can fail quietly." },
      { prompt: "Which should stay fully human?", options: ["High-stakes or relationship decisions", "Logging form submissions", "Reformatting text", "Sorting rows"], answerIndex: 0, explanation: "Judgment and relationships stay human." },
    ],
  },
  "automation-2": {
    lesson: `Automation rests on apps talking to each other. An **API** is how one app sends data to another; a **webhook** is a "ping" that fires when something happens.

## The mental model
> A new form submission **triggers** a webhook -> the workflow sends that data via APIs to: add a spreadsheet row, send an email, and post to Slack.

You rarely touch raw APIs in no-code tools, but you need the model to debug. If the email never arrives, you can reason: did the trigger fire? did the API call fail? did a key expire?

> **Failure point.** If an API key expires, the connected app rejects the request and that step fails - often silently. Knowing this is how you fix broken workflows.

APIs move data; webhooks announce events. That's 90% of what you need.`,
    task: "Explain in plain language what happens when a form submission triggers an email, a sheet update, and a Slack message - and where it would fail if an API key expired.",
    quiz: [
      { prompt: "What is an API, in plain terms?", options: ["How one app sends data to another", "A type of password", "A spreadsheet", "A chatbot"], answerIndex: 0, explanation: "APIs are the channel apps use to exchange data." },
      { prompt: "What does a webhook do?", options: ["Fires when an event happens, triggering a workflow", "Stores files", "Designs UI", "Writes code"], answerIndex: 0, explanation: "A webhook announces an event." },
      { prompt: "If an API key expires, what happens?", options: ["The connected app rejects the request and the step fails", "Nothing changes", "The data doubles", "The app speeds up"], answerIndex: 0, explanation: "Expired keys cause (often silent) failures." },
      { prompt: "Why learn the API model for no-code tools?", options: ["To debug and design reliable workflows", "To write raw code daily", "It's never needed", "To replace the tools"], answerIndex: 0, explanation: "The mental model lets you fix breakage." },
    ],
  },
  "automation-3": {
    lesson: `No-code platforms like **Zapier** and **Make** let you connect apps without code. Every automation is **Trigger -> Action -> Result.**

\`\`\`
Trigger:  New response in a Google Form
Action 1: Create a task in Notion
Action 2: Send a Slack notification
\`\`\`

## Pick your tool
- **Zapier** - friendliest, 6,000+ app connections, simple linear flows. Best to start today.
- **Make** - a visual canvas with branching and loops; more power, generous pricing.

> **First build.** "When a new form response arrives -> add a row to a sheet -> email me." One trigger, two actions. Build it, test it, watch it run.

Start with one real automation that removes a recurring annoyance.`,
    task: "Build and deploy one real no-code automation that runs without you - e.g., 'new form response -> create a task -> send a notification'.",
    quiz: [
      { prompt: "Every automation follows which shape?", options: ["Trigger -> Action -> Result", "Result -> Trigger -> nothing", "Random steps", "Action only"], answerIndex: 0, explanation: "An event triggers actions that produce a result." },
      { prompt: "Which tool is friendliest to start with today?", options: ["Zapier", "Raw code", "A database", "A terminal"], answerIndex: 0, explanation: "Zapier has the most connections and simplest flows." },
      { prompt: "What is a 'trigger'?", options: ["The event that starts the workflow", "The final output", "A password", "An error"], answerIndex: 0, explanation: "Triggers kick off the automation." },
      { prompt: "Best first automation?", options: ["One that removes a recurring annoyance", "Your entire job at once", "A rare one-off", "Nothing"], answerIndex: 0, explanation: "Small, reliable wins first." },
    ],
  },
  "automation-4": {
    lesson: `**n8n** is an open-source, self-hostable automation tool. It goes beyond linear flows with branching, loops, error handling, and direct HTTP requests - more power and control, no per-task pricing.

## Why intermediate builders love it
- **Conditional branching**: "if ticket is urgent -> route to on-call; else -> queue."
- **Error handling**: define what happens when a step fails.
- **Self-hosting**: data stays with you; no per-run cost.

> **Example.** A workflow with three nodes: receive data -> AI classifies it -> branch by category. Add an error path so a failed step alerts you instead of dying silently.

n8n is the most-discussed tool in the AI automation community because it scales from simple to genuinely powerful.`,
    task: "Build an n8n workflow with at least three nodes, conditional branching, and basic error handling - and be able to explain what happens when a step fails.",
    quiz: [
      { prompt: "What makes n8n different from Zapier?", options: ["Open-source, self-hostable, branching/loops, no per-task pricing", "It can't use AI", "It's only linear", "It has no error handling"], answerIndex: 0, explanation: "More control and power, self-hostable." },
      { prompt: "What is conditional branching?", options: ["Different paths based on a condition", "A type of password", "A trigger only", "An image"], answerIndex: 0, explanation: "'If urgent then X else Y' routes the flow." },
      { prompt: "Why add error handling?", options: ["So a failed step alerts you instead of dying silently", "To slow it down", "It's decorative", "To remove logs"], answerIndex: 0, explanation: "Explicit error paths keep failures visible." },
      { prompt: "A benefit of self-hosting n8n?", options: ["Data stays with you and no per-run cost", "It's always slower", "It needs no setup", "It can't branch"], answerIndex: 0, explanation: "Control over data and cost." },
    ],
  },
  "automation-5": {
    lesson: `Plain automation moves data. **AI automation** adds a judgment step in the middle - classify, summarize, draft, or extract - using an AI node (ChatGPT in n8n, AI steps in Make).

## The upgrade
\`\`\`
Trigger:  New support email
AI step:  Classify as urgent / normal / spam
Branch:   Urgent -> alert on-call; Normal -> queue; Spam -> archive
\`\`\`

The AI node turns dumb data movement into something that *understands* the data and decides what happens next.

> **Example.** Incoming feedback -> AI summarizes sentiment and topic -> routes to the right team. No human reads every message first.

This is the step that makes automation feel intelligent - and it's just one node in your flow.`,
    task: "Build a workflow where incoming data is processed by an AI step (e.g., classify a support ticket urgent/non-urgent) before routing to the next action.",
    quiz: [
      { prompt: "What does an AI node add to a workflow?", options: ["A judgment step: classify, summarize, draft, extract", "Slower data transfer", "A password", "A new trigger only"], answerIndex: 0, explanation: "AI interprets data and decides routing." },
      { prompt: "Plain automation vs AI automation?", options: ["AI automation understands the data, not just moves it", "They're identical", "AI automation can't branch", "Plain is smarter"], answerIndex: 0, explanation: "The AI step adds understanding." },
      { prompt: "Good AI-step example?", options: ["Classify a ticket urgent/normal/spam, then route", "Change the wifi", "Pick a font", "Delete everything"], answerIndex: 0, explanation: "Classification drives the next action." },
      { prompt: "Where does the AI step sit?", options: ["In the middle, between trigger and action", "Replacing the whole flow", "Outside the workflow", "Nowhere"], answerIndex: 0, explanation: "It's one node that adds judgment." },
    ],
  },
  "automation-6": {
    lesson: `Most people don't know where to look for automation opportunities. A simple **task audit** finds them.

## The method
For each recurring task, score it:
1. **Frequent?** (daily/weekly)
2. **Same steps each time?**
3. **Clear trigger?**
4. **Low judgment?**

High scores = strong candidates. Then write a one-line **automation spec**: trigger, steps, expected output, and risk.

> **Example spec.** "When a customer emails support (trigger) -> AI classifies and drafts a reply (steps) -> human approves and sends (output). Risk: misclassification, so a human approves."

The spec is the bridge from "I do this a lot" to "here's how I'd automate it."`,
    task: "Complete a task audit of your week and identify at least two automation candidates, each with a brief spec: trigger, steps, expected output, and risk.",
    quiz: [
      { prompt: "What does a task audit find?", options: ["Recurring tasks worth automating", "Your password", "The weather", "New hires"], answerIndex: 0, explanation: "It surfaces strong automation candidates." },
      { prompt: "Which scores make a strong candidate?", options: ["Frequent, same steps, clear trigger, low judgment", "Rare and creative", "One-off", "High judgment"], answerIndex: 0, explanation: "Predictable, frequent tasks automate well." },
      { prompt: "What's in an automation spec?", options: ["Trigger, steps, expected output, and risk", "Just a title", "Only the cost", "A logo"], answerIndex: 0, explanation: "The spec defines how it would work." },
      { prompt: "Why write a spec before building?", options: ["It bridges 'I do this a lot' to a buildable plan", "It wastes time", "It's required by law", "It hides the task"], answerIndex: 0, explanation: "A clear spec makes the build straightforward." },
    ],
  },
  "automation-7": {
    lesson: `Lead capture (or any intake) is a universal problem and a perfect first real project - it teaches triggers, data handling, conditionals, and multi-step logic at once.

## The build
\`\`\`
Trigger:  New contact-form submission
Step 1:   Validate (is the email real? required fields present?)
Step 2:   AI - classify intent (sales / support / spam)
Step 3:   Route - sales -> CRM; support -> helpdesk; spam -> drop
Step 4:   Notify the right person in Slack
\`\`\`

> **Why it's great practice.** Every piece of real automation shows up here: a trigger, validation, an AI decision, branching, and a notification.

Build it end to end, then write down what each step does and what to do if it breaks.`,
    task: "Build a working intake automation end-to-end (capture -> classify -> route -> notify), and write a short explanation of each step and what to do if it breaks.",
    quiz: [
      { prompt: "Why is lead capture a great first project?", options: ["It teaches triggers, validation, AI, branching, and notifications", "It's the only thing AI can do", "It needs no thought", "It can't break"], answerIndex: 0, explanation: "It exercises every core automation skill." },
      { prompt: "What's the validation step for?", options: ["Check the email is real and fields are present", "Send spam", "Slow it down", "Delete data"], answerIndex: 0, explanation: "Validate inputs before acting." },
      { prompt: "What does the AI step do in intake?", options: ["Classify intent to route correctly", "Replace the trigger", "Store passwords", "Pick a font"], answerIndex: 0, explanation: "Classification decides where the lead goes." },
      { prompt: "After building, you should document...", options: ["What each step does and what to do if it breaks", "Nothing", "Only the trigger", "The model price"], answerIndex: 0, explanation: "Documentation makes it maintainable." },
    ],
  },
  "automation-8": {
    lesson: `A content workflow takes input (a topic, brief, or data) and produces a draft automatically - with a **human checkpoint** before anything publishes.

## The pattern
\`\`\`
Trigger:  New row in a "content ideas" sheet
AI step:  Draft a post from the idea + brand voice notes
Step:     Save draft to a review folder / send for approval
Human:    Approve or edit -> then publish
\`\`\`

> **Key principle.** AI drafts; a human approves. Never auto-publish AI content - the review gate is what keeps quality and trust intact.

This is one of the highest-ROI automations for individuals and small teams: the boring drafting is handled, the judgment stays yours.`,
    task: "Build a content workflow that produces a human-review-ready draft from structured input, with a clear human checkpoint before publishing.",
    quiz: [
      { prompt: "What's essential in an AI content workflow?", options: ["A human checkpoint before publishing", "Auto-publishing instantly", "No review ever", "Hiding the draft"], answerIndex: 0, explanation: "Human approval protects quality and trust." },
      { prompt: "What does the AI step produce?", options: ["A review-ready draft from the input", "The final published post", "A password", "Nothing"], answerIndex: 0, explanation: "It drafts; humans approve." },
      { prompt: "Why is this high-ROI?", options: ["Boring drafting is automated; judgment stays human", "It removes all humans", "It's free virality", "It needs no input"], answerIndex: 0, explanation: "It saves time without losing control." },
      { prompt: "What should you never do?", options: ["Auto-publish AI content with no review", "Add a review step", "Save drafts", "Use brand voice notes"], answerIndex: 0, explanation: "Skipping review risks quality and trust." },
    ],
  },
  "automation-9": {
    lesson: `Automation acts on your behalf - so when it's wrong, it's wrong automatically, at scale. **Guardrails** make it fail safely.

## The core four
- **Validate inputs** - no valid email? stop, don't send.
- **Human-in-the-loop** for risky actions - queue a refund for one-click approval.
- **Constrain the AI** - allowed values only, so it can't invent a wild instruction.
- **Handle errors** - retry, skip, or alert; never fail silently.

> **Before/after.** A naive auto-reply emails everyone, including the angry CEO. With guardrails: it classifies first, only auto-replies to routine mail, and flags sensitive cases for a human.

For each guardrail, know the exact failure it prevents.`,
    task: "Redesign a naive automation to include at least two safety checks, and explain the specific failure mode each check prevents.",
    quiz: [
      { prompt: "Why do automations specifically need guardrails?", options: ["They act automatically, so errors scale fast", "They're slow", "They can't be tested", "They never fail"], answerIndex: 0, explanation: "Unchecked errors repeat at scale." },
      { prompt: "Good guardrail for a risky action like a refund?", options: ["Queue it for one-click human approval", "Fire it instantly", "Hide it", "Run it twice"], answerIndex: 0, explanation: "Human-in-the-loop prevents costly mistakes." },
      { prompt: "How should a step handle an error?", options: ["Retry, skip, or alert - never silently", "Ignore it", "Crash everything", "Delete data"], answerIndex: 0, explanation: "Explicit handling keeps failures visible." },
      { prompt: "Constraining the AI step means...", options: ["Limiting it to allowed values/actions", "Giving it unlimited power", "Removing it", "Hiding its output"], answerIndex: 0, explanation: "Constraints stop wild instructions." },
    ],
  },
  "automation-10": {
    lesson: `Automation you don't watch will silently fail. The unglamorous skill - scheduling, monitoring, and maintenance - is what makes automation reliable over time.

## What this involves
- **Schedule**: run daily/weekly, or on a trigger.
- **Monitor**: check execution logs for failed runs. Most tools show a history.
- **Maintain**: when an app changes its API or a key expires, the workflow breaks - update it.
- **Debug**: read the failed step, fix the cause, re-run.

> **Example.** A weekly report automation quietly stops because a token expired. Because you check the log, you catch it in days, not months.

Set it up, then build the habit of glancing at the run history.`,
    task: "Set up a scheduled automation, review its execution log, identify a simulated failure, and correct the workflow - documenting each step with notes.",
    quiz: [
      { prompt: "What happens to unmonitored automation?", options: ["It can silently fail", "It improves itself", "It never breaks", "It speeds up"], answerIndex: 0, explanation: "Without monitoring, failures go unnoticed." },
      { prompt: "How do you catch failures?", options: ["Check execution logs / run history", "Hope", "Ignore it", "Delete the workflow"], answerIndex: 0, explanation: "Logs reveal failed runs." },
      { prompt: "Why does a working automation break later?", options: ["An app's API changed or a key expired", "It gets bored", "The user blinked", "It never breaks"], answerIndex: 0, explanation: "External changes require maintenance." },
      { prompt: "Maintenance is...", options: ["The work most beginners don't anticipate", "Optional forever", "Automatic", "Unnecessary"], answerIndex: 0, explanation: "Upkeep keeps automations alive." },
    ],
  },
  "automation-11": {
    lesson: `An **AI agent** is given a goal and a set of tools, and decides the steps itself - the next level beyond fixed workflows. No-code tools (n8n's AI Agent node, others) make this accessible.

## What an agent needs
- **Tools** - web search, calendar, email, a database.
- **Reasoning** - it plans and picks the next action.
- **Memory** - it remembers earlier steps.

It runs a loop: **think -> use a tool -> observe -> repeat** until the goal is met.

> **Example.** "Research this company and draft a meeting-prep brief." The agent searches, reads, and writes the brief - using tools you gave it, with you reviewing the result.

Give agents clear goals, limited tools, and oversight - autonomy is powerful but needs guardrails.`,
    task: "Build a no-code AI agent that completes a defined multi-step task (e.g., research a company and draft a prep brief), and explain each tool it uses and how you control it.",
    quiz: [
      { prompt: "How is an agent different from a fixed workflow?", options: ["It's given a goal and tools and decides the steps", "It runs only your exact script", "It has no tools", "It can't act"], answerIndex: 0, explanation: "Agents choose their own actions toward a goal." },
      { prompt: "What does an agent need?", options: ["Tools, reasoning, and memory", "Only a password", "A logo", "Nothing"], answerIndex: 0, explanation: "Tools to act, planning, and memory." },
      { prompt: "The agent loop is...", options: ["Think -> use a tool -> observe -> repeat", "Sleep -> wake", "Trigger then stop", "Random"], answerIndex: 0, explanation: "It iterates until the goal is met." },
      { prompt: "How do you keep an agent safe?", options: ["Clear goals, limited tools, and oversight", "Unlimited tools, no review", "No goal", "Maximum autonomy"], answerIndex: 0, explanation: "Constraints and oversight manage autonomy." },
    ],
  },
};
