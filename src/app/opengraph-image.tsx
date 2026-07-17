import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E1A2B",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(24,178,222,0.25) 0%, rgba(14,26,43,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <span style={{ color: "#0E1A2B", fontWeight: 900, fontSize: 44, letterSpacing: -1 }}>
              DIGI
            </span>
            <span
              style={{
                background: "#18b2de",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 40,
                padding: "6px 12px",
                borderRadius: 8,
                marginLeft: 10,
              }}
            >
              HACK
            </span>
          </div>
        </div>
        <div style={{ display: "flex", color: "#ffffff", fontSize: 54, fontWeight: 900, letterSpacing: -1 }}>
          Epitom Beyond The Concept.
        </div>
        <div style={{ display: "flex", color: "#8fa3bb", fontSize: 26, marginTop: 20 }}>
          Software · Digital Marketing · Sri Lanka & USA
        </div>
      </div>
    ),
    { ...size }
  );
}
