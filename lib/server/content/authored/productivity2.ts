import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 28-33.
export const productivity2: Record<string, ModuleContent> = {
  "productivity-8": {
    lesson: `**TL;DR - AI is a patient tutor that explains anything at exactly your level, generates practice, and gives feedback. Use it to understand - then verify facts elsewhere.**

## Why it matters
Personalized tutoring used to be expensive. Now you can get an expert-level explanation, pitched to you, on demand - one of AI's most life-changing everyday uses.

## Worked example - learn anything, your way
\`\`\`
Explain compound interest:
1) like I'm 12, with a simple example
2) then at an intermediate level with the formula
Then give me 2 practice problems and check my answers.
\`\`\`

## Steal this - the tutor toolkit
\`\`\`
Explain:  "Explain [topic] at [level], with one concrete example."
Practice: "Give me 5 practice questions, then grade my answers."
Feedback: "Here's my work - what are its 3 biggest weaknesses?"
Path:     "I want to learn [X] in 4 weeks - outline a plan."
\`\`\`

## Common mistakes (and the fix)
- **Trusting facts blindly.** **Fix:** AI can be confidently wrong - cross-check key facts.
- **Passive reading.** **Fix:** ask for practice and feedback; doing beats reading.
- **One level fits all.** **Fix:** ask for the same idea at multiple levels.

## Good to know
**Claude** and **ChatGPT** are excellent tutors; **ChatGPT's voice mode** lets you have a spoken back-and-forth, and **NotebookLM** can turn your study materials into a summary or even an audio overview. Great for understanding - just confirm anything you'll be tested or quoted on.`,
    task: "Starter: have AI explain a concept in your field at beginner, intermediate, and expert levels, and judge which is most accurate. Stretch: ask for 5 practice questions on it and have AI grade your answers.",
    quiz: [
      { prompt: "A strength of AI as a tutor?", options: ["Explains at exactly your level, on demand", "Never makes errors", "Replaces all study", "Knows your private grades"], answerIndex: 0, explanation: "Level-matched, on-demand explanation is its superpower." },
      { prompt: "Best way to actually learn with AI?", options: ["Ask for practice questions and feedback", "Only read passively", "Avoid examples", "Never check answers"], answerIndex: 0, explanation: "Active practice with feedback aids retention." },
      { prompt: "The catch when learning facts from AI?", options: ["It can be confidently wrong - cross-check", "It's too slow", "It refuses to teach", "It's always right"], answerIndex: 0, explanation: "Verify important facts elsewhere." },
      { prompt: "Which feature lets you learn by talking?", options: ["ChatGPT voice mode (or NotebookLM audio overviews)", "A spreadsheet", "A spam filter", "A calculator"], answerIndex: 0, explanation: "Voice/audio modes enable spoken learning." },
    ],
  },

  "productivity-9": {
    lesson: `**TL;DR - Turn one idea into many aligned pieces - a post, a slide outline, an image prompt - all in the same voice. Always add your own perspective so it isn't generic.**

## Why it matters
Content is table-stakes for personal brand and small teams. AI removes the reformatting grind so you can produce across channels from a single idea.

## Worked example - one topic, many formats
\`\`\`
Topic: "why small teams should automate intake."
Give me, in the same voice and message:
- a LinkedIn post (hook + value + 1 question)
- a 5-slide outline (one idea per slide)
- an image prompt for the hero visual
\`\`\`

## Steal this - content kit
\`\`\`
Post:   hook -> one insight -> a question to drive replies.
Slides: one idea per slide, a clear arc, a closing ask.
Visual: describe subject, style, mood; refine the prompt.
Voice:  keep the message constant; change only the shape.
\`\`\`

## Common mistakes (and the fix)
- **Generic AI voice.** **Fix:** add your own take, story, or data.
- **Different message per format.** **Fix:** lock the core message, vary only the form.
- **Over-posting AI filler.** **Fix:** quality and POV over volume.

## Good to know
**ChatGPT/Claude** for the words, **Canva Magic / Gamma** for slides and design, **Midjourney/DALL-E/Ideogram** for visuals (Ideogram handles text-in-image well). Keep a human eye on brand and accuracy before anything publishes.`,
    task: "Starter: take one topic and produce a LinkedIn post, a 5-slide outline, and a visual prompt - aligned in tone. Stretch: add your own story or stat so it doesn't read as generic AI content.",
    quiz: [
      { prompt: "Strength of AI for content?", options: ["Turning one idea into many aligned formats", "Replacing your perspective", "Guaranteeing virality", "Reading minds"], answerIndex: 0, explanation: "It reformats one message across channels." },
      { prompt: "What stays constant across formats?", options: ["The core message", "The font only", "Nothing", "The length"], answerIndex: 0, explanation: "Same message, different shape." },
      { prompt: "How do you avoid generic AI content?", options: ["Add your own perspective, story, or data", "Post it unchanged", "Make it longer", "Remove the topic"], answerIndex: 0, explanation: "Your POV differentiates it." },
      { prompt: "A good slide principle?", options: ["One idea per slide with a clear arc", "All text on one slide", "No structure", "Random order"], answerIndex: 0, explanation: "One idea per slide keeps it clear." },
    ],
  },

  "productivity-10": {
    lesson: `**TL;DR - AI is a patient interpreter for dense documents - leases, policies, offers. Use it to understand terms and prep questions, not as a lawyer or advisor, and never paste truly sensitive data publicly.**

## Why it matters
Financial and legal documents are information-dense and stressful. AI can decode them and surface hidden risks in minutes - lowering anxiety and helping you ask the right questions.

## Worked example
\`\`\`
Here is a (redacted) apartment lease. In plain English:
- summarize the key terms
- flag anything unusual or risky
- list 5 questions I should ask before signing
\`\`\`

## Steal this - decode any document
\`\`\`
"Summarize the key terms and any hidden risks in this [doc]."
"Compare these two options in a table: cost, coverage, the catch."
"What questions should I ask before I commit?"
\`\`\`

## Common mistakes (and the fix)
- **Treating it as legal/financial advice.** **Fix:** use it to understand; confirm binding decisions with a professional.
- **Pasting sensitive personal data** into a public tool. **Fix:** redact account numbers, names.
- **Acting on one answer.** **Fix:** cross-check important figures.

## Good to know
**Claude** is strong with long, dense documents; **ChatGPT** and **Gemini** work well too. For anything binding (contracts, taxes, medical bills), AI gets you informed and ready to ask good questions - then a real professional makes the call.`,
    task: "Starter: have AI summarize the key terms and risks in a real (redacted) contract or policy and list the right questions to ask. Stretch: compare two real options (plans, offers) in a table and decide.",
    quiz: [
      { prompt: "Good use of AI for documents?", options: ["Summarize key terms and surface risks", "Sign on your behalf", "Replace a lawyer", "Hide the terms"], answerIndex: 0, explanation: "It interprets and preps questions." },
      { prompt: "Key caution for legal/financial use?", options: ["Confirm binding decisions with a professional", "Trust it as legal advice", "Skip verification", "Paste full sensitive data publicly"], answerIndex: 0, explanation: "AI informs; professionals advise on binding calls." },
      { prompt: "Before pasting a sensitive document, you should...", options: ["Redact account numbers and names", "Post it publicly", "Email it to the vendor", "Do nothing"], answerIndex: 0, explanation: "Protect sensitive data first." },
      { prompt: "A strong compare-options prompt asks for...", options: ["A table of cost, coverage, and the catch", "A vague opinion", "A poem", "The font"], answerIndex: 0, explanation: "Structured comparison aids decisions." },
    ],
  },

  "productivity-11": {
    lesson: `**TL;DR - AI is a serious edge in a job search - it surfaces skills you undersell, tailors your resume to each role, and runs realistic interview practice with feedback.**

## Why it matters
The hidden value is self-awareness: AI spots transferable strengths you'd never list. And tailoring + practice are exactly where most candidates underinvest.

## Worked example - tailor + practice
\`\`\`
Here's my background and this job description.
1) Rewrite my top 5 resume bullets to match this role, emphasizing impact + metrics.
2) What gaps should I address, and how?
3) Ask me 5 likely interview questions, then critique my answers.
\`\`\`

## Steal this - job-search kit
\`\`\`
Resume:    "Rewrite these bullets for [role], lead with impact + numbers."
Tailor:    "Match my resume to this JD; flag gaps."
Interview: "Ask 5 role-specific questions, then critique my answers."
Skills:    "What transferable skills do I have for [X] that I'm underselling?"
\`\`\`

## Common mistakes (and the fix)
- **Generic AI applications.** **Fix:** recruiters spot them - personalize heavily.
- **Inventing experience.** **Fix:** sharpen real experience; never fabricate.
- **Skipping practice.** **Fix:** do the mock interview out loud.

## Good to know
**ChatGPT voice mode** makes mock interviews feel real; **Claude/ChatGPT** tailor resumes well. Paste the job description + your real background - the more truthful context you give, the better and safer the output.`,
    task: "Starter: produce a tailored resume and cover letter for a specific job in under 30 minutes. Stretch: run a 5-question mock interview (ideally by voice) and apply the feedback.",
    quiz: [
      { prompt: "A standout use of AI in job search?", options: ["Surfacing transferable skills you undersell", "Lying on your resume", "Skipping personalization", "Applying randomly"], answerIndex: 0, explanation: "It reveals strengths you may overlook." },
      { prompt: "Good interview-prep prompt?", options: ["'Ask 5 role-specific questions, then critique my answers'", "'Tell me I'll be fine'", "'Write nothing'", "'Make it longer'"], answerIndex: 0, explanation: "Practice plus feedback builds readiness." },
      { prompt: "Why personalize AI applications?", options: ["Recruiters spot generic AI text instantly", "It's required by law", "AI demands it", "It saves tokens"], answerIndex: 0, explanation: "Personal voice and fit stand out." },
      { prompt: "To tailor a resume, give AI...", options: ["Your real background plus the job description", "Only your name", "A blank page", "The company logo"], answerIndex: 0, explanation: "Truthful context produces better, safer output." },
    ],
  },

  "productivity-12": {
    lesson: `**TL;DR - Sporadic AI use gives sporadic results. Build a personal system - which tool for which job, a prompt library, verification habits, and a rule for when NOT to use AI - and the returns compound.**

## Why it matters
The top 10% of AI users aren't using secret tools - they have a _system_. It's what turns scattered experiments into a durable, compounding skill.

## Worked example - one person's system
\`\`\`
Tools:   Claude for writing, Perplexity for research, ChatGPT for data, Zapier for automation.
Prompts: a 6-template library (weekly update, decline, summarize call, ...).
Verify:  always check facts/numbers; read output as if I wrote it.
Don't:   never paste client data; never let AI make the final call.
\`\`\`

## Steal this - design your system
\`\`\`
1. Tool stack  - one default assistant + specialists by need.
2. Prompt library - 5-10 named, reusable templates.
3. Verification habit - what you always check.
4. A "when NOT to use AI" rule - high-stakes judgment, confidential data.
\`\`\`

## Common mistakes (and the fix)
- **Tool-hopping.** **Fix:** depth in one default beats novelty.
- **Re-deriving prompts.** **Fix:** save and reuse.
- **No off-switch.** **Fix:** define where AI doesn't belong.

## Good to know
Write it down - a one-page "AI playbook" in **Notion** or a doc. Teams that share one get compounding benefit. Revisit it every few months as tools change (you'll formalize the "stay current" habit in Level 5).`,
    task: "Starter: write your personal AI system - tool stack, prompt library, verification habits, and your 'when not to use AI' rule. Stretch: turn it into a one-page playbook you'd share with a teammate.",
    quiz: [
      { prompt: "Why build a personal AI system?", options: ["Consistency produces compounding returns", "It looks impressive", "It's required", "It avoids learning"], answerIndex: 0, explanation: "Systematic use beats sporadic use." },
      { prompt: "Which is part of a personal AI system?", options: ["Tool stack, prompt library, verification, a 'when not to' rule", "Only a fast model", "Just a password", "Nothing"], answerIndex: 0, explanation: "These four make it durable." },
      { prompt: "Why include a 'when NOT to use AI' rule?", options: ["High-stakes judgment and confidential data need humans", "AI is always wrong", "To avoid all AI", "No reason"], answerIndex: 0, explanation: "Knowing the limits is part of mastery." },
      { prompt: "What turns experiments into a skill?", options: ["Writing the system down and reusing it", "Forgetting it", "Never repeating", "Avoiding templates"], answerIndex: 0, explanation: "A documented, repeated system compounds." },
    ],
  },

  "productivity-13": {
    lesson: `**TL;DR - AI is genuinely useful in daily life - meal plans, workouts, habits, decisions. Personal wins build the motivation and habit that carry into work. For anything medical, understand and plan - don't diagnose.**

## Why it matters
The learners who find personal wins stick with AI and get better at it. And life admin is full of exactly the "structure this for me" tasks AI is great at.

## Worked example
\`\`\`
Build a 30-day beginner workout: 3 days/week, no equipment, 30 min each.
Include a simple weekly check-in and how to progress safely.
Note: I have [any limitation] - keep it appropriate, and tell me when to see a professional.
\`\`\`

## Steal this - everyday helpers
\`\`\`
Plan:   "5 balanced dinners + a grocery list."  "A 30-day habit plan with weekly check-ins."
Clarify:"Ask me 5 questions to think through this decision."
Learn:  "Explain my (general) health question simply, and what to ask a doctor."
\`\`\`

## Common mistakes (and the fix)
- **Treating AI as a doctor.** **Fix:** for medical issues, use it to understand and prep questions; see a professional.
- **Acting without verifying.** **Fix:** sanity-check plans, especially health/finance.
- **Sharing private health data** with public tools. **Fix:** keep it general or use a private tool.

## Good to know
Any assistant handles life planning well. For health, AI is for **understanding and preparation**, not diagnosis or treatment - always confirm with a qualified professional, and never rely on it in an emergency.`,
    task: "Starter: design a personalized 30-day habit or health plan with AI, and note the verification steps you took. Stretch: use AI to think through a real personal decision by having it ask you clarifying questions first.",
    quiz: [
      { prompt: "Why do personal AI wins matter?", options: ["They build motivation and habit that carry to work", "They replace work skills", "They're pointless", "They're only for experts"], answerIndex: 0, explanation: "Personal success fuels broader skill-building." },
      { prompt: "Key rule for health uses of AI?", options: ["For understanding and planning, not diagnosis", "Trust it over a doctor", "Skip verification", "Use it in emergencies"], answerIndex: 0, explanation: "Confirm medical matters with a professional." },
      { prompt: "A good personal-planning prompt?", options: ["'5 balanced dinners + a grocery list'", "'Do something healthy'", "'Make it long'", "'Pick a font'"], answerIndex: 0, explanation: "Specific, bounded asks give usable plans." },
      { prompt: "With private health data and public tools, you should...", options: ["Keep it general or use a private tool", "Share everything", "Ignore privacy", "Post it online"], answerIndex: 0, explanation: "Protect sensitive personal data." },
    ],
  },
};
