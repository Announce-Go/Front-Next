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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
import { Search } from "lucide-react"

export default function SignupRequestsPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">회원가입 승인 관리</h1>
          <p className="text-muted-foreground mt-1">신규 가입 요청 업체를 검토하고 승인합니다.</p>
        </div>
      </div>

      <section className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
          <div className="flex gap-2 w-full sm:w-auto">
            <Select>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="구분 전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">전체</SelectItem>
                  <SelectItem value="advertiser">업체</SelectItem>
                  <SelectItem value="agency">광고주</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="상태 전체" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="pending">승인 대기</SelectItem>
                  <SelectItem value="success">승인 완료</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="업체명, 담당자 또는 연락처 검색" 
                className="pl-9 bg-white" 
              />
            </div>
            <Button variant="secondary">검색</Button>
          </div>
        </div>
      </section>

      <section>
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle>가입 요청 리스트</CardTitle>
            <CardDescription>
              총 <span className="font-bold text-indigo-600">5</span>건의 대기 중인 요청이 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[80px]">구분</TableHead>
                  <TableHead>업체/광고주명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>신청일</TableHead>
                  <TableHead>이용 카테고리</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="/placeholder-logo1.png" alt="Logo" />
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">MW</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">MW커뮤니케이션</span>
                        <span className="text-xs text-muted-foreground">사업자: 111-22-33333</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>강민욱</TableCell>
                  <TableCell className="text-muted-foreground">010-1234-5678</TableCell>
                  <TableCell>2025-12-13</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center h-full">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-0">플레이스</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-none border-0">승인 대기</Badge>
                  </TableCell>
                </TableRow>
                
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">CA</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">C광고대행사</span>
                        <span className="text-xs text-muted-foreground">부산지점</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>이영희</TableCell>
                  <TableCell className="text-muted-foreground">010-2344-1124</TableCell>
                  <TableCell>2025-12-11</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center h-full">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-0">카페</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow-none border-0">승인 완료</Badge>
                  </TableCell>
                </TableRow>
                
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">업체</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-pink-50 text-pink-600 font-bold">TL</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">더엘커뮤니케이션</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>최지은</TableCell>
                  <TableCell className="text-muted-foreground">010-2991-3591</TableCell>
                  <TableCell>2025-12-12</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center h-full">
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 shadow-none border-0">브랜드</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-none border-0">승인 대기</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

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
                    <PaginationLink href="#" isActive className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white">
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
      </section>
    </div>
  );
}