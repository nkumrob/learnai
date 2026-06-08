import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/server/session";
import { getDashboardData } from "@/lib/server/dashboard";
import { Greeting } from "@/components/dashboard/Greeting";
import { ContinueCard } from "@/components/dashboard/ContinueCard";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { JourneyPath } from "@/components/dashboard/JourneyPath";
import { UpNextList } from "@/components/dashboard/UpNextList";
import { CertificateGallery } from "@/components/dashboard/CertificateGallery";
import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";
import { WelcomeBackBanner } from "@/components/dashboard/WelcomeBackBanner";
import { AccountBadge } from "@/components/dashboard/AccountBadge";
import { SignedInToast } from "@/components/dashboard/SignedInToast";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: "Your LearnAI dashboard — streak, progress, and what's next.",
  robots: { index: false, follow: false },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ signed_in?: string }>;
}) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }

  const data = await getDashboardData(session);
  const { signed_in } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <div className="mb-4 flex items-center justify-end">
        <AccountBadge
          email={session.email}
          signedIn={!!session.accountId}
        />
      </div>

      {signed_in === "1" && <SignedInToast email={session.email} />}

      {data.isFirstVisit ? (
        <EmptyDashboard
          journey={data.journey}
          currentLevel={data.currentLevel}
        />
      ) : (
        <>
          <WelcomeBackBanner days={data.daysSinceLastSeen} />

          <Greeting
            isFirstVisit={false}
            daysSinceLastSeen={data.daysSinceLastSeen}
            resumeMinutes={data.resume?.estMinutes ?? null}
          />

          {data.resume && (
            <div className="mb-10">
              <ContinueCard resume={data.resume} />
            </div>
          )}

          <div className="mb-12">
            <StatTiles stats={data.stats} />
          </div>

          <div className="mb-14">
            <JourneyPath
              journey={data.journey}
              currentLevel={data.currentLevel}
            />
          </div>

          {data.upNext.length > 0 && (
            <div className="mb-14">
              <UpNextList items={data.upNext} />
            </div>
          )}

          <CertificateGallery certs={data.certs} />
        </>
      )}
    </div>
  );
}
