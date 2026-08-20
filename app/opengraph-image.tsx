import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Ojetables — Vaisselle jetable professionnelle & éco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const geistBoldUrl =
  "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@5.2.5/latin-700-normal.woff";

export default async function OpenGraphImage() {
  const geistBold = await fetch(geistBoldUrl).then((response) => response.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2a1f1a",
          color: "#ffffff",
          fontFamily: "Geist",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            borderRadius: 999,
            border: "1px solid rgba(74, 188, 57, 0.4)",
            background: "rgba(74, 188, 57, 0.12)",
            padding: "10px 18px",
            color: "#90d123",
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Vaisselle jetable pro & éco
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Vaisselle jetable éco pour professionnels
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.45, color: "#eef8eb" }}>
            +3 000 références · Livraison 24/72h · Tarifs dégressifs · 9,5/10 sur 2 417 avis
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(144, 209, 35, 0.25)",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: "#90d123" }}>{site.name}</div>
          <div style={{ fontSize: 22, color: "rgba(238, 248, 235, 0.85)" }}>Maquette preview Kaitos</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geistBold, weight: 700, style: "normal" }],
    },
  );
}
