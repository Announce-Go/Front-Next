"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { http } from "@/Featchs/api/http"
import type { AgencyAgenciesResponse } from "@/shared/types/agency"

/**
 * 업체에게 매핑된 광고주 목록 조회
 * GET /api/v1/agency/advertisers
 */
async function getAgencyAdvertisers(): Promise<AgencyAgenciesResponse> {
  const res = await http.get<AgencyAgenciesResponse>("/api/v1/agency/advertisers")
  return res.data
}

export function AgencyInfoCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["agency", "advertisers"],
    queryFn: getAgencyAdvertisers,
    staleTime: 5 * 1000, // 5초
  })

  return (
    <Card className="shadow-sm border-l-4 border-l-blue-500">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">매핑 광고주</CardTitle>
        <div className="p-2 bg-blue-100 rounded-full">
          <Users className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-2xl font-bold text-slate-900">로딩 중...</div>
        ) : isError ? (
          <>
            <div className="text-2xl font-bold text-slate-900">-</div>
            <p className="text-xs text-red-500 mt-1">데이터를 불러올 수 없습니다</p>
          </>
        ) : (
          <div className="text-2xl font-bold text-slate-900">{data?.total || 0}개</div>
        )}
        {/* <p className="text-xs text-blue-600 font-medium flex items-center mt-1">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          신규 1개사
        </p> */}
      </CardContent>
    </Card>
  )
}