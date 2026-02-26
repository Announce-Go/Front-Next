import { http } from "@/Featchs/api/http"

/* ── 실시간 조회 ── */
export type CafeRankRealtimeResult = {
  keyword: string
  url: string
  rank: number | null
}

export async function getCafeRankRealtime(params: { keyword: string; url: string }) {
  const res = await http.get<CafeRankRealtimeResult>("/api/v1/admin/cafe-rank/realtime", { params })
  return res.data
}

/* ── 추적 목록 ── */
export type CafeRankTrackingItem = {
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

export type CafeRankTrackingListResponse = {
  items: CafeRankTrackingItem[]
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

export async function getCafeRankTrackingList(params?: {
  status?: string
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<CafeRankTrackingListResponse>("/api/v1/admin/cafe-rank/tracking", { params })
  return res.data
}

/* ── 추적 상세 ── */
export type CafeHistoryItem = {
  checked_at: string
  rank: number | null
  session: number
}

export type CafeRankTrackingDetail = {
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
  histories: CafeHistoryItem[]
  history_total: number
}

export async function getCafeRankTrackingDetail(id: number) {
  const res = await http.get<CafeRankTrackingDetail>(`/api/v1/admin/cafe-rank/tracking/${id}`)
  return res.data
}

/* ── 추적 중단 ── */
export async function stopCafeRankTracking(id: number) {
  const res = await http.put<{ success: boolean }>(`/api/v1/admin/cafe-rank/tracking/${id}/stop`)
  return res.data
}
