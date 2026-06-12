import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 28-33.
export const productivity2: Record<string, ModuleContent> = {
  "productivity-8": {
    lesson: `**Using AI as a tutor means asking a model like Claude or ChatGPT to explain any topic at the exact level you need, generate practice problems, and grade your answers**, turning a chatbot into the personalized expert tutor that used to cost real money. The mechanism is level-matched explanation: you tell the model your starting point ("explain compound interest like I am twelve, then at intermediate level with the formula") and it adapts depth, vocabulary, and examples to match. For instance, NotebookLM can turn your uploaded study materials into a summary, a study guide, or even an audio overview, and ChatGPT's voice mode lets you have a back-and-forth conversation while walking. Always cross-check facts you will be tested or quoted on, because AI can be confidently wrong, and pair reading with active practice: ask for five practice questions and have the model grade your answers.

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
    lesson: `**Using AI for content production means turning one idea into many aligned pieces (a LinkedIn post, a five-slide outline, an image prompt) in a single session, with the message held constant and only the format changing across channels.** The mechanism is multi-format generation guided by one core message: prompt Claude or ChatGPT to take your topic and produce the post (hook plus value plus question), the slide outline (one idea per slide with a closing ask), and a visual prompt for a hero image in the same voice. Then pair the words with design tools: Canva Magic or Gamma for slides, and Midjourney, DALL-E, or Ideogram for visuals (Ideogram handles text-in-image especially well). For instance, "why small teams should automate intake" can become a post, a deck, and a hero image in under an hour. Always add your own story, stat, or perspective so the output doesn't read as generic AI content.

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
    lesson: `**Using AI for personal finance and dense documents means asking a model like Claude or ChatGPT to translate leases, insurance policies, loan offers, and benefits packets into plain English, surface hidden risks, and prepare the questions you should ask**, while treating it as an interpreter rather than a lawyer or financial advisor. The mechanism is the model's strength at compressing legal-style language and surfacing patterns: it can rank the unusual clauses in a redacted lease, compare two health plans across cost, coverage, and the catch, or list five questions to ask before signing. For instance, "summarize the key terms in this redacted apartment lease, flag anything unusual or risky, and list five questions I should ask before signing" turns thirty pages into a one-screen brief. Always redact account numbers and personal data before pasting, and confirm any binding decision (contracts, taxes, medical bills) with a qualified professional rather than acting on AI output alone.

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
    lesson: `**Using AI for a job search means feeding your background and a target job description into Claude or ChatGPT and asking the model to rewrite your resume bullets to match the role, surface transferable skills you are underselling, and run a realistic mock interview with feedback.** The mechanism is the model's pattern fluency across thousands of resumes and job descriptions: it can identify which past achievements map to the role's stated needs and tighten bullets around impact plus metrics. For instance, "rewrite my top five resume bullets for this product manager role, lead with impact plus numbers, then ask me five likely interview questions and critique my answers" produces a tailored draft plus practice in one session. ChatGPT's voice mode makes mock interviews feel real enough to build confidence. Personalize heavily because recruiters spot generic AI applications instantly, never invent experience, and treat AI as a coach for real achievements rather than a fabricator.

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
    lesson: `**A personal AI workflow system is a documented setup that pairs a default tool stack, a small prompt library, a verification habit, and a clear rule for when not to use AI**, so your AI use becomes a repeatable practice rather than sporadic experiments. The top ten percent of AI users aren't reaching for secret tools, they have a system, and that is what turns scattered wins into compounding skill. For instance, a working setup might be Claude for writing, Perplexity for sourced research, ChatGPT for data analysis, and Zapier for automation, plus a six-template prompt library (weekly update, decline, summarize a call) kept in Notion, plus the rule "always verify facts and numbers, never paste client data, never let AI make the final call." Write it down as a one-page playbook, share it with teammates if relevant, and revisit it every few months as the tools change.

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
    lesson: `**Using AI for health, wellness, and personal goals means asking Claude, ChatGPT, or Gemini to design tailored meal plans, workout routines, habit trackers, and thirty-day plans that match your constraints**, while strictly using the tool for understanding and preparation rather than diagnosis or medical advice. The mechanism is targeted personalization: the more honest constraints you give (time available, equipment, any limitation, current level), the more usable the plan, and a request like "build a thirty-day beginner workout, three days a week, no equipment, thirty minutes each, with weekly check-ins and safe progression" returns something you can start tomorrow. For instance, AI can also walk you through a real decision by asking five clarifying questions first, or explain a general health question in plain English and tell you what to ask a doctor. For anything binding or medical, confirm with a qualified professional, keep personal health data out of public tools, and never rely on AI in an emergency.

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
