// Central site identity used across metadata, sitemap, robots, and structured
// data. Override the URL with NEXT_PUBLIC_SITE_URL in non-production envs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://learnai.to";

export const SITE_NAME = "LearnAI";

export const SITE_TAGLINE = "Learn useful AI skills. Then prove it.";

export const SITE_DESCRIPTION =
  "LearnAI is a free, guided journey from AI beginner to capable. Five levels and 50 hands-on lessons cover AI fundamentals, prompt engineering, everyday productivity, automation with Zapier, Make and n8n, and advanced skills like RAG, AI agents, and MCP. Pass each lesson and earn a verifiable certificate. No signup required.";

export const SITE_KEYWORDS = [
  "learn AI",
  "AI course",
  "AI for beginners",
  "prompt engineering",
  "AI automation",
  "n8n",
  "Zapier",
  "Make",
  "RAG",
  "AI agents",
  "MCP",
  "Model Context Protocol",
  "AI certificate",
  "AI skills",
  "ChatGPT course",
  "AI upskilling",
  "free AI course",
];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
