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
      <rect width="512" height="512" rx="116" fill="#1e5c45" />
      <g fill="#fbfaf7">
        <rect x="112" y="250" width="68" height="140" rx="26" />
        <rect x="222" y="198" width="68" height="192" rx="26" />
        <rect x="332" y="146" width="68" height="244" rx="26" />
        <circle cx="366" cy="100" r="30" />
      </g>
    </svg>
  );
}

/** Full lockup: mark + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-xl font-medium tracking-tight">
        Learn<span className="text-accent">AI</span>
      </span>
    </span>
  );
}
