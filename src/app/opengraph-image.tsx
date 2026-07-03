// src/app/opengraph-image.tsx
//
// Replaces the previously-referenced /og-image.jpg, which didn't
// actually exist in public/ -- every shared link was showing a broken
// image. Generated dynamically so there's no static asset to keep in
// sync with the brand.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Koa'lit Literie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "#F8F5F0",
        }}
      >
        {/* logo.png is navy-on-transparent, only legible on a light background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={165} alt="" />

        <div
          style={{
            marginTop: 32,
            fontSize: 32,
            color: "#103a63",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Pour une nuit réussie
        </div>
      </div>
    ),
    { ...size }
  );
}
