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
export type CafeRankHistoryEntry = {
  date: string
  rank: number | null
}

export type CafeRoundHistory = {
  round: number
  status: "active" | "completed"
  count: number
  entries: CafeRankHistoryEntry[]
}

export type CafeRankTrackingDetail = {
  id: number
  keyword: string
  url: string
  advertisers: { id: number; company_name: string }[]
  created_at: string
  status: "active" | "completed" | "stopped"
  rounds: CafeRoundHistory[]
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
