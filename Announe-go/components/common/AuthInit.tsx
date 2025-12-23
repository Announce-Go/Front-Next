"use client";

import { useRef } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { AuthType } from "@/types/AuthTypes";

// Props로 서버에서 받은 user 정보를 받습니다.
export function AuthInit({ user }: { user?: AuthType }) {
  const initialized = useRef(false);
  console.log(`initialized`, initialized);
  const setUser = useAuthStore((state) => state.setUser);

  if (!initialized.current) {
    if (user) {
      setUser(user);
    }
    initialized.current = true;
  }

  return null; // 화면엔 아무것도 그리지 않음
}
