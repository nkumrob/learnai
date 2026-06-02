import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/core/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personalized / private surfaces shouldn't be indexed.
        disallow: ["/api/", "/verify/", "/track/*/certificate"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
