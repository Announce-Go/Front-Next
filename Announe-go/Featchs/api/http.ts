// ./Featchs/api/http.ts (또는 shared/api/http.ts)
import axios, { AxiosInstance } from "axios";

const BACKEND_ORIGIN = "http://158.180.73.169:8081";

export const http: AxiosInstance = axios.create({
  baseURL: typeof window === "undefined" ? BACKEND_ORIGIN : "",
  timeout: 15000,
  withCredentials: true,
});

http.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = cookies();
      config.headers.Cookie = cookieStore.toString();
    } catch (error) {
      console.error("서버 쿠키 주입 실패:", error);
    }
  }
  return config;
});