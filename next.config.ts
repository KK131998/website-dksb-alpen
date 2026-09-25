import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cms-website-dksb-alpen.local",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "logcurve.s6-tastewp.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
