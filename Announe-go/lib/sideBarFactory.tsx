import { UserSideBar } from "@/components/user/UserSideBar"
import { AdminSideBar } from "@/components/admin/AdminSideBar"
import { AdvertiserSideBar } from "@/components/advertiser/AdvertiserSideBar"

/**
 * 로그인 응답 role 값: "admin" | "agency" | "advertiser"
 * - admin      → AdminSideBar
 * - agency     → UserSideBar (대행사/업체 전용)
 * - advertiser → AdvertiserSideBar
 */
const createSideBar = (role: string) => {
  const r = role?.toLowerCase()

  if (r === "admin")      return <AdminSideBar />
  if (r === "agency")     return <UserSideBar />
  if (r === "advertiser") return <AdvertiserSideBar />

  return null
}

export { createSideBar }
