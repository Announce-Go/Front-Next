"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {
  getSignupRequestDetail,
  approveSignupRequest,
  rejectSignupRequest,
} from "@/Features/apis/admin/signupRequests"
import { getAdminAdvertisers } from "@/Features/apis/admin/advertisers"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type Props = { userId: number }

/* ── 상수 ── */
const ALL_CATEGORIES = [
  { key: "place_rank",        label: "플레이스 순위",      color: "#34d399" },
  { key: "cafe_rank",         label: "카페 글 순위",        color: "#fb923c" },
  { key: "blog_rank",         label: "블로그 글 순위",      color: "#2dd4bf" },
  { key: "brand_blog",        label: "블로그 포스팅 기록",  color: "#f472b6" },
  { key: "press",             label: "언론 기사",           color: "#94a3b8" },
  { key: "cafe_infiltration", label: "카페 침투",           color: "#818cf8" },
]

const BORDER  = { borderColor: "var(--th-row-border)" }
const HEAD_ST = {
  color: "var(--th-text-3)",
  background: "var(--th-table-head)",
  borderColor: "var(--th-row-border)",
  fontSize: "12px",
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

/* ── 상태 뱃지 ── */
function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    pending:  { label: "승인 대기", bg: "rgba(251,146,60,0.15)",  color: "#fb923c", border: "rgba(251,146,60,0.3)"  },
    approved: { label: "승인 완료", bg: "rgba(52,211,153,0.15)",  color: "#34d399", border: "rgba(52,211,153,0.3)"  },
    rejected: { label: "거절",      bg: "rgba(248,113,113,0.15)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
  }
  const s = map[status ?? "pending"] ?? map["pending"]
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
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

/* ── 파일 행 ── */
function FileRow({ label, file }: { label: string; file?: { original_filename: string; id: number } | null }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl"
      style={{ background: "var(--th-table-head)", border: "1px solid var(--th-row-border)" }}>
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: file ? "rgba(99,102,241,0.15)" : "var(--th-toggle-bg)" }}>
          <span className="text-[9px] font-bold" style={{ color: file ? "#818cf8" : "var(--th-text-3)" }}>FILE</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px]" style={{ color: "var(--th-text-3)" }}>{label}</p>
          <p className="text-xs font-medium truncate" style={{ color: file ? "var(--th-text-1)" : "var(--th-text-3)" }}>
            {file ? file.original_filename : "첨부된 파일이 없어요."}
          </p>
        </div>
      </div>
      {file && (
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-75"
            style={{ background: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>
            <Download className="w-3 h-3" /> 다운로드
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.05)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}>
            <Eye className="w-3 h-3" /> 미리보기
          </button>
        </div>
      )}
    </div>
  )
}

