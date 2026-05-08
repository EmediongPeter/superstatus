import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SuperStatus — Post to WhatsApp Status Every Day, Automatically";
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background green circle */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            backgroundColor: "#25D366",
            borderRadius: "50%",
            opacity: 0.12,
          }}
        />
        {/* Background yellow circle */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: 200,
            width: 320,
            height: 320,
            backgroundColor: "#FFCB47",
            borderRadius: "50%",
            opacity: 0.07,
          }}
        />

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
              border: "2.5px solid #25D366",
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

          {/* Badge */}
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
            <span
              style={{ fontSize: 14, fontWeight: 900, color: "#141413" }}
            >
              Early Access
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.0,
            letterSpacing: "-2.5px",
            marginBottom: 28,
            maxWidth: 860,
          }}
        >
          Show up every day.
          <br />
          <span style={{ color: "#25D366" }}>Automatically.</span>
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
          }}
        >
          WhatsApp Status automation for Nigerian creators,
          freelancers &amp; business owners.
        </div>

        {/* Bottom pills row */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {["Posts in your voice", "Works while phone is off", "You approve before it goes live"].map(
            (label) => (
              <div
                key={label}
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
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                    display: "inline-block",
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
