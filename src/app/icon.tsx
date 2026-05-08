import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: "#25D366",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #141413",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#141413",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          S
        </span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
