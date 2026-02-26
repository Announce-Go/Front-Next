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
  type: string
  keyword: string
  url: string
  status: "active" | "completed" | "stopped"
  current_session: number
  agency_id: number
  agency_name: string
  advertiser_id: number
  advertiser_name: string
  latest_rank: number | null
  latest_checked_at: string | null
  created_at: string
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
export type BlogHistoryItem = {
  checked_at: string
  rank: number | null
  session: number
}

export type BlogRankTrackingDetail = {
  id: number
  type: string
  keyword: string
  url: string
  status: "active" | "completed" | "stopped"
  current_session: number
  agency_id: number
  agency_name: string
  advertiser_id: number
  advertiser_name: string
  created_at: string
  updated_at: string
  histories: BlogHistoryItem[]
  history_total: number
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
