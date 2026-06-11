import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isTrackSlug,
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_ORDER,
  TRACK_PROMISE,
  TRACK_TIER,
} from "@/lib/core/track-meta";
import { moduleId, TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { TRACK_DURATION_HUMAN, TRACK_DURATION_ISO, TRACK_FAQS } from "@/lib/core/track-faqs";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { JsonLd } from "@/components/JsonLd";
import { TrackBoardClient } from "@/components/TrackBoardClient";
import { TrackHero } from "@/components/track/TrackHero";

// Statically prerender all 5 track pages. Per-user progress overlays render
// client-side via TrackBoardClient → /api/progress/[slug].
export function generateStaticParams() {
  return TRACK_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isTrackSlug(slug)) return {};
  const title = `${TRACK_LABEL[slug]} - Level ${TRACK_LEVEL[slug]}`;
  const description = `${TRACK_PROMISE[slug]} A free, hands-on level in the LearnAI journey: ${TRACK_DURATION_HUMAN[slug]} of bite-sized lessons, quizzes, and a verifiable certificate.`;
  const url = absoluteUrl(`/track/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} - LearnAI`, description, url },
  };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isTrackSlug(slug)) notFound();

  const trackDef = TRACK_DEFS.find((t) => t.slug === slug);
  if (!trackDef) notFound();

  const level = TRACK_LEVEL[slug];
  const tier = TRACK_TIER[slug];
  const url = absoluteUrl(`/track/${slug}`);
  const certUrl = absoluteUrl(`/track/${slug}/certificate`);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Course", "LearningResource"],
    "@id": `${url}#course`,
    name: trackDef.title,
    description: `${TRACK_PROMISE[slug]} ${trackDef.description}`,
    url,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    educationalLevel: tier,
    teaches: trackDef.modules.map((m) => m.outcome),
    timeRequired: TRACK_DURATION_ISO[slug],
    isAccessibleForFree: true,
    inLanguage: "en",
    learningResourceType: "Course",
    dateModified: new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", "@id": `${SITE_URL}/#curriculum-team`, name: `${SITE_NAME} Curriculum Team` },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: TRACK_DURATION_ISO[slug],
    },
    educationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      name: `${trackDef.title} · ${SITE_NAME} Certificate`,
      credentialCategory: "Certificate",
      url: certUrl,
    },
    hasPart: trackDef.modules.map((m) => ({
      "@type": "LearningResource",
      position: m.order,
      name: m.title,
      url: absoluteUrl(`/track/${slug}/${m.order}`),
      learningResourceType: "Lesson",
      teaches: m.outcome,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TRACK_FAQS[slug].map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Module list shaped for the client overlay (small, serializable).
  const staticModules = trackDef.modules.map((m) => ({
    id: moduleId(slug, m.order),
    order: m.order,
    title: m.title,
    outcome: m.outcome,
  }));

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <JsonLd data={courseJsonLd} />
      <JsonLd data={faqJsonLd} />

      <TrackHero
        slug={slug}
        description={trackDef.description}
        totalLessons={staticModules.length}
      />

      <TrackBoardClient slug={slug} modules={staticModules} />
    </div>
  );
}
