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

export default function AdvertisersPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">광고주 관리</h1>
          <p className="text-muted-foreground mt-1">광고주 리스트 목록입니다.</p>
        </div>
      </div>

      <section className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="광고주명, 담당자 또는 연락처 검색" 
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
            <CardTitle>광고주 리스트</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[80px]">광고주명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이메일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">                  
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
                  <TableCell>ABCD@naver.com</TableCell>
                </TableRow>
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="/placeholder-logo1.png" alt="Logo" />
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">E2</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">이봄한의원</span>
                        <span className="text-xs text-muted-foreground">사업자: 110-36-120592</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>이봄희</TableCell>
                  <TableCell className="text-muted-foreground">010-1212-6782</TableCell>
                  <TableCell>2bom@naver.com</TableCell>
                </TableRow>
                <TableRow className="hover:bg-slate-50/50 cursor-pointer transition-colors">                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src="/placeholder-logo1.png" alt="Logo" />
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">KH</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">김용한의원</span>
                        <span className="text-xs text-muted-foreground">사업자: 120-17-385812</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>김용원</TableCell>
                  <TableCell className="text-muted-foreground">010-8271-5332</TableCell>
                  <TableCell>kbw@naver.com</TableCell>
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