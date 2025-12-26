import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { 
  Users, 
  Target, 
  FileText, // 포스팅 기록 아이콘
  MapPin, 
  Coffee, 
  Search, 
  PenTool,
  ArrowUpRight,
  ChevronRight,
  LayoutDashboard
} from "lucide-react"

export default function AgencyDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 1. 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            Agency Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            <span className="font-semibold text-slate-700">X마케팅</span>님의 관리 현황입니다.
          </p>
        </div>
        <div className="text-sm text-muted-foreground bg-white px-3 py-1 rounded-full border shadow-sm">
          Today: 2025-12-26
        </div>
      </div>

      {/* 2. 최상단 요약 (Summary Cards) */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        
        {/* 매핑 광고주 */}
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">매핑 광고주</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8개사</div>
            <p className="text-xs text-blue-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              신규 1개사
            </p>
          </CardContent>
        </Card>

        {/* 추적 중인 키워드 */}
        <Card className="shadow-sm border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">총 추적 키워드</CardTitle>
            <div className="p-2 bg-indigo-100 rounded-full">
              <Target className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">45건</div>
            <p className="text-xs text-indigo-600 font-medium flex items-center mt-1">
               <ArrowUpRight className="w-3 h-3 mr-1" />
               전일 대비 +2
            </p>
          </CardContent>
        </Card>

        {/* 브랜드 블로그 포스팅 */}
        <Card className="shadow-sm border-l-4 border-l-pink-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">포스팅 기록</CardTitle>
            <div className="p-2 bg-pink-100 rounded-full">
              <FileText className="h-4 w-4 text-pink-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">123건</div>
            <p className="text-xs text-slate-500 mt-1">
               누적 발행수
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 3. 카테고리별 현황 (Grid Layout) */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          카테고리별 현황
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 플레이스 */}
            <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <MapPin className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">플레이스 순위</p>
                            <p className="text-xl font-bold text-slate-900">15<span className="text-sm font-normal text-slate-400 ml-0.5">건</span></p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />                
            </CardContent>
            </Card>

             {/* 카페 */}
             <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                            <Coffee className="w-5 h-5 text-red-700" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">카페 글 순위</p>
                            <p className="text-xl font-bold text-slate-900">12<span className="text-sm font-normal text-slate-400 ml-0.5">건</span></p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
              </CardContent>
            </Card>

             {/* 블로그 순위 */}
             <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                            <Search className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">블로그 글 순위</p>
                            <p className="text-xl font-bold text-slate-900">18<span className="text-sm font-normal text-slate-400 ml-0.5">건</span></p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
            </CardContent>
            </Card>

             {/* 브랜드 블로그 */}
             <Card className="bg-white hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                            <PenTool className="w-5 h-5 text-pink-700" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">브랜드 포스팅</p>
                            <p className="text-xl font-bold text-slate-900">123<span className="text-sm font-normal text-slate-400 ml-0.5">건</span></p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
              </CardContent>
            </Card>

        </div>
      </section>

      {/* 4. 최근 추적 현황 테이블 */}
      <section>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">최근 추적 현황</h2>
            <Button variant="link" className="text-slate-500 hover:text-slate-900 p-0 h-auto font-normal">
                전체 보기 →
            </Button>
        </div>
        
        <Card className="shadow-sm border-t-4 border-t-slate-600">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[120px]">카테고리</TableHead>
                  <TableHead>키워드</TableHead>
                  <TableHead>광고주</TableHead>
                  <TableHead>최근순위</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1: 플레이스 (Green) */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 shadow-none">
                        플레이스
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">강남한의원</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700">A</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">A한의원</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-900">3위</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                         <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">추적중</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 2: 카페 (Red) */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell>
                     <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0 shadow-none">
                        카페
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">다이어트</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700">B</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">B병원</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-red-600">2위</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                         <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">추적중</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 3: 블로그 (Emerald) */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell>
                     <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 shadow-none">
                        블로그
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">피부관리</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700">C</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">C클리닉</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-slate-600">5위</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                         <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">추적중</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                 {/* Row 4: 플레이스 (Green) */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 shadow-none">
                        플레이스
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">역삼맛집</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700">D</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">D식당</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-yellow-600">1위</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                         <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">추적중</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                 {/* Row 5: 블로그 (Emerald) */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell>
                     <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 shadow-none">
                        블로그
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">홈케어</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700">A</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-600">A한의원</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-400">순위권외</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                         <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">추적중</Badge>
                    </div>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}