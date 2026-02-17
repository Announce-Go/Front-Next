"use client"

import { SideBar } from "@/components/common/SideBar"
import { Button } from "@/components/ui/button"
import { logout } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const onLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logout()
      clearAuth()
      router.push("/")
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. 사이드바: 왼쪽 고정 */}
      <SideBar />

      {/* 2. 오른쪽 영역: 전체 레이아웃 (헤더 + 콘텐츠) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* (선택사항) 상단 헤더: 로그인 정보, 제목 등 */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
            </Button>
          </div>
        </header>

        {/* 3. 메인 콘텐츠: 여기서만 스크롤 생김 */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* max-w-7xl: 모니터가 너무 클 때 콘텐츠가 찢어지는 것 방지
            mx-auto: 중앙 정렬
          */}
          <div className="mx-auto w-full p-4">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
