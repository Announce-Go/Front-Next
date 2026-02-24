import { http } from "@/Featchs/api/http"

export type PressArticle = {
  id: number
  title: string
  content: string
  url: string
  advertiser_id: number
  advertiser_company_name: string
  agency_company_name: string
  article_date: string  // YYYY-MM-DD
  created_at: string
}

export type PressMonthlyResponse = {
  items: PressArticle[]
}

export async function getPressMonthlyList(year: number, month: number) {
  const res = await http.get<PressMonthlyResponse>("/api/v1/admin/press", {
    params: { year, month },
  })
  return res.data
}

export type PressArticlePayload = {
  advertiser_id: number
  article_date: string
  title: string
  content: string
  url: string
}

export async function createPressArticle(payload: PressArticlePayload) {
  const res = await http.post<{ success: boolean }>("/api/v1/admin/press", payload)
  return res.data
}

export async function updatePressArticle(
  id: number,
  payload: Omit<PressArticlePayload, "article_date">,
) {
  const res = await http.put<{ success: boolean }>(`/api/v1/admin/press/${id}`, payload)
  return res.data
}

export async function deletePressArticle(id: number) {
  const res = await http.delete<{ success: boolean }>(`/api/v1/admin/press/${id}`)
  return res.data
}
