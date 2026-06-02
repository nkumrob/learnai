import Link from "next/link";
import { getCurrentSession } from "@/lib/server/session";
import { getJourney, type JourneyLevel } from "@/lib/server/journey";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/core/site";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { TRACK_PROMISE, TRACK_TIER } from "@/lib/core/track-meta";

export const dynamic = "force-dynamic";

const courseListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The LearnAI curriculum",
  itemListElement: TRACK_DEFS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: t.title,
      description: TRACK_PROMISE[t.slug],
      url: absoluteUrl(`/track/${t.slug}`),
      educationalLevel: TRACK_TIER[t.slug],
      inLanguage: "en",
      isAccessibleForFree: true,
      provider: { "@type": "Organization", name: SITE_NAME, "@id": `${SITE_URL}/#org` },
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is LearnAI free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. LearnAI is completely free, with no signup or login required. You can start learning immediately and earn certificates at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "What will I learn on LearnAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A guided path of 50 lessons across five levels: AI foundations, prompt engineering, everyday productivity, automation with Zapier, Make and n8n, and advanced skills like RAG, AI agents, and the Model Context Protocol (MCP).",
      },
    },
    {
      "@type": "Question",
      name: "Do I get a certificate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Finishing all lessons in a level - passing each quiz at 80% and completing the hands-on task - earns a shareable certificate that anyone can verify online.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need any prior experience or coding skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. LearnAI is designed for complete beginners. A short placement quiz routes you to the right starting level, and the automation and productivity tracks are no-code.",
      },
    },
  ],
};

export default async function Home() {
  const session = await getCurrentSession();
  const journey = session
    ? await getJourney(session.id, session.startLevel)
    : null;

  const started =
    journey?.levels.some((l) => l.passedCount > 0 || l.completeCount > 0) ?? false;

  return (
    <div className="mx-auto max-w-2xl px-5">
      <JsonLd data={courseListJsonLd} />
      <JsonLd data={faqJsonLd} />
      {/* Hero */}
      <section className="pt-16 pb-10 sm:pt-24">
        <p className="eyebrow rise rise-1">Free · No signup · Get certified</p>
        <h1 className="rise rise-2 mt-4 font-display text-[2.4rem] leading-[1.05] font-medium tracking-tight sm:text-5xl">
          Learn AI, from zero to mastery.{" "}
          <span className="text-accent">Then prove it.</span>
        </h1>
        <p className="rise rise-3 mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
          One guided journey: five levels, fifty bite-sized lessons. Each ends
          with a real task and a quick check, so you build genuine capability and
          earn a certificate you can verify.
        </p>
        <div className="rise rise-4 mt-7 flex flex-wrap items-center gap-3">
          {started && journey ? (
            <Link
              href={`/track/${journey.levels[journey.currentLevel - 1].slug}`}
              className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
            >
              Continue Level {journey.currentLevel}
            </Link>
          ) : (
            <Link
              href="/placement"
              className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
            >
              Find where to start
            </Link>
          )}
          <a
            href="#journey"
            className="rounded-[var(--r-md)] px-4 py-3 font-medium text-ink-2 transition-colors hover:text-ink"
          >
            See the journey ↓
          </a>
        </div>
      </section>

      {/* Journey map */}
      <section id="journey" className="scroll-mt-20 border-t border-line py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Your journey
          </h2>
          <span className="text-sm text-ink-3">Literacy → Fluency → Mastery</span>
        </div>

        <ol className="mt-8 space-y-0">
          {journey?.levels.map((lvl, i) => (
            <LevelRow
              key={lvl.slug}
              level={lvl}
              isCurrent={lvl.level === journey.currentLevel}
              isLast={i === journey.levels.length - 1}
            />
          ))}
        </ol>
      </section>
    </div>
  );
}

function LevelRow({
  level: l,
  isCurrent,
  isLast,
}: {
  level: JourneyLevel;
  isCurrent: boolean;
  isLast: boolean;
}) {
  const locked = l.status === "locked";
  const complete = l.status === "complete";

  const node = complete
    ? { ring: "border-accent bg-accent text-accent-ink", glyph: "✓" }
    : locked
      ? { ring: "border-line text-ink-3", glyph: "" }
      : { ring: "border-accent text-accent", glyph: String(l.level) };

  const card = (
    <div
      className={`flex-1 rounded-[var(--r-lg)] border bg-surface p-5 transition-all ${
        locked
          ? "border-line opacity-60"
          : "border-line hover:border-accent hover:shadow-sm"
      } ${isCurrent ? "ring-1 ring-accent" : ""}`}
    >
      <div className="flex items-center gap-2">
        <span className="eyebrow text-ink-3">
          Level {l.level} · {l.tier}
        </span>
        {isCurrent && (
          <span className="rounded-[var(--r-sm)] bg-accent-faint px-2 py-0.5 text-[11px] font-medium text-accent">
            You're here
          </span>
        )}
      </div>
      <h3 className="mt-1 font-display text-lg font-medium tracking-tight">
        {l.title}
      </h3>
      <p className="mt-1 text-sm text-ink-2">{l.promise}</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${(l.completeCount / l.moduleCount) * 100}%` }}
          />
        </div>
        <span className="text-xs text-ink-3 tabular-nums">
          {locked ? `${l.moduleCount} lessons` : `${l.completeCount}/${l.moduleCount}`}
        </span>
      </div>
    </div>
  );

  return (
    <li className="flex gap-4">
      {/* Rail */}
      <div className="flex flex-col items-center">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-sm ${node.ring}`}
        >
          {locked ? <LockIcon /> : node.glyph}
        </span>
        {!isLast && <span className="w-px flex-1 bg-line" />}
      </div>
      {/* Card */}
      <div className="flex-1 pb-5">
        {locked ? card : <Link href={`/track/${l.slug}`}>{card}</Link>}
      </div>
    </li>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
