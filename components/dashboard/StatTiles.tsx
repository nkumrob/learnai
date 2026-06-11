import type { DashboardStats } from "@/lib/server/dashboard";

export function StatTiles({ stats }: { stats: DashboardStats }) {
  const broken = stats.streak <= 0;
  // Render the most recent 7 calendar days as a strip of dots — the warm
  // "look how many days I showed up" pattern from Khan / Brilliant.
  const weekDots = Array.from({ length: 7 }).map((_, i) => i < Math.min(stats.streak, 7));

  return (
    <div className="card grid items-center gap-4 p-4 sm:grid-cols-[1fr_1px_1fr_1px_1fr] sm:gap-6 sm:p-5">
      {/* Streak — with 7-day dot ribbon */}
      <div className="flex items-center gap-4">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
            broken ? "bg-surface-2 text-ink-3" : "bg-sun-soft text-sun"
          }`}
        >
          <FlameIcon />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold tabular-nums text-ink">
              {broken ? "0" : stats.streak}
            </span>
            <span className="text-xs text-ink-3">
              day{stats.streak === 1 ? "" : "s"} {broken ? "(start one!)" : ""}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1">
            {weekDots.map((on, i) => (
              <span
                key={i}
                className={`block h-1.5 w-1.5 rounded-full ${
                  on
                    ? "bg-sun"
                    : i === Math.min(stats.streak, 7)
                      ? "bg-line-strong"
                      : "bg-line"
                }`}
                style={on ? { boxShadow: "0 0 0 2px var(--sun-soft)" } : undefined}
                aria-hidden
              />
            ))}
            <span className="ml-1 text-[10px] uppercase tracking-[0.14em] text-ink-3">
              this week
            </span>
          </div>
        </div>
      </div>

      <Divider />

      {/* Lessons passed */}
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-faint text-accent">
          <CheckIcon />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold tabular-nums text-ink">
              {stats.modulesPassed}
            </span>
            <span className="text-xs text-ink-3">
              of {stats.modulesTotal} lessons
            </span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-accent transition-all"
              style={{
                width:
                  stats.modulesTotal > 0
                    ? `${(stats.modulesPassed / stats.modulesTotal) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* Time learning */}
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky-soft text-sky">
          <ClockIcon />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold tabular-nums text-ink">
              {fmtHours(stats.totalMinutes)}
            </span>
            <span className="text-xs text-ink-3">total</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {stats.thisWeekMinutes > 0
              ? `+${fmtHours(stats.thisWeekMinutes)} this week`
              : "no time logged yet"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <span
      className="hidden h-12 w-px bg-line sm:block"
      aria-hidden
    />
  );
}

function fmtHours(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function FlameIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path
        d="M6 1c.5 2.5 3 3.5 3 6.5a3.5 3.5 0 1 1-7 0c0-1.4.7-2.4 1.5-3 .2 1 .8 1.7 1.5 1.7 0-1.7 0-3.3 1-5.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8 3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 5v3l2 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
