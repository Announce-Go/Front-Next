import { CafeRealtimeRankCard } from "@/Features/cafe-rank/ui/RealtimeRankCard"
import { CafeRankTrackingCard } from "@/Features/cafe-rank/ui/CafeRankTrackingCard"
import { Coffee } from "lucide-react"

type SearchParams = Record<string, string | string[] | undefined>

export default async function AgencyCafeRankPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>
}) {
  const params = await searchParams
  return (
    <div
      className="min-h-screen p-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)" }}
    >
      {/* 배경 블롭 */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(99,102,241,0.15)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(6,182,212,0.1)" }} />

      {/* 헤더 */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
          >
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">카페 글 순위 관리</h1>
        </div>
        <p className="text-sm ml-[52px]" style={{ color: "#94a3b8" }}>
          담당 광고주의 카페 게시글 순위를 조회하고 추적 키워드를 등록해요.
        </p>
      </div>

      <div className="relative space-y-6">
        <CafeRealtimeRankCard />
        <CafeRankTrackingCard searchParams={params} />
      </div>
    </div>
  )
}
