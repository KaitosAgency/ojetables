import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const agWidgetHosts = "https://www.societe-des-avis-garantis.fr https://ajax.googleapis.com";

const vidjetOrigins =
  '"https://player.vidjet.io" "https://video.vidjet.io" "https://*.vidjet.io"';

const dailymotionOrigins =
  '"https://www.dailymotion.com" "https://geo.dailymotion.com" "https://*.dailymotion.com"';

const contentSecurityPolicy = [
  "default-src 'self'",
  isDev
    ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${agWidgetHosts}`
    : `script-src 'self' 'unsafe-inline' ${agWidgetHosts}`,
  "style-src 'self' 'unsafe-inline' https://www.societe-des-avis-garantis.fr",
  "img-src 'self' data: https:",
  "media-src 'self' https://video.vidjet.io https://*.vidjet.io",
  "font-src 'self' data: https:",
  "frame-src 'self' https://www.dailymotion.com https://geo.dailymotion.com https://*.dailymotion.com https://player.vidjet.io https://*.vidjet.io",
  isDev
    ? `connect-src 'self' ws: wss: https://www.societe-des-avis-garantis.fr`
    : "connect-src 'self' https://www.societe-des-avis-garantis.fr",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: `autoplay=(self ${dailymotionOrigins} ${vidjetOrigins}), fullscreen=(self ${dailymotionOrigins} ${vidjetOrigins}), picture-in-picture=(self ${dailymotionOrigins} ${vidjetOrigins})`,
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ojetables.fr",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "image-compression-pipeline-destination.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
