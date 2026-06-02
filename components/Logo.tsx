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
      <path
        d="M150 144 H292 V172 H254 V306 H364 V376 H150 V306 H188 V172 H150 Z"
        fill="#fbfaf7"
      />
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
