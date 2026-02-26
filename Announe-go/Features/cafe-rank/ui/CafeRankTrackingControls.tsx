"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

type Props = {
  status: "all" | "active" | "stopped"
  keyword: string
  advertiserId: string
  page: number
  pageSize: number
}

export function CafeRankTrackingControls(props: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const [keywordInput, setKeywordInput] = useState(props.keyword)
  const [advertiserIdInput, setAdvertiserIdInput] = useState(props.advertiserId)

  const currentParams = useMemo(() => new URLSearchParams(sp.toString()), [sp])

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const applyFilters = () => {
    const next = new URLSearchParams(currentParams)
    next.set("page", "1")
    if (keywordInput.trim()) next.set("keyword", keywordInput.trim())
    else next.delete("keyword")
    if (advertiserIdInput.trim()) next.set("advertiser_id", advertiserIdInput.trim())
    else next.delete("advertiser_id")
    pushParams(next)
  }

  const STATUS_OPTIONS = [
    { value: "all", label: "전체" },
    { value: "active", label: "추적중" },
    { value: "stopped", label: "중단됨" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
      {/* 상태 필터 */}
      <div className="flex items-center gap-1">
        {STATUS_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              const next = new URLSearchParams(currentParams)
              next.set("page", "1")
              if (value === "all") next.delete("status")
              else next.set("status", value)
              pushParams(next)
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={
              props.status === value
                ? {
                    background: "linear-gradient(90deg, #06b6d4, #6366f1)",
                    color: "white",
                    boxShadow: "0 0 12px rgba(99,102,241,0.3)",
                  }
                : {
                    background: "rgba(255,255,255,0.06)",
                    color: "#94a3b8",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* 검색 입력 */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#475569" }} />
          <input
            type="text"
            placeholder="키워드 검색"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") applyFilters() }}
            onBlur={applyFilters}
            className="pl-9 pr-3 py-1.5 rounded-lg text-sm outline-none w-[160px] transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
            }}
          />
        </div>

        <input
          type="text"
          placeholder="광고주 검색"
          value={advertiserIdInput}
          onChange={(e) => setAdvertiserIdInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") applyFilters() }}
          onBlur={applyFilters}
          className="px-3 py-1.5 rounded-lg text-sm outline-none w-[130px] transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#ffffff",
          }}
        />

        <select
          value={String(props.pageSize)}
          onChange={(e) => {
            const next = new URLSearchParams(currentParams)
            next.set("page", "1")
            next.set("page_size", e.target.value)
            pushParams(next)
          }}
          className="px-2 py-1.5 rounded-lg text-xs outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8",
          }}
        >
          {["10", "20", "50"].map((v) => (
            <option key={v} value={v} style={{ background: "#0f0f2e" }}>{v}개</option>
          ))}
        </select>
      </div>

      {/* 추적 등록 버튼 */}
      <Link
        href="/agency/cafe-rank/tracking/new"
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
        style={{
          background: "linear-gradient(90deg, #06b6d4, #6366f1)",
          color: "white",
          boxShadow: "0 0 16px rgba(99,102,241,0.3)",
        }}
      >
        <Plus className="w-4 h-4" />
        추적 등록
      </Link>
    </div>
  )
}
