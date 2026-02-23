"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { getAdminAgencyDetail } from "@/Features/apis/admin/agencies"

/* ── 카테고리 전체 목록 ── */
const ALL_CATEGORIES = [
  { key: "place_rank",        label: "플레이스 순위",     color: "#34d399" },
  { key: "cafe_rank",         label: "카페 글 순위",       color: "#fb923c" },
  { key: "blog_rank",         label: "블로그 글 순위",     color: "#2dd4bf" },
  { key: "brand_blog",        label: "블로그 포스팅 기록", color: "#f472b6" },
  { key: "press",             label: "언론 기사",          color: "#94a3b8" },
  { key: "cafe_infiltration", label: "카페 침투",          color: "#818cf8" },
]

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

/* ── 스켈레톤 ── */
function PageSkeleton() {
  return (
    <div className="space-y-4">
      {[120, 260, 300].map((h, i) => (
        <div
          key={i}
          className="rounded-2xl border animate-pulse"
          style={{ height: `${h}px`, background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
        />
      ))}
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export function AdminAgencyDetail({ agencyId }: { agencyId: number }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "agency", agencyId],
    queryFn: () => getAdminAgencyDetail(agencyId),
    staleTime: 30 * 1000,
  })

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
        <p className="text-sm" style={{ color: "#f87171" }}>업체 정보를 불러오지 못했어요.</p>
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
            <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>업체 상세</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
              업체의 기본 정보와 담당 광고주 목록을 확인할 수 있어요.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/agencies")}
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
              <Field label="업체명" value={data?.company_name} />
              <Field label="가입일" value={createdAt} />
              <Field label="담당자" value={data?.name} />
              <Field label="이메일" value={data?.email} />
              <div className="sm:col-span-2">
                <Field label="연락처" value={data?.phone} />
              </div>
            </div>
          </Section>

          {/* 이용 카테고리 */}
          <Section title="이용 카테고리">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_CATEGORIES.map(({ key, label, color }) => {
                const checked = data?.categories?.includes(key) ?? false
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                    style={{
                      background: checked ? `${color}18` : "var(--th-table-head)",
                      border: `1px solid ${checked ? `${color}40` : "var(--th-row-border)"}`,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        background: checked ? color : "transparent",
                        border: `1.5px solid ${checked ? color : "var(--th-text-3)"}`,
                      }}
                    >
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

          {/* 담당 광고주 목록 */}
          <Section title="담당 광고주 목록">
            {!data?.mapped_advertisers?.length ? (
              <p className="text-sm py-4 text-center" style={{ color: "var(--th-text-3)" }}>
                매핑된 광고주가 없어요.
              </p>
            ) : (
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--th-row-border)" }}>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={HEAD_ST}>
                      <th className="py-2.5 px-3 text-left font-medium">광고주명</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden sm:table-cell">담당자</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden md:table-cell">연락처</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden md:table-cell">이메일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.mapped_advertisers.map((adv) => (
                      <tr
                        key={adv.advertiser_id}
                        className="border-t"
                        style={{ borderColor: "var(--th-row-border)" }}
                      >
                        <td className="py-2.5 px-3">
                          <p className="text-xs font-medium" style={{ color: "var(--th-text-1)" }}>
                            {adv.advertiser_company_name}
                          </p>
                        </td>
                        <td className="py-2.5 px-3 text-xs hidden sm:table-cell" style={{ color: "var(--th-text-2)" }}>
                          {adv.advertiser_name}
                        </td>
                        <td className="py-2.5 px-3 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                          {adv.phone || "-"}
                        </td>
                        <td className="py-2.5 px-3 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                          {adv.email || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>
        </>
      )}
    </div>
  )
}
