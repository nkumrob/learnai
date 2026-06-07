import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/core/site";
import { TRACK_DEFS } from "@/lib/server/content/tracks-definition";
import { listAllCerts } from "@/lib/server/db/certificates";

// Tool hub, comparison, and role page slugs — kept in sync with their data
// modules so adding a new hub auto-publishes to the sitemap.
import { TOOL_SLUGS } from "@/lib/core/tool-hubs";
import { COMPARISON_SLUGS } from "@/lib/core/comparisons";
import { ROLE_SLUGS } from "@/lib/core/roles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastMod: Date | string = now,
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastMod,
    changeFrequency,
    priority,
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry("/", 1.0, "weekly"),
    entry("/placement", 0.8, "monthly"),
    entry("/about", 0.6, "monthly"),
  ];

  const tracks: MetadataRoute.Sitemap = TRACK_DEFS.map((t) =>
    entry(`/track/${t.slug}`, 0.9, "weekly"),
  );

  const modules: MetadataRoute.Sitemap = TRACK_DEFS.flatMap((t) =>
    t.modules.map((m) => entry(`/track/${t.slug}/${m.order}`, 0.7, "weekly")),
  );

  const tools: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) =>
    entry(`/tools/${slug}`, 0.7, "monthly"),
  );

  const comparisons: MetadataRoute.Sitemap = COMPARISON_SLUGS.map((slug) =>
    entry(`/compare/${slug}`, 0.6, "monthly"),
  );

  const roles: MetadataRoute.Sitemap = ROLE_SLUGS.map((slug) =>
    entry(`/for/${slug}`, 0.6, "monthly"),
  );

  // Public certificate verification pages — each shared cert is a backlink
  // when posted on LinkedIn. Lower priority; freshness comes from issuedAt.
  let certs: MetadataRoute.Sitemap = [];
  try {
    const all = await listAllCerts();
    certs = all.map((c) =>
      entry(`/verify/${c.verifyToken}`, 0.3, "yearly", c.issuedAt),
    );
  } catch {
    // DB unreachable at build time — skip cert URLs rather than fail the build.
    certs = [];
  }

  return [
    ...staticPages,
    ...tracks,
    ...modules,
    ...tools,
    ...comparisons,
    ...roles,
    ...certs,
  ];
}
