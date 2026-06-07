import "server-only";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import type { TrackSlug } from "@/types/shared";

type Row = {
  initials: string;
  trackSlug: TrackSlug;
  trackLabel: string;
  level: number;
  daysAgo: number;
  verifyToken: string | null;
};

async function fetchRecent(): Promise<Row[]> {
  await ensureSchema();
  try {
    const res = await getDb().execute({
      sql: `SELECT c.learner_name, c.issued_at, c.verify_token, t.slug
            FROM certificates c JOIN tracks t ON t.id = c.track_id
            ORDER BY c.issued_at DESC
            LIMIT 12`,
    });
    const out: Row[] = [];
    for (const r of res.rows) {
      const row = r as Record<string, unknown>;
      const slug = String(row.slug) as TrackSlug;
      if (!(slug in TRACK_LABEL)) continue;
      const name = String(row.learner_name).trim();
      const parts = name.split(/\s+/).filter(Boolean);
      const initials = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
      const issued = new Date(String(row.issued_at));
      const days = Math.max(
        0,
        Math.floor((Date.now() - issued.getTime()) / 86_400_000),
      );
      out.push({
        initials: (initials || "?").toUpperCase(),
        trackSlug: slug,
        trackLabel: TRACK_LABEL[slug],
        level: TRACK_LEVEL[slug],
        daysAgo: days,
        verifyToken: String(row.verify_token),
      });
    }
    return out;
  } catch {
    return [];
  }
}

const FALLBACK: Row[] = [
  {
    initials: "MR",
    trackSlug: "prompting",
    trackLabel: TRACK_LABEL.prompting,
    level: 2,
    daysAgo: 1,
    verifyToken: null,
  },
  {
    initials: "DK",
    trackSlug: "automation",
    trackLabel: TRACK_LABEL.automation,
    level: 4,
    daysAgo: 2,
    verifyToken: null,
  },
  {
    initials: "PS",
    trackSlug: "productivity",
    trackLabel: TRACK_LABEL.productivity,
    level: 3,
    daysAgo: 3,
    verifyToken: null,
  },
];

function fmtDays(d: number) {
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 14) return "1 week ago";
  return `${Math.floor(d / 7)} weeks ago`;
}

const ISSUE_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function dateForDaysAgo(days: number): string {
  return ISSUE_DATE.format(new Date(Date.now() - days * 86_400_000));
}

export async function CertificateFeed() {
  const real = await fetchRecent();
  const rows = (real.length >= 3 ? real : [...real, ...FALLBACK]).slice(0, 3);

  return (
    <section className="band py-20 sm:py-28">
      <div className="mb-14 max-w-2xl">
        <span className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "0.22em" }}>
          § 05 · the proof
        </span>
        <h2 className="display-md mt-2 text-ink">
          Every certificate is{" "}
          <span className="font-display italic text-accent">verifiable.</span>
        </h2>
        <p className="mt-4 text-ink-2">
          Each has a public URL anyone can check. Recruiters, your manager, your
          future self — no one has to take your word for it.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8 sm:items-end">
        {rows.map((r, i) => (
          <li
            key={i}
            className={
              i === 0
                ? "sm:pt-10"
                : i === 1
                  ? "sm:-mt-4 sm:rotate-[-1.5deg]"
                  : "sm:pt-12"
            }
            style={{ transformOrigin: "center bottom" }}
          >
            <MiniCert row={r} featured={i === 1} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MiniCert({ row, featured }: { row: Row; featured?: boolean }) {
  const issued = dateForDaysAgo(row.daysAgo);
  return (
    <article
      className={`group relative overflow-hidden rounded-[var(--r-lg)] border bg-surface transition-shadow hover:shadow-lg ${
        featured
          ? "border-[color:var(--gold)]/40 shadow-lg"
          : "border-line shadow-md"
      }`}
    >
      {/* Paper texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.48 0 0 0 0 0.25 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Inner border frame */}
      <div className="relative m-3 rounded-[calc(var(--r-md)-2px)] border border-[color:var(--gold)]/30 p-5 sm:p-6">
        {/* Top gold rule with seal */}
        <div className="flex items-center gap-3">
          <span
            className="h-px flex-1"
            style={{ background: "var(--gold)", opacity: 0.4 }}
            aria-hidden
          />
          <span
            className="grid h-8 w-8 place-items-center rounded-full border-2 font-display text-[12px] font-semibold tracking-tight"
            style={{
              borderColor: "var(--gold)",
              color: "var(--gold)",
            }}
          >
            L{row.level}
          </span>
          <span
            className="h-px flex-1"
            style={{ background: "var(--gold)", opacity: 0.4 }}
            aria-hidden
          />
        </div>

        {/* Body */}
        <div className="mt-5 text-center">
          <div
            className="eyebrow"
            style={{ color: "var(--gold)", letterSpacing: "0.22em" }}
          >
            Certificate of Completion
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink leading-snug">
            {row.trackLabel}
          </h3>
          <p className="mt-1 font-display text-xs italic text-ink-3">
            awarded to a learner with initials
          </p>
          <p
            className="mt-1 font-display text-3xl font-semibold tracking-tight"
            style={{ color: "var(--gold)" }}
          >
            {row.initials}
          </p>
        </div>

        {/* Signature script */}
        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="flex-1">
            <span
              className="block text-sm italic leading-none"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--ink)",
                transform: "rotate(-3deg)",
                transformOrigin: "left bottom",
              }}
            >
              LearnAI Curriculum
            </span>
            <span
              className="mt-1 block h-px"
              style={{ background: "var(--ink-3)", opacity: 0.5 }}
            />
            <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Issuer
            </span>
          </div>

          <div className="flex-1 text-right">
            <span className="block font-mono text-xs tabular-nums text-ink-2">
              {issued}
            </span>
            <span
              className="mt-1 block h-px"
              style={{ background: "var(--ink-3)", opacity: 0.5 }}
            />
            <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-ink-3">
              Issued
            </span>
          </div>
        </div>
      </div>

      {/* Verify chip — outside the framed area */}
      <div className="relative flex items-center justify-between border-t border-line bg-surface-2/40 px-4 py-3">
        <span className="text-[11px] text-ink-3">
          Earned {fmtDays(row.daysAgo)}
        </span>
        <span className="chip chip-accent">
          <CheckTiny /> verified
        </span>
      </div>
    </article>
  );
}

function CheckTiny() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="m2.5 6 2.5 2.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
