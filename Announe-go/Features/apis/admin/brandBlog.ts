import { http } from "@/Featchs/api/http"

export type BrandBlogItem = {
  id: number
  keyword: string
  url: string
  advertiser_company_name: string
  agency_company_name: string
  posted_at: string
  created_at: string
}

export type BrandBlogListResponse = {
  items: BrandBlogItem[]
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

export async function getAdminBrandBlogList(params?: {
  search?: string
  page?: number
  page_size?: number
}) {
  const res = await http.get<BrandBlogListResponse>("/api/v1/admin/blog-posting", { params })
  return res.data
}
