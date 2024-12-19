import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for better debugging
  output: "export", // Configure for static export
  trailingSlash: true, // Ensures generated paths have trailing slashes
  images: {
    unoptimized: true, // Necessary for static export to disable Next.js image optimization
  },
  env: {
    NEXT_PUBLIC_GIPHY_API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY, // Pass environment variables
  },
};

export default nextConfig;
