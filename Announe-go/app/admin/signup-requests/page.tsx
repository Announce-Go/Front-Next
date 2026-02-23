"use client"

import { useState, useEffect, Suspense } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { getSignupRequests } from "@/Features/apis/admin/signupRequests"

/* ── 카테고리 라벨 맵 ── */
const CATEGORY_LABELS: Record<string, string> = {
  place_rank:        "플레이스",
  cafe_rank:         "카페",
  blog_rank:         "블로그",
  brand_blog:        "브랜드블로그",
  press:             "언론",
  cafe_infiltration: "카페침투",
}

/* ── 상태 뱃지 ── */
function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    pending:  { label: "승인 대기", bg: "rgba(251,146,60,0.15)",  color: "#fb923c", border: "rgba(251,146,60,0.3)"  },
    approved: { label: "승인 완료", bg: "rgba(52,211,153,0.15)",  color: "#34d399", border: "rgba(52,211,153,0.3)"  },
    rejected: { label: "반려",      bg: "rgba(248,113,113,0.15)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
  }
  const s = map[status ?? "pending"] ?? map["pending"]
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {s.label}
    </span>
  )
}

/* ── 역할 뱃지 ── */
function RoleBadge({ role }: { role: string }) {
  if (role === "agency")
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
        업체
      </span>
    )
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: "rgba(6,182,212,0.15)", color: "#67e8f9", border: "1px solid rgba(6,182,212,0.3)" }}>
      광고주
    </span>
  )
}

/* ── 스켈레톤 행 ── */
function SkeletonRow() {
  return (
    <tr>
      {[60, 140, 80, 110, 70, 130, 70].map((w, i) => (
        <td key={i} className="py-3.5 px-4">
          <div
            className="h-4 rounded-lg animate-pulse"
            style={{ width: `${w}px`, background: "var(--th-table-head)" }}
          />
        </td>
      ))}
    </tr>
  )
}

const HEAD_ST = {
  color: "var(--th-text-3)",
  background: "var(--th-table-head)",
  fontSize: "12px",
}

const SELECT_ST: React.CSSProperties = {
  background: "var(--th-input-bg)",
  border: "1px solid var(--th-input-border)",
  color: "var(--th-text-2)",
  borderRadius: "10px",
  padding: "8px 28px 8px 12px",
  fontSize: "13px",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
}

const PAGE_SIZE = 10

