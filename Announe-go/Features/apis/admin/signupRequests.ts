import { http } from "@/Featchs/api/http"

export type SignupRequest = {
  id: number
  login_id: string
  email?: string
  name: string
  phone?: string
  company_name?: string
  role: string
  created_at?: string
}

export type SignupRequestListResponse = {
  items: SignupRequest[]
  total?: number
}

export async function getSignupRequests(params?: {
  role?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<SignupRequestListResponse>("/api/v1/admin/signup-requests", {
    params,
  })
  return res.data
}

export async function getSignupRequestDetail(userId: number) {
  const res = await http.get<SignupRequest>(`/api/v1/admin/signup-requests/${userId}`)
  return res.data
}
