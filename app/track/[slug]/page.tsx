import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackView, type ModuleView } from "@/lib/server/track-view";
import { isTrackSlug } from "@/lib/core/track-meta";

export const dynamic = "force-dynamic";

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

  const { track, modules, completed, passedCount } = view;
  const pct = Math.round((passedCount / modules.length) * 100);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <Link
        href="/#curriculum"
        className="text-sm text-ink-3 transition-colors hover:text-ink"
      >
        ← Curriculum
      </Link>

      <p className="eyebrow rise rise-1 mt-6">Track</p>
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
          {passedCount} / {modules.length}
        </span>
      </div>

      {completed && (
        <div className="rise mt-7 flex flex-col gap-4 rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium text-accent">Track complete</div>
            <div className="text-sm text-ink-2">
              You&apos;ve passed every module. Your certificate is ready.
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
  const state =
    m.status === "passed"
      ? { label: "Passed", cls: "text-accent", dot: "bg-accent" }
      : m.status === "in_progress"
        ? { label: "In progress", cls: "text-ink-2", dot: "bg-ink-3" }
        : m.locked
          ? { label: "Locked", cls: "text-ink-3", dot: "bg-line-strong" }
          : { label: "Start", cls: "text-accent", dot: "bg-line-strong" };

  const inner = (
    <div
      className={`flex items-center gap-4 rounded-[var(--r-lg)] border border-line bg-surface px-5 py-4 ${
        m.locked ? "opacity-60" : "transition-all hover:border-accent hover:shadow-sm"
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line font-display text-sm text-ink-2">
        {m.status === "passed" ? "✓" : m.locked ? "" : m.order}
        {m.locked && <LockIcon />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-medium tracking-tight">{m.title}</div>
        <div className="truncate text-sm text-ink-2">
          You&apos;ll be able to {lower(m.outcome)}.
        </div>
      </div>
      <span className={`flex shrink-0 items-center gap-2 text-xs font-medium ${state.cls}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${state.dot}`} />
        {state.label}
        {m.score != null && m.status === "passed" && (
          <span className="text-ink-3 tabular-nums">
            {Math.round(m.score * 100)}%
          </span>
        )}
      </span>
    </div>
  );

  if (m.locked) return <li aria-disabled>{inner}</li>;
  return (
    <li>
      <Link href={`/track/${slug}/${m.order}`}>{inner}</Link>
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

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
