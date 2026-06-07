import Link from "next/link";
import { TRACK_LABEL, levelToSlug } from "@/lib/core/track-meta";

export function CertificateNextStep({
  currentLevel,
}: {
  currentLevel: number;
}) {
  const nextSlug = levelToSlug(currentLevel + 1);
  if (!nextSlug) {
    return (
      <div className="no-print mt-10 rounded-[var(--r-lg)] border border-dashed border-line bg-surface-2/30 p-6 text-center">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          You finished every level.
        </h2>
        <p className="mt-2 text-ink-2">
          Five certificates earned. You&apos;re among the first to make it all
          the way through. Use what you learned.
        </p>
      </div>
    );
  }
  return (
    <div
      className="no-print mt-10 rounded-[var(--r-lg)] border-l-4 p-6 sm:p-7"
      style={{ borderLeftColor: "var(--accent)", background: "var(--accent-faint)" }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow text-accent">Unlocked</span>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Level {currentLevel + 1}: {TRACK_LABEL[nextSlug]}
          </h2>
          <p className="mt-1 text-sm text-ink-2">
            You&apos;ve earned access. Start when you&apos;re ready.
          </p>
        </div>
        <Link href={`/track/${nextSlug}`} className="btn-primary shrink-0">
          Start Level {currentLevel + 1} →
        </Link>
      </div>
    </div>
  );
}
