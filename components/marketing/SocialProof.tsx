interface Quote {
  body: string;
  who: string;
  role: string;
}

const FEATURED: Quote = {
  body:
    "I’d done three other AI courses and still couldn’t explain what tokens were. LearnAI’s prompt engineering level was the first thing that actually stuck.",
  who: "Maya R.",
  role: "Product designer",
};

const SUPPORTING: Quote[] = [
  {
    body:
      "The hands-on tasks are what makes it work. By week two I was building automations I’d been putting off for a year.",
    who: "Daniel K.",
    role: "Operations lead",
  },
  {
    body:
      "I sent my verified Level 3 certificate to a recruiter and got an interview the same week.",
    who: "Priya S.",
    role: "Career-switcher",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 grid items-end gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="font-display text-base italic text-ink-3">
            — from learners
          </span>
          <h2 className="display-md mt-2 text-ink">
            Built for people who want to{" "}
            <span className="font-display italic text-accent">use</span> AI.
          </h2>
        </div>
        <p className="text-ink-2 sm:text-right">
          Not &quot;I watched the course.&quot; Actually used the tools on real
          work. Got a credential for it.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Featured */}
        <figure className="card flex flex-col p-8 sm:p-10">
          <QuoteMark />
          <blockquote className="pull-quote mt-5 flex-1">
            {FEATURED.body}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
            <Monogram name={FEATURED.who} />
            <div>
              <div className="font-medium text-ink">{FEATURED.who}</div>
              <div className="text-sm text-ink-3">{FEATURED.role}</div>
            </div>
          </figcaption>
        </figure>

        <div className="grid gap-5">
          {SUPPORTING.map((q) => (
            <figure key={q.who} className="card flex flex-col">
              <blockquote className="text-ink-2 leading-relaxed">
                {q.body}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <Monogram name={q.who} small />
                <div>
                  <div className="text-sm font-medium text-ink">{q.who}</div>
                  <div className="text-xs text-ink-3">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Monogram({ name, small }: { name: string; small?: boolean }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-accent text-accent-ink font-semibold tracking-tight ${
        small ? "h-9 w-9 text-xs" : "h-11 w-11 text-sm"
      }`}
    >
      {initials}
    </span>
  );
}

function QuoteMark() {
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 28 22"
      fill="none"
      className="text-accent"
      aria-hidden
    >
      <path
        d="M0 22V14C0 6.5 4 1.5 12 0v4c-4 1-6 4-6 8h6v10H0Zm16 0V14c0-7.5 4-12.5 12-14v4c-4 1-6 4-6 8h6v10H16Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}
