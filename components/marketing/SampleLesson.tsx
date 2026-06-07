import Link from "next/link";

export function SampleLesson() {
  return (
    <section
      id="sample-lesson"
      className="scroll-mt-24 border-t border-line py-16 sm:py-24"
    >
      <div className="mb-12 grid items-end gap-6 sm:grid-cols-[1.4fr_1fr] sm:gap-12">
        <div>
          <span className="font-display text-base italic text-ink-3">
            ~ a lesson, end to end
          </span>
          <h2 className="display-md mt-2 text-ink">
            Read.{" "}
            <span className="font-display italic text-accent">Try it.</span>{" "}
            Check.
          </h2>
        </div>
        <p className="text-ink-2 sm:text-right">
          Every lesson takes five to eight minutes — a short read, one small
          hands-on task, and a four-question quiz. Pass at 80% to unlock the
          next one.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        {/* Left: the read view */}
        <article className="card group flex flex-col overflow-hidden p-0">
          <div className="border-b border-line bg-paper px-6 py-4">
            <div className="flex items-center justify-between text-[12px] text-ink-3">
              <span className="eyebrow">Lesson 03 · Foundations</span>
              <span className="tabular-nums">6 min read</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              How language models actually predict
            </h3>
          </div>
          <div className="flex-1 px-6 py-6 leading-relaxed text-ink-2">
            <p>
              A language model doesn&apos;t look up answers. It predicts the
              next most likely token — a chunk of text — given everything that
              came before. That single mechanism, repeated thousands of times
              per response, is what makes ChatGPT feel like a thinker.
            </p>
            <aside className="mt-5 rounded-[var(--r-md)] border-l-2 border-accent bg-accent-faint/60 px-4 py-3">
              <span className="font-semibold text-accent">Key idea —</span>{" "}
              <span className="text-ink">
                Models don&apos;t reason. They predict. Most failure modes
                follow from that one fact.
              </span>
            </aside>
          </div>
          <div className="flex items-center justify-between border-t border-line bg-paper px-6 py-3 text-xs text-ink-3">
            <span className="inline-flex items-center gap-1.5">
              <PlayIcon /> Listen
            </span>
            <span className="inline-flex items-center gap-3">
              <span className="tabular-nums">64%</span>
              <span className="h-1 w-24 overflow-hidden rounded-full bg-line">
                <span className="block h-full w-[64%] rounded-full bg-accent" />
              </span>
            </span>
          </div>
        </article>

        {/* Right: the check view */}
        <article className="card flex flex-col overflow-hidden p-0">
          <div className="border-b border-line bg-paper px-6 py-4">
            <div className="flex items-center justify-between text-[12px] text-ink-3">
              <span className="eyebrow">Check · Question 4 of 4</span>
              <span className="chip chip-sky">80% to pass</span>
            </div>
            <p className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
              Why do language models sometimes invent confident-sounding facts?
            </p>
          </div>
          <div className="flex-1 space-y-2.5 px-6 py-6">
            <SampleOption letter="A">
              They run out of memory mid-sentence.
            </SampleOption>
            <SampleOption letter="B" selected>
              They predict the next likely token, not the next true fact.
            </SampleOption>
            <SampleOption letter="C">
              They&apos;re trained only on fiction.
            </SampleOption>
            <SampleOption letter="D">
              They cache outdated answers.
            </SampleOption>

            <div className="mt-5 flex items-center justify-between rounded-[var(--r-md)] bg-positive-faint px-4 py-3 text-sm">
              <span className="inline-flex items-center gap-2 text-positive">
                <CheckIcon /> Correct
              </span>
              <span className="text-ink-2">
                +1 — that&apos;s the whole game.
              </span>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-md text-sm text-ink-2">
          That&apos;s lesson 3 of 10 in Level 1. You&apos;ll do nine more like
          it, then earn your first certificate.
        </p>
        <Link
          href="/placement"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Try a real lesson{" "}
          <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

function SampleOption({
  letter,
  selected,
  children,
}: {
  letter: string;
  selected?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-[var(--r-md)] border px-3.5 py-3 text-sm transition-colors ${
        selected
          ? "border-positive bg-positive-faint text-ink"
          : "border-line bg-paper text-ink-2"
      }`}
    >
      <span
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
          selected
            ? "border-positive bg-positive text-accent-ink"
            : "border-line text-ink-3"
        }`}
      >
        {selected ? <CheckIcon /> : letter}
      </span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 2.5v7l6-3.5z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="m3 8 3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
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
