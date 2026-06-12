import { isTrackSlug, TRACK_LABEL, TRACK_LEVEL } from "@/lib/core/track-meta";
import { findModuleBySlug, TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/og/og-template";

export const alt = "LearnAI lesson";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; moduleSlug: string }>;
}) {
  const { slug, moduleSlug } = await params;
  if (!isTrackSlug(slug)) return renderOgImage({ eyebrow: "Lesson", title: "LearnAI" });
  const m = findModuleBySlug(slug, moduleSlug);
  if (!m) return renderOgImage({ eyebrow: "Lesson", title: "LearnAI" });
  return renderOgImage({
    eyebrow: `Lesson · Level ${TRACK_LEVEL[slug]} — ${TRACK_LABEL[slug]}`,
    title: m.title,
    footnote: `By the end: ${m.outcome}`,
  });
}
