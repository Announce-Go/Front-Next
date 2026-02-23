"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { getAdminAdvertisers } from "@/Features/apis/admin/advertisers"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Users } from "lucide-react"

type ApprovalFilter = "all" | "pending" | "approved" | "rejected"

const BORDER  = { borderColor: "var(--th-row-border)" }
const HEAD_ST = { color: "var(--th-text-3)", background: "var(--th-table-head)", borderColor: "var(--th-row-border)", fontSize: "12px" }

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string; border: string }> = {
    pending:  { label: "승인 대기", bg: "rgba(251,146,60,0.15)",  color: "#fb923c", border: "rgba(251,146,60,0.3)" },
    approved: { label: "승인 완료", bg: "rgba(52,211,153,0.15)",  color: "#34d399", border: "rgba(52,211,153,0.3)" },
    rejected: { label: "거절",      bg: "rgba(248,113,113,0.15)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
  }
  const s = map[status]
  if (!s)
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)" }}>{status}</span>
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</span>
}

function SkeletonRow() {
  return (
    <TableRow style={BORDER}>
      {[160, 100, 120, 80, 90].map((w, i) => (
        <TableCell key={i}>
          <div className="animate-pulse rounded-md"
            style={{ height: "13px", width: `${w}px`, background: "var(--th-skeleton)" }} />
        </TableCell>
      ))}
    </TableRow>
  )
}

export function AdminDashboardAdvertiserList() {
  const router = useRouter()
  const [approvalStatus, setApprovalStatus] = useState<ApprovalFilter>("all")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(searchKeyword); setPage(1) }, 500)
    return () => clearTimeout(t)
  }, [searchKeyword])

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "advertisers", { approval_status: approvalStatus === "all" ? undefined : approvalStatus, search: debouncedSearch || undefined, page, page_size: pageSize }],
    queryFn: () => getAdminAdvertisers({ approval_status: approvalStatus === "all" ? undefined : approvalStatus, search: debouncedSearch || undefined, page, page_size: pageSize }),
    staleTime: 30 * 1000,
  })

  const items      = data?.items ?? []
  const pagination = data?.pagination
  const total      = data?.total ?? 0

  const handlePageChange = (n: number) => {
    if (!pagination || n < 1 || n > pagination.total_pages) return
    setPage(n)
  }

  return (
    <div className="rounded-2xl border" style={{ background: "var(--th-card-bg)", borderColor: "var(--th-card-border)" }}>
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b"
        style={{ borderColor: "var(--th-card-border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(6,182,212,0.15)" }}>
            <Users className="w-4 h-4" style={{ color: "#06b6d4" }} />
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--th-text-1)" }}>광고주 목록</h2>
            <p className="text-xs" style={{ color: "var(--th-text-3)" }}>
              총 <span style={{ color: "#06b6d4", fontWeight: 600 }}>{total}</span>명의 광고주 계정을 관리해요.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={approvalStatus} onValueChange={(v) => { setApprovalStatus(v as ApprovalFilter); setPage(1) }}>
            <SelectTrigger className="w-full sm:w-[130px] text-sm rounded-xl border focus:ring-0"
              style={{ background: "var(--th-input-bg)", borderColor: "var(--th-input-border)", color: "var(--th-text-1)" }}>
              <SelectValue placeholder="승인 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="pending">승인 대기</SelectItem>
              <SelectItem value="approved">승인 완료</SelectItem>
              <SelectItem value="rejected">거절</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "var(--th-text-3)" }} />
            <Input type="text" placeholder="이름 / 회사명 검색"
              className="pl-9 text-sm rounded-xl border focus-visible:ring-0"
              style={{ background: "var(--th-input-bg)", borderColor: "var(--th-input-border)", color: "var(--th-text-1)" }}
              value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="p-5">
        {isError ? (
          <div className="py-10 text-center text-sm" style={{ color: "#f87171" }}>광고주 목록을 불러오지 못했어요.</div>
        ) : !isLoading && items.length === 0 ? (
          <div className="py-10 text-center text-sm" style={{ color: "var(--th-text-3)" }}>검색 조건에 맞는 광고주가 없어요.</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow style={BORDER}>
                  <TableHead style={HEAD_ST}>광고주명</TableHead>
                  <TableHead style={HEAD_ST}>회사명</TableHead>
                  <TableHead style={HEAD_ST}>이메일</TableHead>
                  <TableHead style={HEAD_ST}>승인 상태</TableHead>
                  <TableHead style={HEAD_ST}>가입일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                  : items.map((adv) => {
                      const acronym = adv.company_name?.[0] || adv.name?.[0] || adv.login_id?.[0] || "A"
                      return (
                        <TableRow key={adv.id} className="transition-colors cursor-pointer" style={BORDER}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--th-row-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                          onClick={() => router.push(`/admin/advertisers/${adv.id}`)}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border" style={{ borderColor: "rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.1)" }}>
                                <AvatarFallback className="text-[11px] font-bold" style={{ color: "#06b6d4", background: "transparent" }}>
                                  {acronym}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium" style={{ color: "var(--th-text-1)" }}>{adv.name}</span>
                                <span className="text-xs" style={{ color: "var(--th-text-3)" }}>ID: {adv.login_id}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ color: "var(--th-text-2)" }}>{adv.company_name}</TableCell>
                          <TableCell style={{ color: "var(--th-text-3)" }}>{adv.email || "-"}</TableCell>
                          <TableCell><StatusBadge status={adv.approval_status} /></TableCell>
                          <TableCell style={{ color: "var(--th-text-3)", fontSize: "12px" }}>
                            {adv.created_at ? new Date(adv.created_at).toLocaleDateString("ko-KR") : "-"}
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
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (pagination.has_prev) handlePageChange(page - 1) }} />
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>{pagination.page}</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (pagination.has_next) handlePageChange(page + 1) }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
