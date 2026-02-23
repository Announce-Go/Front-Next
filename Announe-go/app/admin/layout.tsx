"use client"

import { SideBar } from "@/components/common/SideBar"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { logout } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut } from "lucide-react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const user = useAuthStore((s) => s.user)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const onLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    try {
      await logout()
      clearAuth()
      router.replace("/login")
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--th-page-bg)" }}
    >
      <SideBar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <header
          className="h-16 flex items-center justify-end px-6 border-b flex-shrink-0"
          style={{
            background: "var(--th-header-bg)",
            borderColor: "var(--th-header-border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium" style={{ color: "var(--th-text-1)" }}>
                {user?.name || "관리자"}
              </p>
              <p className="text-xs" style={{ color: "var(--th-text-3)" }}>
                Administrator
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
            >
              {(user?.name?.[0] || "A").toUpperCase()}
            </div>

            {/* 다크/라이트 토글 */}
            <ThemeToggle />

            {/* 로그아웃 */}
            <button
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all hover:opacity-75 disabled:opacity-50 cursor-pointer"
              style={{
                background: "var(--th-toggle-bg)",
                color: "var(--th-text-2)",
                border: "1px solid var(--th-toggle-border)",
              }}
            >
              <LogOut className="w-3.5 h-3.5" />
              {isLoggingOut ? "로그아웃 중이에요..." : "로그아웃"}
            </button>
          </div>
        </header>

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
