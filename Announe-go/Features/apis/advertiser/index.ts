import { http } from "@/Featchs/api/http"
import type { AgencyAgenciesResponse } from "@/shared/types/agency"

/**
 * 광고주에게 매핑된 업체 목록 조회
 * GET /api/v1/advertiser/agencies
 */
export async function getAdvertiserAgencies(): Promise<AgencyAgenciesResponse> {
  const res = await http.get<AgencyAgenciesResponse>(
    "/api/v1/advertiser/agencies",
  )
  return res.data
}