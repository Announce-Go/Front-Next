// @/shared/api/server-fetch.ts
import { cookies } from "next/headers";


//const BACKEND_URL = "http://158.180.73.169:8081";
const BACKEND_URL = "https://an-5627ae19ff9443ebbad00f985814a30b.ecs.us-east-1.on.aws";

export async function serverFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    // cookies()를 사용하여 쿠키 읽기
    const cookieStore = await cookies(); // Next.js 15 이상은 await 필요
    const allCookies = cookieStore.getAll();
    
    // 쿠키를 올바른 형식으로 변환 (name=value; name2=value2)
    const cookieHeader = allCookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ');
    
    // 디버깅: 쿠키 확인 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.log('[serverFetch] 요청 URL:', `${BACKEND_URL}${url}`);
      console.log('[serverFetch] 쿠키 개수:', allCookies.length);
      console.log('[serverFetch] 쿠키 이름들:', allCookies.map(c => c.name));
      console.log('[serverFetch] 쿠키 헤더:', cookieHeader || '(없음)');
    }
    
    // 쿠키가 없으면 경고
    if (!cookieHeader) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[serverFetch] 경고: 쿠키가 없습니다. 인증이 필요할 수 있습니다.');
      }
    }
    
    const response = await fetch(`${BACKEND_URL}${url}`, {
      ...options,
      // 서버 사이드 fetch에서는 credentials가 작동하지 않으므로 명시적으로 Cookie 헤더 설정
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { "Cookie": cookieHeader }), // 쿠키가 있을 때만 헤더에 추가
        ...options.headers,
      },
      // 필요에 따라 캐싱 옵션 추가
      // next: { revalidate: 60 } // 60초 캐싱
    });

    if (!response.ok) {
      // 에러 응답 본문도 읽어서 더 자세한 에러 정보 제공
      let errorMessage = `세션데이터 호출 실패: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.text();
        if (errorData) {
          // JSON 형식이면 파싱 시도
          try {
            const parsed = JSON.parse(errorData);
            errorMessage += ` - ${JSON.stringify(parsed)}`;
          } catch {
            errorMessage += ` - ${errorData}`;
          }
        }
      } catch (e) {
        // 에러 본문 읽기 실패 시 무시
      }
      
      // 401 에러인 경우 쿠키 정보도 로그에 포함
      if (response.status === 401) {
        console.error('[serverFetch] 401 에러 - 세션 만료 또는 쿠키 없음');
        console.error('[serverFetch] 401 에러 - 쿠키 정보:', {
          cookieCount: allCookies.length,
          cookieNames: allCookies.map(c => c.name),
          hasCookieHeader: !!cookieHeader,
          url: `${BACKEND_URL}${url}`
        });
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // 쿠키 읽기 실패 등 예외 처리
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`서버 요청 실패: ${String(error)}`);
  }
}