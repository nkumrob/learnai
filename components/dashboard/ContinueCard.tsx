import Link from "next/link";
import type { DashboardResume } from "@/lib/server/dashboard";

export function ContinueCard({ resume }: { resume: DashboardResume }) {
  const pct = Math.round(resume.trackProgress * 100);
  return (
    <Link
      href={resume.href}
      className="card card-interactive group relative grid items-center gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8"
      style={{
        background:
          "linear-gradient(180deg, var(--surface) 0%, var(--accent-faint) 100%)",
      }}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-accent">Continue</span>
          <span className="chip">
            Level {resume.level} · {resume.trackLabel}
          </span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Lesson {resume.moduleOrder}. {resume.moduleTitle}
        </h2>
        <p className="mt-2 text-ink-2">{resume.moduleOutcome}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-3 min-w-0 sm:max-w-md">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-accent transition-all"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="shrink-0 text-xs text-ink-3 tabular-nums">
              {resume.passedInTrack} of {resume.totalInTrack}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden flex-col items-end gap-3 sm:flex">
        <span className="text-sm text-ink-3 tabular-nums">
          ~{resume.estMinutes} min
        </span>
        <span className="btn-primary group-hover:bg-accent-hover">
          Resume
          <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <div className="sm:hidden">
        <span className="btn-primary inline-flex w-full justify-center">
          Resume lesson
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
