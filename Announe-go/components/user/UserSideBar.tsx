"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { BarChart3, LogOut } from "lucide-react"
import { logout } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"
import { category } from "@/constants/category"

export function UserSideBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const companyName = useAuthStore((s) => s.user?.name ?? "업체")

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
    <aside
      className="w-64 h-full hidden md:flex md:flex-col"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
    >
      {/* 로고 영역 */}
      <div
        className="p-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/agency/dashboard" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className="text-sm font-bold"
              style={{
                background: "linear-gradient(90deg, #ffffff, #a5f3fc, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              모두보고
            </p>
            <p className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>
              {companyName}
            </p>
          </div>
        </Link>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {category.agency.map((section: any, sectionIdx: number) => {
            const sectionKey = Object.keys(section)[0]
            const items = Object.values(section[sectionKey]) as any[]
            return (
              <div key={sectionIdx}>
                <p
                  className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "#475569" }}
                >
                  {sectionKey}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item: any, itemIdx: number) => {
                    const isActive =
                      pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
                          style={
                            isActive
                              ? {
                                  background: "linear-gradient(90deg, rgba(6,182,212,0.2), rgba(99,102,241,0.2))",
                                  color: "#ffffff",
                                  border: "1px solid rgba(6,182,212,0.3)",
                                  boxShadow: "0 0 12px rgba(99,102,241,0.15)",
                                }
                              : {
                                  color: "#94a3b8",
                                  border: "1px solid transparent",
                                }
                          }
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                              e.currentTarget.style.color = "#ffffff"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = ""
                              e.currentTarget.style.color = "#94a3b8"
                            }
                          }}
                        >
                          <span
                            style={{
                              color: isActive ? "#06b6d4" : "#475569",
                            }}
                          >
                            {item?.icon}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </nav>

      {/* 하단 로그아웃 */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:opacity-80 disabled:opacity-40"
          style={{
            background: "rgba(248,113,113,0.08)",
            color: "#f87171",
            border: "1px solid rgba(248,113,113,0.2)",
          }}
        >
          <LogOut className="w-4 h-4" />
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
        <p className="text-center mt-3 text-[10px]" style={{ color: "#334155" }}>v1.0.0</p>
      </div>
    </aside>
  )
}
