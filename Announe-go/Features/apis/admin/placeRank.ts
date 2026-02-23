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
export type RankHistoryEntry = {
  date: string
  rank: number | null
}

export type RoundHistory = {
  round: number
  status: "active" | "completed"
  count: number
  entries: RankHistoryEntry[]
}

export type PlaceRankTrackingDetail = {
  id: number
  keyword: string
  url: string
  advertisers: { id: number; company_name: string }[]
  created_at: string
  status: "active" | "completed" | "stopped"
  rounds: RoundHistory[]
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
