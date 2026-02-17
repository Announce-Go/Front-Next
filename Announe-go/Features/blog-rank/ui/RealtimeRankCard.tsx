"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { http } from "@/Featchs/api/http"

type RealtimeRankResponse = {
  keyword: string
  url: string
  rank: number
  checked_at: string
}

export function BlogRealtimeRankCard() {
  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastResult, setLastResult] = useState<RealtimeRankResponse | null>(null)

  const onCheckRealtimeRank = async () => {
    const keywordTrimmed = keyword
    const urlTrimmed = url

    if (!keywordTrimmed || !urlTrimmed) {
      toast.warning("키워드와 블로그 게시글 URL을 입력해주세요.")
      return
    }

    setIsLoading(true)
    try {
      const { data } = await http.get<RealtimeRankResponse>(
        "/api/v1/agency/blog-rank/realtime",
        {
          params: { keyword: keywordTrimmed, url: urlTrimmed },
        },
      )

      setLastResult(data)

      const checkedAt = Number.isNaN(Date.parse(data.checked_at))
        ? data.checked_at
        : new Date(data.checked_at).toLocaleString()

      toast.success(`현재 순위 ${data.rank}위`, {
        description: `${data.keyword} • ${checkedAt}`,
      })
    } catch (e) {
      console.error(e)
      toast.error("실시간 순위 조회에 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-sm border-t-4 border-t-blue-500 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          실시간 순위 조회
        </CardTitle>
        <CardDescription>
          키워드와 블로그 게시글 URL을 입력하여 현재 순위를 즉시 확인합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="grid w-[250px] items-center gap-1.5">
            <label className="text-sm font-medium leading-none">키워드</label>
            <Input
              type="text"
              placeholder="예: 강남한의원"
              className="bg-slate-50"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 flex-1">
            <label className="text-sm font-medium leading-none">블로그 게시글 URL</label>
            <Input
              type="text"
              placeholder="https://blog.naver.com/..."
              className="bg-slate-50"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onCheckRealtimeRank}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                조회중...
              </span>
            ) : (
              "조회하기"
            )}
          </Button>
        </div>

        {/* 조회 중 표시 */}
        {isLoading && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-3 animate-in fade-in">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <p className="text-sm text-slate-600">순위를 조회하고 있습니다...</p>
          </div>
        )}

        {/* 조회 결과 영역 (조건부 렌더링) */}
        {!isLoading && lastResult ? (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">조회 결과</p>
                <p className="text-xs text-blue-600">키워드: {lastResult.keyword}</p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-blue-700 font-medium mr-2">현재 순위</span>
              <span className="text-3xl font-bold text-blue-700">{lastResult.rank}</span>
              <span className="text-lg font-medium text-blue-600">위</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
