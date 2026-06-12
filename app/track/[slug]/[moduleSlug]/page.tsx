import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModuleContent } from "@/lib/server/db/tracks";
import {
  isTrackSlug,
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_TIER,
} from "@/lib/core/track-meta";
import {
  findModuleBySlug,
  moduleId,
  TRACK_DEFS,
} from "@/lib/server/content/tracks-definition";
import { HOWTO_BY_MODULE } from "@/lib/core/howto-steps";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { LessonReader } from "@/components/LessonReader";
import { TaskCard } from "@/components/lesson/TaskCard";
import { QuizRunner } from "@/components/lesson/QuizRunner";
import { LessonShell } from "@/components/lesson/LessonShell";
import { LessonTopbar } from "@/components/lesson/LessonTopbar";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return TRACK_DEFS.flatMap((t) =>
    t.modules.map((m) => ({ slug: t.slug, moduleSlug: m.slug })),
  );
}

const CONTENT_DATE_ISO = new Date().toISOString().split("T")[0];
const CONTENT_DATE_HUMAN = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string }>;
}): Promise<Metadata> {
  const { slug, moduleSlug } = await params;
  if (!isTrackSlug(slug)) return {};
  const m = findModuleBySlug(slug, moduleSlug);
  if (!m) return {};
  const description = `Learn to ${m.outcome}. A free, hands-on AI lesson in LearnAI's ${TRACK_LABEL[slug]} (Level ${TRACK_LEVEL[slug]}), with a quick quiz and a real task.`;
  const url = absoluteUrl(`/track/${slug}/${moduleSlug}`);
  return {
    title: m.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${m.title} - LearnAI`, description, url, type: "article" },
    twitter: { card: "summary_large_image", title: `${m.title} - LearnAI`, description },
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string }>;
}) {
  const { slug, moduleSlug } = await params;
  if (!isTrackSlug(slug)) notFound();

  const trackDef = TRACK_DEFS.find((t) => t.slug === slug);
  if (!trackDef) notFound();

  const current = trackDef.modules.find((m) => m.slug === moduleSlug);
  if (!current) notFound();

  const id = moduleId(slug, current.order);
  const content = await getModuleContent(id);
  if (!content) notFound();

  const next = trackDef.modules.find((m) => m.order === current.order + 1);
  const nextSlug = next ? next.slug : null;

  const clientQuestions = content.quiz.map((q) => ({
    prompt: q.prompt,
    options: q.options,
  }));

  const lessonUrl = absoluteUrl(`/track/${slug}/${current.slug}`);
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: TRACK_LABEL[slug], item: trackUrl },
      { "@type": "ListItem", position: 3, name: current.title, item: lessonUrl },
    ],
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

  const howTo = HOWTO_BY_MODULE[id];
  const howToJsonLd = howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${lessonUrl}#howto`,
        name: howTo.name,
        description: howTo.description,
        totalTime: howTo.totalTime,
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": lessonUrl },
        step: howTo.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: `${lessonUrl}#step-${i + 1}`,
        })),
      }
    : null;

  const modulesStub = trackDef.modules.map((m) => ({
    order: m.order,
    slug: m.slug,
    title: m.title,
  }));

  return (
    <>
      <JsonLd data={lessonJsonLd} />
      <JsonLd data={quizJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {howToJsonLd && <JsonLd data={howToJsonLd} />}

      <LessonTopbar
        trackLabel={trackDef.title}
        trackSlug={slug}
        moduleOrder={current.order}
        totalModules={trackDef.modules.length}
        readMinutes={6}
      />

      <LessonShell
        trackSlug={slug}
        trackLabel={trackDef.title}
        moduleOrder={current.order}
        modules={modulesStub}
      >
        <header className="pb-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="chip chip-accent">Level {TRACK_LEVEL[slug]}</span>
            <span className="chip">{TRACK_TIER[slug]}</span>
            <span className="chip font-mono tabular-nums">
              M{current.order} / {trackDef.modules.length}
            </span>
          </div>
          <h1 className="display-lg text-ink">{current.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-2">
            By the end you&apos;ll be able to {lower(current.outcome)}.
          </p>
          <p className="mt-3 text-xs text-ink-3">
            Last reviewed{" "}
            <time dateTime={CONTENT_DATE_ISO}>{CONTENT_DATE_HUMAN}</time>
          </p>
        </header>

        <article className="pb-4">
          <LessonReader markdown={content.lesson} />
        </article>

        <TaskCard moduleId={id} task={content.task} slug={slug} />

        <QuizRunner
          moduleId={id}
          slug={slug}
          nextSlug={nextSlug}
          questions={clientQuestions}
        />
      </LessonShell>
    </>
  );
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
