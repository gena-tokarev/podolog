import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pl",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
