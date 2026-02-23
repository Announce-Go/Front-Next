"use client"

import { category } from "@/constants/category"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSideBar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-64 h-screen flex-col hidden md:flex relative overflow-hidden flex-shrink-0"
      style={{
        background: "linear-gradient(160deg, #0d0b21 0%, #1a1535 50%, #0f1030 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* 상단 배경 광원 */}
      <div
        className="absolute top-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(99,102,241,0.2), transparent 70%)",
        }}
      />

      {/* 로고 */}
      <div className="relative z-10 p-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
            }}
          >
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1
              className="text-base font-bold leading-tight"
              style={{
                background: "linear-gradient(90deg, #ffffff, #a5f3fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              모두보고
            </h1>
            <p className="text-[10px] font-medium" style={{ color: "#6366f1" }}>
              Administrator
            </p>
          </div>
        </div>

        {/* 검색창 */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "#475569" }}
          />
          <input
            type="text"
            placeholder="메뉴 검색..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg outline-none transition-all placeholder:text-slate-600"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-5">
          {category.admin.map((section: any, sectionIdx: number) => {
            const sectionKey = Object.keys(section)[0]
            const items = Object.values(section[sectionKey]) as any[]

            return (
              <div key={sectionIdx}>
                <h3
                  className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "#4c4f8a" }}
                >
                  {sectionKey}
                </h3>
                <ul className="space-y-0.5">
                  {items.map((item: any, itemIdx: number) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
                          )}
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(90deg, rgba(6,182,212,0.15), rgba(99,102,241,0.15))",
                                  border: "1px solid rgba(99,102,241,0.25)",
                                  color: "#e2e8f0",
                                }
                              : {
                                  color: "#64748b",
                                  border: "1px solid transparent",
                                }
                          }
                        >
                          <span
                            style={{ color: isActive ? "#06b6d4" : "#475569" }}
                          >
                            {item?.icon}
                          </span>
                          {item.label}
                          {isActive && (
                            <div
                              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "#06b6d4" }}
                            />
                          )}
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

      {/* 하단 푸터 */}
      <div
        className="relative z-10 p-4 flex-shrink-0 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2.5 px-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
          >
            AD
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Admin</p>
            <p className="text-[10px]" style={{ color: "#475569" }}>v1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
