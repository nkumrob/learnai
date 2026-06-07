"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ModuleStub {
  order: number;
  title: string;
}

interface LessonShellProps {
  trackSlug: string;
  trackLabel: string;
  moduleOrder: number;
  modules: ModuleStub[];
  children: React.ReactNode;
}

/**
 * The center column of the lesson player. On wide viewports a left rail
 * (module list) hangs off the side; on narrow viewports the rail is hidden.
 * Reading progress for the lesson body is wired via IntersectionObserver
 * on the rendered <article>, advancing a sticky top bar.
 */
export function LessonShell({
  trackSlug,
  trackLabel,
  moduleOrder,
  modules,
  children,
}: LessonShellProps) {
  const [readPct, setReadPct] = useState(0);
  const [statuses, setStatuses] = useState<Record<number, "passed" | "in_progress" | "none">>({});

  useEffect(() => {
    const article = document.querySelector(".lesson-body");
    if (!article) return;
    function update() {
      const a = article as HTMLElement;
      const top = a.getBoundingClientRect().top;
      const total = a.scrollHeight;
      const viewport = window.innerHeight;
      // 0 when the article top is below the viewport top; 1 when its bottom
      // has passed it.
      const scrolled = Math.max(0, viewport - top);
      const pct = Math.min(1, Math.max(0, scrolled / (total + viewport * 0.3)));
      setReadPct(pct);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Fetch progress to highlight passed modules in the rail.
  useEffect(() => {
    fetch(`/api/progress/${trackSlug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (
          d: {
            modules?: { order: number; status: string }[];
          } | null,
        ) => {
          if (!d?.modules) return;
          const map: Record<number, "passed" | "in_progress" | "none"> = {};
          for (const m of d.modules) {
            map[m.order] =
              m.status === "passed"
                ? "passed"
                : m.status === "in_progress"
                  ? "in_progress"
                  : "none";
          }
          setStatuses(map);
        },
      )
      .catch(() => {});
  }, [trackSlug]);

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="sticky top-[58px] z-20 h-[2px] bg-line/40 no-print">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${readPct * 100}%` }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl px-5 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[220px_1fr] lg:gap-10 xl:grid-cols-[240px_minmax(0,720px)_1fr] xl:gap-14">
        {/* Left rail — only on lg+ */}
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <div className="eyebrow mb-3 text-ink-3">In this level</div>
            <ol className="space-y-1 text-sm">
              {modules.map((m) => {
                const isCurrent = m.order === moduleOrder;
                const status = statuses[m.order] ?? "none";
                const done = status === "passed";
                return (
                  <li key={m.order}>
                    <Link
                      href={`/track/${trackSlug}/${m.order}`}
                      className={`flex items-center gap-2.5 rounded-[var(--r-md)] px-2.5 py-1.5 transition-colors ${
                        isCurrent
                          ? "bg-accent-faint text-accent"
                          : done
                            ? "text-ink-3 hover:bg-surface-2"
                            : "text-ink-2 hover:bg-surface-2"
                      }`}
                    >
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold tabular-nums ${
                          isCurrent
                            ? "bg-accent text-accent-ink"
                            : done
                              ? "bg-accent-faint text-accent"
                              : "border border-line text-ink-3"
                        }`}
                      >
                        {done ? "✓" : m.order}
                      </span>
                      <span
                        className={`truncate ${isCurrent ? "font-medium" : ""}`}
                        title={m.title}
                      >
                        {m.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5 border-t border-line pt-4">
              <Link
                href="/home"
                className="text-xs text-ink-3 transition-colors hover:text-ink"
              >
                ← Dashboard
              </Link>
              <span className="mx-2 text-ink-3">·</span>
              <Link
                href={`/track/${trackSlug}`}
                className="text-xs text-ink-3 transition-colors hover:text-ink"
              >
                {trackLabel}
              </Link>
            </div>
          </div>
        </aside>

        {/* Center column */}
        <div className="lesson-body w-full max-w-[720px]">
          {children}
        </div>

        {/* Right column — reserved for future LessonOutline */}
        <div className="hidden xl:block" />
      </div>
    </div>
  );
}
