import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/versions/index", destination: "/", permanent: true },
      {
        source: "/versions/index/projects/:slug",
        destination: "/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
