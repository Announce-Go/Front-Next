"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { getAdminAgencies } from "@/Features/apis/admin/agencies"

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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Search } from "lucide-react"

type ApprovalFilter = "all" | "pending" | "approved" | "rejected"

function renderCategoryBadge(cat: string) {
  if (cat === "place_rank") {
    return <Badge className="bg-green-100 text-green-700 border-0">플레이스</Badge>
  }
  if (cat === "cafe_rank") {
    return <Badge className="bg-red-100 text-red-700 border-0">카페</Badge>
  }
  if (cat === "blog_rank") {
    return <Badge className="bg-emerald-100 text-emerald-700 border-0">블로그</Badge>
  }
  if (cat === "brand_blog") {
    return <Badge className="bg-pink-100 text-pink-700 border-0">브랜드</Badge>
  }
  if (cat === "press") {
    return <Badge className="bg-slate-100 text-slate-700 border-0">언론기사</Badge>
  }
  if (cat === "cafe_infiltration") {
    return <Badge className="bg-indigo-100 text-indigo-700 border-0">카페 침투</Badge>
  }
  return <Badge variant="outline">{cat}</Badge>
}

function renderStatusBadge(status: string) {
  if (status === "pending") {
    return <Badge className="bg-orange-100 text-orange-700 border-0">승인 대기</Badge>
  }
  if (status === "approved") {
    return <Badge className="bg-emerald-100 text-emerald-700 border-0">승인 완료</Badge>
  }
  if (status === "rejected") {
    return <Badge className="bg-red-100 text-red-700 border-0">거절</Badge>
  }
  return <Badge variant="outline">{status}</Badge>
}

export function AdminDashboardAgencyList() {
  const router = useRouter()

  const [approvalStatus, setApprovalStatus] = useState<ApprovalFilter>("all")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("")

  // 검색 디바운스 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchKeyword])

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "admin",
      "agencies",
      {
        approval_status: approvalStatus === "all" ? undefined : approvalStatus,
        search: debouncedSearchKeyword || undefined,
        page,
        page_size: pageSize,
      },
    ],
    queryFn: () =>
      getAdminAgencies({
        approval_status: approvalStatus === "all" ? undefined : approvalStatus,
        search: debouncedSearchKeyword || undefined,
        page,
        page_size: pageSize,
      }),
    staleTime: 30 * 1000,
  })

  const items = data?.items ?? []
  const pagination = data?.pagination
  const total = data?.total ?? 0

  const handleStatusChange = (value: ApprovalFilter) => {
    setApprovalStatus(value)
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    if (!pagination) return
    if (newPage < 1 || newPage > pagination.total_pages) return
    setPage(newPage)
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-purple-600">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>업체 목록</CardTitle>
            <CardDescription>
              총 <span className="font-bold text-purple-700">{total}</span>개의 업체 계정을 관리합니다.
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-end sm:items-center">
            <Select value={approvalStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="승인 상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">승인 대기</SelectItem>
                <SelectItem value="approved">승인 완료</SelectItem>
                <SelectItem value="rejected">거절</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex w-full sm:w-auto items-center space-x-2">
              <div className="relative w-full sm:w-[260px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="이름 / 회사명 / 이메일 검색"
                  className="pl-9 bg-white"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            업체 목록을 불러오는 중입니다...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-sm text-red-500">
            업체 목록을 불러오지 못했습니다.
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            검색 조건에 맞는 업체가 없습니다.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[220px]">업체명</TableHead>
                  <TableHead>회사명</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>이용 카테고리</TableHead>
                  <TableHead>승인 상태</TableHead>
                  <TableHead className="w-[140px]">가입일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((agency) => {
                  const acronym =
                    agency.company_name?.[0] || agency.name?.[0] || agency.login_id?.[0] || "A"

                  return (
                    <TableRow
                      key={agency.id}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                      onClick={() => router.push(`/admin/agencies/${agency.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border bg-purple-50">
                            <AvatarFallback className="text-[11px] font-bold text-purple-700">
                              {acronym}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">{agency.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ID: {agency.login_id}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{agency.company_name}</TableCell>
                      <TableCell>{agency.email || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {agency.categories?.length
                            ? agency.categories.map((cat) => (
                                <span key={cat}>{renderCategoryBadge(cat)}</span>
                              ))
                            : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(agency.approval_status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {agency.created_at
                          ? new Date(agency.created_at).toLocaleDateString("ko-KR")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {pagination && pagination.total_pages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (pagination.has_prev) handlePageChange(page - 1)
                        }}
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        {pagination.page}
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (pagination.has_next) handlePageChange(page + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

