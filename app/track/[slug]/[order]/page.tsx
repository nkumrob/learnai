import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackView } from "@/lib/server/track-view";
import { getModuleContent } from "@/lib/server/db/tracks";
import {
  isTrackSlug,
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_TIER,
} from "@/lib/core/track-meta";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";
import { LessonReader } from "@/components/LessonReader";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { TaskCheck } from "@/components/TaskCheck";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

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

  const session = await getCurrentSession();
  if (!session) notFound();

  const view = await getTrackView(slug, session.id);
  if (!view) notFound();

  const current = view.modules.find((m) => m.order === orderNum);
  if (!current) notFound();

  // Lessons are open to read (good for learners and search engines); the quiz
  // stays gated until earlier modules are passed.
  const content = await getModuleContent(current.id);
  if (!content) notFound();

  const next = view.modules.find((m) => m.order === orderNum + 1);
  const nextOrder = next ? next.order : null;

  // Strip answers before sending to the client; grading happens server-side.
  const clientQuestions = content.quiz.map((q) => ({
    prompt: q.prompt,
    options: q.options,
  }));

  const lessonJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: current.title,
    description: `Learn to ${current.outcome}.`,
    teaches: current.outcome,
    learningResourceType: "lesson",
    educationalLevel: TRACK_TIER[slug],
    inLanguage: "en",
    isAccessibleForFree: true,
    url: absoluteUrl(`/track/${slug}/${current.order}`),
    isPartOf: {
      "@type": "Course",
      name: TRACK_LABEL[slug],
      url: absoluteUrl(`/track/${slug}`),
    },
    provider: { "@type": "Organization", name: SITE_NAME, "@id": `${SITE_URL}/#org` },
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <JsonLd data={lessonJsonLd} />
      <Link
        href={`/track/${slug}`}
        className="text-sm text-ink-3 transition-colors hover:text-ink"
      >
        ← {view.track.title}
      </Link>

      <p className="eyebrow rise rise-1 mt-6">
        Module {current.order} of {view.modules.length}
      </p>
      <h1 className="rise rise-2 mt-2 font-display text-4xl font-medium leading-tight tracking-tight">
        {current.title}
      </h1>
      <p className="rise rise-3 mt-3 text-lg text-ink-2">
        You&apos;ll be able to {lower(current.outcome)}.
      </p>

      <article className="mt-9">
        <LessonReader markdown={content.lesson} />
      </article>

      <TaskCheck
        moduleId={current.id}
        task={content.task}
        initialDone={current.taskDone}
      />

      <ModuleQuiz
        moduleId={current.id}
        slug={slug}
        nextOrder={nextOrder}
        questions={clientQuestions}
        alreadyPassed={current.status === "passed"}
        locked={current.locked}
      />
    </div>
  );
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
