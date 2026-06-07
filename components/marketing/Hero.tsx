import Link from "next/link";

interface HeroProps {
  resumeHref?: string | null;
  resumeLevel?: number | null;
  certCount?: number;
}

export function Hero({ resumeHref, resumeLevel, certCount }: HeroProps) {
  return (
    <section className="relative grid items-center gap-12 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div>
        <div className="rise rise-1 mb-6 inline-flex items-center gap-2">
          <span className="chip chip-accent">
            <SparkIcon />
            Free · 5 levels · 50 lessons
          </span>
        </div>

        <h1 className="rise rise-2 display-xl text-ink">
          Learn AI properly.
          <br />
          <span className="font-display italic text-accent">Prove it</span> with
          a certificate.
        </h1>

        <p className="rise rise-3 mt-6 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          A guided journey from zero to capable. Read for five minutes, do one
          small thing with AI, take a quick quiz. No signup. No paywall. Just
          work that adds up.
        </p>

        <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-3">
          {resumeHref && resumeLevel ? (
            <Link href={resumeHref} className="btn-primary">
              Continue Level {resumeLevel}
              <ArrowIcon />
            </Link>
          ) : (
            <Link href="/placement" className="btn-primary">
              Find your level
              <ArrowIcon />
            </Link>
          )}
          <a href="#sample-lesson" className="btn-ghost">
            See a lesson first
          </a>
        </div>

        <div className="rise rise-5 mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-3">
          <span className="inline-flex items-center gap-2">
            <DotIcon className="text-positive" />
            {certCount != null && certCount > 0
              ? `${certCount.toLocaleString()} certificates earned`
              : "Verifiable certificates"}
          </span>
          <span className="inline-flex items-center gap-2">
            <DotIcon className="text-sun" />
            30-second placement
          </span>
          <span className="inline-flex items-center gap-2">
            <DotIcon className="text-sky" />
            Works in your browser
          </span>
        </div>
      </div>

      {/* Right-column lesson artifact — proves the product is real */}
      <div className="rise rise-4 hidden lg:block">
        <HeroArtifact />
      </div>
    </section>
  );
}

function HeroArtifact() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[var(--r-xl)] bg-accent-faint/40 blur-2xl"
      />
      <div className="card relative overflow-hidden p-0">
        {/* Top status row — chip + streak */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2/40 px-5 py-3">
          <span className="chip chip-accent">L1 · Module 3 of 10</span>
          <span className="chip chip-sun">
            <FlameIcon />
            <span className="tabular-nums">4 day streak</span>
          </span>
        </div>

        {/* Stage stepper */}
        <div className="grid grid-cols-3 gap-px bg-line text-center text-[13px] font-medium">
          <div className="bg-accent-faint px-3 py-2.5 text-accent">
            <CheckSmall /> Read
          </div>
          <div className="bg-accent-faint px-3 py-2.5 text-accent">
            <CheckSmall /> Try it
          </div>
          <div className="bg-surface px-3 py-2.5 text-ink">
            <span className="mr-1.5 inline-grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] text-accent-ink">
              3
            </span>
            Check
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <div className="eyebrow mb-2 text-ink-3">Question 3 of 4</div>
          <p className="font-display text-lg font-semibold tracking-tight text-ink">
            Why do language models sometimes invent confident-sounding facts?
          </p>

          <div className="mt-5 space-y-2">
            <Option letter="A" muted>
              They run out of memory mid-sentence.
            </Option>
            <Option letter="B" selected>
              They predict the next likely token, not the next true fact.
            </Option>
            <Option letter="C" muted>
              They&apos;re trained only on fiction.
            </Option>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-3">
            <span>3 of 4 answered</span>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-line">
              <div className="h-full w-3/4 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-ink-3">
        Real lesson UI · not a mockup
      </div>
    </div>
  );
}

function Option({
  letter,
  children,
  selected,
  muted,
}: {
  letter: string;
  children: React.ReactNode;
  selected?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-[var(--r-md)] border px-3 py-2.5 text-sm transition-colors ${
        selected
          ? "border-accent bg-accent-faint text-ink"
          : muted
            ? "border-line bg-paper text-ink-2"
            : "border-line bg-paper text-ink"
      }`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-semibold ${
          selected
            ? "border-accent bg-accent text-accent-ink"
            : "border-line text-ink-3"
        }`}
      >
        {selected ? <CheckSmall /> : letter}
      </span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1v3M6 8v3M1 6h3M8 6h3M2.5 2.5l2 2M7.5 7.5l2 2M2.5 9.5l2-2M7.5 4.5l2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckSmall() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden className="inline-block align-text-bottom">
      <path
        d="m2.5 6 2.5 2.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" className={className} aria-hidden>
      <circle cx="3" cy="3" r="3" fill="currentColor" />
    </svg>
  );
}
