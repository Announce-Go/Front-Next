"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { http } from "@/Featchs/api/http"
import { Search, Loader2 } from "lucide-react"

type AdvertiserItem = {
  id: number
  company_name: string
}

type Props = {
  advertisers: AdvertiserItem[]
}

export function AgencyBlogRankNewForm({ advertisers }: Props) {
  const router = useRouter()

  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")
  const [advertiserSearch, setAdvertiserSearch] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filtered = advertiserSearch.trim()
    ? advertisers.filter((a) =>
        a.company_name.toLowerCase().includes(advertiserSearch.toLowerCase())
      )
    : advertisers

  const handleSubmit = async () => {
    if (!keyword.trim()) { toast.warning("키워드를 입력해주세요."); return }
    if (!url.trim()) { toast.warning("블로그 게시글 URL을 입력해주세요."); return }
    if (!selectedId) { toast.warning("광고주를 선택해주세요."); return }

    setIsSubmitting(true)
    try {
      await http.post("/api/v1/agency/blog-rank/tracking", {
        keyword: keyword.trim(),
        url: url.trim(),
        advertiser_id: selectedId,
      })
      toast.success("추적 등록이 완료됐어요.")
      router.push("/agency/blog-rank")
    } catch (e) {
      console.error(e)
      toast.error("추적 등록에 실패했어요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ffffff",
  }

  return (
    <div
      className="rounded-2xl border backdrop-blur-sm p-6 space-y-6 max-w-2xl"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      {/* 키워드 */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          키워드 <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="예: 피부관리"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
          style={inputStyle}
        />
      </div>

      {/* URL */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          URL <span style={{ color: "#f87171" }}>*</span>
        </label>
        <input
          type="text"
          placeholder="https://blog.naver.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
          style={inputStyle}
        />
      </div>

      {/* 광고주 선택 */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
          광고주 선택 <span style={{ color: "#f87171" }}>*</span>
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#475569" }} />
          <input
            type="text"
            placeholder="광고주명 검색"
            value={advertiserSearch}
            onChange={(e) => setAdvertiserSearch(e.target.value)}
            disabled={isSubmitting}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
            style={inputStyle}
          />
        </div>

        <div
          className="rounded-xl overflow-hidden max-h-52 overflow-y-auto"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm" style={{ color: "#475569" }}>
              {advertisers.length === 0 ? "매핑된 광고주가 없어요." : "검색 결과가 없어요."}
            </div>
          ) : (
            filtered.map((adv) => {
              const isSelected = selectedId === adv.id
              return (
                <label
                  key={adv.id}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                  style={{
                    background: isSelected ? "rgba(6,182,212,0.1)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    borderLeft: isSelected ? "2px solid #06b6d4" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent"
                  }}
                >
                  <input
                    type="radio"
                    name="advertiser"
                    value={adv.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(adv.id)}
                    disabled={isSubmitting}
                    className="accent-cyan-500"
                  />
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}
                  >
                    {adv.company_name[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: isSelected ? "#06b6d4" : "#94a3b8" }}>
                    {adv.company_name}
                  </span>
                </label>
              )
            })
          )}
        </div>
      </div>

      <p className="text-xs" style={{ color: "#475569" }}>
        ※ 추적 등록 후 매일 자동으로 순위가 조회되어 저장돼요.
      </p>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={() => router.push("/agency/blog-rank")}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-75 disabled:opacity-40"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-40"
          style={{
            background: "linear-gradient(90deg, #06b6d4, #6366f1)",
            color: "white",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" />등록 중...</>
          ) : "등록"}
        </button>
      </div>
    </div>
  )
}
