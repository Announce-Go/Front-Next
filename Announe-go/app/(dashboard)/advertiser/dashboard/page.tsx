"use client"

import Link from "next/link"

export default function AdvertiserDashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">광고주 대시보드</h2>
        <p className="text-sm text-gray-500">매핑된 데이터 요약 영역입니다.</p>
      </div>

      <div className="rounded-md border border-gray-200 bg-white p-4">
        <div className="font-medium text-gray-900">바로가기</div>
        <div className="mt-2 text-sm">
          <Link className="text-blue-600 underline" href="/advertiser/agencies">
            매핑된 업체 목록 보기
          </Link>
        </div>
      </div>
    </div>
  )
}

