export interface ComparisonRow {
  feature: string;
  learnai: string;
  competitor: string;
}

export interface Comparison {
  slug: string;
  /** Marketing name of the competitor. */
  competitor: string;
  competitorUrl: string;
  /** Short summary of what they are. */
  competitorBlurb: string;
  /** Headline for the page. */
  headline: string;
  /** Lead paragraph. */
  intro: string;
  /** Comparison table rows, learnai column first. */
  rows: ComparisonRow[];
  /** When LearnAI is the better choice. */
  whenLearnai: string[];
  /** When the competitor is the better choice. Honest. */
  whenCompetitor: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const COMPARISONS: Comparison[] = [
  {
    slug: "learnai-vs-datacamp",
    competitor: "DataCamp",
    competitorUrl: "https://www.datacamp.com",
    competitorBlurb:
      "DataCamp is an online learning platform focused on data science, machine learning, and increasingly AI/LLM skills. ~$13.99-$33.25/mo per learner depending on plan.",
    headline: "LearnAI vs DataCamp (2026): what each platform is actually good at",
    intro:
      "Both LearnAI and DataCamp teach AI skills to working professionals, but the products solve different problems. LearnAI is a free, no-signup, hands-on path from beginner to MCP/agents with a verifiable certificate. DataCamp is a paid subscription covering broader data + AI topics with longer video lessons, interactive code editors, and a stronger data-engineering / ML-engineering bent.",
    rows: [
      { feature: "Price", learnai: "Free, forever", competitor: "$13.99-$33.25/mo" },
      { feature: "Signup required", learnai: "No", competitor: "Yes (email + payment)" },
      { feature: "Certificate", learnai: "Free, publicly verifiable", competitor: "Included in paid plan; verifiable" },
      { feature: "Curriculum focus", learnai: "Working-professional AI use (prompting, productivity, automation, agents)", competitor: "Data science + ML engineering, with AI/LLM tracks added in 2024+" },
      { feature: "MCP / AI agents coverage", learnai: "Yes (Level 5)", competitor: "Limited" },
      { feature: "n8n / Zapier / Make coverage", learnai: "Yes (Level 4)", competitor: "No" },
      { feature: "Hands-on tasks", learnai: "1 task per lesson + auto-graded quiz", competitor: "Interactive code editor; longer projects on premium" },
      { feature: "Lesson length", learnai: "2-4 minutes each, 50 total", competitor: "Multi-hour courses" },
      { feature: "Coding required", learnai: "No (Levels 1-4); optional Python in Level 5", competitor: "Heavy Python/R focus" },
      { feature: "Best for", learnai: "Non-technical professionals learning useful AI fast", competitor: "Data scientists and analysts going deeper on data + ML" },
    ],
    whenLearnai: [
      "You're a working professional (not a data scientist) and you want practical AI skills you can apply this week.",
      "You want a certificate without paying.",
      "You need to learn MCP, AI agents, or n8n/Zapier automation, DataCamp doesn't cover these in depth.",
      "You want to try it without committing to a subscription or sharing your email.",
    ],
    whenCompetitor: [
      "You're going deep on data science, ML engineering, or analytics, DataCamp's curriculum and interactive Python/R editor are best-in-class.",
      "You need a recognized brand name on your resume (DataCamp has more recruiter recognition for technical data roles).",
      "You learn better from longer-form video lessons than from short hands-on reading.",
    ],
    faqs: [
      {
        question: "Can I use both LearnAI and DataCamp?",
        answer:
          "Yes, and many people do. The common pattern: LearnAI for the practical AI workflow skills (prompt engineering, automation, MCP, agents), DataCamp for the data science depth (Python, SQL, ML algorithms, statistics).",
      },
      {
        question: "Are LearnAI certificates as credible as DataCamp's?",
        answer:
          "Both are platform-issued certificates, not university-issued. Recruiters typically value the demonstrated skill (your portfolio) over either certificate. LearnAI's certificate is free and publicly verifiable; DataCamp's is tied to your paid subscription.",
      },
      {
        question: "Why is LearnAI free when DataCamp charges?",
        answer:
          "Different model. LearnAI runs lean and is funded as a public-good education project. DataCamp is a VC-backed SaaS with a large content team producing many hours of new courses monthly.",
      },
    ],
  },
  {
    slug: "learnai-vs-coursera",
    competitor: "Coursera",
    competitorUrl: "https://www.coursera.org",
    competitorBlurb:
      "Coursera is a marketplace of online courses from universities and companies (Stanford, Google, IBM, DeepLearning.AI, Vanderbilt). Most AI/LLM courses are $49/mo on Plus or $399/year, with a free audit option that excludes the certificate.",
    headline: "LearnAI vs Coursera (2026): which is right for learning AI?",
    intro:
      "Coursera and LearnAI both teach AI to non-PhDs, but Coursera is a marketplace of mostly university-produced video courses with paid certificates, while LearnAI is a single, opinionated, free curriculum with hands-on tasks and a verifiable certificate from day one. The right choice depends on whether you want breadth or applied skill.",
    rows: [
      { feature: "Price", learnai: "Free, forever", competitor: "Free audit; $49/mo or $399/yr for certificates" },
      { feature: "Signup required", learnai: "No", competitor: "Yes" },
      { feature: "Certificate", learnai: "Free, publicly verifiable", competitor: "Paywall (Plus subscription or per-cert payment)" },
      { feature: "Curriculum shape", learnai: "One guided 5-level path, 50 lessons", competitor: "Marketplace, pick from hundreds of courses" },
      { feature: "Lesson format", learnai: "2-4 min hands-on read + quiz + task", competitor: "Long-form video, 30+ min per lesson" },
      { feature: "Hands-on tasks", learnai: "1 real task per lesson", competitor: "Varies by course; many are video-only" },
      { feature: "MCP / AI agents coverage", learnai: "Yes (Level 5)", competitor: "Emerging, a few specialized courses" },
      { feature: "n8n / Make coverage", learnai: "Yes (Level 4)", competitor: "Limited" },
      { feature: "University brand", learnai: "No", competitor: "Yes (Stanford, Google, IBM, Vanderbilt etc.)" },
      { feature: "Best for", learnai: "Practical AI capability fast, without paying", competitor: "Breadth across topics + a brand-name certificate" },
    ],
    whenLearnai: [
      "You want to start learning today without signing up or paying.",
      "You learn faster from short hands-on tasks than from long videos.",
      "You want a single guided path, not a marketplace where you have to choose from 50 similar courses.",
      "You need MCP, automation, or AI agents, Coursera's coverage here is thin.",
    ],
    whenCompetitor: [
      "You want a Stanford, Google, IBM, or Vanderbilt branded certificate on your LinkedIn, those names carry recruiter weight.",
      "You learn best from long-form lectures (Coursera's format is closer to university courses).",
      "You're going deep on theoretical ML, Andrew Ng's DeepLearning.AI specializations on Coursera are the canonical resource.",
    ],
    faqs: [
      {
        question: "Can I get a Coursera certificate free?",
        answer:
          "You can audit most Coursera courses free (view all videos), but the certificate itself is paywalled, either via the Plus subscription ($49/mo, all certs included) or per-course payment.",
      },
      {
        question: "Is the LearnAI certificate as valuable as a Coursera certificate?",
        answer:
          "It depends on what 'valuable' means. For demonstrating practical skill on a portfolio or LinkedIn, both work. For brand-name recognition with recruiters in established AI/ML roles, Coursera's university-issued certificates carry more weight.",
      },
      {
        question: "Should I take both?",
        answer:
          "A common pattern is LearnAI for the practical workflow + tooling skills (free, fast), then a targeted Coursera specialization (e.g., DeepLearning.AI's NLP or Andrew Ng's ML) when you want depth in a specific area.",
      },
    ],
  },
  {
    slug: "learnai-vs-deeplearning-ai",
    competitor: "DeepLearning.AI",
    competitorUrl: "https://www.deeplearning.ai",
    competitorBlurb:
      "DeepLearning.AI is Andrew Ng's education company. They publish ML specializations on Coursera ($49/mo) and short, often-free courses on their own platform covering specific AI topics, RAG, agents, LLM evals, prompt engineering, and more.",
    headline: "LearnAI vs DeepLearning.AI (2026): different audiences, both excellent",
    intro:
      "LearnAI and DeepLearning.AI are not direct competitors, they serve different audiences. DeepLearning.AI is the canonical resource for engineers, data scientists, and ML practitioners going deeper on the technical side of AI. LearnAI is for working professionals across roles who need practical AI capability without the math or coding prerequisites.",
    rows: [
      { feature: "Audience", learnai: "Working professionals (any role), beginners", competitor: "Engineers, data scientists, ML practitioners" },
      { feature: "Price", learnai: "Free, forever", competitor: "Short courses often free; Coursera specializations $49/mo" },
      { feature: "Signup required", learnai: "No", competitor: "Yes" },
      { feature: "Coding background assumed", learnai: "None", competitor: "Python proficiency expected for most courses" },
      { feature: "Math background assumed", learnai: "None", competitor: "Linear algebra + probability helpful for specializations" },
      { feature: "Lesson format", learnai: "2-4 min reads + hands-on tasks", competitor: "Long-form video + Jupyter notebooks" },
      { feature: "MCP / agents coverage", learnai: "Yes (Level 5, no-code)", competitor: "Yes (with code)" },
      { feature: "n8n / Make / Zapier coverage", learnai: "Yes (Level 4)", competitor: "No" },
      { feature: "Certificate", learnai: "Free, publicly verifiable", competitor: "Coursera-issued (paid); short courses often have a certificate of completion" },
      { feature: "Authority", learnai: "Hands-on curriculum team", competitor: "Andrew Ng, co-founder of Coursera, ex-Google Brain, ex-Baidu" },
    ],
    whenLearnai: [
      "You're not (and don't want to be) a software engineer or data scientist.",
      "You want practical AI workflows you can use this week without writing code.",
      "You want a free, no-friction starting point.",
      "You need automation (n8n, Zapier, Make), DeepLearning.AI doesn't cover this.",
    ],
    whenCompetitor: [
      "You're an engineer building AI features and you want to learn evals, fine-tuning, RAG architecture, or agent design at the code level.",
      "You're going deep into the ML theory and want Andrew Ng as your teacher (he's that good).",
      "You're targeting an AI/ML engineering role and want the credibility of his specializations on your resume.",
    ],
    faqs: [
      {
        question: "Are DeepLearning.AI's short courses free?",
        answer:
          "Many are, on the deeplearning.ai platform. Their Coursera specializations (e.g., Machine Learning, Deep Learning, NLP, Generative AI with LLMs) are paid via Coursera's $49/mo subscription.",
      },
      {
        question: "Should I take both?",
        answer:
          "A common path: LearnAI first to get the working knowledge across the AI landscape, then DeepLearning.AI's specific short courses (RAG, evals, agents) once you know what you want to go deeper on.",
      },
      {
        question: "Is LearnAI a watered-down version of DeepLearning.AI?",
        answer:
          "No, different shape entirely. LearnAI covers prompt engineering, no-code automation, RAG, and agents at the depth a non-engineer needs to be capable. DeepLearning.AI goes deeper into the technical implementation and is taught by Andrew Ng with code-heavy assignments.",
      },
    ],
  },
];

export const COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);

export function findComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
