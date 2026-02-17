"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { getAdminAgencyDetail, type AdminAgencyDetail } from "@/Features/apis/admin/agencies"

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

function renderCategoryBadge(cat: string) {
  if (cat === "place_rank") return <Badge className="bg-green-100 text-green-700 border-0">플레이스</Badge>
  if (cat === "cafe_rank") return <Badge className="bg-red-100 text-red-700 border-0">카페</Badge>
  if (cat === "blog_rank") return <Badge className="bg-emerald-100 text-emerald-700 border-0">블로그</Badge>
  if (cat === "brand_blog") return <Badge className="bg-pink-100 text-pink-700 border-0">브랜드</Badge>
  if (cat === "press") return <Badge className="bg-slate-100 text-slate-700 border-0">언론기사</Badge>
  if (cat === "cafe_infiltration") return <Badge className="bg-indigo-100 text-indigo-700 border-0">카페 침투</Badge>
  return <Badge variant="outline">{cat}</Badge>
}

export function AdminAgencyDetail({ agencyId }: { agencyId: number }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery<AdminAgencyDetail>({
    queryKey: ["admin", "agency", agencyId],
    queryFn: () => getAdminAgencyDetail(agencyId),
    staleTime: 30 * 1000,
  })

  if (isLoading) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        업체 상세 정보를 불러오는 중입니다...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">업체 상세 정보를 불러오지 못했습니다.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-1" /> 이전 페이지로
        </Button>
      </div>
    )
  }

  const createdAt = data.created_at
    ? new Date(data.created_at).toLocaleString("ko-KR")
    : "-"

  const initials = data.company_name?.[0] || data.name?.[0] || data.login_id?.[0] || "A"

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 헤더 */}
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
        <h1 className="text-2xl font-bold text-slate-900">업체 상세 정보</h1>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* 기본 정보 */}
        <Card className="shadow-sm border-t-4 border-t-purple-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm bg-purple-50">
                  <AvatarFallback className="text-xl font-bold text-purple-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {data.name}
                    {statusBadge(data.approval_status)}
                  </CardTitle>
                  <CardDescription className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span>로그인 ID: {data.login_id}</span>
                    <span className="text-slate-400">|</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> 가입일: {createdAt}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
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

            {/* 이용 카테고리 */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">이용 카테고리</p>
              {data.categories && data.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.categories.map((cat) => (
                    <span key={cat}>{renderCategoryBadge(cat)}</span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">등록된 카테고리가 없습니다.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 매핑된 광고주 목록 */}
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle>매핑된 광고주 목록</CardTitle>
            <CardDescription>이 업체와 매핑된 광고주 리스트입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {data.mapped_advertisers && data.mapped_advertisers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>광고주명</TableHead>
                    <TableHead>회사명</TableHead>
                    <TableHead className="w-[80px] text-right">ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.mapped_advertisers.map((adv) => (
                    <TableRow key={adv.advertiser_id}>
                      <TableCell>{adv.advertiser_name}</TableCell>
                      <TableCell>{adv.advertiser_company_name}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {adv.advertiser_id}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                아직 매핑된 광고주가 없습니다.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

