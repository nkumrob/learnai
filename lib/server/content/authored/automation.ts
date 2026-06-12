import type { ModuleContent } from "@/types/shared";

// Level 4 - AI Automation (Fluency to Mastery). Topics 34-39.
export const automation: Record<string, ModuleContent> = {
  "automation-1": {
    lesson: `**Automation is software that runs a sequence of steps without you, triggered by an event like a form submission, an incoming email, or a schedule**, and the core skill is judging which tasks belong in an automation versus which belong in manual AI use or pure human work. The test is whether the task is frequent, follows the same steps each time, has a clear trigger, and requires low judgment, because tools like Zapier, Make, and n8n excel exactly there. For instance, "log every contact-form submission to a sheet and send a Slack alert" is an automate-now task (frequent, rule-based, clear trigger), "draft a tricky reply to an upset customer" stays manual AI (needs your judgment), and "decide our pricing" stays fully human (high-stakes, rare). The AI automation pattern is always trigger then AI understands or transforms the data then action, and the smart first move is automating one annoying step reliably.

## Worked example - sort your tasks
> "Log every contact-form submission to a sheet and Slack me." -> **automate** (frequent, rule-based, clear trigger).
> "Draft a tricky reply to an upset customer." -> **use AI manually** (needs your judgment).
> "Decide our pricing." -> **keep fully human** (high-stakes, rare).

## Steal this - the automation test
\`\`\`
Automate a task only if it's mostly YES on:
1. Do I do it often? (daily/weekly)
2. Same steps each time?
3. Clear trigger (an email, a form, a schedule)?
4. Low judgment?
The AI pattern: trigger -> AI understands/transforms -> action.
\`\`\`

## Common mistakes (and the fix)
- **Automating rare or judgment-heavy tasks.** **Fix:** keep those manual.
- **Boiling the ocean.** **Fix:** automate one annoying step reliably first.
- **No monitoring.** **Fix:** a silent failure can be worse than doing it by hand (covered later).

## Good to know
Automation lives in **Zapier**, **Make**, and **n8n** (next lessons). Plain automation just moves data; adding an **AI step** (classify, summarize, draft) is what makes it _intelligent_ - the theme of this level.`,
    task: "Starter: audit five recurring tasks and tag each 'automate now', 'use AI manually', or 'keep human', with a reason. Stretch: for your top 'automate now' pick, write its trigger -> steps -> action in one line.",
    quiz: [
      { prompt: "When is a task worth automating?", options: ["Frequent, rule-based, clear trigger, low judgment", "Rare and high-judgment", "One-off and creative", "Relationship-based"], answerIndex: 0, explanation: "Predictable, frequent tasks pay off." },
      { prompt: "Manual AI use vs automation?", options: ["Automation runs without you; manual needs your prompt", "They're identical", "Manual is always faster", "Automation needs no setup"], answerIndex: 0, explanation: "Automation removes you from the loop." },
      { prompt: "The AI automation pattern is...", options: ["Trigger -> AI understands/transforms -> action", "Action -> trigger -> nothing", "Random steps", "Action only"], answerIndex: 0, explanation: "Something fires it, AI processes, an action happens." },
      { prompt: "Smart way to start automating?", options: ["Automate one annoying step reliably first", "Automate your whole job at once", "Only automate rare tasks", "Never test it"], answerIndex: 0, explanation: "Small, reliable wins beat ambitious ones that break." },
    ],
  },

  "automation-2": {
    lesson: `**An API (application programming interface) is the channel one app uses to send data to or request data from another app, and a webhook is an automatic "ping" one app sends when something happens**, like a new form submission, which fires the next step in a workflow. Together they are how Zapier, Make, and n8n move data between Google Sheets, Slack, Gmail, HubSpot, and thousands of other tools without you writing code. The mechanism in a no-code tool is straightforward: a webhook trigger fires, the workflow passes the data through API calls to actions in other apps, and an authorized connection (your logged-in account) grants the permission to act. For instance, a form submission can fire a webhook that adds a row to a sheet, sends a welcome email, and posts to Slack, all in one run. When something breaks, walk the flow: trigger, data, auth, action.

## Worked example - trace the flow
> A new form submission **fires a webhook** -> the workflow sends that data via **APIs** to:
> 1) add a row to a sheet, 2) send a welcome email, 3) post to Slack.
> If the email never arrives, you can reason: did the trigger fire? did the email step's API call fail? did its key expire?

## Steal this - the mental model
\`\`\`
Trigger (webhook): "something happened" - a new email, form, or schedule.
Action (API call): "do this in another app" - add a row, send a message.
Connection: your logged-in account that grants permission (treat like a key).
To debug: check each step in order - trigger? data? auth? action?
\`\`\`

## Common mistakes (and the fix)
- **Panicking when it breaks.** **Fix:** walk the flow step by step.
- **Ignoring expired keys/auth.** **Fix:** reconnect the account - the #1 silent failure.
- **Assuming the trigger fired.** **Fix:** check the run log first.

## Good to know
You rarely touch raw APIs in **Zapier/Make/n8n** - they wrap them in friendly steps. But when you hit an "HTTP request" block or an error about a 401/expired token, this model is what lets you fix it.`,
    task: "Starter: in plain English, describe what happens when a form submission triggers an email, a sheet update, and a Slack message - and where it'd fail if a key expired. Stretch: open a Zapier/Make template and identify the trigger vs the action steps.",
    quiz: [
      { prompt: "What is an API, in plain terms?", options: ["How one app sends data to another", "A type of password", "A spreadsheet", "A chatbot"], answerIndex: 0, explanation: "APIs are the channel apps use to exchange data." },
      { prompt: "What does a webhook do?", options: ["Fires when an event happens, triggering a workflow", "Stores files", "Designs UI", "Writes code"], answerIndex: 0, explanation: "A webhook announces an event." },
      { prompt: "An expired API key/connection usually causes...", options: ["A silent failure - the step is rejected", "Faster runs", "Doubled data", "Nothing"], answerIndex: 0, explanation: "Expired auth is a top cause of broken workflows." },
      { prompt: "Best way to debug a broken workflow?", options: ["Walk each step in order: trigger, data, auth, action", "Guess randomly", "Delete it", "Ignore it"], answerIndex: 0, explanation: "The mental model lets you isolate the failure." },
    ],
  },

  "automation-3": {
    lesson: `**Zapier and Make are no-code automation platforms that let you connect thousands of apps and run workflows shaped as Trigger then Action then Result, with no coding required.** Zapier is the friendliest starting point and connects to over six thousand apps including Gmail, Slack, Google Sheets, HubSpot, and Notion, while Make uses a visual canvas with branching and loops, more power, and generous pricing. The mechanism is straightforward: a trigger (a new form response, a new email, a schedule) fires the workflow, and one or more actions in other apps run with the trigger data passed through. For instance, "new response in a Google Form" triggers two actions: "add a row to a Google Sheet" and "send a Slack message to #leads," and you can build it in an afternoon. Both platforms now have AI steps built in for classify, draft, and summarize tasks, which is what the next lessons cover.

## Worked example - your first build
\`\`\`
Trigger:  New response in a Google Form
Action 1: Add a row to a Google Sheet
Action 2: Send a Slack message to #leads
\`\`\`
One trigger, two actions. Build it, submit a test form, watch it run.

## Steal this - pick your tool
\`\`\`
Zapier - friendliest, most app connections. Best to start TODAY, non-technical.
Make   - visual canvas, branching/loops, more power, generous pricing.
Rule: pick the simplest tool that does the job; you can graduate later.
\`\`\`

## Common mistakes (and the fix)
- **Over-building first.** **Fix:** one trigger + one or two actions to start.
- **Not testing with real data.** **Fix:** run a test submission before trusting it.
- **Connecting every app you own.** **Fix:** connect only what the flow needs.

## Good to know
**Zapier** and **Make** both now have **AI steps** built in (and Zapier has "AI Agents"), so you can add a classify/draft/summarize step without leaving the tool - exactly what the next lessons cover. Free tiers are enough to learn on.`,
    task: "Starter: build and turn on one real automation (e.g., 'new form response -> add a row -> send a notification'). Stretch: add a second action and test the whole flow end to end.",
    quiz: [
      { prompt: "Every automation follows which shape?", options: ["Trigger -> Action -> Result", "Result -> Trigger -> nothing", "Random steps", "Action only"], answerIndex: 0, explanation: "An event triggers actions that produce a result." },
      { prompt: "Friendliest tool to start with today?", options: ["Zapier", "Raw code", "A database", "A terminal"], answerIndex: 0, explanation: "Zapier has the most connections and simplest flows." },
      { prompt: "Before trusting a new automation, you should...", options: ["Test it with real sample data", "Point it at production blind", "Skip testing", "Delete the trigger"], answerIndex: 0, explanation: "Testing catches setup mistakes." },
      { prompt: "Best first automation?", options: ["One that removes a recurring annoyance", "Your entire job at once", "A rare one-off", "Nothing"], answerIndex: 0, explanation: "Small, reliable wins first." },
    ],
  },

  "automation-4": {
    lesson: `**n8n is an open-source, self-hostable workflow automation platform with branching, loops, error handling, direct HTTP requests, and built-in AI and LangChain nodes**, giving you more control than Zapier or Make and no per-task pricing. You use it by chaining nodes on a visual canvas: a trigger node fires the workflow (a webhook, a schedule, a Gmail event), data passes through processing nodes, and conditional nodes route the flow based on the data. For instance, a support-email workflow can trigger on a new email, use an AI node to classify it as urgent, normal, or spam, then branch: urgent goes to Slack, normal creates a ticket, spam is archived, with an error path that logs failures and alerts you. Choose n8n when you need branching, error handling, self-hosting for data privacy, or n8n's AI Agent node with memory for building no-code agents. n8n Cloud is fine to learn on before self-hosting.

## Worked example - a branching flow
\`\`\`
Trigger:  New support email
Node 1:   AI classifies it: urgent / normal / spam
Branch:   urgent  -> alert on-call (Slack)
          normal  -> create a ticket
          spam    -> archive
Error path: if a step fails -> log it and notify me (don't die silently)
\`\`\`

## Steal this - when to choose n8n
\`\`\`
Choose n8n when you need: branching/loops, error handling, self-hosting
(data stays with you), no per-run cost, or a built-in AI Agent node.
Stay on Zapier/Make when: you want the simplest possible setup.
\`\`\`

## Common mistakes (and the fix)
- **No error path.** **Fix:** add one so failures alert you, not vanish.
- **Self-hosting before you need it.** **Fix:** n8n Cloud is fine to learn on.
- **One giant workflow.** **Fix:** keep flows modular and named.

## Good to know
**n8n** ships AI/LangChain nodes and an **AI Agent node** with memory, so it's a favorite for no-code agents (last lesson of this level). Self-hosting (free) trades money for setup effort; the cloud version removes that.`,
    task: "Starter: in n8n, build a 3-node flow with one conditional branch and a basic error path; explain what happens when a step fails. Stretch: add an AI node that classifies the input before the branch.",
    quiz: [
      { prompt: "What sets n8n apart from Zapier?", options: ["Open-source, self-hostable, branching/loops, no per-task pricing", "It can't use AI", "It's only linear", "It has no error handling"], answerIndex: 0, explanation: "More control and power, self-hostable." },
      { prompt: "What is conditional branching?", options: ["Different paths based on a condition", "A password", "A trigger only", "An image"], answerIndex: 0, explanation: "'If urgent do X, else Y' routes the flow." },
      { prompt: "Why add an error path?", options: ["So failures alert you instead of dying silently", "To slow it down", "It's decorative", "To remove logs"], answerIndex: 0, explanation: "Explicit error handling keeps failures visible." },
      { prompt: "A benefit of self-hosting n8n?", options: ["Data stays with you and there's no per-run cost", "It's always slower", "It can't branch", "It needs no setup"], answerIndex: 0, explanation: "Control over data and cost." },
    ],
  },

  "automation-5": {
    lesson: `**Connecting AI to your workflows means adding a step inside an automation that calls a model like ChatGPT, Claude, or Gemini to classify, summarize, extract, or draft**, turning a flow that just moves data into one that actually understands and routes it. The mechanism is a dedicated AI node in your automation tool: n8n has AI and LangChain nodes, Make has AI modules, and Zapier offers AI steps and Agents, all of which let you write a small prompt that processes the incoming data before the next action runs. For instance, a feedback workflow can trigger on new submissions, send each to an AI node prompted "classify sentiment as positive or negative and topic as billing, bug, or feature, output JSON," then branch on those fields so negative bugs alert engineering and feature requests land in a roadmap sheet. Constrain the AI to fixed allowed values and validate its output before the next step, and use a cheap fast model for simple classification.

## Worked example - the upgrade
\`\`\`
Trigger:  New customer feedback (form/email)
AI node:  "Classify sentiment (positive/negative) and topic (billing/bug/feature)."
Branch:   negative+bug -> alert engineering;  feature -> add to roadmap sheet
Action:   post a one-line summary to the right Slack channel
\`\`\`
No human reads every message first - the AI routes it.

## Steal this - good AI-node jobs
\`\`\`
Classify:  "Tag this as urgent / normal / spam."
Extract:   "Pull name, email, and company as JSON."
Summarize: "One-line summary of this message."
Draft:     "Write a first-draft reply for a human to approve."
\`\`\`

## Common mistakes (and the fix)
- **Letting AI act unchecked** on risky steps. **Fix:** draft for human approval (next lesson).
- **Vague AI instructions.** **Fix:** constrain to allowed values ("one of: urgent/normal/spam").
- **No validation of AI output.** **Fix:** check the field exists/makes sense before the next step.

## Good to know
Every major tool now has this: **n8n** AI nodes, **Make** AI modules, **Zapier** AI steps/Agents - all can call **ChatGPT/Claude/Gemini** mid-workflow. Use a cheap, fast model for simple classification; save bigger models for harder reasoning.`,
    task: "Starter: build a workflow where an AI step classifies incoming data (e.g., ticket urgent/non-urgent) before routing. Stretch: constrain the AI to a fixed set of categories and validate the output before the next step.",
    quiz: [
      { prompt: "What does an AI node add to a workflow?", options: ["A judgment step: classify, summarize, draft, extract", "Slower data transfer", "A password", "A new trigger only"], answerIndex: 0, explanation: "AI interprets data and decides routing." },
      { prompt: "Plain vs AI automation?", options: ["AI automation understands the data, not just moves it", "They're identical", "AI automation can't branch", "Plain is smarter"], answerIndex: 0, explanation: "The AI step adds understanding." },
      { prompt: "How do you keep an AI classification reliable?", options: ["Constrain it to allowed values and validate output", "Let it invent categories", "Skip validation", "Use the longest prompt"], answerIndex: 0, explanation: "Constraints + validation prevent wild outputs." },
      { prompt: "Cost-smart model choice for simple classification?", options: ["A cheap, fast model; save big models for hard reasoning", "Always the most expensive", "A random model", "The slowest one"], answerIndex: 0, explanation: "Match model size to the task." },
    ],
  },

  "automation-6": {
    lesson: `**Spotting automatable tasks means running a quick audit of your recurring work and scoring each task on four criteria (frequent, same steps each time, clear trigger, low judgment), then writing a one-line automation spec for the best candidates** so the build is obvious before you open a tool. The mechanism is simple scoring against a rubric: tasks that score yes on all four belong in Zapier, Make, or n8n; tasks that score yes on the first three but require judgment belong in AI-assisted manual workflows; tasks that score low on most criteria stay human. For instance, "copy leads to CRM" scores yes on all four (automate), "write weekly update" scores yes on three but needs judgment (AI-assist), and "approve refunds" stays human. The automation spec captures trigger, steps including any AI step, output, and risk in four lines, which is how consultants find automation ROI in any team or business.

## Worked example - the audit
\`\`\`
For each recurring task, score 1-4:
              Frequent? Same steps? Clear trigger? Low judgment?
Copy leads to CRM   Y        Y            Y             Y   -> automate
Write weekly update Y        Y            Y             N   -> AI-assist
Approve refunds     Y        N            Y             N   -> keep human
\`\`\`

## Steal this - the automation spec
\`\`\`
For each candidate, write one line:
Trigger:  [what starts it]
Steps:    [what happens, incl. any AI step]
Output:   [the result]
Risk:     [what could go wrong + the guardrail]
\`\`\`

## Common mistakes (and the fix)
- **Looking for big, glamorous automations.** **Fix:** the boring repetitive stuff has the best ROI.
- **No spec before building.** **Fix:** the one-liner makes the build obvious.
- **Ignoring risk.** **Fix:** name the failure mode up front.

## Good to know
This audit is exactly how consultants find automation ROI in a business. Do it on your own week first; the same method scales to a team or department. The specs you write here become the builds in the next lessons.`,
    task: "Starter: audit your week and find two automation candidates, each with a one-line spec (trigger, steps, output, risk). Stretch: rank them by time saved vs effort to build, and pick one to build next.",
    quiz: [
      { prompt: "What does a task audit find?", options: ["Recurring tasks worth automating", "Your password", "The weather", "New hires"], answerIndex: 0, explanation: "It surfaces strong automation candidates." },
      { prompt: "Which scores make a strong candidate?", options: ["Frequent, same steps, clear trigger, low judgment", "Rare and creative", "One-off", "High judgment"], answerIndex: 0, explanation: "Predictable, frequent tasks automate well." },
      { prompt: "What's in an automation spec?", options: ["Trigger, steps, output, and risk", "Just a title", "Only the cost", "A logo"], answerIndex: 0, explanation: "The spec makes the build straightforward." },
      { prompt: "Where's the best automation ROI usually found?", options: ["The boring, repetitive tasks", "Rare creative projects", "One-off decisions", "Relationship work"], answerIndex: 0, explanation: "Repetitive grunt work pays back fastest." },
    ],
  },
};
