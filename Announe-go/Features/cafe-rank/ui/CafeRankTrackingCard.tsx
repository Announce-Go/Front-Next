import Link from "next/link"
import { serverFetch } from "@/Featchs/api/server-fetch"
import { CafeRankTrackingControls } from "@/Features/cafe-rank/ui/CafeRankTrackingControls"
import { ExternalLink, ChevronRight, ChevronLeft, PlayCircle } from "lucide-react"

type TrackingItem = {
  id: number
  keyword: string
  url: string
  status: "active" | "stopped" | string
  current_session: number
  advertiser_id: number
  advertiser_name: string
  latest_rank: number | null
  latest_checked_at: string | null
  created_at: string
}

type TrackingListResponse = {
  items: TrackingItem[]
  total: number
  pagination: {
    total: number
    page: number
    page_size: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

type SearchParams = Record<string, string | string[] | undefined>

function pickOne(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue
    sp.set(k, String(v))
  }
  const qs = sp.toString()
  return qs ? `?${qs}` : ""
}

export async function CafeRankTrackingCard(props: { searchParams?: SearchParams }) {
  const statusRaw = pickOne(props.searchParams?.status)
  const keyword = pickOne(props.searchParams?.keyword) ?? ""
  const advertiserId = pickOne(props.searchParams?.advertiser_id) ?? ""
  const page = Number(pickOne(props.searchParams?.page) ?? "1") || 1
  const pageSize = Number(pickOne(props.searchParams?.page_size) ?? "20") || 20

  const status: "all" | "active" | "stopped" =
    statusRaw === "active" || statusRaw === "stopped" ? statusRaw : "all"

  const qs = buildQuery({
    status: status === "all" ? undefined : status,
    keyword: keyword || undefined,
    advertiser_id: advertiserId || undefined,
    page,
    page_size: pageSize,
  })

  let data: TrackingListResponse | null = null
  let error: string | null = null
  try {
    data = await serverFetch<TrackingListResponse>(`/api/v1/agency/cafe-rank/tracking${qs}`, {
      cache: "no-store",
    })
  } catch (e) {
    error = e instanceof Error ? e.message : "목록을 불러오지 못했어요."
  }

  const items = data?.items ?? []
  const pagination = data?.pagination

  const baseParams = new URLSearchParams()
  if (status !== "all") baseParams.set("status", status)
  if (keyword) baseParams.set("keyword", keyword)
  if (advertiserId) baseParams.set("advertiser_id", advertiserId)
  baseParams.set("page_size", String(pageSize))

  const prevHref = (() => {
    const p = new URLSearchParams(baseParams)
    p.set("page", String(Math.max(1, page - 1)))
    return `/agency/cafe-rank?${p.toString()}`
  })()

  const nextHref = (() => {
    const p = new URLSearchParams(baseParams)
    p.set("page", String(page + 1))
    return `/agency/cafe-rank?${p.toString()}`
  })()

  return (
    <div
      className="rounded-2xl border backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-6 pb-4">
        <div>
          <h2 className="text-sm font-semibold text-white">추적 목록 (월보장)</h2>
          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
            관리 중인 키워드 리스트예요.
            {pagination && (
              <span className="ml-2" style={{ color: "#06b6d4" }}>
                총 {pagination.total}건
              </span>
            )}
          </p>
        </div>
        <CafeRankTrackingControls
          status={status}
          keyword={keyword}
          advertiserId={advertiserId}
          page={page}
          pageSize={pageSize}
        />
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        {error ? (
          <div className="px-6 py-10 text-center text-sm" style={{ color: "#f87171" }}>
            {error}
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm" style={{ color: "#475569" }}>
            등록된 추적 항목이 없어요.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["키워드", "URL", "광고주", "회차", "최근 체크", "최근순위", "상태", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "#475569" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const rank = typeof it.latest_rank === "number" ? it.latest_rank : null
                const isStopped = it.status === "stopped"

                return (
                  <tr
                    key={String(it.id)}
                    className="transition-colors hover:bg-white/[0.04]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <td className="px-4 py-3.5 font-semibold text-white">{it.keyword}</td>

                    <td className="px-4 py-3.5">
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-60"
                        style={{ color: "#06b6d4" }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                          style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}
                        >
                          {(it.advertiser_name?.[0] ?? "A").toUpperCase()}
                        </div>
                        <span className="text-sm" style={{ color: "#94a3b8" }}>
                          {it.advertiser_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#94a3b8",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {it.current_session}회차
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-xs tabular-nums" style={{ color: "#475569" }}>
                        {it.latest_checked_at ?? "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      {rank !== null ? (
                        <span className="font-bold text-base" style={{ color: "#06b6d4" }}>
                          {rank}위
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "#475569" }}>-</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={
                          isStopped
                            ? {
                                background: "rgba(148,163,184,0.1)",
                                color: "#94a3b8",
                                border: "1px solid rgba(148,163,184,0.25)",
                              }
                            : {
                                background: "rgba(34,197,94,0.1)",
                                color: "#22c55e",
                                border: "1px solid rgba(34,197,94,0.25)",
                              }
                        }
                      >
                        <PlayCircle className="w-3 h-3" />
                        {isStopped ? "중단됨" : "추적중"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <Link
                        href={`/agency/cafe-rank/tracking/${it.id}`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <ChevronRight className="w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 페이지네이션 */}
      {items.length > 0 && (
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="text-xs" style={{ color: "#475569" }}>
            {pagination
              ? `${pagination.page} / ${pagination.total_pages} 페이지`
              : `페이지 ${page}`}
          </span>
          <div className="flex gap-2">
            <Link
              href={prevHref}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                pointerEvents: (pagination ? !pagination.has_prev : page <= 1) ? "none" : "auto",
                opacity: (pagination ? !pagination.has_prev : page <= 1) ? 0.3 : 1,
              }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </Link>
            <Link
              href={nextHref}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                pointerEvents: (pagination ? !pagination.has_next : items.length < pageSize) ? "none" : "auto",
                opacity: (pagination ? !pagination.has_next : items.length < pageSize) ? 0.3 : 1,
              }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
