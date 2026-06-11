import type { Metadata } from "next";
import Link from "next/link";
import { getByToken } from "@/lib/server/db/certificates";
import { CertificateCard } from "@/components/CertificateCard";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/core/site";

export const dynamic = "force-dynamic";

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const cert = await getByToken(token);
  const url = absoluteUrl(`/verify/${token}`);
  if (!cert) {
    return {
      title: "Verify a certificate",
      description: "Confirm that a LearnAI certificate is genuine.",
      alternates: { canonical: url },
      robots: { index: false, follow: true },
    };
  }
  const title = `${cert.learnerName}'s ${cert.trackTitle} certificate`;
  const description = `${cert.learnerName} earned the LearnAI ${cert.trackTitle} certificate. Passed every check and completed every hands-on task. Verified by LearnAI.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "profile" },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const cert = await getByToken(token);

  if (!cert) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-danger/40 text-danger">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="mt-5 display-md text-ink">
          We couldn&apos;t verify this
        </h1>
        <p className="mt-3 text-ink-2">
          This link doesn&apos;t match any certificate LearnAI has issued.
        </p>
        <Link href="/" className="btn-primary mt-7">
          Go to LearnAI
        </Link>
      </div>
    );
  }

  const verifyUrl = absoluteUrl(`/verify/${cert.verifyToken}`);
  const credentialJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "@id": verifyUrl,
    name: `${cert.trackTitle} · ${SITE_NAME} Certificate`,
    description: `${cert.learnerName} earned the ${SITE_NAME} ${cert.trackTitle} certificate by passing every quiz (80% threshold) and completing every hands-on task in the level.`,
    url: verifyUrl,
    credentialCategory: "Certificate",
    dateCreated: cert.issuedAt,
    educationalLevel: cert.trackTitle,
    identifier: cert.verifyToken,
    competencyRequired: `Pass every lesson quiz in ${cert.trackTitle} at 80% or higher and complete every hands-on task.`,
    recognizedBy: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    about: {
      "@type": "Course",
      name: cert.trackTitle,
      provider: { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME },
    },
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-12 sm:py-16">
      <JsonLd data={credentialJsonLd} />

      <div className="mb-7 flex items-center gap-3 rounded-[var(--r-lg)] border border-accent/30 bg-accent-faint px-5 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex-1">
          <div className="font-display text-lg font-semibold text-accent">
            Verified
          </div>
          <div className="text-sm text-ink-2">
            This certificate was issued by LearnAI on{" "}
            {DATE_FMT.format(new Date(cert.issuedAt))}.
          </div>
        </div>
      </div>

      <CertificateCard cert={cert} />

      <div className="mt-7 grid gap-3 rounded-[var(--r-lg)] border border-line bg-surface p-5 text-sm sm:grid-cols-2">
        <div>
          <div className="eyebrow text-ink-3">Recipient</div>
          <div className="mt-1 font-medium text-ink">{cert.learnerName}</div>
        </div>
        <div>
          <div className="eyebrow text-ink-3">Credential</div>
          <div className="mt-1 font-medium text-ink">{cert.trackTitle}</div>
        </div>
        <div>
          <div className="eyebrow text-ink-3">Issued</div>
          <div className="mt-1 text-ink">
            {DATE_FMT.format(new Date(cert.issuedAt))}
          </div>
        </div>
        <div>
          <div className="eyebrow text-ink-3">Verification ID</div>
          <div className="mt-1 break-all font-mono text-[11px] text-ink-2">
            {cert.verifyToken}
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-[var(--r-lg)] border border-dashed border-line bg-surface-2/40 p-6">
        <span className="font-display text-base italic text-ink-3">
          ~ what this proves
        </span>
        <p className="mt-2 text-ink-2 leading-relaxed">
          The recipient passed every quiz in <strong>{cert.trackTitle}</strong>{" "}
          at 80% or higher AND self-attested completion of every hands-on task.
          LearnAI is a free, public AI education platform with verifiable
          credentials.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          About LearnAI →
        </Link>
      </section>
    </div>
  );
}
