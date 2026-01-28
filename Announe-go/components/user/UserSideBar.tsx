"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/Features/apis/auth";
import { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";


const MENU_ITEMS = [
  {
    label: "플레이스 순위 체크",
    href: "/agency/place-rank",
  },
  {
    label: "카페 순위 체크",  
    href: "/agency/cafe-rank",
  },
  {
    label: "블로그 순위 체크",
    href: "/agency/blog-rank",
  },
  {
    label: "블로그 포스팅",
    href: "/agency/blog-posting",
  },
  {
    label: "언론기사",
    href: "/agency/press",
  },
  {
    label: "카페 침투",
    href: "/agency/cafe-infiltration",
  }
]

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

      {/* 2. 내비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                className={`block px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors ${ pathname === item.href ? `bg-gray-200 text-gray-900` : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          
        </ul>
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