/* ── 실제 콘텐츠 (useSearchParams 사용으로 Suspense 분리) ── */
function SignupRequestsContent() {
  const router     = useRouter()
  const pathname   = usePathname()
  const searchParams = useSearchParams()

  /* URL에서 필터 읽기 */
  const role      = searchParams.get("role")   ?? "all"
  const status    = searchParams.get("status") ?? "pending"
  const urlSearch = searchParams.get("search") ?? ""
  const page      = Number(searchParams.get("page") ?? "1")

  /* 검색 입력 — 로컬 상태로 관리 후 디바운스로 URL 업데이트 */
  const [searchInput, setSearchInput] = useState(urlSearch)

  /* URL 파라미터 업데이트 헬퍼 */
  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search)
    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  /* 뒤로가기/앞으로가기 시 URL과 입력 동기화 */
  useEffect(() => { setSearchInput(urlSearch) }, [urlSearch])

  /* 필터 핸들러 */
  const handleRole   = (val: string) => updateURL({ role: val === "all" ? "" : val, page: "" })
  const handleStatus = (val: string) => updateURL({ status: val === "all" ? "" : val, page: "" })
  const handlePage   = (p: number)   => updateURL({ page: p === 1 ? "" : String(p) })

  /* 엔터 또는 검색 버튼 클릭 시 URL 업데이트 */
  const handleSearch = () => updateURL({ search: searchInput, page: "" })

  /* React Query */
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "signup-requests", { role, status, search: urlSearch, page }],
    queryFn: () => getSignupRequests({
      role:            role !== "all" ? role : undefined,
      approval_status: status !== "all" ? status : undefined,
      search:          urlSearch || undefined,
      page,
      page_size:       PAGE_SIZE,
    }),
    staleTime: 30 * 1000,
  })

  const items      = data?.items ?? []
  const total      = data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const formatDate = (iso?: string) => {
    if (!iso) return "-"
    const d = new Date(iso)
    return `${d.getMonth() + 1}-${String(d.getDate()).padStart(2, "0")}`
  }

  return (
    <div className="space-y-5">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>회원가입 승인 관리</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
          신규 가입 요청을 검토하고 승인 또는 반려할 수 있어요.
        </p>
      </div>

      {/* 필터 영역 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 구분 */}
        <select value={role} onChange={(e) => handleRole(e.target.value)} style={SELECT_ST}>
          <option value="all">구분 전체</option>
          <option value="agency">업체</option>
          <option value="advertiser">광고주</option>
        </select>

        {/* 상태 */}
        <select value={status} onChange={(e) => handleStatus(e.target.value)} style={SELECT_ST}>
          <option value="all">상태 전체</option>
          <option value="pending">승인 대기</option>
          <option value="approved">승인 완료</option>
          <option value="rejected">반려</option>
        </select>

        {/* 검색 */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: "var(--th-text-3)" }}
            />
            <input
              type="text"
              placeholder="업체명 / 담당자 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-9 pr-3 py-2 rounded-[10px] text-sm outline-none transition-all"
              style={{
                background: "var(--th-input-bg)",
                border: "1px solid var(--th-input-border)",
                color: "var(--th-text-1)",
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-3 py-2 rounded-[10px] text-sm font-medium flex items-center gap-1.5 transition-all hover:opacity-80 flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", color: "white" }}
          >
            <Search className="w-3.5 h-3.5" /> 검색
          </button>
        </div>

        {/* 건수 */}
        {!isLoading && total > 0 && (
          <p className="text-xs ml-auto" style={{ color: "var(--th-text-3)" }}>
            총 <span style={{ color: "#06b6d4", fontWeight: 600 }}>{total}</span>건
          </p>
        )}
      </div>

      {/* 테이블 */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={HEAD_ST}>
              <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>구분</th>
              <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>업체/광고주명</th>
              <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>담당자</th>
              <th className="py-3 px-4 text-left font-medium border-b hidden sm:table-cell" style={{ borderColor: "var(--th-row-border)" }}>연락처</th>
              <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>신청일</th>
              <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>카테고리</th>
              <th className="py-3 px-4 text-right font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm" style={{ color: "var(--th-text-3)" }}>
                  조회된 결과가 없어요.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/admin/signup-requests/${item.id}`)}
                  className="cursor-pointer transition-colors border-t"
                  style={{ borderColor: "var(--th-row-border)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--th-row-hover)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "" }}
                >
                  <td className="py-3.5 px-4">
                    <RoleBadge role={item.role} />
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-sm" style={{ color: "var(--th-text-1)" }}>
                      {item.company_name || item.name}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-xs" style={{ color: "var(--th-text-2)" }}>
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-xs hidden sm:table-cell" style={{ color: "var(--th-text-3)" }}>
                    {item.phone || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                    {formatDate(item.created_at)}
                  </td>
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    {item.role === "advertiser" || !item.categories?.length ? (
                      <span className="text-xs" style={{ color: "var(--th-text-3)" }}>-</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {item.categories.slice(0, 3).map((cat) => (
                          <span
                            key={cat}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
                          >
                            {CATEGORY_LABELS[cat] ?? cat}
                          </span>
                        ))}
                        {item.categories.length > 3 && (
                          <span className="text-[10px]" style={{ color: "var(--th-text-3)" }}>
                            +{item.categories.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={item.approval_status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => handlePage(page - 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75 disabled:opacity-30"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePage(p)}
              className="w-8 h-8 rounded-lg text-xs font-medium transition-all hover:opacity-75"
              style={{
                background: p === page ? "linear-gradient(90deg, #06b6d4, #6366f1)" : "var(--th-toggle-bg)",
                color:      p === page ? "white" : "var(--th-text-2)",
                border:     p === page ? "none"  : "1px solid var(--th-toggle-border)",
              }}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page >= totalPages}
            onClick={() => handlePage(page + 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75 disabled:opacity-30"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>
        </div>
      )}
    </div>
  )
}

/* ── 페이지 (Suspense 래핑 — useSearchParams 요구사항) ── */
export default function SignupRequestsPage() {
  return (
    <Suspense>
      <SignupRequestsContent />
    </Suspense>
  )
}
