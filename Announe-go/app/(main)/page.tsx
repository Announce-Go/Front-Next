"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/AuthStore"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const { user } = useAuthStore.getState()

    if (!user) {
      router.replace("/login")
      return
    }

    const role = user.role?.toLowerCase()
    if (role === "admin")           router.replace("/admin/dashboard")
    else if (role === "agency")     router.replace("/agency/dashboard")
    else if (role === "advertiser") router.replace("/advertiser/dashboard")
    else                            router.replace("/login")
  }, [router])

  // 리다이렉트 전 로딩 스피너
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)" }}
    >
      <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  )
}
