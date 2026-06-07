import { getCurrentSession } from "@/lib/server/session";
import { getJourney } from "@/lib/server/journey";
import { listAllCerts } from "@/lib/server/db/certificates";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/core/site";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { TRACK_PROMISE, TRACK_TIER } from "@/lib/core/track-meta";
import { Hero } from "@/components/marketing/Hero";
import { SampleLesson } from "@/components/marketing/SampleLesson";
import { JourneyShowcase } from "@/components/marketing/JourneyShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { SocialProof } from "@/components/marketing/SocialProof";
import { CertificateFeed } from "@/components/marketing/CertificateFeed";
import { FAQ } from "@/components/marketing/FAQ";
import type { TrackSlug } from "@/types/shared";

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

  const resumeLevel = started && journey ? journey.currentLevel : null;
  const resumeHref =
    started && journey
      ? `/track/${journey.levels[journey.currentLevel - 1].slug}`
      : null;

  const completedSlugs: TrackSlug[] =
    journey?.levels.filter((l) => l.status === "complete").map((l) => l.slug) ??
    [];

  let certCount = 0;
  try {
    certCount = (await listAllCerts()).length;
  } catch {
    certCount = 0;
  }

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <JsonLd data={courseListJsonLd} />
      <JsonLd data={faqJsonLd} />

      <Hero
        resumeHref={resumeHref}
        resumeLevel={resumeLevel}
        certCount={certCount}
      />

      <SampleLesson />

      <JourneyShowcase
        currentLevel={journey?.currentLevel ?? null}
        completedSlugs={completedSlugs}
      />

      <HowItWorks />

      <SocialProof />

      <CertificateFeed />

      <FAQ />
    </div>
  );
}
