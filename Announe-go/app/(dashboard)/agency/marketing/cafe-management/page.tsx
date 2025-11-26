import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui"
import { MonthChart, RegistStatus, DailyDeploy, CafeSignupConversion } from "./components"


function AgencyMarketingCafeManagementPage() {  
  return (
    <div>
      <h1>AgencyMarketingCafeManagementPage</h1>
      <Tabs defaultValue="monthChart">
        <TabsList>
          <TabsTrigger value="monthChart">월간 통계</TabsTrigger>
          <TabsTrigger value="registStatus">가입 상태</TabsTrigger>
          <TabsTrigger value="dailyDeploy">데일리 배포</TabsTrigger>
          <TabsTrigger value="cafeSignupConversion">카페 가입 유도 현황</TabsTrigger>
        </TabsList>
        <TabsContent value="monthChart">
          <MonthChart />
        </TabsContent>
        <TabsContent value="registStatus">
          <RegistStatus />
        </TabsContent>
        <TabsContent value="dailyDeploy">
          <DailyDeploy />
        </TabsContent>
        <TabsContent value="cafeSignupConversion">
          <CafeSignupConversion />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AgencyMarketingCafeManagementPage