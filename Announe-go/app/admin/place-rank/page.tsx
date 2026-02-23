"use client"

import { useState, useEffect, Suspense } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import {
  getPlaceRankRealtime,
  getPlaceRankTrackingList,
} from "@/Features/apis/admin/placeRank"

/* ── 상태 배지 ── */
const STATUS_LABELS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:    { label: "진행중", color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
  completed: { label: "완료",   color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)" },
  stopped:   { label: "중단",   color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
}

const STATUS_FILTER = [
  { value: "", label: "전체" },
  { value: "active",    label: "진행중" },
  { value: "completed", label: "완료" },
  { value: "stopped",   label: "중단" },
]

const HEAD_ST = {
  color: "var(--th-text-3)",
  background: "var(--th-table-head)",
  fontSize: "12px",
}

const PAGE_SIZE = 10

/* ── 스켈레톤 행 ── */
function SkeletonRow() {
  return (
    <tr>
      {[120, 80, 100, 100, 60, 100, 70].map((w, i) => (
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

function PlaceRankContent() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  /* ── URL 파라미터 ── */
  const urlStatus = searchParams.get("status") ?? ""
  const urlSearch = searchParams.get("search") ?? ""
  const page      = Number(searchParams.get("page") ?? "1")

  /* ── 추적 목록 검색어 로컬 상태 ── */
  const [searchInput, setSearchInput] = useState(urlSearch)

  useEffect(() => { setSearchInput(urlSearch) }, [urlSearch])

  /* ── 실시간 조회 로컬 상태 ── */
  const [rtKeyword, setRtKeyword] = useState("")
  const [rtUrl, setRtUrl]         = useState("")

  /* ── URL 업데이트 헬퍼 ── */
  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search)
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v)
      else params.delete(k)
    })
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  const handleSearch = () => updateURL({ search: searchInput, page: "" })
  const handleStatus = (v: string) => updateURL({ status: v, page: "" })
  const handlePage   = (p: number) => updateURL({ page: p === 1 ? "" : String(p) })

  /* ── 실시간 조회 mutation ── */
  const realtimeMutation = useMutation({
    mutationFn: () => getPlaceRankRealtime({ keyword: rtKeyword.trim(), url: rtUrl.trim() }),
  })

  /* ── 추적 목록 조회 ── */
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "place-rank", "tracking", { status: urlStatus, search: urlSearch, page }],
    queryFn: () => getPlaceRankTrackingList({
      status:    urlStatus || undefined,
      search:    urlSearch || undefined,
      page,
      page_size: PAGE_SIZE,
    }),
    staleTime: 30 * 1000,
  })

  const items      = data?.items ?? []
  const total      = data?.pagination?.total ?? data?.total ?? 0
  const totalPages = data?.pagination?.total_pages ?? Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>플레이스 순위 관리</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
          실시간 순위 조회 및 키워드 추적 목록을 관리합니다.
        </p>
      </div>

      {/* ━━━ 실시간 순위 조회 ━━━ */}
      <div
        className="rounded-2xl border p-5 space-y-4"
        style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--th-text-3)" }}>
          실시간 순위 조회 (건바이건)
        </h2>

        <div className="flex flex-wrap items-end gap-3">
          {/* 키워드 */}
          <div className="flex flex-col gap-1 flex-1 min-w-[160px] max-w-xs">
            <label className="text-[11px]" style={{ color: "var(--th-text-3)" }}>키워드</label>
            <input
              type="text"
              placeholder="예: 강남한의원"
              value={rtKeyword}
              onChange={(e) => setRtKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && rtKeyword.trim() && rtUrl.trim()) {
                  realtimeMutation.mutate()
                }
              }}
              className="px-3 py-2 rounded-[10px] text-sm outline-none transition-all"
              style={{
                background: "var(--th-input-bg)",
                border: "1px solid var(--th-input-border)",
                color: "var(--th-text-1)",
              }}
            />
          </div>

          {/* URL */}
          <div className="flex flex-col gap-1 flex-1 min-w-[200px] max-w-md">
            <label className="text-[11px]" style={{ color: "var(--th-text-3)" }}>URL</label>
            <input
              type="text"
              placeholder="https://place.naver.com/..."
              value={rtUrl}
              onChange={(e) => setRtUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && rtKeyword.trim() && rtUrl.trim()) {
                  realtimeMutation.mutate()
                }
              }}
              className="px-3 py-2 rounded-[10px] text-sm outline-none transition-all"
              style={{
                background: "var(--th-input-bg)",
                border: "1px solid var(--th-input-border)",
                color: "var(--th-text-1)",
              }}
            />
          </div>

          {/* 조회 버튼 */}
          <button
            onClick={() => {
              if (rtKeyword.trim() && rtUrl.trim()) realtimeMutation.mutate()
            }}
            disabled={!rtKeyword.trim() || !rtUrl.trim() || realtimeMutation.isPending}
            className="px-4 py-2 rounded-[10px] text-sm font-medium transition-all hover:opacity-80 disabled:opacity-40"
            style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", color: "white" }}
          >
            {realtimeMutation.isPending ? "조회 중..." : "조회"}
          </button>
        </div>

        {/* 결과 */}
        {realtimeMutation.isSuccess && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)" }}
          >
            <span style={{ color: "var(--th-text-2)" }}>조회 결과: 현재 순위</span>
            {realtimeMutation.data.rank !== null ? (
              <span className="font-bold text-base" style={{ color: "#34d399" }}>
                {realtimeMutation.data.rank}위
              </span>
            ) : (
              <span className="font-medium" style={{ color: "#94a3b8" }}>순위권 외</span>
            )}
          </div>
        )}
        {realtimeMutation.isError && (
          <div
            className="px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171" }}
          >
            조회에 실패했어요. 키워드와 URL을 다시 확인해주세요.
          </div>
        )}
      </div>

      {/* ━━━ 추적 목록 ━━━ */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--th-text-3)" }}>
          추적 목록 (월보장)
        </h2>

        {/* 필터 & 검색 */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 상태 필터 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {STATUS_FILTER.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStatus(value)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{
                  background: urlStatus === value
                    ? "linear-gradient(90deg, #06b6d4, #6366f1)"
                    : "var(--th-toggle-bg)",
                  color: urlStatus === value ? "white" : "var(--th-text-2)",
                  border: urlStatus === value ? "none" : "1px solid var(--th-toggle-border)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 검색 */}
          <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md ml-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                style={{ color: "var(--th-text-3)" }}
              />
              <input
                type="text"
                placeholder="키워드 / 업체 / 광고주 검색..."
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
            <p className="text-xs" style={{ color: "var(--th-text-3)" }}>
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
                <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>키워드</th>
                <th className="py-3 px-4 text-left font-medium border-b hidden sm:table-cell" style={{ borderColor: "var(--th-row-border)" }}>URL</th>
                <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>광고주</th>
                <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>업체</th>
                <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>회차</th>
                <th className="py-3 px-4 text-left font-medium border-b hidden lg:table-cell" style={{ borderColor: "var(--th-row-border)" }}>진행률</th>
                <th className="py-3 px-4 text-right font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>최근순위</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm" style={{ color: "var(--th-text-3)" }}>
                    조회된 추적 데이터가 없어요.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const st = STATUS_LABELS[item.status] ?? STATUS_LABELS.stopped
                  const progress = item.total_count > 0
                    ? Math.round((item.progress_count / item.total_count) * 100)
                    : 0
                  return (
                    <tr
                      key={item.id}
                      onClick={() => router.push(`/admin/place-rank/tracking/${item.id}`)}
                      className="cursor-pointer transition-colors border-t"
                      style={{ borderColor: "var(--th-row-border)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--th-row-hover)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "" }}
                    >
                      {/* 키워드 */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm" style={{ color: "var(--th-text-1)" }}>
                            {item.keyword}
                          </p>
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}
                          >
                            {st.label}
                          </span>
                        </div>
                      </td>

                      {/* URL */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 transition-opacity hover:opacity-60"
                          style={{ color: "#06b6d4" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="text-xs truncate max-w-[140px]">링크</span>
                        </a>
                      </td>

                      {/* 광고주 */}
                      <td className="py-3.5 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-2)" }}>
                        {item.advertiser_company_name || "-"}
                      </td>

                      {/* 업체 */}
                      <td className="py-3.5 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                        {item.agency_company_name || "-"}
                      </td>

                      {/* 회차 */}
                      <td className="py-3.5 px-4">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{ background: "var(--th-table-head)", color: "var(--th-text-2)", border: "1px solid var(--th-row-border)" }}
                        >
                          {item.current_round}회차
                        </span>
                      </td>

                      {/* 진행률 */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="space-y-1 min-w-[120px]">
                          <div className="flex justify-between text-[11px]" style={{ color: "var(--th-text-3)" }}>
                            <span>{item.progress_count}/{item.total_count}회</span>
                            <span style={{ color: progress === 100 ? "#6366f1" : "#34d399", fontWeight: 600 }}>
                              {progress}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--th-table-head)" }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${progress}%`,
                                background: progress === 100
                                  ? "linear-gradient(90deg, #6366f1, #818cf8)"
                                  : "linear-gradient(90deg, #06b6d4, #34d399)",
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 최근순위 */}
                      <td className="py-3.5 px-4 text-right">
                        {item.latest_rank !== null ? (
                          <span className="font-bold text-sm" style={{ color: "var(--th-text-1)" }}>
                            {item.latest_rank}위
                          </span>
                        ) : (
                          <span className="text-xs" style={{ color: "var(--th-text-3)" }}>순위권 외</span>
                        )}
                      </td>
                    </tr>
                  )
                })
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
    </div>
  )
}

export default function PlaceRankPage() {
  return (
    <Suspense>
      <PlaceRankContent />
    </Suspense>
  )
}
