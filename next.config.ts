import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/pages/auth/login",
      },
      {
        source: "/register",
        destination: "/pages/auth/register",
      },
      {
        source: "/chat",
        destination: "/pages/chat",
      },
      {
        source: "/onboarding",
        destination: "/pages/onboarding",
      },
    ];
  },
};
