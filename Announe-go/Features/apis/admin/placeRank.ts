import { http } from "@/Featchs/api/http"

/* ── 실시간 조회 ── */
export type PlaceRankRealtimeResult = {
  keyword: string
  url: string
  rank: number | null
}

export async function getPlaceRankRealtime(params: { keyword: string; url: string }) {
  const res = await http.get<PlaceRankRealtimeResult>("/api/v1/admin/place-rank/realtime", { params })
  return res.data
}

/* ── 추적 목록 ── */
export type PlaceRankTrackingItem = {
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

export type PlaceRankTrackingListResponse = {
  items: PlaceRankTrackingItem[]
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

export async function getPlaceRankTrackingList(params?: {
  status?: string
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<PlaceRankTrackingListResponse>("/api/v1/admin/place-rank/tracking", { params })
  return res.data
}

/* ── 추적 상세 ── */
export type HistoryItem = {
  checked_at: string
  rank: number | null
  session: number
}

export type PlaceRankTrackingDetail = {
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
  histories: HistoryItem[]
  history_total: number
}

export async function getPlaceRankTrackingDetail(id: number) {
  const res = await http.get<PlaceRankTrackingDetail>(`/api/v1/admin/place-rank/tracking/${id}`)
  return res.data
}

/* ── 추적 중단 ── */
export async function stopPlaceRankTracking(id: number) {
  const res = await http.put<{ success: boolean }>(`/api/v1/admin/place-rank/tracking/${id}/stop`)
  return res.data
}
