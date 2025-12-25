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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { 
  PenTool, // 브랜드 블로그 상징 (작성)
  Search, 
  ExternalLink, 
  Calendar,
  MoreHorizontal,
  Building2,
  Users
} from "lucide-react"

export default function BrandBlogPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PenTool className="w-6 h-6 text-pink-600" />
            브랜드 블로그 관리
          </h1>
          <p className="text-muted-foreground mt-1">관리 중인 브랜드 블로그의 포스팅 현황 및 등록 일자를 확인합니다.</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* 1. 검색 및 필터 섹션 */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center">
            {/* 왼쪽: 필터 (확장성을 위해 배치) */}
            <div className="flex gap-2 w-full sm:w-auto">
                 <Select>
                  <SelectTrigger className="w-[140px] bg-white">
                    <SelectValue placeholder="광고주 전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="a">A한의원</SelectItem>
                    <SelectItem value="b">B병원</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            {/* 오른쪽: 검색창 */}
            <div className="flex w-full sm:w-auto items-center space-x-2">
                <div className="relative w-full sm:w-[350px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="키워드 / 업체 / 광고주 입력" 
                    className="pl-9 bg-white" 
                  />
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">검색</Button>
            </div>
        </section>

        {/* 2. 메인 리스트 테이블 - Pink Theme */}
        <Card className="shadow-sm border-t-4 border-t-pink-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>포스팅 목록</CardTitle>
                <CardDescription>총 <span className="font-bold text-pink-600">50</span>건의 브랜드 블로그가 등록되어 있습니다.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[180px]">키워드</TableHead>
                  <TableHead className="w-[100px]">URL</TableHead>
                  <TableHead>광고주 / 업체</TableHead>
                  <TableHead>포스팅일</TableHead>
                  <TableHead>등록일</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">
                    강남한의원
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pink-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">A한의원</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-muted-foreground">X마케팅</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span className="text-sm">12-15</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">2025-12-15</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">
                    서울한의원
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pink-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">B병원</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-muted-foreground">Y광고</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span className="text-sm">12-14</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">2025-12-14</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">
                    한의원추천
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pink-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">C클리닉</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-muted-foreground">Z미디어</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span className="text-sm">12-13</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">2025-12-13</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 4 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">
                    부산한의원
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pink-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">D병원</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-muted-foreground">A컴퍼니</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span className="text-sm">12-12</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">2025-12-12</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 5 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">
                    대구한의원
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-pink-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">E클리닉</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-muted-foreground">B광고</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        <span className="text-sm">12-11</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">2025-12-11</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>

            {/* 페이지네이션 */}
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="bg-pink-600 text-white hover:bg-pink-700 hover:text-white">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}