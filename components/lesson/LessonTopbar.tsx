"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StreakChip } from "@/components/dashboard/StreakChip";

interface LessonTopbarProps {
  trackLabel: string;
  trackSlug: string;
  moduleOrder: number;
  totalModules: number;
  readMinutes: number;
}

export function LessonTopbar({
  trackLabel,
  trackSlug,
  moduleOrder,
  totalModules,
  readMinutes,
}: LessonTopbarProps) {
  const [streak, setStreak] = useState<{ count: number; atRisk: boolean } | null>(null);

  useEffect(() => {
    fetch(`/api/progress/${trackSlug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { streak?: number; streakAtRisk?: boolean } | null) => {
        if (d?.streak != null)
          setStreak({ count: d.streak, atRisk: !!d.streakAtRisk });
      })
      .catch(() => {});
  }, [trackSlug]);

  return (
    <div className="sticky top-0 z-30 border-b border-line bg-paper/90 no-print backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link
          href={`/track/${trackSlug}`}
          className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <BackIcon />
          <span className="hidden sm:inline">{trackLabel}</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <div className="flex items-center gap-2.5 text-sm">
          <span className="chip font-mono tabular-nums">
            M{moduleOrder} / {totalModules}
          </span>
          <span className="hidden text-xs text-ink-3 sm:inline tabular-nums">
            ~{readMinutes} min
          </span>
          {streak && streak.count > 0 && (
            <StreakChip streak={streak.count} atRisk={streak.atRisk} />
          )}
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13 8H3M7 4 3 8l4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
