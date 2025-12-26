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
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
  MapPin, 
  Search, 
  ExternalLink, 
  Trophy,
  MoreHorizontal,
  Plus,
  PlayCircle,
  PauseCircle,
  TrendingUp
} from "lucide-react"

export default function AgencyPlaceRankPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-green-600" />
            플레이스 순위 관리
          </h1>
          <p className="text-muted-foreground mt-1">
            담당 광고주의 플레이스 순위를 조회하고 추적 키워드를 등록합니다.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* 1. 실시간 순위 조회 (건바이건) */}
        <Card className="shadow-sm border-t-4 border-t-green-500 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-green-600" />
              실시간 순위 조회
            </CardTitle>
            <CardDescription>
              키워드와 플레이스 URL을 입력하여 현재 순위를 즉시 확인합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="grid w-[250px] items-center gap-1.5">
                <label className="text-sm font-medium leading-none">키워드</label>
                <Input type="text" placeholder="예: 강남한의원" className="bg-slate-50" />
              </div>
              <div className="grid w-full items-center gap-1.5 flex-1">
                 <label className="text-sm font-medium leading-none">플레이스 URL</label>
                <Input type="text" placeholder="https://place.naver.com/..." className="bg-slate-50" />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[100px]">
                조회하기
              </Button>
            </div>

            {/* 조회 결과 영역 (조건부 렌더링) */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">조회 결과</p>
                  <p className="text-xs text-green-600">키워드: 강남한의원</p>
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-green-700 font-medium mr-2">현재 순위</span>
                <span className="text-3xl font-bold text-green-700">3</span>
                <span className="text-lg font-medium text-green-600">위</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. 추적 목록 (월보장) */}
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>추적 목록 (월보장)</CardTitle>
                <CardDescription>관리 중인 키워드 리스트입니다.</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {/* 필터 및 검색 그룹 */}
                <div className="flex gap-2">
                    <Select>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="상태: 전체" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="active">추적중</SelectItem>
                        <SelectItem value="stopped">중단됨</SelectItem>
                    </SelectContent>
                    </Select>
                    <div className="relative w-[200px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="text" placeholder="키워드/광고주명" className="pl-9" />
                    </div>
                </div>

                {/* 등록 버튼 (강조) */}
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-1.5" />
                    추적 등록
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[150px]">키워드</TableHead>
                  <TableHead className="w-[80px]">URL</TableHead>
                  <TableHead>광고주</TableHead>
                  <TableHead>회차</TableHead>
                  <TableHead className="w-[200px]">진행률 (보장일수)</TableHead>
                  <TableHead className="text-right">최근순위</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">강남한의원</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700 font-bold">A</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">A한의원</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600">2회차</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5일 / 25일</span>
                        <span className="font-medium text-green-600">20%</span>
                      </div>
                      {/* 진행률 20% */}
                      <Progress value={20} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 text-base px-3 py-1">
                            3위
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50 flex w-fit ml-auto items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> 추적중
                    </Badge>
                  </TableCell>
                   <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">역삼맛집</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[9px] bg-indigo-100 text-indigo-700 font-bold">D</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">D식당</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600">1회차</Badge>
                  </TableCell>
                  <TableCell>
                     <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>20일 / 25일</span>
                        <span className="font-medium text-green-600">80%</span>
                      </div>
                      <Progress value={80} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0 text-base px-3 py-1">
                            <Trophy className="w-3 h-3 mr-1 inline text-yellow-600" /> 1위
                        </Badge>
                    </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50 flex w-fit ml-auto items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> 추적중
                    </Badge>
                  </TableCell>
                   <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">서초병원</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700 font-bold">B</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">B병원</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-600">3회차</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>3일 / 25일</span>
                        <span className="font-medium text-green-600">12%</span>
                      </div>
                      <Progress value={12} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 text-base px-3 py-1">
                           2위
                        </Badge>
                    </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50 flex w-fit ml-auto items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> 추적중
                    </Badge>
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
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive className="bg-green-600 text-white hover:bg-green-700 hover:text-white">
                      2
                    </PaginationLink>
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