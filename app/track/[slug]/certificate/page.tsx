import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getTrackBySlug } from "@/lib/server/db/tracks";
import { isTrackPassed } from "@/lib/server/db/progress";
import { getForSessionTrack } from "@/lib/server/db/certificates";
import { isTrackSlug } from "@/lib/core/track-meta";
import { CertificateClaim } from "@/components/CertificateClaim";

export const dynamic = "force-dynamic";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isTrackSlug(slug)) notFound();

  const session = await getCurrentSession();
  if (!session) notFound();

  const track = await getTrackBySlug(slug);
  if (!track) notFound();

  const passed = await isTrackPassed(session.id, track.id);
  if (!passed) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-line text-ink-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="mt-5 font-display text-2xl font-medium">Not yet certified</h1>
        <p className="mt-2 text-ink-2">
          Finish every module in {track.title} to claim your certificate.
        </p>
        <Link
          href={`/track/${slug}`}
          className="mt-7 inline-block rounded-[var(--r-md)] bg-accent px-6 py-3 font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Back to track
        </Link>
      </div>
    );
  }

  const existing = await getForSessionTrack(session.id, track.id);

  return (
    <div className="mx-auto max-w-xl px-5 py-12 sm:py-16">
      <Link
        href={`/track/${slug}`}
        className="no-print text-sm text-ink-3 transition-colors hover:text-ink"
      >
        ← {track.title}
      </Link>
      <p className="no-print eyebrow mt-6">You earned this</p>
      <h1 className="no-print mt-2 font-display text-4xl font-medium tracking-tight">
        Your certificate
      </h1>
      <p className="no-print mt-3 text-ink-2">
        Add your name, then download or share it. Anyone with the verification
        link can confirm it&apos;s genuine.
      </p>

      <div className="mt-8">
        <CertificateClaim trackSlug={slug} initialCert={existing} />
      </div>
    </div>
  );
}
