import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/core/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

interface OgTemplateOptions {
  /** Small text above the title (e.g. "Lesson · Level 2 — Prompt Engineering"). */
  eyebrow: string;
  /** Big title — typically the page's H1. */
  title: string;
  /** Small line at the bottom (e.g. "By the end you'll be able to …"). */
  footnote?: string;
}

export function renderOgImage({ eyebrow, title, footnote }: OgTemplateOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14130f",
          padding: "72px",
          color: "#f2efe6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 96 96">
            <rect width="96" height="96" rx="22" fill="#63bc9d" />
            <g
              fill="none"
              stroke="#0e1a14"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M48 24 L73 72 L23 72 Z" />
              <path d="M36 57 H60" />
            </g>
          </svg>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1.2 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              color: "#63bc9d",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 70, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            fontSize: 26,
            fontFamily: "system-ui, sans-serif",
            color: "#a8a294",
            display: "flex",
          }}
        >
          {footnote ?? "Free · Hands-on · Verifiable certificate"}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
