"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import {
  getAdminAdvertiserDetail,
  type AdminAdvertiserDetail,
} from "@/Features/apis/admin/advertisers"

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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import {
  ChevronLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  ImageIcon,
} from "lucide-react"

function statusBadge(status: string) {
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

export function AdminAdvertiserDetail({ advertiserId }: { advertiserId: number }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<AdminAdvertiserDetail>({
    queryKey: ["admin", "advertiser", advertiserId],
    queryFn: () => getAdminAdvertiserDetail(advertiserId),
    staleTime: 30 * 1000,
  })

  if (isLoading) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        광고주 상세 정보를 불러오는 중입니다...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">광고주 상세 정보를 불러오지 못했습니다.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" /> 이전 페이지로
        </Button>
      </div>
    )
  }

  const createdAt = data.created_at
    ? new Date(data.created_at).toLocaleString("ko-KR")
    : "-"

  const logoInitial = data.company_name?.[0] || data.name?.[0] || data.login_id?.[0] || "A"

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 1. 네비게이션 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-slate-900"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          목록으로
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-2xl font-bold text-slate-900">광고주 상세 정보</h1>
      </div>

      <div className="space-y-6">
        {/* 2. 기본 정보 */}
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm bg-blue-50">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                    {logoInitial}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {data.name}
                    {statusBadge(data.approval_status)}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                      광고주
                    </span>
                    <span className="text-slate-400">|</span>
                    <span>로그인 ID: {data.login_id}</span>
                    <span className="text-slate-400">|</span>
                    <span className="flex items-center gap-1 text-xs">
                      <Calendar className="w-3 h-3" /> 가입일: {createdAt}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Building2 className="w-4 h-4" /> 업체 / 법인명
                </div>
                <div className="text-base font-semibold text-slate-900">{data.company_name}</div>
              </div>

              <div className="space-y-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">이메일</p>
                  <p className="text-sm font-medium text-slate-900">{data.email || "-"}</p>
                </div>
              </div>

              <div className="space-y-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">연락처</p>
                  <p className="text-sm font-medium text-slate-900">{data.phone || "-"}</p>
                </div>
              </div>
            </div>

            {/* 첨부 파일 */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-900 mb-3">첨부 서류</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.business_license_file && (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-md border shadow-sm">
                        <FileText className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {data.business_license_file.original_filename}
                        </p>
                        <p className="text-xs text-slate-400">사업자등록증</p>
                      </div>
                    </div>
                  </div>
                )}

                {data.logo_file && (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-md border shadow-sm">
                        <ImageIcon className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {data.logo_file.original_filename}
                        </p>
                        <p className="text-xs text-slate-400">브랜드 로고</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. 매핑된 업체 목록 */}
        <Card className="shadow-sm border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle>매핑된 업체 목록</CardTitle>
            <CardDescription>이 광고주와 매핑된 업체 리스트입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {data.mapped_agencies && data.mapped_agencies.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>업체명</TableHead>
                    <TableHead>법인명</TableHead>
                    <TableHead className="w-[80px] text-right">ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.mapped_agencies.map((agency) => (
                    <TableRow key={agency.agency_id}>
                      <TableCell>{agency.agency_name}</TableCell>
                      <TableCell>{agency.agency_company_name}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {agency.agency_id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                아직 매핑된 업체가 없습니다.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

