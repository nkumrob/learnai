import type { Metadata } from "next";
import { PlacementFlow } from "@/components/PlacementFlow";
import { absoluteUrl, SITE_NAME } from "@/lib/core/site";

const title = "Free AI skill assessment - find your starting level";
const description =
  "A 3-question quiz that places you at the right level in the LearnAI journey. Find out whether to start with AI fundamentals, prompt engineering, productivity, automation, or advanced building.";
const url = absoluteUrl("/placement");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title: `${title} - ${SITE_NAME}`, description, url, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} - ${SITE_NAME}`, description },
};

export default function PlacementPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-20">
      <PlacementFlow />
    </div>
  );
}
