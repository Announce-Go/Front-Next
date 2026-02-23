"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/Features/apis/auth";
import { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { category } from "@/constants/category";
import { cn } from "@/lib/utils";

export function UserSideBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const clearAuth = useAuthStore((s) => s.clearAuth)

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
    <aside className="w-64 h-full border-r border-gray-200 bg-white hidden md:flex md:flex-col">
      {/* 1. 상단 로고 및 검색 영역 */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          Go Home
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Link href="/user">
              <HomeIcon className="size-4" />
            </Link>
          </Button>
        </h1>
        <p className="text-md font-bold text-orange-500">
          더엘커뮤니케이션
        </p>
      </div>

      {/* 2. 내비게이션 메뉴 - role(agency)에 맞는 category.agency 사용 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-5">
          {category.agency.map((section: any, sectionIdx: number) => {
            const sectionKey = Object.keys(section)[0]
            const items = Object.values(section[sectionKey]) as any[]
            return (
              <div key={sectionIdx}>
                <h3 className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
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
                            "flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                            isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <span className={isActive ? "text-orange-500" : "text-gray-500"}>
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
      
      {/* 3. 하단 영역 */}
      <div className="p-4 border-t border-gray-100 text-xs text-gray-500 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </Button>
        <div>v1.0.0</div>
      </div>
    </aside>
  )
}

