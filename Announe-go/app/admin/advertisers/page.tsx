"use client"

import { useState, useEffect, Suspense } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { getAdminAdvertisers } from "@/Features/apis/admin/advertisers"

/* ── 스켈레톤 행 ── */
function SkeletonRow() {
  return (
    <tr>
      {[160, 80, 130, 180, 90].map((w, i) => (
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

const PAGE_SIZE = 10

function AdvertisersContent() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  const urlSearch = searchParams.get("search") ?? ""
  const page      = Number(searchParams.get("page") ?? "1")

  const [searchInput, setSearchInput] = useState(urlSearch)

  /* 뒤로가기/앞으로가기 시 URL과 입력 동기화 */
  useEffect(() => { setSearchInput(urlSearch) }, [urlSearch])

  /* 엔터 또는 검색 버튼 클릭 시 URL 업데이트 */
  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search)
    if (searchInput) params.set("search", searchInput)
    else params.delete("search")
    params.delete("page")
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  const handlePage = (p: number) => {
    const params = new URLSearchParams(window.location.search)
    if (p === 1) params.delete("page")
    else params.set("page", String(p))
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "advertisers", { search: urlSearch, page }],
    queryFn: () => getAdminAdvertisers({
      approval_status: "approved",
      search:          urlSearch || undefined,
      page,
      page_size:       PAGE_SIZE,
    }),
    staleTime: 30 * 1000,
  })

  const items      = data?.items ?? []
  const total      = data?.pagination?.total ?? data?.total ?? 0
  const totalPages = data?.pagination?.total_pages ?? Math.max(1, Math.ceil(total / PAGE_SIZE))

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })

  return (
    <div className="space-y-5">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>광고주 관리</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
          승인된 광고주 목록을 확인하고 상세 정보를 조회할 수 있어요.
        </p>
      </div>

      {/* 검색 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: "var(--th-text-3)" }}
            />
            <input
              type="text"
              placeholder="광고주명 / 담당자 검색..."
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
              <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>광고주명</th>
              <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>담당자</th>
              <th className="py-3 px-4 text-left font-medium border-b hidden sm:table-cell" style={{ borderColor: "var(--th-row-border)" }}>연락처</th>
              <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>이메일</th>
              <th className="py-3 px-4 text-right font-medium border-b hidden lg:table-cell" style={{ borderColor: "var(--th-row-border)" }}>가입일</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-sm" style={{ color: "var(--th-text-3)" }}>
                  조회된 광고주가 없어요.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/admin/advertisers/${item.id}`)}
                  className="cursor-pointer transition-colors border-t"
                  style={{ borderColor: "var(--th-row-border)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--th-row-hover)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "" }}
                >
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-sm" style={{ color: "var(--th-text-1)" }}>
                      {item.company_name}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-xs" style={{ color: "var(--th-text-2)" }}>
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-xs hidden sm:table-cell" style={{ color: "var(--th-text-3)" }}>
                    -
                  </td>
                  <td className="py-3.5 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                    {item.email || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-right hidden lg:table-cell" style={{ color: "var(--th-text-3)" }}>
                    {formatDate(item.created_at)}
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

/* ── 페이지 ── */
export default function AdvertisersPage() {
  return (
    <Suspense>
      <AdvertisersContent />
    </Suspense>
  )
}
