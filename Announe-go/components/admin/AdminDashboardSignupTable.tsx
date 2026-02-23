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

const BORDER  = { borderColor: "var(--th-row-border)" }
const HEAD_ST = { color: "var(--th-text-3)", background: "var(--th-table-head)", borderColor: "var(--th-row-border)", fontSize: "12px" }

function RoleBadge({ role }: { role: string }) {
  if (role === "agency")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }}>
        업체
      </span>
    )
  if (role === "advertiser")
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ background: "rgba(6,182,212,0.15)", color: "#67e8f9", border: "1px solid rgba(6,182,212,0.3)" }}>
        광고주
      </span>
    )
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: "var(--th-toggle-bg)", color: "var(--th-text-2)", border: "1px solid var(--th-toggle-border)" }}>
      {role}
    </span>
  )
}

function SkeletonRow() {
  return (
    <TableRow style={BORDER}>
      {[70, 140, 90, 110, 90].map((w, i) => (
        <TableCell key={i}>
          <div className="animate-pulse rounded-md"
            style={{ height: "13px", width: `${w}px`, background: "var(--th-skeleton)" }} />
        </TableCell>
      ))}
    </TableRow>
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

  if (isError)
    return <div className="py-8 text-center text-sm" style={{ color: "#f87171" }}>승인 요청 목록을 불러오지 못했어요.</div>

  if (!isLoading && items.length === 0)
    return <div className="py-8 text-center text-sm" style={{ color: "var(--th-text-3)" }}>현재 승인 대기 중인 가입 요청이 없어요.</div>

  return (
    <Table>
      <TableHeader>
        <TableRow style={BORDER}>
          <TableHead style={HEAD_ST}>구분</TableHead>
          <TableHead style={HEAD_ST}>업체 / 광고주명</TableHead>
          <TableHead style={HEAD_ST}>담당자</TableHead>
          <TableHead style={HEAD_ST}>연락처</TableHead>
          <TableHead style={HEAD_ST}>신청일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          : items.map((req) => (
              <TableRow key={req.id} className="transition-colors cursor-pointer"
                style={{ ...BORDER, ["--hover-bg" as any]: "var(--th-row-hover)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--th-row-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                onClick={() => router.push(`/admin/signup-requests/${req.id}`)}>
                <TableCell><RoleBadge role={req.role} /></TableCell>
                <TableCell style={{ color: "var(--th-text-1)", fontWeight: 500 }}>{req.company_name || req.name}</TableCell>
                <TableCell style={{ color: "var(--th-text-2)" }}>{req.name}</TableCell>
                <TableCell style={{ color: "var(--th-text-3)" }}>{req.phone || "-"}</TableCell>
                <TableCell style={{ color: "var(--th-text-3)", fontSize: "12px" }}>
                  {req.created_at ? new Date(req.created_at).toLocaleDateString("ko-KR") : "-"}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}
