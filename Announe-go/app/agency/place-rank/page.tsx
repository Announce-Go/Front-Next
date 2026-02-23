import {
  CardTitle,
} from "@/components/ui/card"

import { RealtimeRankCard } from "@/Features/place-rank/ui/RealtimeRankCard"
import { PlaceRankTrackingCard } from "@/Features/place-rank/ui/PlaceRankTrackingCard"

import { 
  MapPin
} from "lucide-react"

type SearchParams = Record<string, string | string[] | undefined>

export default function AgencyPlaceRankPage({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-green-600" />
            플레이스 순위 관리
          </h1>
          <p className="text-muted-foreground mt-1">
            담당 광고주의 플레이스 순위를 조회하고 추적 키워드를 등록합니다.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* 1. 실시간 순위 조회 DB 저장 안함 */}
        <RealtimeRankCard />

        {/* 2. 추적 목록 (월보장) */}
        <PlaceRankTrackingCard searchParams={searchParams} />
      </div>
    </div>
  )
}