"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { getSignupRequestDetail } from "@/Features/apis/admin/signupRequests"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { ArrowLeft, Mail, Phone, User2, Building2, ShieldCheck } from "lucide-react"

type Props = {
  userId: number
}

export function AdminSignupRequestDetail({ userId }: Props) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "signup-request", userId],
    queryFn: () => getSignupRequestDetail(userId),
    staleTime: 30 * 1000,
  })

  if (isLoading) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        회원가입 승인 요청 정보를 불러오는 중입니다...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">승인 요청 정보를 불러오지 못했습니다.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-1" /> 이전 페이지로
        </Button>
      </div>
    )
  }

  const createdAt = data.created_at
    ? new Date(data.created_at).toLocaleString("ko-KR")
    : "-"

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              회원가입 승인 상세
              <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50">
                {data.role === "agency" ? "업체" : data.role === "advertiser" ? "광고주" : data.role}
              </Badge>
            </h1>
            <p className="text-muted-foreground mt-1">신규 가입 요청 정보를 확인하고 승인/거절을 진행합니다.</p>
          </div>
        </div>
      </div>

      <Card className="shadow-sm border-t-4 border-t-indigo-500 max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User2 className="w-5 h-5 text-slate-700" />
            {data.name}
          </CardTitle>
          <CardDescription>요청 ID: {data.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">로그인 ID</p>
              <p className="text-sm font-medium text-slate-900">{data.login_id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">신청 일시</p>
              <p className="text-sm font-medium text-slate-900">{createdAt}</p>
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
            <div className="space-y-1 flex items-center gap-2 sm:col-span-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">업체/법인명</p>
                <p className="text-sm font-medium text-slate-900">{data.company_name || "-"}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              승인 및 거절 기능은 이후 화면에서 추가 예정입니다.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push("/admin/signup-requests") }>
                목록으로
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

