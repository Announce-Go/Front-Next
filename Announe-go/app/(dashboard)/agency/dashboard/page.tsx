import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function AgencyDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">대시보드</h2>
      <Card>
        <CardHeader>
          <CardTitle>대시보드</CardTitle>
          <CardDescription>블로그 상위노출, 브랜드 블로그, 카페, 영수증 리뷰 등 광고등 내용을 입력해주세요!</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AgencyDashboardPage