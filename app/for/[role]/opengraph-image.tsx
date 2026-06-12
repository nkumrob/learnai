import { findRole } from "@/lib/core/roles";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/components/og/og-template";

export const alt = "LearnAI role guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const r = findRole(role);
  if (!r) return renderOgImage({ eyebrow: "Role guide", title: "LearnAI" });
  return renderOgImage({
    eyebrow: "Role guide",
    title: r.headline,
    footnote: r.intro.split(".")[0] + ".",
  });
}
