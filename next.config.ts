import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  serverExternalPackages: ['@prisma/client'],
  output: 'standalone',
};

export default nextConfig;
