import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get("title") || "Mini Commerce";
  const price = searchParams.get("price") || "";
  const image = searchParams.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          padding: 60,
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ flex: 1, paddingRight: 40 }}>
          <h1 style={{ fontSize: 48, margin: 0 }}>{title}</h1>
          {price && (
            <p style={{ fontSize: 32, color: "#333" }}>Only ${price}</p>
          )}
        </div>

        {image && (
          <img
            src={image}
            alt="Product Image"
            width={300}
            height={300}
            style={{ objectFit: "cover", borderRadius: 16 }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
