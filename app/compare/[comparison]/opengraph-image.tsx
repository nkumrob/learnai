import { findComparison } from "@/lib/core/comparisons";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/og/og-template";

export const alt = "LearnAI comparison";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ comparison: string }>;
}) {
  const { comparison } = await params;
  const c = findComparison(comparison);
  if (!c) return renderOgImage({ eyebrow: "Comparison", title: "LearnAI" });
  return renderOgImage({
    eyebrow: "Comparison",
    title: c.headline,
    footnote: c.intro.split(".")[0] + ".",
  });
}
