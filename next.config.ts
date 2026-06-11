import type { NextConfig } from "next";
import { TRACK_DEFS } from "./lib/server/content/tracks-definition";

// Permanent redirects from the legacy numeric lesson URLs to the slug-based
// ones (e.g. /track/building/3 -> /track/building/ai-data-analysis-advanced).
// Generated once at config-load time from the curriculum definition.
function buildModuleRedirects() {
  return TRACK_DEFS.flatMap((t) =>
    t.modules.map((m) => ({
      source: `/track/${t.slug}/${m.order}`,
      destination: `/track/${t.slug}/${m.slug}`,
      permanent: true,
    })),
  );
}

const nextConfig: NextConfig = {
  async redirects() {
    return buildModuleRedirects();
  },
};

export default nextConfig;
