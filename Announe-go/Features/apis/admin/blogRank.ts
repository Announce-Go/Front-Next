import { http } from "@/Featchs/api/http"

/* ── 실시간 조회 ── */
export type BlogRankRealtimeResult = {
  keyword: string
  url: string
  rank: number | null
}

export async function getBlogRankRealtime(params: { keyword: string; url: string }) {
  const res = await http.get<BlogRankRealtimeResult>("/api/v1/admin/blog-rank/realtime", { params })
  return res.data
}

/* ── 추적 목록 ── */
export type BlogRankTrackingItem = {
  id: number
  keyword: string
  url: string
  advertiser_company_name: string
  agency_company_name: string
  current_round: number
  progress_count: number
  total_count: number
  latest_rank: number | null
  status: "active" | "completed" | "stopped"
}

export type BlogRankTrackingListResponse = {
  items: BlogRankTrackingItem[]
  total: number
  pagination: {
    total: number
    page: number
    page_size: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

export async function getBlogRankTrackingList(params?: {
  status?: string
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<BlogRankTrackingListResponse>("/api/v1/admin/blog-rank/tracking", { params })
  return res.data
}

/* ── 추적 상세 ── */
export type BlogRankHistoryEntry = {
  date: string
  rank: number | null
}

export type BlogRoundHistory = {
  round: number
  status: "active" | "completed"
  count: number
  entries: BlogRankHistoryEntry[]
}

export type BlogRankTrackingDetail = {
  id: number
  keyword: string
  url: string
  advertisers: { id: number; company_name: string }[]
  created_at: string
  status: "active" | "completed" | "stopped"
  rounds: BlogRoundHistory[]
}

export async function getBlogRankTrackingDetail(id: number) {
  const res = await http.get<BlogRankTrackingDetail>(`/api/v1/admin/blog-rank/tracking/${id}`)
  return res.data
}

/* ── 추적 중단 ── */
export async function stopBlogRankTracking(id: number) {
  const res = await http.put<{ success: boolean }>(`/api/v1/admin/blog-rank/tracking/${id}/stop`)
  return res.data
}
