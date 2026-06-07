import { ImageResponse } from "next/og";

/* Brand OG card. System-font only (no network font fetch at build) so
   it stays deterministic; swap for the real brand OG art before launch
   (tracked in PRE-LAUNCH.md). */

export const alt =
  "PartnerMax: the licensed channel for Rogers business products in Canada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(60% 80% at 85% 15%, #2a0000 0%, #0c0d0d 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fe5555",
          }}
        >
          Channel partnership · Rogers-licensed · Canada
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            The licensed channel for
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "#f02121", fontStyle: "italic" }}>
              Canadian
            </span>
            <span>&nbsp;business.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Partner<span style={{ color: "#dd0000" }}>Max</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
