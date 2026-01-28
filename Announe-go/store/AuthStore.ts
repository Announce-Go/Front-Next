import { create } from "zustand"
import { persist } from "zustand/middleware"
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
export const useAuthStore = create<AuthType>()(
  persist((set) => {
    return {
      user: null,
      role: "",
      accessToken: null,
      setAuth: (payload) =>
        set((state) => ({
          user: payload.user !== undefined ? payload.user : state.user,
          role:
            payload.role !== undefined
              ? (payload.role as any)
              : payload.user?.role !== undefined
                ? payload.user.role
                : state.role,          
        })),
      clearAuth: () =>
        set(() => ({
          user: null,
          role: "",
          accessToken: null,
        })),
    }
  }, {
    name: "auth-storage",
  })
)

