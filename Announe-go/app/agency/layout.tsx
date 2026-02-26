"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { SideBar } from "@/components/common/SideBar"
import { logout } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const userName = useAuthStore((s) => s.user?.name ?? "")
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
    <div className="flex h-screen overflow-hidden" style={{ background: "#0a0a1a" }}>
      {/* 사이드바 */}
      <SideBar />

      {/* 오른쪽 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 상단 헤더 */}
        <header
          className="h-14 flex items-center justify-between px-6 flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* 유저명 */}
          <span className="text-xs" style={{ color: "#475569" }}>
            {userName && (
              <span style={{ color: "#94a3b8" }}>{userName}님</span>
            )}
          </span>

          {/* 로그아웃 버튼 */}
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
            style={{
              background: "rgba(248,113,113,0.08)",
              color: "#f87171",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
