import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://158.180.73.169:8081/api/:path*",
      },
    ]
  },
}

export default nextConfig