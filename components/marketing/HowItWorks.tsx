export function HowItWorks() {
  return (
    <section className="band py-16 sm:py-24">
      <div className="mb-14 grid items-end gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="eyebrow font-display italic" style={{ letterSpacing: "0.02em", textTransform: "none", fontSize: "0.95rem" }}>
            ~ the rhythm
          </span>
          <h2 className="display-md mt-2 text-ink">
            Three small habits.{" "}
            <span className="font-display italic text-accent">Real skill.</span>
          </h2>
        </div>
        <p className="text-ink-2 sm:text-right">
          Most courses ask you to watch. This one asks you to do. The whole
          thing is built around one tight loop, repeated 50 times.
        </p>
      </div>

      <div className="relative">
        {/* The connecting line — runs through the numeral row */}
        <svg
          className="absolute left-0 right-0 top-[28px] hidden h-px w-full sm:block"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="10"
            y1="0.5"
            x2="90"
            y2="0.5"
            stroke="var(--line-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="relative grid gap-12 sm:grid-cols-[1fr_1.2fr_1fr] sm:gap-10 sm:items-start">
          <Step
            n={1}
            tint="sky"
            label="Find your level"
            detail="A 30-second placement quiz routes you to the level that fits — no starting from chapter one if you don't need to."
            align="left"
          />
          <Step
            n={2}
            tint="accent"
            label="Read · Try · Check"
            detail="Five-minute read, one small thing to do with AI, four-question quiz. Pass at 80% to unlock the next lesson. Repeat."
            align="center"
            featured
          />
          <Step
            n={3}
            tint="sun"
            label="Earn the certificate"
            detail="Finish all 10 lessons in a level, get a certificate with a public verification link. Add it to LinkedIn."
            align="right"
          />
        </ol>
      </div>
    </section>
  );
}

function Step({
  n,
  tint,
  label,
  detail,
  align,
  featured,
}: {
  n: number;
  tint: "sky" | "accent" | "sun";
  label: string;
  detail: string;
  align: "left" | "center" | "right";
  featured?: boolean;
}) {
  const map = {
    sky: { bg: "bg-sky-soft", text: "text-sky-ink", ring: "border-sky/30" },
    accent: {
      bg: "bg-accent",
      text: "text-accent-ink",
      ring: "border-accent",
    },
    sun: { bg: "bg-sun-soft", text: "text-sun-ink", ring: "border-sun/30" },
  } as const;
  const t = map[tint];
  const alignCls = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right sm:items-end sm:text-right",
  }[align];
  return (
    <li className={`flex flex-col ${alignCls}`}>
      <span
        className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 ${t.bg} ${t.text} ${t.ring} font-display text-xl font-semibold tabular-nums shadow-sm`}
      >
        {n}
      </span>
      <h3
        className={`mt-5 font-display font-semibold tracking-tight text-ink ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        {label}
      </h3>
      <p
        className={`mt-2 text-ink-2 ${
          featured ? "max-w-sm" : "max-w-xs"
        }`}
      >
        {detail}
      </p>
    </li>
  );
}
