import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@agro/auth",
    "@agro/config",
    "@agro/modules",
    "@agro/ui",
  ],
};

export default nextConfig;
