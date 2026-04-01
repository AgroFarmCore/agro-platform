import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@agro/config", "@agro/content", "@agro/ui"],
};

export default nextConfig;
