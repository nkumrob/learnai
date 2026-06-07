export function StreakChip({
  streak,
  atRisk,
  brokenLabel = "Start a streak",
}: {
  streak: number;
  atRisk?: boolean;
  brokenLabel?: string;
}) {
  const broken = streak <= 0;
  return (
    <span
      className={`chip ${broken ? "" : atRisk ? "chip-sky" : "chip-sun"}`}
      style={broken ? undefined : { fontVariantNumeric: "tabular-nums" }}
      aria-label={
        broken
          ? brokenLabel
          : `${streak} day${streak === 1 ? "" : "s"} streak`
      }
    >
      {broken ? (
        <>
          <DotIcon /> {brokenLabel}
        </>
      ) : (
        <>
          <FlameIcon />
          <span>
            {streak}
            <span className="ml-0.5 text-[10px] opacity-70">
              day{streak === 1 ? "" : "s"}
            </span>
          </span>
        </>
      )}
    </span>
  );
}

function FlameIcon() {
  return (
    <svg width="11" height="12" viewBox="0 0 12 14" fill="none" aria-hidden>
      <path
        d="M6 1c.5 2.5 3 3.5 3 6.5a3.5 3.5 0 1 1-7 0c0-1.4.7-2.4 1.5-3 .2 1 .8 1.7 1.5 1.7 0-1.7 0-3.3 1-5.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
