import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* The card shown when the site is shared in a chat or on social media.
   Rendered once at build time from the hero portrait, so it costs nothing
   at runtime and stays in step with the photo on the home page. */

export const alt = "Hset Paing Htoo, frontend developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(
    join(process.cwd(), "public/hero-section-selfie.png")
  );
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          background: "#0a0a0e",
          color: "#eeece6",
          padding: "64px 72px 0 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 64,
            width: 640,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#a09dab" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 14,
                background: "#ff6a3d",
                marginRight: 16,
              }}
            />
            Available for new projects
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -4 }}>
              Hset Paing Htoo
            </div>
            <div style={{ marginTop: 20, fontSize: 44, color: "#ff6a3d", letterSpacing: -1 }}>
              Frontend Developer
            </div>
            <div style={{ marginTop: 28, fontSize: 26, lineHeight: 1.4, color: "#a09dab" }}>
              Corporate sites, management dashboards and industrial
              monitoring tools in React, Next.js and TypeScript.
            </div>
          </div>
        </div>

        {/* The same arch as the hero: paper tone behind a black suit. */}
        <div
          style={{
            display: "flex",
            position: "relative",
            alignSelf: "flex-end",
            width: 400,
            height: 520,
            overflow: "hidden",
            background: "#d6d1c4",
            borderTopLeftRadius: 200,
            borderTopRightRadius: 200,
          }}
        >
          <img
            src={src}
            alt=""
            width={620}
            height={930}
            style={{ position: "absolute", top: 18, left: -110 }}
          />
        </div>
      </div>
    ),
    size
  );
}
