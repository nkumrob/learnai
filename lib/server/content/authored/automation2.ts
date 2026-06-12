import type { ModuleContent } from "@/types/shared";

// Level 4 - AI Automation (Fluency to Mastery). Topics 40-44.
export const automation2: Record<string, ModuleContent> = {
  "automation-7": {
    lesson: `**A lead capture or intake automation is an end-to-end workflow that takes form submissions, validates them, uses an AI step to classify intent, routes each one to the right destination, and notifies the right person**, exercising every core skill (triggers, validation, AI classification, branching, notifications) in a single build. The mechanism in Zapier, Make, or n8n is straightforward: a form trigger captures the submission, a validation node checks for a real email and required fields (and stops if not), an AI node classifies intent as sales, support, or spam, branching sends sales to your CRM, support to a helpdesk, and spam to drop, and a final step posts a one-line summary to the right Slack channel. For instance, a Google Forms submission for "request a demo" can be in HubSpot with a Slack ping in seconds. This exact pattern powers real businesses, and once you build one intake flow, support tickets and job applications follow the same shape.

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
    lesson: `**An AI-powered content workflow is an automation that takes a structured input (a topic or brief from a sheet), drafts a piece with AI, and routes it to a human review step before anything publishes**, on the non-negotiable principle that AI drafts and humans approve. The mechanism in Zapier, Make, or n8n is a chain: a trigger fires on a new row in a "content ideas" sheet, an AI node (calling Claude or ChatGPT) drafts a post using the topic plus brand-voice notes plus examples of past good posts, the draft saves to a review folder or sends for approval, and only after human edit does it publish. For instance, a weekly newsletter brief can become a review-ready draft plus a hero image prompt for Midjourney or Ideogram in one run. Never auto-publish AI content, and feed the model your past posts so drafts sound like you rather than generic AI.

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
    lesson: `**Guardrails in automation are the safety mechanisms that prevent a workflow from causing damage when it goes wrong, specifically input validation, human-in-the-loop approval on risky actions, constraints on AI output, error handling, and blast-radius limits like rate caps and spend caps.** They matter because automation acts on your behalf, so when it is wrong it is wrong automatically and at scale, which is the difference between a tool and a liability. The mechanism is to layer the four guardrails into every workflow you build in Zapier, Make, or n8n: validate inputs before any action (no valid email then stop), queue refunds for one-click human approval, constrain the AI to allowed values like "urgent / normal / spam," and handle errors with retry, skip, or alert paths so failures never go silent. For instance, launch new automations in "notify only" dry-run mode first ("would have sent X") before letting them act for real, which catches surprises.

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
    lesson: `**Maintaining an automation means scheduling it on a clear cadence or trigger, checking its run history regularly, turning on failure alerts, and updating connections when an app changes its API or a token expires**, because an automation you do not watch will silently fail and cost you for weeks before you notice. The mechanism is built into every platform: Zapier, Make, and n8n all show execution history per workflow and can email you on failed runs, while self-hosted n8n gives you full logs. For instance, a weekly Google Sheets export can stop because a Google OAuth token expired, but because you check the run log you see the failed runs in days, not months, reconnect the account, re-run, and you are done. The goal is not zero failures, it is catching them fast and recovering cleanly, and a ten-minute monthly habit of checking your most important workflows is what keeps automation trustworthy.

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
    lesson: `**An AI agent is a system that is given a goal and a set of tools and decides the steps to reach the goal itself, looping through think-then-use-a-tool-then-observe until done**, unlike a fixed workflow that runs the exact steps you scripted. No-code agent builders include n8n's AI Agent node (with memory and tool use), Zapier's AI Agents, and Make's AI features, while frameworks like CrewAI and LangChain serve the technical. The mechanism requires four ingredients: a clear single goal, a small set of tools the agent can call (web search, calendar, email, a database), short-term memory of earlier steps, and a reasoning loop that picks the next action. For instance, "research this company and draft a meeting-prep brief" can be given to an n8n agent with web-search and email-draft tools, and it will search, read, and write the brief while you review the result. Keep tools few and add human approval on risky actions.

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
