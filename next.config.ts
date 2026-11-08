import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain site to /out,
// which Vercel (or any static host) can serve for free.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
