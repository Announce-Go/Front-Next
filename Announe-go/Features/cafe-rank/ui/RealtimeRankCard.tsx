"use client"

import { useState } from "react"
import { toast } from "sonner"
import { http } from "@/Featchs/api/http"
import { Search, TrendingUp, Loader2 } from "lucide-react"

type RealtimeRankResponse = {
  keyword: string
  url: string
  rank: number
  checked_at: string
}

export function CafeRealtimeRankCard() {
  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastResult, setLastResult] = useState<RealtimeRankResponse | null>(null)

  const onCheck = async () => {
    if (!keyword.trim() || !url.trim()) {
      toast.warning("키워드와 카페 게시글 URL을 입력해주세요.")
      return
    }
    setIsLoading(true)
    try {
      const { data } = await http.get<RealtimeRankResponse>(
        "/api/v1/agency/cafe-rank/realtime",
        { params: { keyword: keyword.trim(), url: url.trim() } },
      )
      setLastResult(data)
      toast.success(`현재 순위 ${data.rank}위`, { description: data.keyword })
    } catch (e) {
      console.error(e)
      toast.error("실시간 순위 조회에 실패했어요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="rounded-2xl border p-6 space-y-5 backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" style={{ color: "#06b6d4" }} />
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          실시간 순위 조회 (건바이건)
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex flex-col gap-1.5 w-full md:w-[260px]">
          <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>키워드</label>
          <input
            type="text"
            placeholder="예: 다이어트"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onCheck() }}
            disabled={isLoading}
            className="px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium" style={{ color: "#94a3b8" }}>카페 게시글 URL</label>
          <input
            type="text"
            placeholder="https://cafe.naver.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onCheck() }}
            disabled={isLoading}
            className="px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          />
        </div>

        <button
          type="button"
          onClick={onCheck}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-40 flex-shrink-0"
          style={{
            background: "linear-gradient(90deg, #06b6d4, #6366f1)",
            color: "white",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />조회 중...</>
          ) : "조회"}
        </button>
      </div>

      {lastResult && !isLoading && (
        <div
          className="flex items-center justify-between px-5 py-4 rounded-xl"
          style={{
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.25)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "#06b6d4" }}>조회 결과</p>
              <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>키워드: {lastResult.keyword}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium mr-1" style={{ color: "#94a3b8" }}>현재 순위</span>
            <span className="text-3xl font-bold" style={{ color: "#06b6d4" }}>{lastResult.rank}</span>
            <span className="text-lg font-medium" style={{ color: "#06b6d4" }}>위</span>
          </div>
        </div>
      )}
    </div>
  )
}
