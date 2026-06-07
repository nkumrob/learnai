import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleContent } from "@/lib/server/db/tracks";
import {
  isTrackSlug,
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_TIER,
} from "@/lib/core/track-meta";
import { moduleId, TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { LessonReader } from "@/components/LessonReader";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { TaskCheck } from "@/components/TaskCheck";
import { JsonLd } from "@/components/JsonLd";

// Prerender all 50 lessons. Per-user progress (task done, quiz locked,
// already-passed) hydrates client-side via /api/progress/[slug].
export function generateStaticParams() {
  return TRACK_DEFS.flatMap((t) =>
    t.modules.map((m) => ({ slug: t.slug, order: String(m.order) })),
  );
}

// Stamped at module load — surfaces in JSON-LD dateModified and the visible
// "Updated" line as a freshness signal for crawlers.
const CONTENT_DATE_ISO = new Date().toISOString().split("T")[0];
const CONTENT_DATE_HUMAN = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

function findModuleDef(slug: string, order: number) {
  return TRACK_DEFS.find((t) => t.slug === slug)?.modules.find(
    (m) => m.order === order,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; order: string }>;
}): Promise<Metadata> {
  const { slug, order } = await params;
  if (!isTrackSlug(slug)) return {};
  const m = findModuleDef(slug, Number(order));
  if (!m) return {};
  const description = `Learn to ${m.outcome}. A free, hands-on AI lesson in LearnAI's ${TRACK_LABEL[slug]} (Level ${TRACK_LEVEL[slug]}), with a quick quiz and a real task.`;
  const url = absoluteUrl(`/track/${slug}/${order}`);
  return {
    title: m.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${m.title} - LearnAI`, description, url, type: "article" },
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string; order: string }>;
}) {
  const { slug, order } = await params;
  const orderNum = Number(order);
  if (!isTrackSlug(slug) || !Number.isInteger(orderNum)) notFound();

  const trackDef = TRACK_DEFS.find((t) => t.slug === slug);
  if (!trackDef) notFound();

  const current = trackDef.modules.find((m) => m.order === orderNum);
  if (!current) notFound();

  const id = moduleId(slug, current.order);
  const content = await getModuleContent(id);
  if (!content) notFound();

  const next = trackDef.modules.find((m) => m.order === orderNum + 1);
  const nextOrder = next ? next.order : null;

  // Strip answers before sending to the client; grading happens server-side.
  const clientQuestions = content.quiz.map((q) => ({
    prompt: q.prompt,
    options: q.options,
  }));

  const lessonUrl = absoluteUrl(`/track/${slug}/${current.order}`);
  const trackUrl = absoluteUrl(`/track/${slug}`);

  const lessonJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${lessonUrl}#lesson`,
    name: current.title,
    description: `Learn to ${current.outcome}.`,
    teaches: current.outcome,
    learningResourceType: "Lesson",
    educationalLevel: TRACK_TIER[slug],
    educationalUse: "self-paced learning",
    inLanguage: "en",
    isAccessibleForFree: true,
    timeRequired: "PT5M",
    url: lessonUrl,
    dateModified: CONTENT_DATE_ISO,
    author: { "@type": "Organization", "@id": `${SITE_URL}/#curriculum-team`, name: `${SITE_NAME} Curriculum Team` },
    isPartOf: {
      "@type": "Course",
      "@id": `${trackUrl}#course`,
      name: TRACK_LABEL[slug],
      url: trackUrl,
    },
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
  };

  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${lessonUrl}#quiz`,
    name: `${current.title} - check your understanding`,
    about: { "@type": "Thing", name: current.outcome },
    educationalLevel: TRACK_TIER[slug],
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "assesses",
      targetName: current.outcome,
    },
    isPartOf: { "@id": `${lessonUrl}#lesson` },
    assesses: current.outcome,
    hasPart: content.quiz.map((q, i) => ({
      "@type": "Question",
      position: i + 1,
      eduQuestionType: "Multiple choice",
      text: q.prompt,
      suggestedAnswer: q.options.map((opt, oi) => ({
        "@type": "Answer",
        position: oi + 1,
        text: opt,
      })),
    })),
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={lessonJsonLd} />
      <JsonLd data={quizJsonLd} />
      <Link
        href={`/track/${slug}`}
        className="text-sm text-ink-3 transition-colors hover:text-ink"
      >
        ← {trackDef.title}
      </Link>

      <p className="eyebrow rise rise-1 mt-6">
        Module {current.order} of {trackDef.modules.length}
      </p>
      <h1 className="rise rise-2 mt-2 font-display text-4xl font-medium leading-tight tracking-tight">
        {current.title}
      </h1>
      <p className="rise rise-3 mt-3 text-lg text-ink-2">
        You&apos;ll be able to {lower(current.outcome)}.
      </p>
      <p className="mt-2 text-xs text-ink-3">Updated {CONTENT_DATE_HUMAN}</p>

      <article className="mt-9">
        <LessonReader markdown={content.lesson} />
      </article>

      <TaskCheck moduleId={id} task={content.task} slug={slug} />

      <ModuleQuiz
        moduleId={id}
        slug={slug}
        nextOrder={nextOrder}
        questions={clientQuestions}
        selfFetchProgress
      />
    </div>
  );
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
