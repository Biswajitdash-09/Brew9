import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

// Hardened, minimal Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://challenges.cloudflare.com;
  connect-src 'self' https://*.clerk.accounts.dev https://*.convex.cloud wss://*.convex.cloud;
  img-src 'self' data: blob: https://img.clerk.com https://images.unsplash.com https://*.clerk.accounts.dev;
  frame-src https://*.clerk.accounts.dev https://challenges.cloudflare.com;
  frame-ancestors 'none';
  worker-src 'self' blob:;
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(isProduction
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
