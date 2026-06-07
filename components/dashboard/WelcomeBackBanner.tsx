export function WelcomeBackBanner({ days }: { days: number }) {
  if (days < 7) return null;
  const span = days < 14 ? "a week" : days < 21 ? "two weeks" : `${Math.floor(days / 7)} weeks`;
  return (
    <div
      className="card mb-6 flex items-center gap-4 border-l-4 border-sky bg-sky-soft/40 p-4"
      style={{ borderLeftColor: "var(--sky)" }}
    >
      <div className="text-2xl" aria-hidden>
        👋
      </div>
      <div className="flex-1">
        <p className="font-medium text-ink">
          It&apos;s been {span}. Pick up right where you left off.
        </p>
        <p className="text-sm text-ink-2">
          Your progress is exactly as you left it.
        </p>
      </div>
    </div>
  );
}
