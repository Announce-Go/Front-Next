"use client"

import { useState, useEffect, Suspense } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, X } from "lucide-react"
import {
  getPressMonthlyList,
  createPressArticle,
  updatePressArticle,
  deletePressArticle,
} from "@/Features/apis/admin/press"
import type { PressArticle } from "@/Features/apis/admin/press"
import { getAdminAdvertisers } from "@/Features/apis/admin/advertisers"

/* ── 날짜 유틸 ── */
const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"]

function buildCalendarDays(year: number, month: number) {
  const firstDay  = new Date(year, month - 1, 1).getDay()
  const lastDate  = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= lastDate; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function toYYYYMM(year: number, month: number) {
  return `${year}-${String(month).padStart(2, "0")}`
}

function toYYYYMMDD(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
}

function formatShort(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

/* ── 폼 타입 ── */
type FormState =
  | null
  | { mode: "create" }
  | { mode: "edit"; id: number; title: string; content: string; url: string; advertiser_id: number }

/* ── HEAD_ST ── */
const HEAD_ST = {
  color: "var(--th-text-3)",
  background: "var(--th-table-head)",
  fontSize: "12px",
}

function PressContent() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  /* URL 파라미터 — month는 필수값이므로 없으면 즉시 현재 월로 redirect */
  const today = new Date()
  const defaultMonth = toYYYYMM(today.getFullYear(), today.getMonth() + 1)
  const rawMonth     = searchParams.get("month")
  const selectedDate = searchParams.get("date") ?? null

  useEffect(() => {
    if (!rawMonth) {
      const params = new URLSearchParams(window.location.search)
      params.set("month", defaultMonth)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [rawMonth, defaultMonth, pathname, router])

  const currentMonth = rawMonth ?? defaultMonth
  const [year, month] = currentMonth.split("-").map(Number)

  /* 로컬 상태 */
  const [formState, setFormState] = useState<FormState>(null)
  const [formTitle, setFormTitle]               = useState("")
  const [formContent, setFormContent]           = useState("")
  const [formUrl, setFormUrl]                   = useState("")
  const [formAdvertiserId, setFormAdvertiserId] = useState<number | "">("")

  const queryClient = useQueryClient()

  /* URL 업데이트 */
  const updateURL = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search)
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v)
      else params.delete(k)
    })
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname)
  }

  /* 월 이동 */
  const moveMonth = (dir: -1 | 1) => {
    const d = new Date(year, month - 1 + dir, 1)
    updateURL({ month: toYYYYMM(d.getFullYear(), d.getMonth() + 1), date: "" })
    setFormState(null)
  }

  /* 날짜 클릭 */
  const handleDayClick = (day: number) => {
    const dateStr = toYYYYMMDD(year, month, day)
    updateURL({ date: dateStr })
    setFormState(null)
  }

  /* 월별 기사 조회 */
  const { data: monthlyData, isLoading: monthlyLoading } = useQuery({
    queryKey: ["admin", "press", year, month],
    queryFn: () => getPressMonthlyList(year, month),
    enabled: !!year && !!month,
    staleTime: 30 * 1000,
  })

  /* 날짜별 건수 맵 */
  const countMap: Record<string, number> = {}
  monthlyData?.items?.forEach((a) => {
    countMap[a.article_date] = (countMap[a.article_date] ?? 0) + 1
  })

  /* 선택 날짜 기사 목록 */
  const selectedArticles: PressArticle[] = selectedDate
    ? (monthlyData?.items ?? []).filter((a) => a.article_date === selectedDate)
    : []

  /* 광고주 목록 (승인된) */
  const { data: advertiserData } = useQuery({
    queryKey: ["admin", "advertisers", "approved-simple"],
    queryFn: () => getAdminAdvertisers({ approval_status: "approved", page_size: 200 }),
    staleTime: 5 * 60 * 1000,
  })
  const advertisers = advertiserData?.items ?? []

  /* 폼 열기 */
  const openCreate = () => {
    setFormTitle("")
    setFormContent("")
    setFormUrl("")
    setFormAdvertiserId("")
    setFormState({ mode: "create" })
  }

  const openEdit = (article: PressArticle) => {
    setFormTitle(article.title)
    setFormContent(article.content)
    setFormUrl(article.url)
    setFormAdvertiserId(article.advertiser_id)
    setFormState({ mode: "edit", id: article.id, title: article.title, content: article.content, url: article.url, advertiser_id: article.advertiser_id })
  }

  const closeForm = () => setFormState(null)

  /* mutations */
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "press", year, month] })
  }

  const createMutation = useMutation({
    mutationFn: () => createPressArticle({
      advertiser_id: Number(formAdvertiserId),
      article_date:  selectedDate!,
      title:         formTitle.trim(),
      content:       formContent.trim(),
      url:           formUrl.trim(),
    }),
    onSuccess: () => { invalidate(); closeForm() },
  })

  const updateMutation = useMutation({
    mutationFn: () => {
      const s = formState as { mode: "edit"; id: number }
      return updatePressArticle(s.id, {
        advertiser_id: Number(formAdvertiserId),
        title:         formTitle.trim(),
        content:       formContent.trim(),
        url:           formUrl.trim(),
      })
    },
    onSuccess: () => { invalidate(); closeForm() },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePressArticle(id),
    onSuccess: () => invalidate(),
  })

  const handleSave = () => {
    if (!formTitle.trim() || !formContent.trim() || !formAdvertiserId) return
    if (formState?.mode === "create") createMutation.mutate()
    else if (formState?.mode === "edit") updateMutation.mutate()
  }

  const handleDelete = (id: number) => {
    if (!confirm("기사를 삭제하시겠어요?")) return
    deleteMutation.mutate(id)
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  /* 캘린더 */
  const calendarDays = buildCalendarDays(year, month)

  return (
    <div className="space-y-5">
      {/* 헤더 */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--th-text-1)" }}>언론 기사 관리</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--th-text-3)" }}>
          날짜를 클릭하여 기사를 조회하고 등록·수정·삭제할 수 있습니다.
        </p>
      </div>

      {/* ━━━ 캘린더 ━━━ */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
      >
        {/* 월 헤더 */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "var(--th-row-border)" }}
        >
          <button
            onClick={() => moveMonth(-1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>
          <span className="text-sm font-semibold" style={{ color: "var(--th-text-1)" }}>
            {year}년 {month}월
          </span>
          <button
            onClick={() => moveMonth(1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
            style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: "var(--th-text-2)" }} />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b" style={{ borderColor: "var(--th-row-border)" }}>
          {DAY_LABELS.map((label, i) => (
            <div
              key={label}
              className="py-2 text-center text-[11px] font-medium"
              style={{
                color: i === 0 ? "#f87171" : i === 6 ? "#60a5fa" : "var(--th-text-3)",
                background: "var(--th-table-head)",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        {monthlyLoading ? (
          <div className="py-10 text-center text-sm" style={{ color: "var(--th-text-3)" }}>
            로딩 중...
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[56px] border-b border-r"
                    style={{ borderColor: "var(--th-row-border)" }}
                  />
                )
              }
              const dateStr = toYYYYMMDD(year, month, day)
              const count   = countMap[dateStr] ?? 0
              const isSelected = dateStr === selectedDate
              const isToday = dateStr === toYYYYMMDD(today.getFullYear(), today.getMonth() + 1, today.getDate())
              const col = idx % 7

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(day)}
                  className="min-h-[56px] border-b border-r flex flex-col items-center pt-2 pb-1 gap-1 transition-all"
                  style={{
                    borderColor: "var(--th-row-border)",
                    background: isSelected
                      ? "rgba(99,102,241,0.1)"
                      : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "var(--th-row-hover)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = ""
                  }}
                >
                  {/* 날짜 숫자 */}
                  <span
                    className="text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full"
                    style={{
                      color: (isSelected || isToday) ? "white" : col === 0 ? "#f87171" : col === 6 ? "#60a5fa" : "var(--th-text-1)",
                      background: isSelected ? "#6366f1" : isToday ? "#06b6d4" : undefined,
                      fontWeight: isToday || isSelected ? 700 : undefined,
                    }}
                  >
                    {day}
                  </span>

                  {/* 건수 도트 */}
                  {count > 0 && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: isSelected ? "rgba(255,255,255,0.25)" : "rgba(99,102,241,0.15)",
                        color: isSelected ? "white" : "#818cf8",
                      }}
                    >
                      {count}건
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ━━━ 선택된 날짜 기사 목록 ━━━ */}
      {selectedDate && (
        <div className="space-y-3">
          {/* 날짜 + 추가 버튼 */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: "var(--th-text-1)" }}>
              {formatDisplayDate(selectedDate)}의 기사
              <span className="ml-1.5 text-xs font-normal" style={{ color: "var(--th-text-3)" }}>
                ({selectedArticles.length}건)
              </span>
            </h2>
            {formState === null && (
              <button
                onClick={openCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", color: "white" }}
              >
                <Plus className="w-3.5 h-3.5" /> 추가
              </button>
            )}
          </div>

          {/* 기사 테이블 */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
          >
            {selectedArticles.length === 0 ? (
              <div className="py-10 text-center text-sm" style={{ color: "var(--th-text-3)" }}>
                이 날짜에 등록된 기사가 없어요.
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={HEAD_ST}>
                    <th className="py-3 px-4 text-left font-medium border-b" style={{ borderColor: "var(--th-row-border)" }}>내용</th>
                    <th className="py-3 px-4 text-left font-medium border-b hidden sm:table-cell" style={{ borderColor: "var(--th-row-border)" }}>광고주</th>
                    <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>업체</th>
                    <th className="py-3 px-4 text-left font-medium border-b hidden md:table-cell" style={{ borderColor: "var(--th-row-border)" }}>등록일</th>
                    <th className="py-3 px-4 border-b" style={{ borderColor: "var(--th-row-border)" }} />
                  </tr>
                </thead>
                <tbody>
                  {selectedArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-t"
                      style={{ borderColor: "var(--th-row-border)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--th-row-hover)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "" }}
                    >
                      <td className="py-3 px-4">
                        <p className="text-sm line-clamp-2" style={{ color: "var(--th-text-1)" }}>
                          {article.content}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-xs hidden sm:table-cell" style={{ color: "var(--th-text-2)" }}>
                        {article.advertiser_company_name || "-"}
                      </td>
                      <td className="py-3 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                        {article.agency_company_name || "-"}
                      </td>
                      <td className="py-3 px-4 text-xs hidden md:table-cell" style={{ color: "var(--th-text-3)" }}>
                        {formatShort(article.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(article)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                            style={{
                              background: "rgba(99,102,241,0.1)",
                              color: "#818cf8",
                              border: "1px solid rgba(99,102,241,0.25)",
                            }}
                          >
                            <Pencil className="w-3 h-3" /> 수정
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            disabled={deleteMutation.isPending}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
                            style={{
                              background: "rgba(248,113,113,0.1)",
                              color: "#f87171",
                              border: "1px solid rgba(248,113,113,0.25)",
                            }}
                          >
                            <Trash2 className="w-3 h-3" /> 삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ━━━ 인라인 폼 ━━━ */}
          {formState !== null && (
            <div
              className="rounded-2xl border p-5 space-y-4"
              style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold" style={{ color: "var(--th-text-1)" }}>
                  {formatDisplayDate(selectedDate)} — 기사 {formState.mode === "create" ? "등록" : "수정"}
                </h3>
                <button
                  onClick={closeForm}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
                  style={{ background: "var(--th-toggle-bg)", border: "1px solid var(--th-toggle-border)" }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: "var(--th-text-2)" }} />
                </button>
              </div>

              {/* 날짜 (읽기 전용) */}
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: "var(--th-text-3)" }}>날짜</label>
                <div
                  className="px-3 py-2 rounded-[10px] text-sm"
                  style={{
                    background: "var(--th-table-head)",
                    border: "1px solid var(--th-row-border)",
                    color: "var(--th-text-2)",
                  }}
                >
                  {selectedDate}
                </div>
              </div>

              {/* 제목 */}
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: "var(--th-text-3)" }}>
                  제목 <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="기사 제목을 입력하세요..."
                  className="w-full px-3 py-2 rounded-[10px] text-sm outline-none transition-all"
                  style={{
                    background: "var(--th-input-bg)",
                    border: "1px solid var(--th-input-border)",
                    color: "var(--th-text-1)",
                  }}
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: "var(--th-text-3)" }}>
                  내용 <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="기사 내용을 입력하세요..."
                  className="w-full px-3 py-2 rounded-[10px] text-sm outline-none transition-all resize-none"
                  style={{
                    background: "var(--th-input-bg)",
                    border: "1px solid var(--th-input-border)",
                    color: "var(--th-text-1)",
                  }}
                />
              </div>

              {/* URL */}
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: "var(--th-text-3)" }}>
                  URL
                </label>
                <input
                  type="text"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-[10px] text-sm outline-none transition-all"
                  style={{
                    background: "var(--th-input-bg)",
                    border: "1px solid var(--th-input-border)",
                    color: "var(--th-text-1)",
                  }}
                />
              </div>

              {/* 광고주 선택 */}
              <div>
                <label className="text-[11px] mb-1 block" style={{ color: "var(--th-text-3)" }}>
                  광고주 선택 <span style={{ color: "#f87171" }}>*</span>
                </label>
                <select
                  value={formAdvertiserId}
                  onChange={(e) => setFormAdvertiserId(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-[10px] text-sm outline-none transition-all"
                  style={{
                    background: "var(--th-input-bg)",
                    border: "1px solid var(--th-input-border)",
                    color: formAdvertiserId === "" ? "var(--th-text-3)" : "var(--th-text-1)",
                  }}
                >
                  <option value="">광고주를 선택하세요</option>
                  {advertisers.map((adv) => (
                    <option key={adv.id} value={adv.id}>
                      {adv.company_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 버튼 */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={closeForm}
                  className="px-4 py-2 rounded-xl text-sm transition-all hover:opacity-75"
                  style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formContent.trim() || !formAdvertiserId || isPending}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)", color: "white" }}
                >
                  {isPending ? "저장 중..." : "저장"}
                </button>
              </div>

              {(createMutation.isError || updateMutation.isError) && (
                <p className="text-xs text-center" style={{ color: "#f87171" }}>
                  저장에 실패했어요. 다시 시도해주세요.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function PressPage() {
  return (
    <Suspense>
      <PressContent />
    </Suspense>
  )
}
