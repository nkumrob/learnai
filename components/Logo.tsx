// LearnAI — the "Ascent" mark: a geometric A that reads as a peak (mastery), an
// upward path (zero → mastery), and the letter A (AI). Drawn as precise vector
// paths; uses currentColor so it adapts to the theme. The same mark doubles as
// the "A" in the wordmark.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      role="img"
      aria-label="LearnAI"
      fill="none"
      stroke="currentColor"
    >
      <path d="M48 20 L76 76 L20 76 Z" strokeWidth="12" strokeLinejoin="round" />
      <path d="M35 58 H61" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-[26px] w-[26px] shrink-0 text-accent" />
      <span className="text-[1.34rem] font-extrabold tracking-[-0.03em]">
        LearnAI
      </span>
    </span>
  );
}
