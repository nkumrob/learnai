import type { TrackSlug } from "@/types/shared";

export interface TrackFaq {
  question: string;
  answer: string;
}

// Estimated workload per track in ISO 8601 duration. ~5 minutes per module
// covers reading the lesson, doing the task, and taking the quiz at an
// unhurried pace.
export const TRACK_DURATION_ISO: Record<TrackSlug, string> = {
  fundamentals: "PT1H30M",
  prompting: "PT1H30M",
  productivity: "PT2H",
  automation: "PT2H",
  building: "PT1H",
};

export const TRACK_DURATION_HUMAN: Record<TrackSlug, string> = {
  fundamentals: "about 90 minutes",
  prompting: "about 90 minutes",
  productivity: "about 2 hours",
  automation: "about 2 hours",
  building: "about 60 minutes",
};

const COMMON_TAIL: TrackFaq[] = [
  {
    question: "Is this level free?",
    answer:
      "Yes. Every LearnAI lesson, quiz, task, and certificate is completely free. No signup, no email, no credit card.",
  },
  {
    question: "Do I need an account or login?",
    answer:
      "No. LearnAI tracks your progress in a private session cookie. You can start any lesson immediately.",
  },
];

const CERT_FAQ = (trackTitle: string): TrackFaq => ({
  question: `What certificate do I earn?`,
  answer: `Finishing every lesson in ${trackTitle} - passing each quiz at 80% and completing each hands-on task - earns a shareable, publicly verifiable LearnAI certificate for the level.`,
});

export const TRACK_FAQS: Record<TrackSlug, TrackFaq[]> = {
  fundamentals: [
    {
      question: "What will I learn in AI Foundations?",
      answer:
        "What AI is and isn't, how large language models work, what AI can and can't do reliably, safe and responsible use, how to spot bias, where AI fits in your job, and the core vocabulary you need to talk about AI with anyone.",
    },
    {
      question: "How long does AI Foundations take?",
      answer:
        "Ten short lessons, about 90 minutes total. Each lesson is a 2-4 minute read followed by a quick quiz and a small hands-on task.",
    },
    {
      question: "Do I need any prior experience or coding skills?",
      answer:
        "No. AI Foundations is the starting level of LearnAI and is designed for complete beginners. There is no math and no code.",
    },
    CERT_FAQ("AI Foundations"),
    ...COMMON_TAIL,
  ],
  prompting: [
    {
      question: "What is prompt engineering and what will I learn here?",
      answer:
        "Prompt engineering is the skill of writing instructions that reliably produce high-quality output from an AI model. In this level you'll learn the four-part prompt, persona and few-shot prompting, chain-of-thought reasoning, iterative refinement, reusable templates, controlling tone and format, and diagnosing bad outputs.",
    },
    {
      question: "How long does Prompt Engineering take?",
      answer:
        "Ten lessons, about 90 minutes total. Each lesson includes a real prompting exercise you can try in ChatGPT, Claude, or any other chat AI.",
    },
    {
      question: "Do I need to pay for ChatGPT or Claude?",
      answer:
        "No. Every exercise works with the free tier of ChatGPT, Claude, Gemini, or any open-source model. We never require a paid subscription.",
    },
    {
      question: "Do I need to complete AI Foundations first?",
      answer:
        "We recommend it, but it isn't required. The placement quiz on the homepage will route you to the right starting level in about 30 seconds.",
    },
    CERT_FAQ("Prompt Engineering"),
    ...COMMON_TAIL,
  ],
  productivity: [
    {
      question: "What will I learn in AI for Everyday Productivity?",
      answer:
        "How to use AI for writing, research, email, meeting prep, brainstorming, project planning, data summarization, learning, content creation, personal finance, job search, and building a personal AI workflow system.",
    },
    {
      question: "How long does this level take?",
      answer:
        "Thirteen lessons, about 2 hours total. Each lesson is a self-contained workflow you can apply to your own work the same day.",
    },
    {
      question: "Do I need to know how to code?",
      answer:
        "No. Everything in this level is no-code. You'll use chat AI tools and built-in features of products you already have, like Google Docs or your email client.",
    },
    CERT_FAQ("AI for Everyday Productivity"),
    ...COMMON_TAIL,
  ],
  automation: [
    {
      question: "What will I build in AI Automation?",
      answer:
        "Real workflows that run without you: lead capture, content production, intake forms, AI judgment steps inside automations, scheduled jobs, and a no-code AI agent that completes a multi-step task on its own.",
    },
    {
      question: "Which automation tools does this level cover?",
      answer:
        "Zapier and Make for the beginner lessons, n8n for the intermediate branching workflows, and a no-code agent builder for the final lesson. Every tool has a free tier, and the concepts transfer to any automation platform.",
    },
    {
      question: "How long does AI Automation take?",
      answer:
        "Eleven lessons, about 2 hours total. Building the example automations takes additional time depending on which tool you choose.",
    },
    {
      question: "Do I need to know how to code?",
      answer:
        "No. Every lesson is no-code or low-code. You'll connect tools through drag-and-drop interfaces and write prompts, not Python.",
    },
    CERT_FAQ("AI Automation"),
    ...COMMON_TAIL,
  ],
  building: [
    {
      question: "What does Advanced & Specialized AI cover?",
      answer:
        "Retrieval-augmented generation (RAG), no-code chatbots and assistants, intermediate AI-assisted data analysis, vibe coding (building working tools from plain-language descriptions), teaching AI skills to others, and designing a long-term AI learning habit so you keep up as the field evolves.",
    },
    {
      question: "How long does this level take?",
      answer:
        "Six deeper lessons, about 60 minutes of reading plus hands-on time for the build exercises.",
    },
    {
      question: "Do I need to know how to code for this level?",
      answer:
        "Not for most lessons. The vibe-coding lesson uses an AI coding assistant to write code for you, and the RAG and chatbot lessons use no-code platforms.",
    },
    {
      question: "Do I need to complete the earlier levels first?",
      answer:
        "We recommend Levels 1-4 first so you have the prompt engineering and automation foundations these advanced topics build on.",
    },
    CERT_FAQ("Advanced & Specialized AI"),
    ...COMMON_TAIL,
  ],
};
