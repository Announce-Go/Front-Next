import { http } from "@/Featchs/api/http"

export type AdminAgency = {
  id: number
  login_id: string
  email?: string
  name: string
  company_name: string
  categories: string[]
  approval_status: "pending" | "approved" | "rejected" | string
  created_at: string
}

export type AdminAgencyListResponse = {
  items: AdminAgency[]
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

export async function getAdminAgencies(params?: {
  approval_status?: "pending" | "approved" | "rejected" | ""
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<AdminAgencyListResponse>("/api/v1/admin/agencies", {
    params,
  })
  return res.data
}

export type AdminAgencyDetail = AdminAgency & {
  phone?: string
  mapped_advertisers?: {
    advertiser_id: number
    advertiser_name: string
    advertiser_company_name: string
  }[]
}

export async function getAdminAgencyDetail(agencyId: number) {
  const res = await http.get<AdminAgencyDetail>(
    `/api/v1/admin/agencies/${agencyId}`,
  )
  return res.data
}

