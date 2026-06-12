import { findToolHub } from "@/lib/core/tool-hubs";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/og/og-template";

export const alt = "LearnAI tool guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const hub = findToolHub(tool);
  if (!hub) return renderOgImage({ eyebrow: "Tool guide", title: "LearnAI" });
  return renderOgImage({
    eyebrow: "Tool guide",
    title: `Learn ${hub.name}, free`,
    footnote: hub.tagline,
  });
}
