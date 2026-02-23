"use client"

import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, AlertTriangle, ExternalLink, Square } from "lucide-react"
import {
  getPlaceRankTrackingDetail,
  stopPlaceRankTracking,
} from "@/Features/apis/admin/placeRank"
import type { RoundHistory } from "@/Features/apis/admin/placeRank"

/* ── 상태 배지 설정 ── */
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:    { label: "추적중",  color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)" },
  completed: { label: "완료",    color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)" },
  stopped:   { label: "중단",    color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
}

/* ── 섹션 래퍼 ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-5 space-y-4"
      style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--th-text-3)" }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

/* ── 정보 필드 ── */
function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-[11px] mb-0.5" style={{ color: "var(--th-text-3)" }}>{label}</p>
      <p className="text-sm font-medium" style={{ color: value ? "var(--th-text-1)" : "var(--th-text-3)" }}>
        {value || "-"}
      </p>
    </div>
  )
}

/* ── 스켈레톤 ── */
function PageSkeleton() {
  return (
    <div className="space-y-4">
      {[120, 240, 360].map((h, i) => (
        <div
          key={i}
          className="rounded-2xl border animate-pulse"
          style={{ height: `${h}px`, background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
        />
      ))}
    </div>
  )
}

/* ── 회차 블록 ── */
function RoundBlock({ round }: { round: RoundHistory }) {
  const isActive = round.status === "active"
  const st = isActive
    ? { label: "진행중", color: "#34d399", border: "rgba(52,211,153,0.3)" }
    : { label: "완료",   color: "#6366f1", border: "rgba(99,102,241,0.3)" }

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "var(--th-card-bg)",
        borderColor: "var(--th-card-border)",
        borderLeft: `3px solid ${st.color}`,
      }}
    >
      {/* 회차 헤더 */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ background: "var(--th-table-head)", borderColor: "var(--th-row-border)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "var(--th-text-1)" }}>
            {round.round}회차
          </span>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ color: st.color, background: `${st.color}18`, border: `1px solid ${st.border}` }}
          >
            {st.label}
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--th-text-3)" }}>
          {round.count} / 25회
        </span>
      </div>

      {/* 히스토리 행 */}
      <div className="divide-y" style={{ borderColor: "var(--th-row-border)" }}>
        {round.entries.map((entry, idx) => {
          const isRanked = entry.rank !== null
          return (
            <div
              key={idx}
              className="flex items-center justify-between px-5 py-3"
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--th-row-hover)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "" }}
            >
              <span className="text-xs tabular-nums" style={{ color: "var(--th-text-3)" }}>
                {entry.date}
              </span>
              {isRanked ? (
                <span className="text-sm font-bold" style={{ color: "var(--th-text-1)" }}>
                  {entry.rank}위
                </span>
              ) : (
                <span className="text-xs" style={{ color: "#94a3b8" }}>순위권 외</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export function AdminPlaceRankTrackingDetail({ trackingId }: { trackingId: number }) {
  const router      = useRouter()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "place-rank", "tracking", trackingId],
    queryFn: () => getPlaceRankTrackingDetail(trackingId),
    staleTime: 30 * 1000,
  })

  const stopMutation = useMutation({
    mutationFn: () => stopPlaceRankTracking(trackingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "place-rank", "tracking", trackingId] })
      queryClient.invalidateQueries({ queryKey: ["admin", "place-rank", "tracking"] })
    },
  })

  const handleStop = () => {
    if (!confirm("추적을 중단하시겠어요?\n데이터는 보존됩니다.")) return
    stopMutation.mutate()
  }

  /* 에러 화면 */
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
          style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}
        >
          <ArrowLeft className="w-4 h-4" /> 이전 페이지로
        </button>
      </div>
    )
  }

  const createdAt = data?.created_at
    ? new Date(data.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    : "-"

  const statusConfig = STATUS_CONFIG[data?.status ?? "active"] ?? STATUS_CONFIG.active
  const canStop = data?.status === "active"

  return (
    <div className="space-y-4 max-w-3xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-75 flex-shrink-0"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>플레이스 순위 추적 상세</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
              키워드별 회차 순위 히스토리를 확인합니다.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/place-rank")}
          className="text-sm px-4 py-2 rounded-xl transition-all hover:opacity-75"
          style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}
        >
          ← 목록으로
        </button>
      </div>

      {isLoading ? <PageSkeleton /> : (
        <>
          {/* 기본 정보 */}
          <Section title="기본 정보">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="키워드" value={data?.keyword} />
              <Field label="등록일" value={createdAt} />

              {/* URL */}
              <div className="sm:col-span-2">
                <p className="text-[11px] mb-0.5" style={{ color: "var(--th-text-3)" }}>URL</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--th-text-1)" }}>
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
                <p className="text-[11px] mb-1" style={{ color: "var(--th-text-3)" }}>광고주</p>
                <div className="flex flex-wrap gap-1.5">
                  {data?.advertisers?.length ? data.advertisers.map((adv) => (
                    <span
                      key={adv.id}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: "rgba(99,102,241,0.12)",
                        color: "#818cf8",
                        border: "1px solid rgba(99,102,241,0.25)",
                      }}
                    >
                      {adv.company_name}
                    </span>
                  )) : (
                    <span className="text-sm" style={{ color: "var(--th-text-3)" }}>-</span>
                  )}
                </div>
              </div>

              {/* 상태 + 중단 버튼 */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] mb-1" style={{ color: "var(--th-text-3)" }}>상태</p>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: statusConfig.bg, color: statusConfig.color, border: `1px solid ${statusConfig.border}` }}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                {canStop && (
                  <button
                    onClick={handleStop}
                    disabled={stopMutation.isPending}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
                    style={{
                      background: "rgba(248,113,113,0.1)",
                      color: "#f87171",
                      border: "1px solid rgba(248,113,113,0.3)",
                    }}
                  >
                    <Square className="w-3.5 h-3.5" />
                    {stopMutation.isPending ? "처리 중..." : "중단"}
                  </button>
                )}
              </div>
            </div>
          </Section>

          {/* 순위 히스토리 */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider px-1" style={{ color: "var(--th-text-3)" }}>
              순위 히스토리
            </h3>
            {data?.rounds?.length ? (
              data.rounds.map((round) => (
                <RoundBlock key={round.round} round={round} />
              ))
            ) : (
              <div
                className="rounded-2xl border py-12 text-center text-sm"
                style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)", color: "var(--th-text-3)" }}
              >
                아직 조회된 순위 기록이 없어요.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
