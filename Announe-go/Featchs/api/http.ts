import axios, { AxiosError, type AxiosInstance } from "axios"

/**
 * 공통 HTTP 클라이언트
 * - baseURL: NEXT_PUBLIC_API_BASE_URL
 * - 기본 Content-Type: application/json
 */
export const http: AxiosInstance = axios.create({ 
  // 브라우저 CORS 회피를 위해 Next rewrite(/api -> backend)를 기본 사용
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

/**
 * 로그인 후 토큰을 세팅하거나, 로그아웃 시 제거할 때 사용하세요.
 * 예) setAccessToken(accessToken) / setAccessToken(null)
 */
export function setAccessToken(token: string | null) {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete http.defaults.headers.common.Authorization
}

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

