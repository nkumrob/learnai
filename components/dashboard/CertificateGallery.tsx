import Link from "next/link";
import type { DashboardCert } from "@/lib/server/dashboard";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function CertificateGallery({
  certs,
  totalLevels = 5,
}: {
  certs: DashboardCert[];
  totalLevels?: number;
}) {
  if (certs.length === 0) {
    return (
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold tracking-tight text-ink">
          Certificates
        </h2>
        <div className="card flex flex-col items-start gap-2 border-dashed bg-surface-2/30 p-7">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Your first certificate is{" "}
            <span className="italic text-accent">
              {totalLevels} levels away
            </span>
            .
          </span>
          <p className="mt-1 text-ink-2">
            Each level you finish earns a verifiable certificate with a public
            URL.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
          Certificates earned
        </h2>
        <span className="font-display text-sm italic text-ink-3">
          {certs.length} of {totalLevels}
        </span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {certs.map((c) => (
          <li key={c.id}>
            <CertMini cert={c} />
          </li>
        ))}
        {/* Show locked placeholders for remaining levels */}
        {Array.from({ length: totalLevels - certs.length }).map((_, i) => {
          const lockedLevel = certs.length + i + 1;
          return (
            <li key={`locked-${i}`}>
              <LockedSlot level={lockedLevel} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function CertMini({ cert }: { cert: DashboardCert }) {
  return (
    <Link
      href={`/verify/${cert.verifyToken}`}
      className="group block overflow-hidden rounded-[var(--r-lg)] border border-line bg-surface transition-shadow hover:shadow-md"
    >
      <div className="relative px-5 pb-4 pt-5 text-center">
        {/* gold rules */}
        <div
          aria-hidden
          className="absolute inset-x-4 top-2 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-4 bottom-1 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
            opacity: 0.5,
          }}
        />
        <span
          className="eyebrow"
          style={{ color: "var(--gold)", letterSpacing: "0.22em" }}
        >
          Level {cert.level}
        </span>
        <h3 className="mt-2 font-display text-base font-semibold leading-tight tracking-tight text-ink">
          {cert.trackLabel}
        </h3>
        <p
          className="mt-2 font-display text-xl italic"
          style={{ color: "var(--gold)" }}
        >
          ✓
        </p>
        <p className="mt-1 text-[11px] text-ink-3 tabular-nums">
          {DATE_FMT.format(new Date(cert.issuedAt))}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-surface-2/40 px-4 py-2.5 text-xs">
        <span className="text-ink-3">Verify →</span>
        <span className="chip chip-accent">verified</span>
      </div>
    </Link>
  );
}

function LockedSlot({ level }: { level: number }) {
  return (
    <div className="relative grid h-full place-items-center overflow-hidden rounded-[var(--r-lg)] border border-dashed border-line bg-surface-2/20 px-5 py-6 text-center">
      <div>
        <span className="font-display text-xl font-semibold text-ink-3 tabular-nums">
          {`0${level}`.slice(-2)}
        </span>
        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-3">
          on the path
        </p>
      </div>
    </div>
  );
}
