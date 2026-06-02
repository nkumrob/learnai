import type { Certificate } from "@/types/shared";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Formal, print-worthy certificate. Restrained gold foil; works on white. */
export function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--r-lg)] border border-line-strong bg-surface shadow-lg">
      {/* Inner ruled frame */}
      <div className="m-2.5 rounded-[var(--r-md)] border border-[color:var(--gold)]/40 px-8 py-12 text-center sm:px-14 sm:py-16">
        <div className="font-display text-lg tracking-tight">LearnAI</div>
        <div className="mx-auto mt-1 h-px w-10 bg-[color:var(--gold)]/50" />

        <div className="eyebrow mt-8 text-ink-3">Certificate of Completion</div>

        <p className="mt-7 text-sm text-ink-2">This certifies that</p>
        <div className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {cert.learnerName}
        </div>

        <p className="mt-6 text-sm text-ink-2">has completed the track</p>
        <div className="mt-1 font-display text-xl font-medium text-accent">
          {cert.trackTitle}
        </div>

        {/* Seal */}
        <div className="mx-auto mt-9 grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)]/60 text-[color:var(--gold)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-9 flex items-center justify-center gap-10 text-sm">
          <div>
            <div className="font-medium">{formatDate(cert.issuedAt)}</div>
            <div className="eyebrow mt-1 text-ink-3">Issued</div>
          </div>
          <div className="h-9 w-px bg-line" />
          <div>
            <div className="font-mono text-xs">{cert.verifyToken.slice(0, 12)}</div>
            <div className="eyebrow mt-1 text-ink-3">Verify ID</div>
          </div>
        </div>
      </div>
    </div>
  );
}
