'use client'
import { useState } from "react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { 
  Newspaper, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Megaphone
} from "lucide-react"

export default function CafeInfiltrationPage() {
  // 1. 현재 보고 있는 달력의 기준 날짜 (기본값: 2024년 12월 1일)
  const getFullYear = new Date()
  const yyyy = getFullYear.getFullYear();
  const mm = getFullYear.getMonth();
  const dd = getFullYear.getDate();

  const [currentDate, setCurrentDate] = useState(new Date(yyyy, mm, dd)); 
  
  // 2. 사용자가 클릭해서 선택한 날짜 (일)
  const [selectedDay, setSelectedDay] = useState<number | null>(dd);

  // 달력 계산 헬퍼 함수
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0(1월) ~ 11(12월)

  // 이번 달의 총 일수 (예: 12월은 31일)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // 이번 달 1일의 요일 (0:일요일 ~ 6:토요일) -> 빈 칸 채우기용
  const startDayOfWeek = new Date(year, month, 1).getDay();

  // 날짜 배열 생성
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDayOfWeek }, (_, i) => i);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null); // 달이 바뀌면 선택 초기화
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null); // 달이 바뀌면 선택 초기화
  };

  // --- 더미 데이터 (실제로는 API에서 year, month로 조회해야 함) ---
  // 데모를 위해 모든 달에 데이터가 있다고 가정하거나, 특정 달에만 표시하도록 필터링 가능
  // 여기서는 편의상 "날짜(day)"만 매칭하여 보여줍니다.
  const allArticles = [
    { id: 1, day: 5, title: "A한의원, 겨울철 면역력 관리법 소개", media: "데일리뉴스", status: "published" },
    { id: 2, day: 12, title: "B병원, 최신 의료장비 도입 기념식", media: "메디컬타임즈", status: "published" },
    { id: 3, day: 16, title: "강남한의원, 고객 감사 이벤트 진행", media: "시사매거진", status: "published" },
    { id: 4, day: 16, title: "[칼럼] 만성피로, 방치하면 위험", media: "건강일보", status: "scheduled" },
    { id: 5, day: 20, title: "C클리닉, 브랜드 대상 수상", media: "한국경제", status: "pending" },
    { id: 6, day: 25, title: "크리스마스 건강 관리 팁", media: "라이프스타일", status: "pending" },
  ];

  // 현재 선택된 날짜의 기사 필터링
  const selectedArticles = selectedDay 
    ? allArticles.filter(a => a.day === selectedDay) 
    : [];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-slate-700" />
            카페침투 관리
          </h1>
          <p className="text-muted-foreground mt-1">월별 카페침투 일정을 캘린더로 관리합니다.</p>
        </div>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="w-4 h-4 mr-2" />
          일정 등록
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* 메인 캘린더 (좌측 2/3) */}
        <Card className="xl:col-span-2 shadow-sm border-t-4 border-t-slate-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 동적 날짜 표시 */}
                <CardTitle className="text-xl">
                  {year}년 {month + 1}월
                </CardTitle>
                <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                 <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-900"></span>송출완료</div>
                 <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span>예약대기</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 mb-2 text-center">
              {['일', '월', '화', '수', '목', '금', '토'].map((dayName, i) => (
                <div key={dayName} className={`text-sm font-semibold py-2 ${i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-slate-500'}`}>
                  {dayName}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-2">
              {/* 1. 지난달 빈칸 채우기 */}
              {emptyDays.map(empty => (
                <div key={`empty-${empty}`} className="h-24 sm:h-32 bg-slate-50/30 rounded-lg" />
              ))}

              {/* 2. 이번달 날짜 채우기 */}
              {days.map(day => {
                const dayArticles = allArticles.filter(a => a.day === day);
                const isSelected = selectedDay === day;
                
                // 오늘 날짜 하이라이트 (실제 오늘 날짜와 비교)
                const today = new Date();
                const isToday = 
                  today.getDate() === day && 
                  today.getMonth() === month && 
                  today.getFullYear() === year;

                return (
                  <div 
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`
                      relative h-24 sm:h-32 p-2 border rounded-lg cursor-pointer transition-all hover:shadow-md
                      ${isSelected 
                        ? 'border-2 border-slate-900 bg-slate-50 ring-2 ring-slate-200 ring-offset-2 z-10' 
                        : 'border-slate-100 bg-white hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`
                        text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                        ${isToday ? 'bg-slate-900 text-white' : 'text-slate-700'}
                      `}>
                        {day}
                      </span>
                      {dayArticles.length > 0 && (
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-slate-100 text-slate-600">
                          {dayArticles.length}건
                        </Badge>
                      )}
                    </div>
                    
                    {/* 기사 간략 표시 (최대 2개) */}
                    <div className="mt-2 space-y-1">
                      {dayArticles.slice(0, 2).map((article, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                           <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${article.status === 'published' ? 'bg-slate-800' : 'bg-orange-500'}`} />
                           <p className="text-[10px] sm:text-xs truncate text-slate-600 font-medium leading-none">
                             {article.media}
                           </p>
                        </div>
                      ))}
                      {dayArticles.length > 2 && (
                        <p className="text-[10px] text-slate-400 pl-2.5">+ {dayArticles.length - 2}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 우측 사이드바: 선택된 날짜 상세 */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="h-full border-t-4 border-t-orange-500 shadow-sm flex flex-col">
            <CardHeader className="bg-slate-50/50 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {month + 1}월 
                  {selectedDay ? (
                     <span className="text-orange-600 text-2xl ml-1">{selectedDay}</span> 
                  ) : (
                     <span className="text-slate-400 text-sm ml-2 font-normal">날짜를 선택하세요</span>
                  )}
                  {selectedDay && <span className="text-lg ml-1">일</span>}
                </CardTitle>
                <Badge variant="outline" className="bg-white">
                  {selectedArticles.length > 0 ? `${selectedArticles.length}건 일정` : '일정 없음'}
                </Badge>
              </div>
              <CardDescription>
                선택한 날짜의 보도자료 배포 현황입니다.
              </CardDescription>
            </CardHeader>
            <Separator />
            <ScrollArea className="flex-1 max-h-[600px] p-6">
              {selectedDay ? (
                selectedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {selectedArticles.map((article) => (
                      <div key={article.id} className="group relative bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:border-slate-400">
                        <div className="flex justify-between items-start mb-2">
                           <Badge 
                              className={`
                                ${article.status === 'published' 
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-0' 
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-0'}
                              `}
                            >
                              {article.status === 'published' ? '송출 완료' : '예약 대기'}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-900">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <h4 className="font-bold text-slate-900 mb-1 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">
                          {article.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Megaphone className="w-3 h-3" />
                          <span>{article.media}</span>
                          <span className="text-slate-300">|</span>
                          <Clock className="w-3 h-3" />
                          <span>14:00 예정</span>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-dashed">
                          <Avatar className="h-5 w-5">
                              <AvatarImage src="/placeholder.png" />
                              <AvatarFallback className="text-[9px] bg-slate-100">Logo</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-slate-600">A한의원</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto text-slate-400 hover:text-blue-600">
                              <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full border-dashed border-2 py-6 text-slate-400 hover:text-slate-600 hover:bg-slate-50">
                      <Plus className="w-4 h-4 mr-2" />
                      일정 추가
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                    <CalendarIcon className="w-12 h-12 mb-4 text-slate-200" />
                    <p className="text-lg font-medium text-slate-400">등록된 기사가 없습니다.</p>
                    <Button variant="outline" className="mt-4">
                      일정 추가하기
                    </Button>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
                  <p className="text-sm text-slate-400">
                    달력에서 날짜를 클릭하여<br/>상세 일정을 확인하세요.
                  </p>
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>

      </div>
    </div>
  )
}