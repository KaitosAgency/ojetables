import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const agWidgetHosts = "https://www.societe-des-avis-garantis.fr https://ajax.googleapis.com";

const dailymotionOrigins =
  '"https://www.dailymotion.com" "https://geo.dailymotion.com" "https://*.dailymotion.com"';

const contentSecurityPolicy = [
  "default-src 'self'",
  isDev
    ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${agWidgetHosts}`
    : `script-src 'self' 'unsafe-inline' ${agWidgetHosts}`,
  "style-src 'self' 'unsafe-inline' https://www.societe-des-avis-garantis.fr",
  "img-src 'self' data: https:",
  "font-src 'self' data: https:",
  "frame-src 'self' https://www.dailymotion.com https://geo.dailymotion.com https://*.dailymotion.com",
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
    value: `autoplay=(self ${dailymotionOrigins}), fullscreen=(self ${dailymotionOrigins}), picture-in-picture=(self ${dailymotionOrigins})`,
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
