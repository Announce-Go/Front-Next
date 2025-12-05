import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // 💡 수정됨: 여기에서 /v1을 제거하세요.
        // :path* 안에 이미 'v1/...'이 들어있기 때문입니다.
        destination: 'http://localhost:8000/api/:path*', 
      },
    ];
  },
};

export default nextConfig;