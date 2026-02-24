import { http } from "@/Featchs/api/http"

export type CafeInfiltrationItem = {
  id: number
  title: string
  content: string
  cafe_name: string
  url: string
  advertiser_id: number
  advertiser_company_name: string
  agency_company_name: string
  infiltration_date: string  // YYYY-MM-DD
  created_at: string
}

export type CafeInfiltrationMonthlyResponse = {
  items: CafeInfiltrationItem[]
}

export async function getCafeInfiltrationMonthlyList(year: number, month: number) {
  const res = await http.get<CafeInfiltrationMonthlyResponse>("/api/v1/admin/cafe-infiltration", {
    params: { year, month },
  })
  return res.data
}

export type CafeInfiltrationPayload = {
  advertiser_id: number
  infiltration_date: string
  title: string
  content: string
  cafe_name: string
  url: string
}

export async function createCafeInfiltration(payload: CafeInfiltrationPayload) {
  const res = await http.post<{ success: boolean }>("/api/v1/admin/cafe-infiltration", payload)
  return res.data
}

export async function updateCafeInfiltration(
  id: number,
  payload: Omit<CafeInfiltrationPayload, "infiltration_date">,
) {
  const res = await http.put<{ success: boolean }>(`/api/v1/admin/cafe-infiltration/${id}`, payload)
  return res.data
}

export async function deleteCafeInfiltration(id: number) {
  const res = await http.delete<{ success: boolean }>(`/api/v1/admin/cafe-infiltration/${id}`)
  return res.data
}
