interface FAQItem {
  q: string;
  a: string;
  tag: "Pricing" | "Format" | "Certificate" | "Onboarding" | "Progress" | "About";
}

const ITEMS: FAQItem[] = [
  {
    q: "Is LearnAI really free?",
    a: "Yes. All 50 lessons, all 5 certificates, no signup. We may add an optional supporter tier later, but the full curriculum will stay free.",
    tag: "Pricing",
  },
  {
    q: "How long does each lesson take?",
    a: "Five to ten minutes. A short read, one hands-on task you do in ChatGPT, Claude, or another AI tool, and a 4-question quiz. Easy to fit into a coffee break.",
    tag: "Format",
  },
  {
    q: "Do I need any prior experience?",
    a: "No. The placement quiz routes complete beginners to Level 1 (AI Foundations) and people with some experience to where they’ll actually learn something new. Automation and productivity levels are no-code.",
    tag: "Onboarding",
  },
  {
    q: "What’s the certificate worth?",
    a: "Each certificate is issued with a public verification link anyone can check. It’s not accredited by a university, but it proves you’ve passed every quiz and completed every task at that level — which is more than most AI credentials.",
    tag: "Certificate",
  },
  {
    q: "What if I close the tab — do I lose progress?",
    a: "No. Your progress is tied to a cookie, and you can drop an email after your first quiz so we can email you a resume link if cookies clear or you switch devices.",
    tag: "Progress",
  },
  {
    q: "Why is it called LearnAI?",
    a: "Because that’s literally what you’ll do. We figured the name should match the brief.",
    tag: "About",
  },
];

export function FAQ() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mb-12 grid items-end gap-6 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="eyebrow tabular-nums text-ink-3">§ 06 — questions</span>
          <h2 className="display-md mt-2 text-ink">
            Quick answers.{" "}
            <span className="font-display italic text-accent">No fine print.</span>
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface">
        {ITEMS.map((item, i) => (
          <details
            key={i}
            className={`group relative border-l-2 border-transparent transition-colors hover:bg-surface-2/40 hover:border-accent ${
              i > 0 ? "border-t border-t-line" : ""
            }`}
          >
            <summary className="flex list-none items-center justify-between gap-4 py-5 pl-5 pr-4 sm:py-6 sm:pl-7 sm:pr-6">
              <span className="flex-1 font-medium text-ink sm:text-[17px]">
                {item.q}
              </span>
              <span className="hidden sm:inline-block">
                <span className="chip text-ink-3">{item.tag}</span>
              </span>
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-base text-ink-2 transition-all group-open:rotate-45 group-open:bg-accent group-open:text-accent-ink"
              >
                +
              </span>
            </summary>
            <div className="pb-6 pl-5 pr-12 text-ink-2 leading-relaxed sm:pl-7">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
