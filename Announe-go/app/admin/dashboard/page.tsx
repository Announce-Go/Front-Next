import {
  BarChart3,
  PenTool,
  MapPin,
  Coffee,
  Search,
  MessageCircle,
  Newspaper,
} from "lucide-react"

import { AdminDashboardSignupTable } from "@/components/admin/AdminDashboardSignupTable"
import { AdminDashboardAdvertiserList } from "@/components/admin/AdminDashboardAdvertiserList"
import { AdminDashboardAgencyList } from "@/components/admin/AdminDashboardAgencyList"

const CATEGORIES = [
  { label: "플레이스 순위", count: "125건", icon: MapPin,        color: "#10b981", glow: "rgba(16,185,129,0.15)" },
  { label: "브랜드 블로그", count: "456건", icon: PenTool,       color: "#ec4899", glow: "rgba(236,72,153,0.15)" },
  { label: "카페 글 순위",  count: "85건",  icon: Coffee,        color: "#f97316", glow: "rgba(249,115,22,0.15)" },
  { label: "블로그 순위",   count: "203건", icon: Search,        color: "#14b8a6", glow: "rgba(20,184,166,0.15)" },
  { label: "카페 침투",     count: "134건", icon: MessageCircle, color: "#818cf8", glow: "rgba(99,102,241,0.15)" },
  { label: "언론 기사",     count: "35건",  icon: Newspaper,     color: "#94a3b8", glow: "rgba(148,163,184,0.1)" },
]

function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 헤딩 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--th-text-1)" }}>
          대시보드
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--th-text-3)" }}>
          오늘의 마케팅 현황을 한눈에 확인해 보세요.
        </p>
      </div>

      {/* 승인 대기 목록 */}
      <section>
        <div
          className="rounded-2xl border p-5"
          style={{
            background: "var(--th-card-bg)",
            borderColor: "var(--th-card-border)",
          }}
        >
          <div className="mb-4">
            <h2 className="text-base font-semibold" style={{ color: "var(--th-text-1)" }}>
              승인 대기 목록
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
              최근 등록된 업체 및 광고주 승인 요청이에요.
            </p>
          </div>
          <AdminDashboardSignupTable />
        </div>
      </section>

      {/* 광고주 목록 */}
      <section>
        <AdminDashboardAdvertiserList />
      </section>

      {/* 업체 목록 */}
      <section>
        <AdminDashboardAgencyList />
      </section>

      {/* 카테고리별 현황 */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4" style={{ color: "#6366f1" }} />
          <h2 className="text-base font-semibold" style={{ color: "var(--th-text-1)" }}>
            카테고리별 현황
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map(({ label, count, icon: Icon, color, glow }) => (
            <div
              key={label}
              className="rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--th-card-bg)",
                borderColor: "var(--th-card-border)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium" style={{ color: "var(--th-text-2)" }}>
                  {label}
                </p>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: glow }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--th-text-1)" }}>
                {count}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboardPage
