import { create } from "zustand";
import { AuthType } from "@/types/AuthTypes";
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

interface AuthStoreState {
  user: AuthType | null; // 로그인 안 했을 땐 null
  setUser: (user: AuthType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => {
  return {
    user: null,
    setUser: (user: AuthType) => {
      set(() => {
        return {
          user,
        };
      });
    },
    logout: () => {
      set(() => {
        return { user: null };
      });
    },
  };
});
