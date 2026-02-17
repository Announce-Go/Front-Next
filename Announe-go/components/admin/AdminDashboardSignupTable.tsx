"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { getSignupRequests, type SignupRequest } from "@/Features/apis/admin/signupRequests"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

function RoleBadge({ role }: { role: string }) {
  if (role === "agency") {
    return (
      <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
        업체
      </Badge>
    )
  }
  if (role === "advertiser") {
    return (
      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
        광고주
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="border-slate-200 text-slate-700 bg-slate-50">
      {role}
    </Badge>
  )
}

export function AdminDashboardSignupTable() {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "signup-requests", { page: 1, page_size: 5 }],
    queryFn: () => getSignupRequests({ page: 1, page_size: 5 }),
    staleTime: 30 * 1000,
  })

  const items = data?.items ?? []

  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        승인 요청 목록을 불러오는 중입니다...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-sm text-red-500">
        승인 요청 목록을 불러오지 못했습니다.
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        현재 승인 대기 중인 회원가입 요청이 없습니다.
      </div>
    )
  }

  const handleRowClick = (req: SignupRequest) => {
    router.push(`/admin/signup-requests/${req.id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50/50">
          <TableHead className="w-[100px]">구분</TableHead>
          <TableHead>업체/광고주명</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead>연락처</TableHead>
          <TableHead>신청일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((req) => (
          <TableRow
            key={req.id}
            className="hover:bg-slate-50/70 cursor-pointer transition-colors"
            onClick={() => handleRowClick(req)}
          >
            <TableCell>
              <RoleBadge role={req.role} />
            </TableCell>
            <TableCell className="font-medium">{req.company_name || req.name}</TableCell>
            <TableCell>{req.name}</TableCell>
            <TableCell className="text-muted-foreground">{req.phone || "-"}</TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {req.created_at
                ? new Date(req.created_at).toLocaleDateString("ko-KR")
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

