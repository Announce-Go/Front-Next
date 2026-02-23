import { http } from "@/Featchs/api/http"

export type SignupRequestFile = {
  id: number
  original_filename: string
  file_type: string
  mime_type: string
  file_size: number
  created_at: string
}

export type SignupRequest = {
  id: number
  login_id: string
  email?: string
  name: string
  phone?: string
  company_name?: string
  role: string
  categories?: string[]
  approval_status?: string
  created_at?: string
  business_license_file?: SignupRequestFile | null
  logo_file?: SignupRequestFile | null
}

export type SignupRequestListResponse = {
  items: SignupRequest[]
  total?: number
}

export async function getSignupRequests(params?: {
  role?: string
  approval_status?: string
  search?: string
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

export async function approveSignupRequest(
  userId: number,
  body?: { advertiser_ids?: number[] },
) {
  const res = await http.post(`/api/v1/admin/signup-requests/${userId}/approve`, body ?? {})
  return res.data
}

export async function rejectSignupRequest(userId: number) {
  const res = await http.post(`/api/v1/admin/signup-requests/${userId}/reject`)
  return res.data
}
