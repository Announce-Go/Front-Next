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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Badge } from "@/components/ui/badge"

import { 
  BarChart3, 
  FileText, 
  PenTool, 
  Users, 
  Building2, 
  Clock, 
  MapPin, 
  Coffee, 
  Search, 
  MessageCircle, 
  Newspaper,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

function AdminDashboardPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen"> 
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">오늘의 마케팅 현황을 한눈에 확인하세요.</p>
        </div>
      </div>

      {/* 1. 상단 현황 요약 (아이콘 배경색 + 텍스트 컬러 포인트) */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">승인 대기</CardTitle>
            {/* 아이콘에 배경색 추가 */}
            <div className="p-2 bg-orange-100 rounded-full">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">5건</div>
            <p className="text-xs text-orange-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              신규 요청 2건
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">전체 광고주</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">120명</div>
            <p className="text-xs text-blue-600 font-medium flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              전월 대비 +10.1%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">전체 업체</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">45개사</div>
            <p className="text-xs text-slate-500 mt-1">
              신규 등록 3개사
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 2. 승인 대기 목록 (배지에 컬러 적용) */}
      <section className="mb-8">
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle>승인 대기 목록</CardTitle>
            <CardDescription>최근 등록된 업체 및 광고주 승인 요청입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[100px]">구분</TableHead>
                  <TableHead>업체/광고주명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>신청일</TableHead>
                  <TableHead>이용 카테고리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                    </TableCell>
                    <TableCell className="font-medium">MW커뮤니케이션</TableCell>
                    <TableCell>강민욱</TableCell>
                    <TableCell className="text-muted-foreground">2025-12-18</TableCell>
                    <TableCell className="flex gap-2">
                      {/* 커스텀 컬러 배지 */}
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-0">플레이스</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">광고주</Badge>
                    </TableCell>
                    <TableCell className="font-medium">A한의원</TableCell>
                    <TableCell>김철수</TableCell>
                    <TableCell className="text-muted-foreground">2025-12-17</TableCell>
                    <TableCell className="text-muted-foreground text-sm">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                    </TableCell>
                    <TableCell className="font-medium">C광고대행사</TableCell>
                    <TableCell>이영희</TableCell>
                    <TableCell className="text-muted-foreground">2025-12-16</TableCell>
                    <TableCell className="flex gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-0">카페</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">광고주</Badge>
                    </TableCell>
                    <TableCell className="font-medium">D병원</TableCell>
                    <TableCell>박민수</TableCell>
                    <TableCell className="text-muted-foreground">2025-12-13</TableCell>
                    <TableCell className="text-muted-foreground text-sm">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                    </TableCell>
                    <TableCell className="font-medium">더엘커뮤니케이션</TableCell>
                    <TableCell>최지은</TableCell>
                    <TableCell className="text-muted-foreground">2025-12-12</TableCell>
                    <TableCell className="flex gap-2">
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 shadow-none border-0">브랜드</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            {/* Pagination 생략 (이전과 동일) */}
          </CardContent>
        </Card>
      </section>

      {/* 3. 카테고리별 현황 (Border-Left 포인트 컬러 적용) */}
      <section>
        <h2 className="text-lg font-semibold mb-4 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-500"/>
          카테고리별 현황
        </h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* 1. 플레이스 (Green Theme) */}
          <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">플레이스 순위</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">125건</div>
            </CardContent>
          </Card>

          {/* 2. 브랜드 블로그 (Pink/Orange Theme) */}
          <Card className="border-l-4 border-l-pink-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">브랜드 블로그</CardTitle>
              <PenTool className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">456건</div>
            </CardContent>
          </Card>

          {/* 3. 카페 글 순위 (Red Theme) */}
          <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">카페 글 순위</CardTitle>
              <Coffee className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">85건</div>
            </CardContent>
          </Card>

          {/* 4. 블로그 순위 (Teal Theme) */}
          <Card className="border-l-4 border-l-teal-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">블로그 순위</CardTitle>
              <Search className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">203건</div>
            </CardContent>
          </Card>

          {/* 5. 카페 침투 (Indigo Theme) */}
          <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">카페 침투</CardTitle>
              <MessageCircle className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">134건</div>
            </CardContent>
          </Card>

          {/* 6. 언론 기사 (Slate/Dark Theme) */}
          <Card className="border-l-4 border-l-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">언론 기사</CardTitle>
              <Newspaper className="h-4 w-4 text-slate-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">35건</div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;