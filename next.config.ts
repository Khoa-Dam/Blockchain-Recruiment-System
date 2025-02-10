import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "gateway.pinata.cloud"],
    // Allow images from this domain
  },
};

export default nextConfig;
