"use client"

import { useQuery } from "@tanstack/react-query"
import { getAdvertiserAgencies } from "@/Features/apis/advertiser"
import { useAuthStore } from "@/store/AuthStore"

export default function AdvertiserAgenciesPage() {
  const { user } = useAuthStore()

  const { data:list, isLoading, isError } = useQuery({
    queryKey: ["advertiser", "agencies"],
    queryFn: getAdvertiserAgencies,
  })

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">매핑된 업체 목록</h2>
        <p className="text-sm text-gray-500">광고주 계정에 매핑된 업체를 조회합니다.</p>
      </div>

      {isLoading ? (
        <div className="text-sm text-gray-500">불러오는 중...</div>
      ) : isError ? (
        <div className="text-sm text-red-500">목록을 불러오지 못했습니다.</div>
      ) : (
        <ul className="space-y-2">
          {list?.items.map((item, idx) => {
            const name =
              (typeof item?.company_name === "string" && item.company_name) ||
              (typeof item?.name === "string" && item.name) ||
              `업체 ${idx + 1}`
            const id = item?.id ?? idx
            return (
              <li
                key={String(id)}
                className="rounded-md border border-gray-200 bg-white px-4 py-3"
              >
                <div className="font-medium text-gray-900">{name}</div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

