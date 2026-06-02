import Link from "next/link";
import { getByToken } from "@/lib/server/db/certificates";
import { CertificateCard } from "@/components/CertificateCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Verify a certificate",
  description: "Confirm that a LearnAI certificate is genuine.",
  robots: { index: false, follow: true },
};

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
        <h1 className="mt-5 font-display text-2xl font-medium">
          We couldn&apos;t verify this
        </h1>
        <p className="mt-2 text-ink-2">
          This link doesn&apos;t match any certificate LearnAI has issued.
        </p>
        <Link
          href="/"
          className="mt-7 inline-block rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Go to LearnAI
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-12 sm:py-16">
      <div className="mb-7 flex items-center gap-3 rounded-[var(--r-md)] border border-accent/30 bg-accent-faint px-4 py-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="text-sm">
          <span className="font-medium text-accent">Verified.</span>{" "}
          <span className="text-ink-2">This certificate was issued by LearnAI.</span>
        </div>
      </div>

      <CertificateCard cert={cert} />

      <p className="mt-5 text-center text-sm text-ink-3">
        Verification ID <span className="font-mono text-ink-2">{cert.verifyToken}</span>
      </p>
    </div>
  );
}
