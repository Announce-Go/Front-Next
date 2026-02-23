"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // 마운트 전에는 빈 자리 확보 (hydration 불일치 방지)
  if (!mounted) return <div className="w-8 h-8" />

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75 cursor-pointer"
      style={{
        background: "var(--th-toggle-bg)",
        border: "1px solid var(--th-toggle-border)",
      }}
      title={isDark ? "라이트 모드로 전환해요" : "다크 모드로 전환해요"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-yellow-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500" />
      )}
    </button>
  )
}
