import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackView, type ModuleView } from "@/lib/server/track-view";
import {
  isTrackSlug,
  TRACK_LABEL,
  TRACK_LEVEL,
  TRACK_PROMISE,
} from "@/lib/core/track-meta";
import { absoluteUrl } from "@/lib/core/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isTrackSlug(slug)) return {};
  const title = `${TRACK_LABEL[slug]} - Level ${TRACK_LEVEL[slug]}`;
  const description = `${TRACK_PROMISE[slug]} A free, hands-on level in the LearnAI journey with bite-sized lessons, quizzes, and a verifiable certificate.`;
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

  const session = await getCurrentSession();
  if (!session) notFound();

  const view = await getTrackView(slug, session.id);
  if (!view) notFound();

  const { track, modules, completeAll, completeCount, level, tier } = view;
  const pct = Math.round((completeCount / modules.length) * 100);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <Link
        href="/#journey"
        className="text-sm text-ink-3 transition-colors hover:text-ink"
      >
        ← Journey
      </Link>

      <p className="eyebrow rise rise-1 mt-6">
        Level {level} · {tier}
      </p>
      <h1 className="rise rise-2 mt-2 font-display text-4xl font-medium tracking-tight">
        {track.title}
      </h1>
      <p className="rise rise-3 mt-3 max-w-xl text-lg leading-relaxed text-ink-2">
        {track.description}
      </p>

      <div className="rise rise-4 mt-7 flex items-center gap-4">
        <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-medium text-ink-2 tabular-nums">
          {completeCount} / {modules.length} done
        </span>
      </div>

      {completeAll && (
        <div className="rise mt-7 flex flex-col gap-4 rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium text-accent">Level complete</div>
            <div className="text-sm text-ink-2">
              Every lesson passed and every task done. Your certificate is ready.
            </div>
          </div>
          <Link
            href={`/track/${track.slug}/certificate`}
            className="shrink-0 rounded-[var(--r-md)] bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Get certificate
          </Link>
        </div>
      )}

      <ol className="mt-9 space-y-3">
        {modules.map((m) => (
          <ModuleRow key={m.id} slug={track.slug} module={m} />
        ))}
      </ol>
    </div>
  );
}

function ModuleRow({ slug, module: m }: { slug: string; module: ModuleView }) {
  const passed = m.status === "passed";

  const inner = (
    <div
      className={`flex items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface px-5 py-4 transition-all hover:border-accent hover:shadow-sm ${
        m.complete ? "border-accent/30" : ""
      } ${m.locked ? "opacity-80" : ""}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-display text-sm ${
          m.complete ? "border-accent bg-accent text-accent-ink" : "border-line text-ink-2"
        }`}
      >
        {m.complete ? "✓" : m.order}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium tracking-tight">{m.title}</div>
        <div className="truncate text-sm text-ink-2">
          You&apos;ll be able to {lower(m.outcome)}.
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {m.locked ? (
          <span className="flex items-center gap-1 rounded-[var(--r-sm)] bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-3">
            <LockIcon /> Quiz
          </span>
        ) : (
          <Pill on={passed} label={passed ? `Quiz ${Math.round((m.score ?? 0) * 100)}%` : "Quiz"} />
        )}
        <Pill on={m.taskDone} label="Task" />
      </div>
    </div>
  );

  return (
    <li>
      <Link href={`/track/${slug}/${m.order}`}>{inner}</Link>
    </li>
  );
}

function Pill({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`rounded-[var(--r-sm)] px-2 py-0.5 text-[11px] font-medium tabular-nums ${
        on ? "bg-accent-faint text-accent" : "bg-surface-2 text-ink-3"
      }`}
    >
      {on ? "✓ " : ""}
      {label}
    </span>
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

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
