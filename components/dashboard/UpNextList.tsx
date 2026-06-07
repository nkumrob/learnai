import Link from "next/link";
import type { DashboardUpNext } from "@/lib/server/dashboard";

export function UpNextList({ items }: { items: DashboardUpNext[] }) {
  if (items.length === 0) return null;
  const [first, ...rest] = items;
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          Up next
        </h2>
        <span className="font-display text-sm italic text-ink-3">
          this week
        </span>
      </div>
      <ol className="grid gap-3 sm:grid-cols-[1.4fr_1fr] sm:gap-4">
        {/* Hero next item */}
        <li className="sm:row-span-2">
          <Link
            href={first.href}
            className="card card-interactive group flex h-full flex-col p-5 sm:p-6"
            style={{
              background:
                "linear-gradient(180deg, var(--surface) 0%, var(--accent-faint) 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="chip chip-accent">Today</span>
              <span className="chip">
                L{first.level} · M{first.moduleOrder}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
              {first.moduleTitle}
            </h3>
            <p className="mt-1 text-sm text-ink-2">{first.trackLabel}</p>
            <div className="mt-auto flex items-center justify-between pt-5 text-sm">
              <span className="text-ink-3 tabular-nums">
                ~{first.estMinutes} min · 4 quiz qs
              </span>
              <ArrowIcon className="text-accent transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </li>

        {/* Compact rows for the rest */}
        {rest.map((m) => (
          <li key={`${m.trackSlug}-${m.moduleOrder}`}>
            <Link
              href={m.href}
              className="group flex h-full items-center gap-3 rounded-[var(--r-lg)] border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong hover:bg-surface-2/30"
            >
              <span className="chip font-mono tabular-nums shrink-0">
                L{m.level}·{m.moduleOrder}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-ink leading-tight">
                  {m.moduleTitle}
                </div>
                <div className="text-xs text-ink-3 tabular-nums">
                  ~{m.estMinutes} min
                </div>
              </div>
              <ArrowIcon className="shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
