"use client"

import { useState, useEffect } from "react"
import { Calendar, dayjsLocalizer, ToolbarProps, Navigate } from "react-big-calendar"
import dayjs from "dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./calendar.css"
import "dayjs/locale/ko"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui"
import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { Label } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import cafeCalendarData from "./CafeCalendarData.json"

dayjs.locale("ko")
const localizer = dayjsLocalizer(dayjs)

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  memo?: string
}

function AgencyMarketingCafePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [memo, setMemo] = useState("")

  // Mock 데이터 로드
  useEffect(() => {
    const loadedEvents: CalendarEvent[] = cafeCalendarData.events.map((item) => {
      const startDate = new Date(item.start)
      startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(startDate)
      
      return {
        id: item.id,
        title: item.memo || "메모 없음",
        start: startDate,
        end: endDate,
        memo: item.memo,
      }
    })
    setEvents(loadedEvents)
  }, [])

  // 날짜 클릭 핸들러
  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start)
    setSelectedEvent(null)
    setMemo("")
    setIsDialogOpen(true)
  }

  // 이벤트 클릭 핸들러
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setSelectedDate(null)
    setMemo(event.memo || "")
    setIsDialogOpen(true)
  }

  // 메모 저장
  const handleSaveMemo = () => {
    if (selectedEvent) {
      // 기존 이벤트 수정
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, title: memo || "메모 없음", memo }
            : event
        )
      )
    } else if (selectedDate) {
      // 새 이벤트 생성
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: memo || "메모 없음",
        start: selectedDate,
        end: selectedDate,
        memo,
      }
      setEvents((prev) => [...prev, newEvent])
    }
    setIsDialogOpen(false)
    setSelectedDate(null)
    setSelectedEvent(null)
    setMemo("")
  }

  // 이벤트 삭제
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id))
      setIsDialogOpen(false)
      setSelectedDate(null)
      setSelectedEvent(null)
      setMemo("")
    }
  }

  // 메모가 있는 이벤트 스타일
  const eventStyleGetter = (event: CalendarEvent) => {
    const hasMemo = event.memo && event.memo.trim() !== ""
    return {
      className: cn(
        "rounded-md border px-2 py-1 text-xs font-medium transition-colors",
        hasMemo
          ? "bg-primary text-primary-foreground border-primary/20 hover:bg-primary/90"
          : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
      ),
    }
  }

  // 날짜별 스타일 (토요일 파란색, 일요일 빨간색, 오늘 날짜 파란색 동그라미)
  const dayPropGetter = (date: Date) => {
    const dayOfWeek = date.getDay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    const isToday = compareDate.getTime() === today.getTime()
    
    const classes = []
    if (dayOfWeek === 0) classes.push("sunday-cell")
    if (dayOfWeek === 6) classes.push("saturday-cell")
    if (isToday) classes.push("today-cell")
    
    return {
      className: classes.join(" "),
    }
  }

  // 한국어 메시지
  const messages = {
    allDay: "종일",
    previous: "이전",
    next: "다음",
    today: "오늘",
    month: "월",
    noEventsInRange: "해당 기간에 일정이 없습니다.",
    showMore: (total: number) => `+${total}개 더 보기`,
  }

  // 날짜 형식 설정 (YYYY.MM 형식)
  const formats = {
    monthHeaderFormat: (date: Date) => dayjs(date).format("YYYY.MM"),
  }

  // 커스텀 툴바 컴포넌트
  const CustomToolbar = (toolbar: ToolbarProps) => {
    return (
      <div className="rbc-toolbar flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate(Navigate.PREVIOUS)}
            className="h-9 px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">이전</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate(Navigate.TODAY)}
            className="h-9 px-4"
          >
            오늘
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toolbar.onNavigate(Navigate.NEXT)}
            className="h-9 px-3"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">다음</span>
          </Button>
        </div>
        <div className="rbc-toolbar-label text-3xl font-semibold">
          {dayjs(toolbar.date).format("YYYY.MM")}
        </div>
        <div className="w-[120px]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              카페 마케팅 캘린더
            </CardTitle>
            <CardDescription>
              날짜를 클릭하여 메모를 추가하거나, 기존 이벤트를 클릭하여 수정할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[700px] p-4">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={["month"]}
                messages={messages}
                formats={formats}
                components={{
                  toolbar: CustomToolbar,
                }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter}
                culture="ko"
              />
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedEvent ? "메모 수정" : "메모 입력"}
              </DialogTitle>
              <DialogDescription>
                {selectedEvent
                  ? dayjs(selectedEvent.start).format("YYYY년 MM월 DD일")
                  : selectedDate
                  ? dayjs(selectedDate).format("YYYY년 MM월 DD일")
                  : ""}
                에 대한 메모를 작성해주세요.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="memo" className="text-sm font-medium">
                  메모 내용
                </Label>
                <Input
                  id="memo"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="메모를 입력하세요..."
                  autoFocus
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              {selectedEvent && (
                <Button
                  variant="outline"
                  onClick={handleDeleteEvent}
                  className="mr-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  삭제
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                type="button"
              >
                취소
              </Button>
              <Button onClick={handleSaveMemo} type="button">
                저장
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AgencyMarketingCafePage
