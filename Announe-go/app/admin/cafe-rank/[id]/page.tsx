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

import { 
  ChevronLeft, 
  Coffee, 
  ExternalLink, 
  PauseCircle, 
  Trophy, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Calendar
} from "lucide-react"

export default function CafeRankDetailPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 1. 네비게이션 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-slate-900">
            <ChevronLeft className="w-4 h-4 mr-1" />
            목록으로
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-2xl font-bold text-slate-900">카페 순위 추적 상세</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. 좌측: 기본 정보 및 상태 (Red Theme) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-t-4 border-t-red-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                   <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 mb-2">
                    추적중
                  </Badge>
                  <CardTitle className="text-2xl font-bold text-slate-900">강남한의원</CardTitle>
                </div>
                {/* 카페 아이콘 적용 */}
                <Coffee className="w-8 h-8 text-red-600 p-1.5 bg-red-50 rounded-full" />
              </div>
              <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                <Clock className="w-3 h-3" /> 등록일: 2024-01-15
              </CardDescription>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="pt-6 space-y-4">
              
              {/* URL 정보 */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">게시글 URL</label>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-700 truncate underline decoration-slate-300 underline-offset-4 cursor-pointer hover:text-red-600">
                    https://cafe.naver.com/article/12345...
                  </p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-600">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* 광고주 정보 */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">담당 광고주</label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">A한의원</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">B병원</Badge>
                </div>
              </div>

              {/* 액션 버튼 (중단) */}
              <div className="pt-4">
                <Button variant="outline" className="w-full border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                  <PauseCircle className="w-4 h-4 mr-2" />
                  추적 중단하기
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* 요약 통계 */}
          <Card className="bg-red-50/50 border-red-100 shadow-sm">
            <CardContent className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-800">이번 회차 최고 순위</span>
                    <span className="text-xl font-bold text-red-700">1위</span>
                </div>
                <Separator className="bg-red-200/60" />
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-800">상위 노출 비율</span>
                    <span className="text-xl font-bold text-red-700">80%</span>
                </div>
            </CardContent>
          </Card>
        </div>


        {/* 3. 우측: 순위 히스토리 (Timeline) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2회차 (진행중) - Red Theme Card */}
          <Card className="shadow-sm border-l-4 border-l-red-500">
            <CardHeader className="pb-3 bg-slate-50/50 rounded-t-lg border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <CardTitle className="text-lg">2회차 기록</CardTitle>
                   <Badge className="bg-red-500 hover:bg-red-600 text-white">진행중</Badge>
                </div>
                <span className="text-sm text-muted-foreground">총 5회 / 25회 예정</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <ScrollArea className="h-[400px] sm:h-auto">
                <div className="divide-y">
                    
                    {/* 03-15: 2위 (High Rank) */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.15</span>
                                <span className="text-xs font-bold text-slate-700">오늘</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-red-600" />
                                <span className="font-semibold text-red-700">2위</span>
                            </div>
                        </div>
                         <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">High</Badge>
                    </div>

                    {/* 03-14: 순위권 외 (Warning) */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors bg-slate-50/30">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.14</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-slate-400" />
                                <span className="font-medium text-slate-400">순위권 밖</span>
                            </div>
                        </div>
                         <span className="text-xs text-slate-400">-</span>
                    </div>

                    {/* 03-13: 3위 (Normal Rank) */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.13</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-700">3위</span>
                            </div>
                        </div>
                    </div>

                    {/* 03-12: 1위 (Best Rank - Trophy) */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors bg-yellow-50/30">
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.12</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <span className="font-bold text-lg text-slate-900">1위</span>
                            </div>
                        </div>
                         <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Best</Badge>
                    </div>

                     {/* 03-11: 순위권 외 */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors bg-slate-50/30">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.11</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-slate-400" />
                                <span className="font-medium text-slate-400">순위권 밖</span>
                            </div>
                        </div>
                    </div>

                    {/* 03-10: 4위 */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.10</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">4위</span>
                            </div>
                        </div>
                    </div>

                     {/* 03-09: 5위 */}
                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col text-center min-w-[50px]">
                                <span className="text-xs text-slate-500">03.09</span>
                            </div>
                            <Separator orientation="vertical" className="h-8" />
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">5위</span>
                            </div>
                        </div>
                    </div>

                </div>
               </ScrollArea>
            </CardContent>
          </Card>

          {/* 1회차 (완료) */}
          <Card className="shadow-sm border-l-4 border-l-slate-400 opacity-90">
            <CardHeader className="pb-3 bg-slate-50 rounded-t-lg border-b">
              <div className="flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors rounded p-1 -m-1">
                <div className="flex items-center gap-2">
                   <CardTitle className="text-lg text-slate-700">1회차 기록</CardTitle>
                   <Badge variant="secondary" className="bg-slate-200 text-slate-600">완료됨</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    2024.01.25 ~ 02.20
                </div>
              </div>
            </CardHeader>
             {/* 닫힌 상태 (Collapsed) 표현 */}
            <CardContent className="p-0">
               <div className="flex items-center justify-center p-6 text-muted-foreground bg-slate-50/30">
                  <span className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 
                    총 25회 기록이 저장되어 있습니다. (클릭하여 펼치기)
                  </span>
               </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}