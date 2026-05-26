import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Next.js <Image> to load from external sources used in the gallery
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
    ],
  },
  // Silence the oklab Tailwind CSS warning during production builds
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