/* ── 스켈레톤 ── */
function PageSkeleton() {
  return (
    <div className="space-y-4">
      {[120, 200, 160, 200].map((h, i) => (
        <div key={i} className="rounded-2xl border animate-pulse"
          style={{ height: `${h}px`, background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }} />
      ))}
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export function AdminSignupRequestDetail({ userId }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [result, setResult]                     = useState<"approved" | "rejected" | null>(null)
  const [selectedIds, setSelectedIds]           = useState<number[]>([])
  const [showWarning, setShowWarning]           = useState(false)
  const [advertiserSearch, setAdvertiserSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch]   = useState("")
  const [advertiserPage, setAdvertiserPage]     = useState(1)

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(advertiserSearch); setAdvertiserPage(1) }, 400)
    return () => clearTimeout(t)
  }, [advertiserSearch])

  /* ── 신청 상세 조회 ── */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "signup-request", userId],
    queryFn: () => getSignupRequestDetail(userId),
    staleTime: 30 * 1000,
  })

  const isAgency = data?.role === "agency"

  /* ── 광고주 목록 (업체인 경우만) ── */
  const { data: advData } = useQuery({
    queryKey: ["admin", "advertisers-approved", { search: debouncedSearch, page: advertiserPage }],
    queryFn: () => getAdminAdvertisers({
      approval_status: "approved",
      search: debouncedSearch || undefined,
      page: advertiserPage,
      page_size: 5,
    }),
    enabled: !!data && isAgency,
    staleTime: 30 * 1000,
  })

  /* ── Mutations ── */
  const approveMutation = useMutation({
    mutationFn: () => approveSignupRequest(userId, isAgency ? { advertiser_ids: selectedIds } : undefined),
    onSuccess: () => {
      setResult("approved")
      queryClient.invalidateQueries({ queryKey: ["admin", "signup-requests"] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: () => rejectSignupRequest(userId),
    onSuccess: () => {
      setResult("rejected")
      queryClient.invalidateQueries({ queryKey: ["admin", "signup-requests"] })
    },
  })

  const isMutating = approveMutation.isPending || rejectMutation.isPending

  const handleApprove = () => {
    if (isAgency && selectedIds.length === 0) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    approveMutation.mutate()
  }

  const toggleAdvertiser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setShowWarning(false)
  }

  /* ── 처리 완료 화면 ── */
  if (result) {
    const isApproved = result === "approved"
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: isApproved ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
            border: `1px solid ${isApproved ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
          }}>
          {isApproved
            ? <CheckCircle2 className="w-8 h-8" style={{ color: "#34d399" }} />
            : <XCircle className="w-8 h-8" style={{ color: "#f87171" }} />}
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold mb-1" style={{ color: "var(--th-text-1)" }}>
            {isApproved ? "승인이 완료됐어요." : "반려가 완료됐어요."}
          </p>
          <p className="text-sm" style={{ color: "var(--th-text-3)" }}>
            {isApproved ? "해당 계정이 활성화됐어요." : "해당 가입 요청이 반려됐어요."}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/signup-requests")}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-80"
          style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>
          목록으로 돌아가기
        </button>
      </div>
    )
  }

  /* ── 에러 화면 ── */
  if (isError || (!isLoading && !data)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
          <AlertTriangle className="w-7 h-7" style={{ color: "#f87171" }} />
        </div>
        <p className="text-sm" style={{ color: "#f87171" }}>승인 요청 정보를 불러오지 못했어요.</p>
        <button onClick={() => router.back()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-75"
          style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}>
          <ArrowLeft className="w-4 h-4" /> 이전 페이지로
        </button>
      </div>
    )
  }

  const createdAt = data?.created_at
    ? new Date(data.created_at).toLocaleString("ko-KR")
    : "-"
  const pagination = advData?.pagination

  return (
    <div className="space-y-4 max-w-3xl">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:opacity-75 flex-shrink-0"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}>
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>회원가입 승인 상세</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
              가입 요청 정보를 확인하고 승인 또는 반려할 수 있어요.
            </p>
          </div>
        </div>
        <button onClick={() => router.push("/admin/signup-requests")}
          className="text-sm px-4 py-2 rounded-xl transition-all hover:opacity-75"
          style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}>
          ← 목록으로
        </button>
      </div>

      {isLoading ? <PageSkeleton /> : (
        <>
          {/* 신청 정보 */}
          <Section title="신청 정보">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Field label="구분" value={undefined} />
                {data?.role && <RoleBadge role={data.role} />}
              </div>
              <Field label="신청일" value={createdAt} />
              <div>
                <p className="text-[11px] mb-1" style={{ color: "var(--th-text-3)" }}>상태</p>
                <StatusBadge status={data?.approval_status ?? "pending"} />
              </div>
            </div>
          </Section>

          {/* 기본 정보 */}
          <Section title="기본 정보">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="아이디" value={data?.login_id} />
              <Field label={isAgency ? "업체명" : "광고주명"} value={data?.company_name} />
              <Field label="담당자" value={data?.name} />
              <Field label="연락처" value={data?.phone} />
              <div className="sm:col-span-2">
                <Field label="이메일" value={data?.email} />
              </div>
            </div>
          </Section>

          {/* 이용 카테고리 (업체만) */}
          {isAgency && (
            <Section title="이용 카테고리">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_CATEGORIES.map(({ key, label, color }) => {
                  const checked = data?.categories?.includes(key) ?? false
                  return (
                    <div key={key} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                      style={{
                        background: checked ? `${color}18` : "var(--th-table-head)",
                        border: `1px solid ${checked ? `${color}40` : "var(--th-row-border)"}`,
                      }}>
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                        style={{
                          background: checked ? color : "transparent",
                          border: `1.5px solid ${checked ? color : "var(--th-text-3)"}`,
                        }}>
                        {checked && (
                          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
                            <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-medium" style={{ color: checked ? color : "var(--th-text-3)" }}>
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Section>
          )}

          {/* 첨부 파일 */}
          <Section title="첨부 파일">
            <div className="space-y-2">
              <FileRow label="사업자등록증" file={data?.business_license_file} />
              {!isAgency && <FileRow label="로고" file={data?.logo_file} />}
            </div>
          </Section>

          {/* 담당 광고주 설정 (업체만) */}
          {isAgency && (
            <Section title="담당 광고주 설정">
              {/* 검색 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--th-text-3)" }} />
                <input
                  type="text"
                  placeholder="광고주명 검색..."
                  value={advertiserSearch}
                  onChange={(e) => setAdvertiserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--th-input-bg)",
                    border: "1px solid var(--th-input-border)",
                    color: "var(--th-text-1)",
                  }}
                />
              </div>

              {/* 테이블 */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--th-row-border)" }}>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={HEAD_ST}>
                      <th className="w-10 py-2.5 px-3 text-left font-medium">선택</th>
                      <th className="py-2.5 px-3 text-left font-medium">광고주명</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden sm:table-cell">담당자</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden md:table-cell">연락처</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden md:table-cell">승인일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advData?.items.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs" style={{ color: "var(--th-text-3)" }}>
                          검색 결과가 없어요.
                        </td>
                      </tr>
                    )}
                    {(advData?.items ?? []).map((adv) => {
                      const checked = selectedIds.includes(adv.id)
                      return (
                        <tr key={adv.id} onClick={() => toggleAdvertiser(adv.id)}
                          className="cursor-pointer transition-colors"
                          style={{ borderTop: "1px solid var(--th-row-border)", background: checked ? "rgba(6,182,212,0.05)" : "" }}
                          onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "var(--th-row-hover)" }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = checked ? "rgba(6,182,212,0.05)" : "" }}>
                          <td className="py-2.5 px-3">
                            <div className="w-4 h-4 rounded flex items-center justify-center"
                              style={{
                                background: checked ? "#06b6d4" : "transparent",
                                border: `1.5px solid ${checked ? "#06b6d4" : "var(--th-text-3)"}`,
                              }}>
                              {checked && (
                                <svg viewBox="0 0 10 8" className="w-2.5 h-2.5" fill="none">
                                  <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <div>
                              <p className="font-medium text-xs" style={{ color: "var(--th-text-1)" }}>{adv.company_name}</p>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 hidden sm:table-cell text-xs" style={{ color: "var(--th-text-2)" }}>
                            {adv.name}
                          </td>
                          <td className="py-2.5 px-3 hidden md:table-cell text-xs" style={{ color: "var(--th-text-3)" }}>-</td>
                          <td className="py-2.5 px-3 hidden md:table-cell text-xs" style={{ color: "var(--th-text-3)" }}>
                            {adv.created_at ? new Date(adv.created_at).toLocaleDateString("ko-KR") : "-"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-1">
                  <button disabled={!pagination.has_prev} onClick={() => setAdvertiserPage((p) => p - 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75 disabled:opacity-30"
                    style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}>
                    <ChevronLeft className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
                  </button>
                  {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setAdvertiserPage(p)}
                      className="w-8 h-8 rounded-lg text-xs font-medium transition-all hover:opacity-75"
                      style={{
                        background: p === advertiserPage ? "linear-gradient(90deg, #06b6d4, #6366f1)" : "var(--th-toggle-bg)",
                        color: p === advertiserPage ? "white" : "var(--th-text-2)",
                        border: p === advertiserPage ? "none" : "1px solid var(--th-toggle-border)",
                      }}>
                      {p}
                    </button>
                  ))}
                  <button disabled={!pagination.has_next} onClick={() => setAdvertiserPage((p) => p + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75 disabled:opacity-30"
                    style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}>
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
                  </button>
                </div>
              )}

              {/* 선택 현황 */}
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: "var(--th-text-3)" }}>
                  선택된 광고주:{" "}
                  <span style={{ color: selectedIds.length > 0 ? "#06b6d4" : "var(--th-text-3)", fontWeight: 600 }}>
                    {selectedIds.length}개
                  </span>
                </p>
                <p className="text-xs" style={{ color: "var(--th-text-3)" }}>
                  ※ 업체 승인 시 최소 1개 이상의 광고주를 선택해야 해요.
                </p>
              </div>

              {/* 광고주 미선택 경고 */}
              {showWarning && (
                <div className="rounded-xl p-3 border flex items-center gap-2 text-xs"
                  style={{ background: "rgba(251,146,60,0.1)", borderColor: "rgba(251,146,60,0.3)", color: "#fb923c" }}>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  담당 광고주를 1개 이상 선택해야 승인할 수 있어요.
                </div>
              )}
            </Section>
          )}

          {/* API 에러 */}
          {(approveMutation.isError || rejectMutation.isError) && (
            <div className="rounded-xl p-3 border text-sm text-center"
              style={{ background: "rgba(248,113,113,0.1)", borderColor: "rgba(248,113,113,0.3)", color: "#f87171" }}>
              처리 중 오류가 발생했어요. 다시 시도해 주세요.
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {/* 반려 */}
            <button
              onClick={() => rejectMutation.mutate()}
              disabled={isMutating}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: "rgba(248,113,113,0.12)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)" }}>
              {rejectMutation.isPending
                ? <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                : <XCircle className="w-4 h-4" />}
              반려
            </button>

            {/* 승인 */}
            <button
              onClick={handleApprove}
              disabled={isMutating}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>
              {approveMutation.isPending
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <CheckCircle2 className="w-4 h-4" />}
              승인
            </button>
          </div>
        </>
      )}
    </div>
  )
}
