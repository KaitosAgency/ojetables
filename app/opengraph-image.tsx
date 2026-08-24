import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "Ojetables - Vaisselle jetable professionnelle & éco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const geistBoldUrl =
  "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@5.2.5/latin-700-normal.woff";
const geistRegularUrl =
  "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@5.2.5/latin-400-normal.woff";

export default async function OpenGraphImage() {
  const [geistBold, geistRegular, heroBuffer] = await Promise.all([
    fetch(geistBoldUrl).then((response) => response.arrayBuffer()),
    fetch(geistRegularUrl).then((response) => response.arrayBuffer()),
    readFile(join(process.cwd(), "public/heroojetables_transparent_v2.png")),
  ]);

  const heroSrc = `data:image/png;base64,${heroBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #f5f0e8 0%, #faf8f5 48%, #efe8de 100%)",
          color: "#3d2c26",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "48px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              borderRadius: 999,
              border: "1px solid rgba(209, 125, 60, 0.35)",
              background: "rgba(255, 255, 255, 0.82)",
              padding: "10px 18px",
              color: "#3d2c26",
              fontSize: 17,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Vaisselle jetable pro & éco
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 620 }}>
            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#3d2c26",
              }}
            >
              Vaisselle jetable éco pour professionnels
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                lineHeight: 1.45,
                color: "#7a6e66",
              }}
            >
              {`+3 000 références · Livraison 24/72h · Tarifs dégressifs · ${site.aggregateRating.display} sur ${site.aggregateRating.count.toLocaleString("fr-FR")} avis`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid rgba(61, 44, 38, 0.12)",
              paddingTop: 22,
            }}
          >
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#4abc39" }}>{site.name}</div>
            <div style={{ display: "flex", fontSize: 20, color: "#7a6e66" }}>Maquette preview Kaitos</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 500,
            height: "100%",
            paddingRight: 16,
          }}
        >
          <img
            src={heroSrc}
            alt=""
            width={460}
            height={560}
            style={{
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
