import { http } from "@/Featchs/api/http"

export type AdminAdvertiserFile = {
  id: number
  original_filename: string
  file_type: string
  mime_type: string
  file_size: number
  created_at: string
}

export type AdminAdvertiser = {
  id: number
  login_id: string
  email?: string
  name: string
  company_name: string
  approval_status: "pending" | "approved" | "rejected" | string
  business_license_file?: AdminAdvertiserFile | null
  logo_file?: AdminAdvertiserFile | null
  created_at: string
}

export type AdminAdvertiserListResponse = {
  items: AdminAdvertiser[]
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

export async function getAdminAdvertisers(params?: {
  approval_status?: "pending" | "approved" | "rejected" | ""
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<AdminAdvertiserListResponse>("/api/v1/admin/advertisers", {
    params,
  })
  return res.data
}

export type AdminAdvertiserDetail = AdminAdvertiser & {
  phone?: string
  mapped_agencies?: {
    agency_id: number
    agency_name: string
    agency_company_name: string
    phone?: string
    categories?: string[]
  }[]
}

export async function getAdminAdvertiserDetail(advertiserId: number) {
  const res = await http.get<AdminAdvertiserDetail>(
    `/api/v1/admin/advertisers/${advertiserId}`,
  )
  return res.data
}

