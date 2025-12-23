// src/lib/server-auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 권한이 필요한 페이지에서 호출하는 함수
export function getAuthCheck() {
  const cookieStore = cookies();
  // // 4. 유저의 Role 정보 가져오기 (metadata 또는 별도 DB 조회)
  // // Supabase의 user_metadata에 role을 저장해뒀다고 가정
  // // 5. 권한 체크 (허용된 Role 목록이 있을 때만 체크)
  // if (allowedRoles && !allowedRoles.includes(userRole)) {
  //   // 권한 없으면 대시보드 홈으로 튕겨내기 (또는 403 페이지)
  //   redirect('/dashboard');
  // }

  // 6. 검문 통과! 유저 정보와 Role 반환
  return {
    role: "admin",
    name: "admin",
    email: "admin",
    id: "admin",
  };
}
