import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@agro/auth", "@agro/modules", "@agro/ui"],
};

export default nextConfig;
