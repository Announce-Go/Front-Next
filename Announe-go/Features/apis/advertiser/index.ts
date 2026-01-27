import { http } from "@/Featchs/api/http"

// 광고주 API 목록



type AdvertiserAgenciesResponse = {
  items: [
    {
      id: number
      login_id: string
      name: string
      company_name: string
    }
  ]
}

/**
 * 광고주에게 매핑된 업체 목록 조회
 * GET /api/v1/advertiser/agencies
 */
export async function getAdvertiserAgencies(): Promise<AdvertiserAgenciesResponse> {
  const res = await http.get<AdvertiserAgenciesResponse>(
    "/api/v1/advertiser/agencies",
  )
  return res.data
}