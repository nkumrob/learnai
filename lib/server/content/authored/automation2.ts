import type { ModuleContent } from "@/types/shared";

// Level 4 - AI Automation (Fluency to Mastery). Topics 40-44.
export const automation2: Record<string, ModuleContent> = {
  "automation-7": {
    lesson: `**TL;DR - Build a lead-capture / intake automation: capture a form submission, validate it, let AI classify it, route it, and notify. It's a universal business problem that teaches every core skill at once.**

## Why it matters
Intake (leads, support tickets, applications) is everywhere, and building it once exercises triggers, validation, an AI decision, branching, and notifications - the whole toolkit.

## Worked example - the build
\`\`\`
Trigger:  New contact-form submission
Step 1:   Validate - is the email real? required fields present? (if not, stop)
Step 2:   AI - classify intent: sales / support / spam
Step 3:   Route - sales -> CRM row;  support -> helpdesk;  spam -> drop
Step 4:   Notify the right person in Slack with a one-line summary
\`\`\`

## Steal this - intake checklist
\`\`\`
[ ] Trigger wired to the form
[ ] Validation before any action
[ ] AI step constrained to fixed categories
[ ] A branch per category
[ ] A notification + a record (sheet/CRM)
[ ] A test submission that proves it end to end
\`\`\`

## Common mistakes (and the fix)
- **No validation.** **Fix:** check inputs before acting (bad email -> stop).
- **Acting on every message.** **Fix:** classify and route, don't blast.
- **No record.** **Fix:** always log it somewhere you can audit.

## Good to know
Build it in **Zapier/Make** (simplest) or **n8n** (more control). This exact pattern powers real businesses; once you've built one intake flow, support tickets, job applications, and event signups are the same shape.`,
    task: "Starter: build an intake automation end to end (capture -> validate -> classify -> route -> notify) and test it with a real submission. Stretch: document each step and what to do if it breaks.",
    quiz: [
      { prompt: "Why is intake a great first real project?", options: ["It exercises triggers, validation, AI, branching, and notifications", "It's the only thing AI can do", "It needs no thought", "It can't break"], answerIndex: 0, explanation: "It teaches the whole toolkit at once." },
      { prompt: "What's the validation step for?", options: ["Check inputs (real email, required fields) before acting", "Send spam", "Slow it down", "Delete data"], answerIndex: 0, explanation: "Validate inputs before downstream actions." },
      { prompt: "What does the AI step do in intake?", options: ["Classify intent so the flow routes correctly", "Replace the trigger", "Store passwords", "Pick a font"], answerIndex: 0, explanation: "Classification decides where the lead goes." },
      { prompt: "After building, you should...", options: ["Test end to end and document failure handling", "Skip testing", "Only check the trigger", "Hope it works"], answerIndex: 0, explanation: "Testing + docs make it maintainable." },
    ],
  },

  "automation-8": {
    lesson: `**TL;DR - A content workflow takes input (a topic or brief), drafts something with AI, and routes it for human review before anything publishes. High ROI, with a non-negotiable human checkpoint.**

## Why it matters
Content workflows are among the highest-value automations for individuals and small teams - the boring drafting is handled, while judgment and brand stay human.

## Worked example - the build
\`\`\`
Trigger:  New row in a "content ideas" sheet
AI node:  Draft a post from the idea + brand-voice notes
Step:     Save the draft to a "review" folder / send for approval
Human:    Approve or edit -> THEN publish
\`\`\`
The review gate is the whole point.

## Steal this - the safe content pattern
\`\`\`
Input (structured) -> AI draft -> human review -> publish
Never: input -> AI -> auto-publish.
Give the AI: the brief, the brand voice, examples of good past posts.
\`\`\`

## Common mistakes (and the fix)
- **Auto-publishing AI content.** **Fix:** always insert a human approval step.
- **No brand voice.** **Fix:** feed it examples so drafts sound like you.
- **One channel only.** **Fix:** branch one draft into post + email + caption.

## Good to know
Build with **Zapier/Make/n8n** plus an AI step (ChatGPT/Claude). Pair with content tools (**Canva/Gamma** for visuals). The review checkpoint isn't just quality control - it's what protects trust and keeps a hallucination from going public.`,
    task: "Starter: build a workflow that turns structured input into a review-ready draft with a clear human checkpoint before publishing. Stretch: branch the approved draft into two formats (e.g., post + email).",
    quiz: [
      { prompt: "What's essential in an AI content workflow?", options: ["A human checkpoint before publishing", "Auto-publishing instantly", "No review ever", "Hiding the draft"], answerIndex: 0, explanation: "Human approval protects quality and trust." },
      { prompt: "What does the AI step produce?", options: ["A review-ready draft from the input", "The final published post", "A password", "Nothing"], answerIndex: 0, explanation: "It drafts; humans approve." },
      { prompt: "To make drafts sound like you, give the AI...", options: ["Brand voice notes and examples of good past posts", "Only the topic", "A blank prompt", "The logo"], answerIndex: 0, explanation: "Examples teach your voice." },
      { prompt: "What should you never do?", options: ["Auto-publish AI content with no review", "Add a review step", "Save drafts", "Use brand notes"], answerIndex: 0, explanation: "Skipping review risks quality and trust." },
    ],
  },

  "automation-9": {
    lesson: `**TL;DR - Automation acts on your behalf, so when it's wrong it's wrong automatically and at scale. Guardrails - validation, human approval, constraints, error handling - make it fail safely.**

## Why it matters
An unguarded automation that breaks can email the wrong people, refund the wrong amounts, or spam your customers - fast. Guardrails are the difference between a tool and a liability.

## Worked example - before / after
> **Naive:** auto-reply bot emails _every_ sender, including the angry CEO, with a generic message.
> **Guarded:** it classifies first, only auto-replies to routine messages, and flags anything sensitive for a human.

## Steal this - the core four guardrails
\`\`\`
1. Validate inputs - no valid email? stop, don't send.
2. Human-in-the-loop for risky actions - queue refunds for one-click approval.
3. Constrain the AI - allowed values only, so it can't invent a wild instruction.
4. Handle errors - retry, skip, or alert. Never fail silently.
Bonus: limit the blast radius - rate limits, spend caps, a daily max.
\`\`\`

## Common mistakes (and the fix)
- **No human gate on money/customers.** **Fix:** approval step for high-stakes actions.
- **Silent failures.** **Fix:** log + alert on every error.
- **Unbounded runs.** **Fix:** cap volume and spend.

## Good to know
**n8n** explicitly markets reliable, debuggable AI workflows; Zapier/Make have error handlers and paths too. Launch new automations in "notify only" mode first ("would have sent X") before letting them act for real - a dry run catches surprises.`,
    task: "Starter: take a naive automation idea and add two guardrails, explaining the failure each prevents. Stretch: design a 'notify-only' dry-run version you'd run before going live.",
    quiz: [
      { prompt: "Why do automations specifically need guardrails?", options: ["They act automatically, so errors scale fast", "They're slow", "They can't be tested", "They never fail"], answerIndex: 0, explanation: "Unchecked errors repeat at scale." },
      { prompt: "Good guardrail for a refund action?", options: ["Queue it for one-click human approval", "Fire it instantly", "Hide it", "Run it twice"], answerIndex: 0, explanation: "Human-in-the-loop prevents costly mistakes." },
      { prompt: "How should a step handle an error?", options: ["Retry, skip, or alert - never silently", "Ignore it", "Crash everything", "Delete data"], answerIndex: 0, explanation: "Explicit handling keeps failures visible." },
      { prompt: "Safe way to launch a new automation?", options: ["Run it in 'notify only' dry-run mode first", "Point it at production immediately", "Skip testing", "Give it unlimited spend"], answerIndex: 0, explanation: "A dry run surfaces surprises before real actions." },
    ],
  },

  "automation-10": {
    lesson: `**TL;DR - Automation you don't watch will silently fail. Schedule it, monitor the run logs, and maintain it when apps change. Maintenance is the work beginners forget.**

## Why it matters
A workflow that quietly stops can cost you for weeks before you notice. The unglamorous habit of checking run history is what keeps automation trustworthy.

## Worked example - catch a failure
> A weekly report automation stops because a Google token expired.
> Because you **check the run log**, you see the failed runs in days, not months - reconnect the account, re-run, done.

## Steal this - the maintenance routine
\`\`\`
Schedule:  run on a trigger or a clear cadence (daily/weekly).
Monitor:   glance at the execution log; set failure alerts if the tool supports it.
Maintain:  when an app changes its API or a key expires, update the step.
Debug:     read the failed step -> fix the cause -> re-run.
\`\`\`

## Common mistakes (and the fix)
- **Set and forget.** **Fix:** build a habit of checking run history.
- **No failure alert.** **Fix:** turn on notifications for failed runs.
- **Ignoring app changes.** **Fix:** expect occasional breakage; budget 10 min to fix.

## Good to know
**Zapier**, **Make**, and **n8n** all show execution history and can email you on failure - turn that on. Self-hosted **n8n** gives you full logs. The goal isn't zero failures; it's catching them fast and recovering cleanly.`,
    task: "Starter: set up a scheduled automation, review its run log, simulate a failure, and fix it - documenting each step. Stretch: turn on failure alerts so you're notified the moment a run breaks.",
    quiz: [
      { prompt: "What happens to unmonitored automation?", options: ["It can silently fail", "It improves itself", "It never breaks", "It speeds up"], answerIndex: 0, explanation: "Without monitoring, failures go unnoticed." },
      { prompt: "How do you catch failures fast?", options: ["Check run history and enable failure alerts", "Hope", "Ignore it", "Delete the workflow"], answerIndex: 0, explanation: "Logs and alerts reveal failed runs." },
      { prompt: "Why does a working automation break later?", options: ["An app's API changed or a key expired", "It gets bored", "The user blinked", "It never breaks"], answerIndex: 0, explanation: "External changes require maintenance." },
      { prompt: "The real goal of monitoring is...", options: ["Catch failures fast and recover cleanly", "Zero failures ever", "To stop using automation", "To avoid logs"], answerIndex: 0, explanation: "Fast detection and recovery is what matters." },
    ],
  },

  "automation-11": {
    lesson: `**TL;DR - An AI agent is given a goal and a set of tools and decides the steps itself - the level beyond fixed workflows. No-code tools now make simple agents accessible, with you supervising.**

## Why it matters
A workflow you scripted does exactly A then B then C. An agent figures out the steps to reach a goal - handling open-ended tasks you couldn't fully script. It's where automation is heading.

## Worked example - workflow vs agent
> **Workflow:** "When a form comes in, add a row and email me." (you scripted every step)
> **Agent:** "Research this company and draft a meeting-prep brief." -> it searches the web, reads, and writes the brief, choosing tools as it goes - while you review the result.

## Steal this - what an agent needs
\`\`\`
Goal:   one clear objective.
Tools:  web search, calendar, email, a database - only what it needs.
Memory: it remembers earlier steps.
Loop:   think -> use a tool -> observe -> repeat until done.
Oversight: a human reviews/approves important actions.
\`\`\`

## Common mistakes (and the fix)
- **Too much autonomy + no limits.** **Fix:** few tools, clear goal, human approval on risky steps.
- **Vague goals.** **Fix:** a sharp objective beats "go help with marketing".
- **No review.** **Fix:** check the agent's output and tool use.

## Good to know
**n8n's AI Agent node** (with memory + tools) is the most accessible no-code agent builder; Zapier and Make have agent features too, and frameworks like **CrewAI** exist for the technical. Agents are powerful but can loop or misuse tools - which is exactly why the guardrails lesson came first.`,
    task: "Starter: describe one goal you'd hand to an agent (not a fixed script), the tools it needs, and one thing that could go wrong without limits. Stretch: build a simple no-code agent (e.g., n8n) that completes a defined multi-step task with your oversight.",
    quiz: [
      { prompt: "How is an AI agent different from a fixed workflow?", options: ["It's given a goal and tools and decides the steps", "It runs only your exact script", "It has no tools", "It can't act"], answerIndex: 0, explanation: "Agents choose their own actions toward a goal." },
      { prompt: "Which three things does an agent need?", options: ["Tools, reasoning/planning, and memory", "A font, color, logo", "Only a password", "Nothing"], answerIndex: 0, explanation: "Tools to act, planning to choose, memory to build on." },
      { prompt: "The agent loop is...", options: ["Think -> use a tool -> observe -> repeat", "Sleep -> wake", "Trigger then stop", "Random"], answerIndex: 0, explanation: "It iterates until the goal is met." },
      { prompt: "How do you keep an agent safe?", options: ["Clear goal, few tools, human approval on risky steps", "Unlimited tools, no review", "No goal", "Maximum autonomy"], answerIndex: 0, explanation: "Constraints and oversight manage autonomy." },
    ],
  },
};
