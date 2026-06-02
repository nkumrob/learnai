import type { ModuleContent } from "@/types/shared";

// Hand-authored content for the AI Automation & Agents track.
export const automation: Record<string, ModuleContent> = {
  "automation-1": {
    lesson: `Automation pays off when you point it at the right work. The best candidates are **repetitive, rule-based, and triggered by something** - the boring tasks that eat your week.

## A quick test
Ask three questions about a task:
1. **Do I do it often?** Daily/weekly beats once a year.
2. **Is it mostly the same steps each time?** Predictable beats judgment-heavy.
3. **Does something kick it off?** A new email, a form submission, a file, a schedule.

If you answer yes, yes, and yes - automate it.

> **Great candidate.** "Every time a customer fills the contact form, add them to the sheet, send a welcome email, and post to Slack." Same steps, clear trigger, happens constantly.
> **Poor candidate.** "Decide our pricing strategy." Rare, judgment-heavy, no clean trigger.

## Where AI fits in
Plain automation moves data between apps. **AI** adds judgment to the middle: classify the incoming message, summarize it, draft a reply, extract fields. So the pattern becomes:
**trigger → AI understands/transforms → action.**

## Start small
Automate one annoying step, not your whole job. A single reliable automation that saves 10 minutes a day is worth more than an ambitious one that breaks.`,
    task: "List 5 tasks you did this week. Score each on the three questions (often? same steps? clear trigger?). Pick the highest scorer as your first automation candidate and write its trigger → steps → action in one line.",
    quiz: [
      {
        prompt: "Which task is the best automation candidate?",
        options: [
          "A frequent task with the same steps and a clear trigger",
          "A rare, judgment-heavy decision",
          "Something with no repeatable steps",
          "A one-time creative project",
        ],
        answerIndex: 0,
        explanation: "Frequent, rule-based, triggered tasks are ideal to automate.",
      },
      {
        prompt: "What does AI add to a plain automation?",
        options: [
          "Judgment in the middle - classify, summarize, draft, extract",
          "Slower data transfer",
          "A new password",
          "Nothing useful",
        ],
        answerIndex: 0,
        explanation: "AI handles the understanding/transforming step between trigger and action.",
      },
      {
        prompt: "What's the core automation pattern with AI?",
        options: [
          "Trigger → AI understands/transforms → action",
          "Action → trigger → nothing",
          "Random → random → random",
          "Email → delete → forget",
        ],
        answerIndex: 0,
        explanation: "Something fires the workflow, AI processes it, then an action happens.",
      },
      {
        prompt: "What's the smart way to start automating?",
        options: [
          "Automate one annoying step reliably",
          "Automate your entire job at once",
          "Only automate rare tasks",
          "Never test it",
        ],
        answerIndex: 0,
        explanation: "Small, reliable wins beat ambitious automations that break.",
      },
    ],
  },

  "automation-2": {
    lesson: `Three tools dominate no-code AI automation: **Zapier, Make, and n8n.** They all connect apps, but they fit different people.

## The honest comparison
- **Zapier** - the friendliest. Thousands of app connections, simple linear "Zaps," great if you want something running *today* and aren't technical.
- **Make** - a visual canvas with more power: branching, loops, and complex logic, at a more generous price. The middle ground.
- **n8n** - the most powerful and developer-leaning. Open-source, can be self-hosted (free), with deep AI/agent features. Best when you want full control and have someone technical.

> **Rule of thumb.** Zapier if you need it now and simple. Make if you want more logic without code. n8n if you want control, self-hosting, or serious AI agent workflows.

## What they share
All three use the same building blocks: a **trigger** starts the flow, **actions** do the work, and **connections** (your logged-in accounts) let them touch Gmail, Slack, Sheets, and so on. Learn the concepts once and you can move between tools.

## Cost & lock-in
Watch task/operation limits on paid plans, and remember self-hosting (n8n) trades money for setup effort. Pick the simplest tool that does the job - you can always graduate later.`,
    task: "Pick the tool that matches you (Zapier = simplest, Make = more logic, n8n = control). Sign up for the free tier and open the editor - just explore the trigger and action picker, don't build yet.",
    quiz: [
      {
        prompt: "Which tool is the friendliest for a non-technical beginner who needs it today?",
        options: ["Zapier", "n8n", "A spreadsheet", "A terminal"],
        answerIndex: 0,
        explanation: "Zapier is the simplest, with the most pre-built connections.",
      },
      {
        prompt: "Which tool is open-source, self-hostable, and most developer-leaning?",
        options: ["n8n", "Zapier", "Make", "None"],
        answerIndex: 0,
        explanation: "n8n offers the most control and deep AI/agent features, and can be self-hosted free.",
      },
      {
        prompt: "What do all three tools share?",
        options: [
          "Triggers, actions, and connections",
          "The same owner",
          "Identical pricing",
          "No AI features at all",
        ],
        answerIndex: 0,
        explanation: "Learn trigger/action/connection once and you can move between tools.",
      },
      {
        prompt: "What's a sensible selection rule?",
        options: [
          "Pick the simplest tool that does the job; graduate later",
          "Always pick the most complex tool",
          "Never use a free tier",
          "Avoid all three",
        ],
        answerIndex: 0,
        explanation: "Start simple; you can move to a more powerful tool when you outgrow it.",
      },
    ],
  },

  "automation-3": {
    lesson: `Every automation is built from three parts: a **trigger**, one or more **actions**, and the **connections** that let them touch your apps. Master these and you can read or build any workflow.

## Trigger: what starts it
The event that kicks things off:
- "New email in Gmail with label *Invoices*."
- "New row in a Google Form response sheet."
- "Every weekday at 8am" (a schedule).

## Actions: what happens next
The steps that run in order:
\`\`\`
Trigger:  New contact-form submission
Action 1: AI - classify the message (sales / support / spam)
Action 2: If sales -> add row to CRM sheet
Action 3: Send a templated reply email
Action 4: Post a summary to the #leads Slack channel
\`\`\`
Notice **Action 1 is AI** - it adds the judgment that decides what happens.

## Connections: permission to act
A connection is your authorized account (Gmail, Slack, Sheets). You log in once; the tool can then read or write on your behalf. Treat these like keys - only connect what you need.

## Map before you build
Write the flow in plain English first: *trigger, then step, then step.* If you can describe it as a clear sequence, you can build it. If you can't, the task isn't ready to automate yet.`,
    task: "Write out one real workflow as Trigger → Action 1 → Action 2 → … in plain English. Mark which step (if any) needs AI judgment. Keep it to 5 steps or fewer.",
    quiz: [
      {
        prompt: "What is a 'trigger' in an automation?",
        options: [
          "The event that starts the workflow",
          "The final result",
          "The password",
          "An error message",
        ],
        answerIndex: 0,
        explanation: "A trigger is what kicks the flow off - a new email, form, or schedule.",
      },
      {
        prompt: "In the example, why is the AI step placed first among the actions?",
        options: [
          "It adds the judgment that decides what happens next",
          "It is the trigger",
          "It sends the email",
          "It stores the password",
        ],
        answerIndex: 0,
        explanation: "Classifying the message determines which later actions run.",
      },
      {
        prompt: "What is a 'connection'?",
        options: [
          "Your authorized account that lets the tool act on your behalf",
          "A type of trigger",
          "The output format",
          "A quiz question",
        ],
        answerIndex: 0,
        explanation: "Connections are logged-in accounts - treat them like keys.",
      },
      {
        prompt: "What should you do before building a workflow?",
        options: [
          "Map it in plain English as a clear sequence",
          "Build first and plan never",
          "Connect every app you own",
          "Skip the trigger",
        ],
        answerIndex: 0,
        explanation: "If you can describe it as trigger → steps, you can build it.",
      },
    ],
  },

  "automation-4": {
    lesson: `An **AI agent** is a step beyond a fixed workflow. Instead of you scripting every action, the agent is given a **goal and a set of tools**, and it decides which tools to use, in what order, to reach the goal.

## Three things an agent needs
1. **Tools** - actions it can take: search the web, read a file, send an email, query a database.
2. **Reasoning/planning** - it breaks the goal into steps and picks the next action.
3. **Memory** - it remembers earlier steps (and sometimes past sessions) so it can build on them.

> **Workflow vs agent.** A *workflow* you wrote says: "do A, then B, then C." An *agent* you told "book me a meeting with Sam next week" figures out the steps itself - check calendars, propose a time, send the invite.

## The loop
Agents run in a cycle: **think → act with a tool → observe the result → repeat** until the goal is met. That loop is what lets them handle tasks you didn't fully script.

## Where they shine and struggle
- **Shine**: open-ended, multi-step tasks ("research these 5 companies and summarize").
- **Struggle**: they can loop, take wrong turns, or misuse a tool. More autonomy means more need for limits - which is the next module.

No-code tools (n8n, Make, Zapier) now ship agent nodes, so you can use these ideas without writing code.`,
    task: "Describe one goal you'd hand to an agent rather than script step-by-step. List the tools it would need and one thing that could go wrong if it had no limits.",
    quiz: [
      {
        prompt: "How is an AI agent different from a fixed workflow?",
        options: [
          "It's given a goal and tools and decides the steps itself",
          "It runs the exact steps you scripted, nothing more",
          "It has no tools",
          "It can't take actions",
        ],
        answerIndex: 0,
        explanation: "Agents choose their own actions toward a goal; workflows follow your script.",
      },
      {
        prompt: "Which three things does an agent need?",
        options: [
          "Tools, reasoning/planning, and memory",
          "A font, a color, a logo",
          "Only a password",
          "Nothing - it's magic",
        ],
        answerIndex: 0,
        explanation: "Tools to act, planning to choose steps, and memory to build on them.",
      },
      {
        prompt: "What is the agent loop?",
        options: [
          "Think → act with a tool → observe → repeat",
          "Sleep → wake → sleep",
          "Trigger only, then stop",
          "Read the password, then exit",
        ],
        answerIndex: 0,
        explanation: "Agents iterate this loop until the goal is met.",
      },
      {
        prompt: "What's a key risk of more agent autonomy?",
        options: [
          "It can loop, take wrong turns, or misuse a tool",
          "It always succeeds instantly",
          "It never needs limits",
          "It removes the need to test",
        ],
        answerIndex: 0,
        explanation: "More autonomy means more need for guardrails (the next module).",
      },
    ],
  },

  "automation-5": {
    lesson: `Automations and agents act on your behalf - so when they go wrong, they go wrong *automatically*. Guardrails are the checks that make a workflow fail **safely** instead of doing damage at scale.

## The core guardrails
- **Validate inputs.** Check the data is what you expect before acting. No email address? Stop, don't send.
- **Add a human in the loop** for risky actions. Draft the reply or queue the refund for one-click approval instead of firing it automatically.
- **Constrain the AI step.** Limit it to allowed values and actions ("category must be one of three"), so it can't invent a wild instruction.
- **Handle errors.** Decide what happens when a step fails: retry, skip, or alert you - never fail silently.

> **Example.** An auto-reply bot without guardrails emails every sender, including the angry CEO, with a generic message. With guardrails: it classifies first, only auto-replies to routine messages, and **flags anything sensitive for a human.**

## Test before you trust
1. Run it on sample data, not live, first.
2. Try the weird cases: empty fields, huge inputs, the unexpected.
3. Start with notifications ("would have sent X") before letting it act for real.

## Limit the blast radius
Cap how much it can do - rate limits, spending caps, a daily max. The goal isn't zero risk; it's making sure a mistake is small, visible, and recoverable.`,
    task: "Take a workflow idea and add three guardrails: one input check, one human-approval step for the risky action, and one error rule (retry/skip/alert). Write what happens when the AI step is unsure.",
    quiz: [
      {
        prompt: "Why do automations need guardrails specifically?",
        options: [
          "When they go wrong, they go wrong automatically and at scale",
          "Because they are slow",
          "Because they can't be tested",
          "They never make mistakes",
        ],
        answerIndex: 0,
        explanation: "Automation repeats actions fast, so an unchecked error multiplies.",
      },
      {
        prompt: "What's a good guardrail for a risky action like a refund?",
        options: [
          "Queue it for one-click human approval",
          "Fire it instantly with no review",
          "Hide it from everyone",
          "Run it twice",
        ],
        answerIndex: 0,
        explanation: "A human-in-the-loop step prevents costly automatic mistakes.",
      },
      {
        prompt: "How should a step handle an error?",
        options: [
          "Retry, skip, or alert - never fail silently",
          "Ignore it completely",
          "Crash the whole company",
          "Delete the data",
        ],
        answerIndex: 0,
        explanation: "Explicit error handling keeps failures visible and recoverable.",
      },
      {
        prompt: "What's a safe way to launch a new automation?",
        options: [
          "Start with notifications ('would have sent X') before it acts",
          "Point it at live data immediately",
          "Skip all testing",
          "Give it unlimited spending",
        ],
        answerIndex: 0,
        explanation: "Dry-run notifications let you confirm behavior before real actions.",
      },
    ],
  },
};
