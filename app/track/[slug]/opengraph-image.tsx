import { isTrackSlug, TRACK_LABEL, TRACK_LEVEL, TRACK_TIER } from "@/lib/core/track-meta";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/og/og-template";

export const alt = "LearnAI track";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isTrackSlug(slug)) return renderOgImage({ eyebrow: "Track", title: "LearnAI" });
  const trackDef = TRACK_DEFS.find((t) => t.slug === slug);
  if (!trackDef) return renderOgImage({ eyebrow: "Track", title: "LearnAI" });
  return renderOgImage({
    eyebrow: `Level ${TRACK_LEVEL[slug]} · ${TRACK_TIER[slug]}`,
    title: TRACK_LABEL[slug],
    footnote: `${trackDef.modules.length} lessons · Free · Verifiable certificate`,
  });
}
