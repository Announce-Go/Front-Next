"use client"

import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { http } from "@/Featchs/api/http"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Megaphone,
  Newspaper,
  Trash2,
} from "lucide-react"

type PressArticle = {
  id: number
  title: string
  content?: string
  media?: string
  status?: string
  // ISO 날짜 문자열 (예: 2026-02-17)
  date: string
}

type AgencyPressListResponse = {
  items: PressArticle[]
}

// 간단한 한국 공휴일 예시 (필요 시 확장 가능)
const KOREAN_HOLIDAYS = new Set<string>([
  "2026-01-01", // 신정
  "2026-03-01", // 삼일절
  "2026-05-05", // 어린이날
  "2026-06-06", // 현충일
  "2026-08-15", // 광복절
  "2026-10-03", // 개천절
  "2026-10-09", // 한글날
  "2026-12-25", // 성탄절
])

function isHoliday(date: Date) {
  const key = date.toISOString().slice(0, 10)
  return KOREAN_HOLIDAYS.has(key)
}

export default function AgencyPressPage() {
  const queryClient = useQueryClient()

  // 오늘 날짜 기준
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())

  // 우측 편집 폼 상태
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formMedia, setFormMedia] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0 ~ 11

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDayOfWeek = new Date(year, month, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i)

  const handlePrevMonth = () => {
    const next = new Date(year, month - 1, 1)
    setCurrentDate(next)
    setSelectedDay(null)
    resetForm()
  }

  const handleNextMonth = () => {
    const next = new Date(year, month + 1, 1)
    setCurrentDate(next)
    setSelectedDay(null)
    resetForm()
  }

  const resetForm = () => {
    setEditingId(null)
    setFormTitle("")
    setFormContent("")
    setFormMedia("")
  }

  // 언론 기사 목록 조회 (월별)
  const pressQuery = useQuery<AgencyPressListResponse>({
    queryKey: ["agency", "press", { year, month: month + 1 }],
    queryFn: async () => {
      const res = await http.get<AgencyPressListResponse>("/api/v1/agency/press", {
        params: {
          year,
          month: month + 1,
        },
      })
      return res.data
    },
    staleTime: 30 * 1000,
  })

  const allArticles = pressQuery.data?.items ?? []

  // 날짜별로 기사 그룹화
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

  const selectedArticles =
    selectedDay && articlesByDay[selectedDay] ? articlesByDay[selectedDay] : []

  // 생성/수정 mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDay) {
        throw new Error("날짜를 먼저 선택해주세요.")
      }

      const date = new Date(year, month, selectedDay)
      const payload = {
        title: formTitle.trim(),
        content: formContent.trim() || undefined,
        media: formMedia.trim() || undefined,
        date: date.toISOString().slice(0, 10),
      }

      if (!payload.title) {
        throw new Error("제목을 입력해주세요.")
      }

      if (editingId) {
        const res = await http.put(`/api/v1/agency/press/${editingId}`, payload)
        return res.data
      } else {
        const res = await http.post("/api/v1/agency/press", payload)
        return res.data
      }
    },
    onSuccess: async () => {
      resetForm()
      await queryClient.invalidateQueries({
        queryKey: ["agency", "press", { year, month: month + 1 }],
      })
    },
  })

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await http.delete(`/api/v1/agency/press/${id}`)
      return res.data
    },
    onSuccess: async () => {
      if (editingId) resetForm()
      await queryClient.invalidateQueries({
        queryKey: ["agency", "press", { year, month: month + 1 }],
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDay) return
    saveMutation.mutate()
  }

  const handleEditClick = (article: PressArticle) => {
    const d = new Date(article.date)
    setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1))
    setSelectedDay(d.getDate())
    setEditingId(article.id)
    setFormTitle(article.title)
    setFormContent(article.content || "")
    setFormMedia(article.media || "")
  }

  const handleNewForSelectedDay = () => {
    resetForm()
    if (!selectedDay) {
      setSelectedDay(today.getDate())
    }
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-slate-700" />
            언론 기사 캘린더
          </h1>
          <p className="text-muted-foreground mt-1">
            구글 캘린더 느낌으로 월별 언론 기사 일정을 한 눈에 확인하고 관리합니다.
          </p>
        </div>
        <Button
          type="button"
          className="bg-slate-900 text-white hover:bg-slate-800"
          onClick={handleNewForSelectedDay}
        >
          <FileText className="w-4 h-4 mr-2" />
          새 기사 작성
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 메인 캘린더 */}
        <Card className="xl:col-span-2 shadow-sm border-t-4 border-t-slate-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-slate-500" />
                  {year}년 {month + 1}월
                </CardTitle>
                <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handlePrevMonth}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  송출 완료
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  예정 / 작성 중
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* 요일 헤더 (한글) */}
            <div className="grid grid-cols-7 mb-2 text-center">
              {["일", "월", "화", "수", "목", "금", "토"].map((dayName, i) => (
                <div
                  key={dayName}
                  className={`text-sm font-semibold py-2 ${
                    i === 0
                      ? "text-red-500"
                      : i === 6
                      ? "text-blue-500"
                      : "text-slate-500"
                  }`}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-2">
              {/* 지난달 빈칸 */}
              {emptyDays.map((empty) => (
                <div
                  key={`empty-${empty}`}
                  className="h-24 sm:h-28 bg-slate-50/40 rounded-lg"
                />
              ))}

              {/* 이번달 날짜 */}
              {days.map((day) => {
                const dateObj = new Date(year, month, day)
                const dayArticles = articlesByDay[day] ?? []
                const isSelected = selectedDay === day
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === month &&
                  today.getFullYear() === year

                const dayOfWeek = dateObj.getDay()
                const holiday = isHoliday(dateObj)

                const dayColorClass = holiday
                  ? "text-red-500"
                  : dayOfWeek === 0
                  ? "text-red-500"
                  : dayOfWeek === 6
                  ? "text-blue-500"
                  : "text-slate-700"

                return (
                  <div
                    key={day}
                    onClick={() => {
                      setSelectedDay(day)
                      resetForm()
                    }}
                    className={`
                      relative h-24 sm:h-28 p-2 border rounded-lg cursor-pointer transition-all hover:shadow-md
                      ${
                        isSelected
                          ? "border-2 border-slate-900 bg-slate-50 ring-2 ring-slate-200 ring-offset-2 z-10"
                          : "border-slate-100 bg-white hover:border-slate-300"
                      }
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`
                          text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                          ${isToday ? "bg-slate-900 text-white" : dayColorClass}
                        `}
                      >
                        {day}
                      </span>
                      {dayArticles.length > 0 && (
                        <Badge className="text-[10px] h-5 px-1.5 bg-slate-900/80 text-white">
                          {dayArticles.length}건
                        </Badge>
                      )}
                    </div>

                    {/* 기사 간단 표시 */}
                    <div className="mt-2 space-y-1">
                      {dayArticles.slice(0, 2).map((article) => (
                        <div key={article.id} className="flex items-center gap-1">
                          <span
                            className={`w-1.5 h-1.5 shrink-0 rounded-full ${
                              article.status === "published"
                                ? "bg-slate-900"
                                : "bg-orange-500"
                            }`}
                          />
                          <p className="text-[10px] sm:text-xs truncate text-slate-600 font-medium leading-none">
                            {article.media || "언론사 미지정"}
                          </p>
                        </div>
                      ))}
                      {dayArticles.length > 2 && (
                        <p className="text-[10px] text-slate-400 pl-2.5">
                          + {dayArticles.length - 2}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 우측: 선택 날짜 + 기사 작성/수정 */}
        <Card className="h-full border-t-4 border-t-orange-500 shadow-sm flex flex-col">
          <CardHeader className="bg-slate-50/50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-orange-500" />
                  {year}년 {month + 1}월{" "}
                  {selectedDay ? (
                    <span className="text-orange-600 text-2xl ml-1">{selectedDay}</span>
                  ) : (
                    <span className="text-slate-400 text-sm ml-2 font-normal">
                      날짜를 선택하세요
                    </span>
                  )}
                  {selectedDay && <span className="text-lg ml-1">일</span>}
                </CardTitle>
                <CardDescription>
                  선택한 날짜의 언론 기사 일정을 작성·수정할 수 있습니다.
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-white">
                {selectedArticles.length > 0
                  ? `${selectedArticles.length}건 등록됨`
                  : "등록된 일정 없음"}
              </Badge>
            </div>
          </CardHeader>
          <Separator />

          <ScrollArea className="flex-1 max-h-[640px] p-6 space-y-6">
            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  기사 제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="예: ○○병원, 새로운 의료 서비스 런칭"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={!selectedDay || saveMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">언론사</label>
                <Input
                  type="text"
                  placeholder="예: 한국경제, 조선일보 등"
                  value={formMedia}
                  onChange={(e) => setFormMedia(e.target.value)}
                  disabled={!selectedDay || saveMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">내용 / 비고</label>
                <Textarea
                  placeholder="기사 주요 내용, 노출 채널, 참고 메모 등을 입력하세요."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  disabled={!selectedDay || saveMutation.isPending}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={saveMutation.isPending}
                  >
                    새로 작성
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={!selectedDay || saveMutation.isPending}
                >
                  {saveMutation.isPending
                    ? editingId
                      ? "수정 중..."
                      : "저장 중..."
                    : editingId
                    ? "수정하기"
                    : "저장하기"}
                </Button>
              </div>
            </form>

            {/* 선택된 날짜의 기사 리스트 */}
            <Separator className="my-4" />

            <div className="space-y-3">
              {selectedArticles.length === 0 ? (
                <p className="text-sm text-slate-500">
                  아직 등록된 기사가 없습니다. 상단 폼에서 새 기사를 등록해보세요.
                </p>
              ) : (
                selectedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative bg-white border rounded-lg p-4 shadow-xs hover:shadow-md transition-all hover:border-slate-400"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        className={`border-0 ${
                          article.status === "published"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {article.status === "published" ? "송출 완료" : "예정"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-slate-400 hover:text-slate-900"
                          onClick={() => handleEditClick(article)}
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-500 hover:text-red-700"
                          onClick={() => deleteMutation.mutate(article.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h4 className="font-semibold text-slate-900 mb-1 leading-snug">
                      {article.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Megaphone className="w-3 h-3" />
                      <span>{article.media || "언론사 미지정"}</span>
                      <span className="text-slate-300">|</span>
                      <Clock className="w-3 h-3" />
                      <span>
                        {new Date(article.date).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          weekday: "short",
                        })}
                      </span>
                    </div>

                    {article.content && (
                      <p className="text-sm text-slate-600 whitespace-pre-line">
                        {article.content}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
