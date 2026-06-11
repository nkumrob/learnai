import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { JsonLd } from "@/components/JsonLd";

const url = absoluteUrl("/about");

export const metadata: Metadata = {
  title: `About the ${SITE_NAME} Curriculum Team`,
  description: `Who writes ${SITE_NAME}'s lessons, how the curriculum is reviewed and updated, and the principles behind every lesson. Accuracy, accessibility, hands-on practice, and verifiable competency.`,
  alternates: { canonical: url },
  openGraph: {
    title: `About · ${SITE_NAME}`,
    description: `How the ${SITE_NAME} curriculum is built, reviewed, and updated.`,
    url,
    type: "profile",
  },
};

const PRINCIPLES = [
  {
    title: "Accuracy over speed",
    detail:
      "Every lesson goes through a fact-check pass against primary sources (OpenAI, Anthropic, n8n, Zapier, vendor docs). If we cite a stat, we link to where it came from.",
  },
  {
    title: "Hands-on, not theoretical",
    detail:
      "Every lesson ends with one specific task you can complete in the tool we're teaching. Theory without practice doesn't build capability.",
  },
  {
    title: "No assumed background",
    detail:
      "Levels 1 to 4 assume zero math, zero code, and zero prior AI experience. Level 5 introduces vibe coding and RAG concepts, still without requiring a software engineering background.",
  },
  {
    title: "Verifiable competency",
    detail:
      "Checks pass at 80%, high enough to require understanding, low enough to allow honest mistakes. Hands-on tasks are self-attested. Certificates are publicly verifiable so anyone can audit the claim.",
  },
  {
    title: "Free and open access",
    detail:
      "No paywalls, no signup, no email gate. Practical AI capability is too important for a paywall.",
  },
];

const REVIEW_PROCESS = [
  "Outline review against the 'You'll be able to ___' outcome for the module.",
  "Draft pass focused on accuracy + working examples in current tool versions.",
  "Check design pass. Questions test understanding, not memorization, with explanations that reinforce learning.",
  "Task design pass. The hands-on activity must be completable in under 5 minutes with the tools the learner already has.",
  "Final read-through for clarity, tone, and prerequisite coverage.",
  "Re-review on any tool change (Zapier UI redesign, n8n version bump, OpenAI or Anthropic API change) that affects shown screenshots or examples.",
];

export default function AboutPage() {
  const teamJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#curriculum-team`,
    name: `${SITE_NAME} Curriculum Team`,
    url,
    description: `${SITE_NAME}'s in-house curriculum team. Responsible for authoring, reviewing, and updating every lesson in the ${SITE_NAME} curriculum.`,
    parentOrganization: { "@id": `${SITE_URL}/#org` },
    knowsAbout: [
      "Prompt engineering",
      "Large language models",
      "Retrieval-augmented generation (RAG)",
      "Model Context Protocol (MCP)",
      "AI agents",
      "Workflow automation",
      "n8n",
      "Zapier",
      "Make",
      "Claude Code",
      "AI ethics",
      "AI for educators",
      "AI for marketers",
      "AI for lawyers",
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": url,
    url,
    name: `About the ${SITE_NAME} Curriculum Team`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` },
    mainEntity: { "@id": `${SITE_URL}/#curriculum-team` },
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={teamJsonLd} />
      <JsonLd data={webPageJsonLd} />

      <p className="eyebrow text-ink-3">About</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">
        The {SITE_NAME} Curriculum Team
      </h1>
      <p className="mt-3 text-lg text-ink-2">
        {SITE_NAME} is built and maintained by a small in-house curriculum team. We
        write every lesson, design every quiz, and review the curriculum on a
        recurring cadence as the tools and capabilities of AI change.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          What we cover
        </h2>
        <p className="mt-3 text-ink-2">
          The {SITE_NAME} curriculum covers practical, working-professional AI use
          across the full Literacy → Fluency → Mastery model: AI foundations,
          prompt engineering, everyday productivity, no-code automation (Zapier,
          Make, n8n), and advanced skills including retrieval-augmented
          generation (RAG), the Model Context Protocol (MCP), no-code agents,
          and vibe coding.
        </p>
        <p className="mt-3 text-ink-2">
          We don&apos;t cover machine-learning engineering, model fine-tuning, or
          ML research. For those, we recommend{" "}
          <a
            href="https://www.deeplearning.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            DeepLearning.AI
          </a>{" "}
          and the Coursera specializations from Andrew Ng.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Our principles
        </h2>
        <ol className="mt-4 space-y-4">
          {PRINCIPLES.map((p, i) => (
            <li
              key={i}
              className="rounded-[var(--r-lg)] border border-line bg-surface p-5"
            >
              <h3 className="font-medium tracking-tight">{p.title}</h3>
              <p className="mt-1 text-sm text-ink-2">{p.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          How a lesson is written and reviewed
        </h2>
        <p className="mt-3 text-ink-2">
          Each lesson goes through the same review pipeline before it ships:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-2">
          {REVIEW_PROCESS.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-5">
        <h2 className="font-display text-xl font-medium tracking-tight text-accent">
          How we use AI to write about AI
        </h2>
        <p className="mt-2 text-ink-2">
          We use AI assistance for drafting and editing. It would be strange
          not to, given the subject. Every lesson is then reviewed by a human
          for accuracy, working examples, and clarity. No lesson ships without
          human review, and every example is verified to work in the current
          version of the tool we&apos;re teaching.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Update cadence
        </h2>
        <p className="mt-3 text-ink-2">
          AI moves fast. We re-review each lesson at least quarterly, and
          immediately when a major model release or tool UI change affects the
          examples. The &quot;Updated&quot; date on each lesson reflects the most recent
          review pass.
        </p>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/placement"
          className="rounded-[var(--r-md)] bg-accent px-5 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
        >
          Find where to start →
        </Link>
        <Link
          href="/"
          className="rounded-[var(--r-md)] border border-line-strong bg-surface px-5 py-3 font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
        >
          See the journey
        </Link>
      </section>
    </div>
  );
}
