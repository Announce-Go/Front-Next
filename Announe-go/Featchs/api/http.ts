// ./Featchs/api/http.ts (또는 shared/api/http.ts)
import axios, { AxiosInstance } from "axios";

//const BACKEND_ORIGIN = "http://158.180.73.169:8081";
const BACKEND_ORIGIN = "https://an-5627ae19ff9443ebbad00f985814a30b.ecs.us-east-1.on.aws";



export const http: AxiosInstance = axios.create({
  baseURL: typeof window === "undefined" ? BACKEND_ORIGIN : "",
  timeout: 30000,
  withCredentials: true,
});

http.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies(); // Next.js 15 이상은 await 필요
      
      // 쿠키를 올바른 형식으로 변환 (name=value; name2=value2)
      const allCookies = cookieStore.getAll();
      const cookieHeader = allCookies
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');
      
      if (cookieHeader) {
        config.headers.Cookie = cookieHeader;
        
        // 디버깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('[http] 서버 사이드 쿠키 주입:', {
            cookieCount: allCookies.length,
            cookieNames: allCookies.map(c => c.name)
          });
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[http] 서버 사이드 쿠키 없음 - 인증이 필요할 수 있습니다.');
        }
      }
    } catch (error) {
      console.error("[http] 서버 쿠키 주입 실패:", error);
    }
  }
  return config;
});