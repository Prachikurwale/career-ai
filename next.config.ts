import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    dangerouslyAllowSVG: true,
    // Allow data URIs for Base64 images
    unoptimized: process.env.NODE_ENV === "production" ? false : true,
  },
};

export default nextConfig;
