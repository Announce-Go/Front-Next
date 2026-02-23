"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, AlertTriangle, Download, Eye } from "lucide-react"
import { getAdminAdvertiserDetail } from "@/Features/apis/admin/advertisers"

/* ── 카테고리 라벨 맵 ── */
const CATEGORY_LABELS: Record<string, string> = {
  place_rank:        "플레이스",
  cafe_rank:         "카페",
  blog_rank:         "블로그",
  brand_blog:        "브랜드블로그",
  press:             "언론",
  cafe_infiltration: "카페침투",
}

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

/* ── 파일 행 ── */
function FileRow({ label, file }: { label: string; file?: { original_filename: string; id: number } | null }) {
  return (
    <div
      className="flex items-center justify-between py-2.5 px-3 rounded-xl"
      style={{ background: "var(--th-table-head)", border: "1px solid var(--th-row-border)" }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: file ? "rgba(99,102,241,0.15)" : "var(--th-toggle-bg)" }}
        >
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
          <button
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-75"
            style={{ background: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}
          >
            <Download className="w-3 h-3" /> 다운로드
          </button>
          <button
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-75"
            style={{ background: "rgba(255,255,255,0.05)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}
          >
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
      {[120, 200, 180, 240].map((h, i) => (
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
export function AdminAdvertiserDetail({ advertiserId }: { advertiserId: number }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "advertiser", advertiserId],
    queryFn: () => getAdminAdvertiserDetail(advertiserId),
    staleTime: 30 * 1000,
  })

  /* 에러 */
  if (isError || (!isLoading && !data)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}
        >
          <AlertTriangle className="w-7 h-7" style={{ color: "#f87171" }} />
        </div>
        <p className="text-sm" style={{ color: "#f87171" }}>광고주 정보를 불러오지 못했어요.</p>
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
            <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>광고주 상세</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
              광고주의 기본 정보와 담당 업체 목록을 확인할 수 있어요.
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/advertisers")}
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
              <Field label="광고주명" value={data?.company_name} />
              <Field label="가입일"   value={createdAt} />
              <Field label="담당자"   value={data?.name} />
              <Field label="이메일"   value={data?.email} />
              <div className="sm:col-span-2">
                <Field label="연락처" value={data?.phone} />
              </div>
            </div>
          </Section>

          {/* 첨부 파일 */}
          <Section title="첨부 파일">
            <div className="space-y-2">
              <FileRow label="사업자등록증" file={data?.business_license_file} />
              <FileRow label="로고"         file={data?.logo_file} />
            </div>
          </Section>

          {/* 담당 업체 목록 */}
          <Section title="담당 업체 목록">
            {!data?.mapped_agencies?.length ? (
              <p className="text-sm py-4 text-center" style={{ color: "var(--th-text-3)" }}>
                매핑된 업체가 없어요.
              </p>
            ) : (
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--th-row-border)" }}>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={HEAD_ST}>
                      <th className="py-2.5 px-3 text-left font-medium">업체명</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden sm:table-cell">담당자</th>
                      <th className="py-2.5 px-3 text-left font-medium hidden md:table-cell">연락처</th>
                      <th className="py-2.5 px-3 text-left font-medium">이용 카테고리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.mapped_agencies.map((agency) => (
                      <tr
                        key={agency.agency_id}
                        className="border-t"
                        style={{ borderColor: "var(--th-row-border)" }}
                      >
                        <td className="py-2.5 px-3">
                          <p className="text-xs font-medium" style={{ color: "var(--th-text-1)" }}>
                            {agency.agency_company_name}
                          </p>
                        </td>
                        <td className="py-2.5 px-3 text-xs hidden sm:table-cell" style={{ color: "var(--th-text-2)" }}>
                          {agency.agency_name}
                        </td>
                        <td className="py-2.5 px-3 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                          {agency.phone || "-"}
                        </td>
                        <td className="py-2.5 px-3">
                          {agency.categories?.length ? (
                            <div className="flex flex-wrap gap-1">
                              {agency.categories.map((cat) => (
                                <span
                                  key={cat}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
                                >
                                  {CATEGORY_LABELS[cat] ?? cat}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs" style={{ color: "var(--th-text-3)" }}>-</span>
                          )}
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
