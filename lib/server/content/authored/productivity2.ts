import type { ModuleContent } from "@/types/shared";

// Level 3 - AI for Everyday Productivity (Fluency). Topics 28-33.
export const productivity2: Record<string, ModuleContent> = {
  "productivity-8": {
    lesson: `AI is a patient, always-available tutor that explains things at exactly your level - a huge lever for learning anything.

## How to use it
- **Explain at a level**: "Explain [concept] like I'm 12", then "now at an expert level."
- **Practice**: "Give me 5 practice questions and check my answers."
- **Feedback**: "Here's my draft - what are its three biggest weaknesses?"
- **Learning path**: "I want to learn X in 4 weeks - outline a plan."

> **Example.** "Explain compound interest simply, then give me two practice problems" - understanding plus practice in one session.

The catch: AI can be confidently wrong, so cross-check anything important and prefer it for *understanding*, not as your only source of facts.`,
    task: "Use AI to explain a concept in your field at three levels (beginner, intermediate, expert) and identify which explanation is most accurate, and why.",
    quiz: [
      { prompt: "A strength of AI as a tutor?", options: ["Explains at exactly your level, on demand", "Never makes errors", "Replaces all study", "Knows your private grades"], answerIndex: 0, explanation: "Level-matched explanations are its superpower." },
      { prompt: "Good way to practice with AI?", options: ["Ask for practice questions and feedback", "Only read passively", "Avoid examples", "Never check answers"], answerIndex: 0, explanation: "Active practice with feedback aids retention." },
      { prompt: "The catch when learning with AI?", options: ["It can be confidently wrong - cross-check", "It's too slow", "It refuses to teach", "It's always right"], answerIndex: 0, explanation: "Verify important facts." },
      { prompt: "Prefer AI tutoring for...", options: ["Understanding, not as your only fact source", "Memorizing without thinking", "Replacing all sources", "Avoiding practice"], answerIndex: 0, explanation: "Use it to understand, then confirm facts." },
    ],
  },
  "productivity-9": {
    lesson: `Content creation - posts, slides, visuals - is now table-stakes for personal branding and small teams. AI turns one idea into many aligned pieces.

## From one topic to many
> "Take this topic and give me: a LinkedIn post, a 5-slide outline, and an image prompt - all in the same tone and message."

- **Posts**: hook + value + call to action.
- **Slides**: one idea per slide, a clear arc.
- **Visuals**: describe the image you want; refine the prompt.

> **Tip.** Keep the *message* consistent across formats; only the shape changes. Always add your own perspective so it doesn't read as generic AI content.

You provide the idea and judgment; AI handles the reformatting.`,
    task: "Take one topic and produce a LinkedIn post, a 5-slide presentation outline, and a visual prompt - all aligned in tone and message.",
    quiz: [
      { prompt: "Strength of AI for content?", options: ["Turning one idea into many aligned formats", "Replacing your perspective", "Guaranteeing virality", "Reading minds"], answerIndex: 0, explanation: "It reformats one message across channels." },
      { prompt: "What should stay consistent across formats?", options: ["The core message", "The font only", "Nothing", "The length"], answerIndex: 0, explanation: "Same message, different shape." },
      { prompt: "How do you avoid generic AI content?", options: ["Add your own perspective", "Post it unchanged", "Make it longer", "Remove the topic"], answerIndex: 0, explanation: "Your point of view differentiates it." },
      { prompt: "A good slide principle?", options: ["One idea per slide with a clear arc", "All text on one slide", "No structure", "Random order"], answerIndex: 0, explanation: "One idea per slide keeps it clear." },
    ],
  },
  "productivity-10": {
    lesson: `Financial and legal documents are dense and anxiety-inducing. AI is a patient interpreter - with careful human verification.

## Useful, lower-stakes uses
- **Decode documents**: "Summarize the key terms and any hidden risks in this lease."
- **Compare options**: "Compare these two plans in a table: cost, coverage, catch."
- **Think it through**: "What questions should I ask before signing?"

> **Example.** Paste a (redacted) insurance policy -> "List what's covered, what's excluded, and three questions to ask." - clarity in minutes.

**Caution**: AI is not a lawyer or financial advisor. Use it to understand and prepare questions, then confirm anything binding with a real professional - and never paste truly sensitive data into a public tool.`,
    task: "Use AI to summarize the key terms and hidden risks in a real (redacted) contract or policy, and list the right clarifying questions to ask.",
    quiz: [
      { prompt: "Good use of AI for documents?", options: ["Summarize key terms and surface risks", "Sign on your behalf", "Replace a lawyer", "Hide the terms"], answerIndex: 0, explanation: "It interprets and prepares questions." },
      { prompt: "Key caution with financial/legal AI use?", options: ["Confirm binding matters with a real professional", "Trust it as legal advice", "Skip verification", "Paste full sensitive data publicly"], answerIndex: 0, explanation: "AI informs; professionals advise on binding decisions." },
      { prompt: "Before pasting a sensitive document, you should...", options: ["Redact private details", "Post it publicly", "Email it to the vendor", "Do nothing"], answerIndex: 0, explanation: "Protect sensitive data first." },
      { prompt: "A strong compare-options prompt asks for...", options: ["A table of cost, coverage, and catches", "A vague opinion", "A poem", "The font"], answerIndex: 0, explanation: "Structured comparison aids decisions." },
    ],
  },
  "productivity-11": {
    lesson: `AI is a serious edge in a job search - for surfacing skills you don't realize you have, and for practice.

## The toolkit
- **Resume**: "Rewrite these bullets to emphasize impact and metrics for a [role]."
- **Tailor**: "Match my resume to this job description; what gaps should I address?"
- **Cover letter**: draft tailored to the posting, in your voice.
- **Interview prep**: "Ask me five likely interview questions for this role, then critique my answers."
- **Skill gaps**: "What transferable skills do I have for X that I might be underselling?"

> **Example.** Paste a job description + your background -> a tailored resume and three practice questions in 20 minutes.

Always personalize - recruiters spot generic AI text instantly.`,
    task: "Produce a tailored resume and cover letter for a specific job description in under 30 minutes, and run a mock interview with AI feedback on your answers.",
    quiz: [
      { prompt: "A standout use of AI in job search?", options: ["Surfacing transferable skills you undersell", "Lying on your resume", "Skipping personalization", "Applying randomly"], answerIndex: 0, explanation: "It reveals strengths you may overlook." },
      { prompt: "Good interview-prep prompt?", options: ["'Ask me 5 likely questions, then critique my answers'", "'Tell me I'll be fine'", "'Write nothing'", "'Make it longer'"], answerIndex: 0, explanation: "Practice plus feedback builds readiness." },
      { prompt: "Why personalize AI-written applications?", options: ["Recruiters spot generic AI text instantly", "It's required by law", "AI demands it", "It saves tokens"], answerIndex: 0, explanation: "Personal voice stands out." },
      { prompt: "To tailor a resume, give AI...", options: ["Your background plus the job description", "Only your name", "A blank page", "The company logo"], answerIndex: 0, explanation: "It matches your experience to the role." },
    ],
  },
  "productivity-12": {
    lesson: `Sporadic AI use gives sporadic results. The top users build a **personal system** - and get compounding returns.

## Four parts of a system
1. **Tool stack** - which tool for which job (assistant, research, automation).
2. **Prompt library** - your saved, named templates.
3. **Verification habits** - what you always check before acting.
4. **A rule for when *not* to use AI** - high-stakes judgment, confidential data.

> **Example.** "Claude for writing, Perplexity for research, n8n for automation; a 6-prompt library; I always verify facts and never paste client data."

Writing your system down is what turns scattered experiments into a durable skill.`,
    task: "Describe your personal AI system: your tool stack, prompt library, verification habits, and your rule for when NOT to use AI.",
    quiz: [
      { prompt: "Why build a personal AI system?", options: ["Consistency produces compounding returns", "It looks impressive", "It's required", "It avoids learning"], answerIndex: 0, explanation: "Systematic use beats sporadic use." },
      { prompt: "Which is part of a personal AI system?", options: ["Tool stack, prompt library, verification, a 'when not to' rule", "Only a fast model", "Just a password", "Nothing"], answerIndex: 0, explanation: "These four make it durable." },
      { prompt: "Why include a 'when NOT to use AI' rule?", options: ["High-stakes judgment and confidential data need humans", "AI is always wrong", "To avoid all AI", "There's no reason"], answerIndex: 0, explanation: "Knowing the limits is part of mastery." },
      { prompt: "What turns experiments into a skill?", options: ["Writing the system down and reusing it", "Forgetting it", "Never repeating", "Avoiding templates"], answerIndex: 0, explanation: "A documented, repeated system compounds." },
    ],
  },
  "productivity-13": {
    lesson: `AI isn't just for work - personal wins build the motivation and habit that carry into your career.

## Everyday uses
- **Meal/fitness planning**: "Build a 30-day beginner workout for 3 days/week, no equipment."
- **Habits**: "Design a simple habit tracker and weekly check-in prompts."
- **Clarity**: journaling prompts to think through a decision.
- **Health questions**: research and understand - then confirm with a professional.

> **Example.** "Plan 5 simple, balanced dinners for the week with a grocery list" - done in a minute.

**Important**: for health, AI is for understanding and planning, not diagnosis. Verify before you act, and see a professional for anything medical.`,
    task: "Design a personalized 30-day habit or health plan with AI, and explain the verification steps you took before acting on its recommendations.",
    quiz: [
      { prompt: "Why do personal AI wins matter?", options: ["They build motivation and habit that carry to work", "They replace work skills", "They're pointless", "They're only for experts"], answerIndex: 0, explanation: "Personal success fuels broader skill-building." },
      { prompt: "Key rule for health uses of AI?", options: ["For understanding and planning, not diagnosis", "Trust it over a doctor", "Skip verification", "Use it for emergencies"], answerIndex: 0, explanation: "Confirm medical matters with a professional." },
      { prompt: "A good personal-planning prompt?", options: ["'Plan 5 balanced dinners with a grocery list'", "'Do something healthy'", "'Make it long'", "'Pick a font'"], answerIndex: 0, explanation: "Specific, bounded asks give usable plans." },
      { prompt: "Before acting on AI health advice, you should...", options: ["Verify, and consult a professional for medical issues", "Act immediately", "Ignore it entirely", "Share it widely"], answerIndex: 0, explanation: "Verification protects you." },
    ],
  },
};
