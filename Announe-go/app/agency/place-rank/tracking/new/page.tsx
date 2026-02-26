import Link from "next/link"
import { MapPin } from "lucide-react"

import { serverFetch } from "@/Featchs/api/server-fetch"
import { AgencyPlaceRankNewForm } from "@/Features/place-rank/ui/AgencyPlaceRankNewForm"

type AdvertiserItem = {
  id: number
  company_name: string
}

type AdvertisersResponse = {
  items: AdvertiserItem[]
  total: number
}

export default async function AgencyPlaceRankNewPage() {
  let advertisers: AdvertiserItem[] = []
  try {
    const data = await serverFetch<AdvertisersResponse>("/api/v1/agency/advertisers", {
      cache: "no-store",
    })
    advertisers = data.items ?? []
  } catch (e) {
    console.error(e)
  }

  return (
    <div
      className="min-h-screen p-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)" }}
    >
      {/* 배경 블롭 */}
      <div className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(99,102,241,0.15)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(6,182,212,0.1)" }} />

      {/* 헤더 */}
      <div className="relative flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">플레이스 순위 추적 등록</h1>
          </div>
          <p className="text-sm ml-[52px]" style={{ color: "#94a3b8" }}>
            새 키워드 추적을 등록해요.
          </p>
        </div>
        <Link
          href="/agency/place-rank"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-75"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          ← 목록으로
        </Link>
      </div>

      <div className="relative">
        <AgencyPlaceRankNewForm advertisers={advertisers} />
      </div>
    </div>
  )
}
