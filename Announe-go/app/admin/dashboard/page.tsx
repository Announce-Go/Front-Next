import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

import { AdminDashboardSignupTable } from "@/components/admin/AdminDashboardSignupTable"
import { AdminDashboardAdvertiserList } from "@/components/admin/AdminDashboardAdvertiserList"
import { AdminDashboardAgencyList } from "@/components/admin/AdminDashboardAgencyList"

function AdminDashboardPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen"> 
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">오늘의 마케팅 현황을 한눈에 확인하세요.</p>
        </div>
      </div>

      {/* 2. 승인 대기 목록 (배지에 컬러 적용) */}
      <section className="mb-8">
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle>승인 대기 목록</CardTitle>
            <CardDescription>최근 등록된 업체 및 광고주 승인 요청입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminDashboardSignupTable />
          </CardContent>
        </Card>
      </section>

      {/* 3. 광고주 목록 리스트 */}
      <section className="mb-8">
        <AdminDashboardAdvertiserList />
      </section>

      {/* 4. 업체 목록 리스트 */}
      <section className="mb-8">
        <AdminDashboardAgencyList />
      </section>

      {/* 5. 카테고리별 현황 (Border-Left 포인트 컬러 적용) */}
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