import "server-only";
import { getDb } from "@/lib/server/db/client";
import { ensureSchema } from "@/lib/server/db/schema";
import { TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import type { TrackSlug } from "@/types/shared";

type Row = {
  name: string;
  trackSlug: TrackSlug;
  trackLabel: string;
  level: number;
  daysAgo: number;
  verifyToken: string | null;
};

function titleCaseName(raw: string): string {
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
      const name = titleCaseName(String(row.learner_name).trim());
      // Never surface seed/demo learners as public social proof.
      if (!name || /\b(demo|test|sample|example)\b/i.test(name)) continue;
      const issued = new Date(String(row.issued_at));
      const days = Math.max(
        0,
        Math.floor((Date.now() - issued.getTime()) / 86_400_000),
      );
      out.push({
        name,
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

const FALLBACK: Row = {
  name: "Michael Carter",
  trackSlug: "prompting",
  trackLabel: TRACK_LABEL.prompting,
  level: 2,
  daysAgo: 1,
  verifyToken: null,
};

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
  const row = real[0] ?? FALLBACK;

  return (
    <section className="band py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <span className="eyebrow" style={{ color: "var(--gold)", letterSpacing: "0.22em" }}>
            § 05 · the proof
          </span>
          <h2 className="display-md mt-2 text-ink">
            Every certificate is{" "}
            <span className="font-display italic text-accent">verifiable.</span>
          </h2>
          <p className="mt-4 text-ink-2">
            Each one has a public URL anyone can check. Recruiters, your
            manager, your future self. No one has to take your word for it.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <MiniCert row={row} featured />
        </div>
      </div>
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
            className="grid h-9 w-9 place-items-center rounded-full border"
            style={{
              borderColor: "color-mix(in srgb, var(--gold) 60%, transparent)",
              color: "var(--gold)",
            }}
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6 9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Awarded to
          </p>
          <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink leading-tight">
            {row.name}
          </p>
          <p className="mt-3 text-xs text-ink-2">for completing the track</p>
          <h3 className="mt-1 font-display text-base font-semibold tracking-tight text-accent leading-snug">
            {row.trackLabel}
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Level {row.level}
          </p>
        </div>

        {/* Footer: issuer + date */}
        <div className="mt-6 flex items-end justify-between gap-3">
          <div className="flex-1">
            <span className="block font-display text-sm font-semibold tracking-tight text-ink leading-none">
              LearnAI
            </span>
            <span
              className="mt-1.5 block h-px"
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
              className="mt-1.5 block h-px"
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
