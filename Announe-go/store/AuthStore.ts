import { create } from "zustand"
import { AuthType } from "@/types/AuthTypes"
/**
 * 인증 상태 관리
 * - 로그인 상태
 * - 사용자 정보
 * - 권한 정보
 */

/* 권한은 아래와같습니다.
  - ADMIN: 관리자
  - USER: 사용자
  - MASTER: 마스터
*/


export const useAuthStore = create<AuthType>(() => {
  return {
    id: "test",
    name: "테스트계정입니다.",
    password: "1234",
    role: "USER",
    keywordList: [{
      
    }]
  }
})

