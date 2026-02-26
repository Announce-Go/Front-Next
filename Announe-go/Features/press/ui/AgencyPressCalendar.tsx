"use client"

import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { http } from "@/Featchs/api/http"
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from "lucide-react"

type PressArticle = {
  id: number
  title: string
  advertiser_name?: string
  media?: string
  url?: string
  date: string // YYYY-MM-DD
}

type PressListResponse = {
  items: PressArticle[]
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"]

export function AgencyPressCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0~11

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDayOfWeek = new Date(year, month, 1).getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyBefore = Array.from({ length: startDayOfWeek })

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }
  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  // 월별 기사 목록 조회
  const { data, isLoading } = useQuery<PressListResponse>({
    queryKey: ["agency", "press", year, month + 1],
    queryFn: async () => {
      const res = await http.get<PressListResponse>("/api/v1/agency/press", {
        params: { year, month: month + 1 },
      })
      return res.data
    },
    staleTime: 60 * 1000,
  })

  const allArticles = data?.items ?? []

  // 날짜별 그룹화
  const articlesByDay = useMemo(() => {
    const map: Record<number, PressArticle[]> = {}
    for (const article of allArticles) {
      const d = new Date(article.date)
      if (d.getFullYear() !== year || d.getMonth() !== month) continue
      const day = d.getDate()
      if (!map[day]) map[day] = []
      map[day].push(article)
    }
    return map
  }, [allArticles, year, month])

  const selectedArticles = selectedDay ? (articlesByDay[selectedDay] ?? []) : []

  return (
    <div className="space-y-6">
      {/* 캘린더 */}
      <div
        className="rounded-2xl border backdrop-blur-sm overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        {/* 캘린더 헤더 */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </button>
            <h2 className="text-base font-bold text-white tabular-nums">
              {year}년 {month + 1}월
            </h2>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-75"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </button>
          </div>

          {isLoading && (
            <span className="text-xs" style={{ color: "#475569" }}>불러오는 중...</span>
          )}

          {/* 범례 */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
            />
            <span className="text-xs" style={{ color: "#475569" }}>기사 있음</span>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 px-4 pt-3 pb-1">
          {DAY_NAMES.map((name, i) => (
            <div
              key={name}
              className="text-center text-[11px] font-semibold py-1"
              style={{
                color: i === 0 ? "#f87171" : i === 6 ? "#60a5fa" : "#475569",
              }}
            >
              {name}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1 px-4 pb-4">
          {/* 이전 달 빈칸 */}
          {emptyBefore.map((_, i) => (
            <div key={`empty-${i}`} className="h-14 sm:h-16" />
          ))}

          {/* 이번 달 날짜 */}
          {days.map((day) => {
            const dayArticles = articlesByDay[day] ?? []
            const isSelected = selectedDay === day
            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year
            const dow = new Date(year, month, day).getDay()

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className="h-14 sm:h-16 rounded-xl flex flex-col items-center justify-start pt-2 gap-1 transition-all hover:opacity-80 relative"
                style={{
                  background: isSelected
                    ? "rgba(6,182,212,0.15)"
                    : "rgba(255,255,255,0.03)",
                  border: isSelected
                    ? "1px solid rgba(6,182,212,0.4)"
                    : "1px solid rgba(255,255,255,0.05)",
                  outline: "none",
                }}
              >
                {/* 날짜 숫자 */}
                <span
                  className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    background: isToday
                      ? "linear-gradient(135deg, #06b6d4, #6366f1)"
                      : "transparent",
                    color: isToday
                      ? "#ffffff"
                      : dow === 0
                      ? "#f87171"
                      : dow === 6
                      ? "#60a5fa"
                      : "#cbd5e1",
                  }}
                >
                  {day}
                </span>

                {/* 기사 건수 뱃지 */}
                {dayArticles.length > 0 && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tabular-nums"
                    style={{
                      background: "linear-gradient(90deg, rgba(6,182,212,0.3), rgba(99,102,241,0.3))",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.3)",
                    }}
                  >
                    {dayArticles.length}건
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 선택된 날짜의 기사 목록 */}
      {selectedDay !== null && (
        <div
          className="rounded-2xl border backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          {/* 섹션 헤더 */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" style={{ color: "#06b6d4" }} />
              <h3 className="text-sm font-semibold text-white">
                {month + 1}월 {selectedDay}일의 언론 기사
              </h3>
              {selectedArticles.length > 0 && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "rgba(6,182,212,0.15)",
                    color: "#06b6d4",
                    border: "1px solid rgba(6,182,212,0.3)",
                  }}
                >
                  {selectedArticles.length}건
                </span>
              )}
            </div>
          </div>

          {/* 기사 목록 */}
          {selectedArticles.length === 0 ? (
            <div
              className="py-14 text-center text-sm"
              style={{ color: "#475569" }}
            >
              이 날짜에 등록된 언론 기사가 없어요.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["내용", "광고주", "언론사", "등록일", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: "#475569" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = ""
                    }}
                  >
                    <td className="px-5 py-3.5 font-semibold text-white max-w-[280px]">
                      <p className="truncate">{article.title}</p>
                    </td>

                    <td className="px-5 py-3.5">
                      {article.advertiser_name ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                            style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}
                          >
                            {article.advertiser_name[0].toUpperCase()}
                          </div>
                          <span className="text-sm" style={{ color: "#94a3b8" }}>
                            {article.advertiser_name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: "#475569" }}>-</span>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-sm" style={{ color: "#94a3b8" }}>
                        {article.media || "-"}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-xs tabular-nums" style={{ color: "#475569" }}>
                        {new Date(article.date).toLocaleDateString("ko-KR", {
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-60"
                          style={{ color: "#06b6d4" }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
