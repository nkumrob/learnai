import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/core/site";

export const alt = `${SITE_NAME} - ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          <svg width="64" height="64" viewBox="0 0 96 96">
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
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.5 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1.05, letterSpacing: -2 }}>
            Learn AI, from zero
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            <span>to mastery.&nbsp;</span>
            <span style={{ color: "#63bc9d" }}>Then prove it.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 28,
            fontFamily: "system-ui, sans-serif",
            color: "#a8a294",
          }}
        >
          <span>Free</span>
          <span>·</span>
          <span>5 levels, 50 lessons</span>
          <span>·</span>
          <span>Get certified</span>
        </div>
      </div>
    ),
    size,
  );
}
