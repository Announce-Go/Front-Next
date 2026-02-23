"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"
import { useState } from "react"
import { category } from "@/constants/category"
import { cn } from "@/lib/utils"

export function AdvertiserSideBar() {
  const pathname = usePathname()
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const menuItems = category.advertisers.filter((item) => item.isView)

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
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Advertiser</h1>
        <p className="text-md text-gray-500">메뉴를 선택해주세요.</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {item.icon ? <span>{item.icon}</span> : null}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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

