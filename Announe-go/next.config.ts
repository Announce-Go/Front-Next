import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // 1. 프론트엔드에서 요청할 경로 (예: /api/ranks/place?...)
        source: '/api/:path*',
        
        // 2. 실제 백엔드 API 서버 주소로 요청을 보냄
        // path*는 source에서 :path*에 해당하는 경로를 뒤에 붙여줍니다.
        destination: 'http://158.180.73.169:8081/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
