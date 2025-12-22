import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AgencyList } from "@/components/user/agencyList"
import { Suspense } from "react"


function UserPlacePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">플레이스 순위 체크</h1>

      <Separator className="my-4" />

      {/* 등록된 광고주 리스트를 보여줍니다. */}
      <AgencyList />
    </div>
  )
}

export default UserPlacePage