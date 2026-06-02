import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/core/site";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry("/", 1.0, "weekly"),
    entry("/placement", 0.8, "monthly"),
  ];

  const tracks: MetadataRoute.Sitemap = TRACK_DEFS.map((t) =>
    entry(`/track/${t.slug}`, 0.9, "monthly"),
  );

  const modules: MetadataRoute.Sitemap = TRACK_DEFS.flatMap((t) =>
    t.modules.map((m) => entry(`/track/${t.slug}/${m.order}`, 0.7)),
  );

  return [...staticPages, ...tracks, ...modules];
}
