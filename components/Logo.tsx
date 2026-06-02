// The LearnAI mark: ascending bars rising to a summit - the zero-to-mastery
// journey. Brand colors are fixed (evergreen tile, cream bars) in both themes,
// like a real logo.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role="img"
      aria-label="LearnAI"
    >
      <rect width="512" height="512" rx="120" fill="#1e5c45" />
      <g fill="#fbfaf7">
        <rect x="116" y="256" width="66" height="136" rx="26" />
        <rect x="223" y="206" width="66" height="186" rx="26" />
        <rect x="330" y="156" width="66" height="236" rx="26" />
        <circle cx="363" cy="120" r="30" />
      </g>
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="font-display text-[1.4rem] font-medium leading-none tracking-tight">
        Learn<span className="text-accent">AI</span>
      </span>
    </span>
  );
}
