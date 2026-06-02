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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="68" height="68" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="120" fill="#63bc9d" />
            <path
              d="M150 144 H292 V172 H254 V306 H364 V376 H150 V306 H188 V172 H150 Z"
              fill="#0e1a14"
            />
          </svg>
          <div style={{ fontSize: 34, letterSpacing: -1 }}>{SITE_NAME}</div>
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
