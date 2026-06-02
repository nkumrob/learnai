import Link from "next/link";
import { listTracksWithModules } from "@/lib/server/db/tracks";
import { TRACK_ORDER, TRACK_TAG } from "@/lib/core/track-meta";
import type { TrackWithModules } from "@/types/shared";

export const dynamic = "force-dynamic";

const STEPS = [
  ["Place", "Answer 3 questions. We point you to the right starting track."],
  ["Learn", "Short, practical lessons - each ends with a task you can do today."],
  ["Prove", "Pass an auto-graded quiz at 80% to unlock the next module."],
  ["Certify", "Finish the track and earn a certificate anyone can verify."],
] as const;

export default async function Home() {
  const tracks = await listTracksWithModules();
  const ordered = TRACK_ORDER.map((slug) =>
    tracks.find((t) => t.slug === slug),
  ).filter(Boolean) as TrackWithModules[];

  return (
    <div className="mx-auto max-w-3xl px-5">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28">
        <p className="eyebrow rise rise-1">Free · No signup · Get certified</p>
        <h1 className="rise rise-2 mt-4 font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight sm:text-6xl">
          Learn useful AI skills.{" "}
          <span className="text-accent">Then prove it.</span>
        </h1>
        <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          Tuttorr meets you where you are. Take a 30-second placement, follow one
          focused track, and pass each step to earn a certificate you can share -
          plus skills you can use today.
        </p>
        <div className="rise rise-4 mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/placement"
            className="rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink shadow-sm transition-colors hover:bg-accent-hover"
          >
            Find where to start
          </Link>
          <a
            href="#curriculum"
            className="rounded-[var(--r-md)] px-4 py-3 font-medium text-ink-2 transition-colors hover:text-ink"
          >
            See the curriculum ↓
          </a>
        </div>
      </section>

      {/* How it works - editorial sequence, not feature cards */}
      <section className="rise rise-5 border-t border-line py-12">
        <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {STEPS.map(([title, desc], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-display text-2xl leading-none text-ink-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-medium">{title}</div>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Curriculum - an indexed syllabus */}
      <section id="curriculum" className="scroll-mt-20 border-t border-line py-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            The curriculum
          </h2>
          <span className="text-sm text-ink-3">
            {ordered.length} tracks · beginner to builder
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">
          A deliberate ladder - from using AI confidently to automating real work
          and building with APIs and MCP. Start anywhere, or let the placement
          decide.
        </p>

        <ul className="mt-8 divide-y divide-line border-y border-line">
          {ordered.map((t, i) => (
            <li key={t.id}>
              <Link
                href={`/track/${t.slug}`}
                className="group flex items-center gap-5 py-5 transition-colors"
              >
                <span className="font-display text-xl text-ink-3 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-lg font-medium tracking-tight">
                      {t.title}
                    </h3>
                    <span className="hidden rounded-[var(--r-sm)] bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-2 sm:inline">
                      {TRACK_TAG[t.slug]}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-ink-2">{t.description}</p>
                </div>
                <span className="hidden shrink-0 text-sm text-ink-3 sm:block">
                  {t.modules.length} modules
                </span>
                <span className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
