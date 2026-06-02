import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackView } from "@/lib/server/track-view";
import { getModuleContent } from "@/lib/server/db/tracks";
import { isTrackSlug } from "@/lib/core/track-meta";
import { LessonReader } from "@/components/LessonReader";
import { ModuleQuiz } from "@/components/ModuleQuiz";
import { TaskCheck } from "@/components/TaskCheck";

export const dynamic = "force-dynamic";

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

  if (current.locked) {
    return (
      <BlockedState slug={slug} />
    );
  }

  const content = await getModuleContent(current.id);
  if (!content) notFound();

  const next = view.modules.find((m) => m.order === orderNum + 1);
  const nextOrder = next ? next.order : null;

  // Strip answers before sending to the client; grading happens server-side.
  const clientQuestions = content.quiz.map((q) => ({
    prompt: q.prompt,
    options: q.options,
  }));

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
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
      />
    </div>
  );
}

function BlockedState({ slug }: { slug: string }) {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-line text-ink-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h1 className="mt-5 font-display text-2xl font-medium">This module is locked</h1>
      <p className="mt-2 text-ink-2">
        Pass the previous module at 80% or higher to unlock it.
      </p>
      <Link
        href={`/track/${slug}`}
        className="mt-7 inline-block rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
      >
        Back to track
      </Link>
    </div>
  );
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
