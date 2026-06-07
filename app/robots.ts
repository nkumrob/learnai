import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/core/site";

// Search / retrieval bots that surface LearnAI in AI answers — allow these.
// (ChatGPT Search, Claude Sonar, Perplexity, Mistral Le Chat, Apple, DuckDuckGo, Bing.)
const ALLOW_AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "MistralAI-User",
  "Applebot",
  "DuckAssistBot",
  "Bingbot",
];

// Training crawlers — block these. LearnAI's value to AI assistants is being
// cited live, not absorbed silently into training corpora.
const BLOCK_AI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api stays private. Cert issuance is per-session; only the public
        // /verify/[token] surface is indexable (handled below).
        disallow: ["/api/", "/track/*/certificate"],
      },
      ...ALLOW_AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...BLOCK_AI_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
