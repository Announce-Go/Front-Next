import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import type { AgencyAgenciesResponse } from "@/shared/types/agency"
import { serverFetch } from "@/Featchs/api/server-fetch"

/**
 * 서버 컴포넌트 버전의 AgencyInfoCard
 * 서버에서 데이터를 가져와서 렌더링합니다.
 */
export async function AgencyInfoCardServer() {
  try {
    const data = await serverFetch<AgencyAgenciesResponse>("/api/v1/agency/advertisers", {
      cache: 'no-store' // 매번 최신 데이터 가져오기
    });

    return (
      <Card className="shadow-sm border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">매핑 광고주</CardTitle>
          <div className="p-2 bg-blue-100 rounded-full">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{data.total}개시</div>
          {/* <p className="text-xs text-blue-600 font-medium flex items-center mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            신규 1개사
          </p> */}
        </CardContent>
      </Card>
    )
  } catch (error) {
    // 에러 발생 시 기본값 표시
    console.error('[AgencyInfoCardServer] 데이터 로드 실패:', error);
    return (
      <Card className="shadow-sm border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">매핑 광고주</CardTitle>
          <div className="p-2 bg-blue-100 rounded-full">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">-</div>
          <p className="text-xs text-red-500 mt-1">데이터를 불러올 수 없습니다</p>
        </CardContent>
      </Card>
    )
  }
}
