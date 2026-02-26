"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react"
import { http } from "@/Featchs/api/http"

type HistoryItem = {
  checked_at: string
  rank: number | null
  session: number
}

type TrackingDetail = {
  id: number
  type: string
  keyword: string
  url: string
  status: "active" | "completed" | "stopped"
  current_session: number
  agency_id: number
  agency_name: string
  advertiser_id: number
  advertiser_name: string
  created_at: string
  updated_at: string
  histories: HistoryItem[]
  history_total: number
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:    { label: "추적중", color: "#22c55e", bg: "rgba(34,197,94,0.1)",    border: "rgba(34,197,94,0.25)" },
  completed: { label: "완료",   color: "#818cf8", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)" },
  stopped:   { label: "중단",   color: "#94a3b8", bg: "rgba(148,163,184,0.1)",  border: "rgba(148,163,184,0.25)" },
}

function PageSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl">
      {[120, 240, 360].map((h, i) => (
        <div
          key={i}
          className="rounded-2xl animate-pulse"
          style={{ height: `${h}px`, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
        />
      ))}
    </div>
  )
}

function SessionBlock({
  session,
  items,
  isActive,
}: {
  session: number
  items: HistoryItem[]
  isActive: boolean
}) {
  const color = isActive ? "#22c55e" : "#818cf8"

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{session}회차</span>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
          >
            {isActive ? "진행중" : "완료"}
          </span>
        </div>
        <span className="text-xs tabular-nums" style={{ color: "#475569" }}>
          {items.length} / 25회
        </span>
      </div>

      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {items.map((item, idx) => {
          const dateLabel = item.checked_at
            ? new Date(item.checked_at).toLocaleDateString("ko-KR", {
                year: "numeric", month: "2-digit", day: "2-digit",
              })
            : "-"
          return (
            <div
              key={idx}
              className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.03]"
            >
              <span className="text-xs tabular-nums" style={{ color: "#475569" }}>{dateLabel}</span>
              {item.rank !== null ? (
                <span className="text-sm font-bold" style={{ color: "#06b6d4" }}>{item.rank}위</span>
              ) : (
                <span className="text-xs" style={{ color: "#475569" }}>순위권 외</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function AgencyPlaceRankTrackingDetail({ trackingId }: { trackingId: number }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agency", "place-rank", "tracking", trackingId],
    queryFn: async () => {
      const res = await http.get<TrackingDetail>(`/api/v1/agency/place-rank/tracking/${trackingId}`)
      return res.data
    },
    staleTime: 30 * 1000,
  })

  if (isError || (!isLoading && !data)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}
        >
          <AlertTriangle className="w-7 h-7" style={{ color: "#f87171" }} />
        </div>
        <p className="text-sm" style={{ color: "#f87171" }}>추적 정보를 불러오지 못했어요.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-75"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <ArrowLeft className="w-4 h-4" /> 이전 페이지로
        </button>
      </div>
    )
  }

  if (isLoading) return <PageSkeleton />

  const createdAt = data?.created_at
    ? new Date(data.created_at).toLocaleDateString("ko-KR", {
        year: "numeric", month: "2-digit", day: "2-digit",
      })
    : "-"

  const statusConfig = STATUS_CONFIG[data?.status ?? "active"] ?? STATUS_CONFIG.active

  return (
    <div className="space-y-6 max-w-3xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "#94a3b8" }} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">플레이스 순위 추적 상세</h1>
            <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
              키워드별 회차 순위 히스토리를 확인해요.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/agency/place-rank")}
          className="text-sm px-4 py-2 rounded-xl transition-all hover:opacity-75"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          ← 목록으로
        </button>
      </div>

      {/* 기본 정보 */}
      <div
        className="rounded-2xl p-5 space-y-5"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>
          기본 정보
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* 키워드 */}
          <div>
            <p className="text-[11px] mb-1" style={{ color: "#475569" }}>키워드</p>
            <p className="text-sm font-semibold text-white">{data?.keyword || "-"}</p>
          </div>

          {/* 등록일 */}
          <div>
            <p className="text-[11px] mb-1" style={{ color: "#475569" }}>등록일</p>
            <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>{createdAt}</p>
          </div>

          {/* URL */}
          <div className="sm:col-span-2">
            <p className="text-[11px] mb-1" style={{ color: "#475569" }}>URL</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium truncate" style={{ color: "#94a3b8" }}>
                {data?.url || "-"}
              </p>
              {data?.url && (
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 transition-opacity hover:opacity-60"
                  style={{ color: "#06b6d4" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* 광고주 */}
          <div>
            <p className="text-[11px] mb-2" style={{ color: "#475569" }}>광고주</p>
            {data?.advertiser_name ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}
                >
                  {data.advertiser_name[0].toUpperCase()}
                </div>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: "rgba(99,102,241,0.15)",
                    color: "#818cf8",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  {data.advertiser_name}
                </span>
              </div>
            ) : (
              <span className="text-sm" style={{ color: "#475569" }}>-</span>
            )}
          </div>

          {/* 상태 */}
          <div>
            <p className="text-[11px] mb-2" style={{ color: "#475569" }}>상태</p>
            <span
              className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: statusConfig.bg,
                color: statusConfig.color,
                border: `1px solid ${statusConfig.border}`,
              }}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* 순위 히스토리 */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider px-1" style={{ color: "#475569" }}>
          순위 히스토리
        </h3>
        {(() => {
          const histories = data?.histories ?? []
          if (histories.length === 0) {
            return (
              <div
                className="rounded-2xl py-12 text-center text-sm"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#475569",
                }}
              >
                아직 조회된 순위 기록이 없어요.
              </div>
            )
          }

          // session 번호로 그룹화 (내림차순 정렬)
          const grouped = new Map<number, HistoryItem[]>()
          for (const item of histories) {
            const s = item.session ?? 1
            if (!grouped.has(s)) grouped.set(s, [])
            grouped.get(s)!.push(item)
          }
          const sortedSessions = Array.from(grouped.keys()).sort((a, b) => b - a)
          const currentSession = data?.current_session ?? Math.max(...sortedSessions)

          return sortedSessions.map((session) => (
            <SessionBlock
              key={session}
              session={session}
              items={grouped.get(session)!}
              isActive={session === currentSession}
            />
          ))
        })()}
      </div>
    </div>
  )
}
