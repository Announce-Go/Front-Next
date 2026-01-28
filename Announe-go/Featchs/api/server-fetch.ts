// @/shared/api/server-fetch.ts
import { cookies } from "next/headers";

const BACKEND_URL = "http://158.180.73.169:8081";

export async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies(); // Next.js 15 이상은 await 필요
  
  const response = await fetch(`${BACKEND_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookieStore.toString(), // 브라우저 쿠키를 백엔드로 전달
      ...options.headers,
    },
    // 필요에 따라 캐싱 옵션 추가
    // next: { revalidate: 60 } // 60초 캐싱
  });

  if (!response.ok) {
    throw new Error(`데이터 호출 실패: ${response.status}`);
  }

  return response.json();
}