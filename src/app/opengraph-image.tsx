import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SuperStatus — Automated WhatsApp Status, Every Day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#141413",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: "#25D366",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#141413",
                lineHeight: 1,
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            SuperStatus
          </span>
          <div
            style={{
              marginLeft: 12,
              backgroundColor: "#FFCB47",
              borderRadius: 9999,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 900, color: "#141413" }}>
              Early Access
            </span>
          </div>
        </div>

        {/* Main headline — two lines via flex column instead of <br /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-2.5px",
            }}
          >
            Show up every day.
          </span>
          <span
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#25D366",
              lineHeight: 1.0,
              letterSpacing: "-2.5px",
            }}
          >
            Automatically.
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 500,
            maxWidth: 720,
            lineHeight: 1.4,
            marginBottom: 52,
            display: "flex",
          }}
        >
          WhatsApp Status automation for Nigerian creators, freelancers &amp;
          business owners.
        </div>

        {/* Bottom pills */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {["Posts in your voice", "Works while phone is off", "You approve first"].map(
            (label) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  borderRadius: 9999,
                  padding: "8px 18px",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    backgroundColor: "#25D366",
                  }}
                />
                <span
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
