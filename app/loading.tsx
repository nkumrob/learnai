export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-24 rounded bg-line" />
        <div className="h-10 w-2/3 rounded bg-line" />
        <div className="h-4 w-1/2 rounded bg-line" />
        <div className="mt-8 space-y-3">
          <div className="h-16 rounded-[var(--r-lg)] bg-line/60" />
          <div className="h-16 rounded-[var(--r-lg)] bg-line/60" />
          <div className="h-16 rounded-[var(--r-lg)] bg-line/60" />
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
