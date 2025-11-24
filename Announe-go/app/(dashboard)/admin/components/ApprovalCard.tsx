import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function ApprovalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>승인 대기 중</CardTitle>
      </CardHeader>
      <CardContent>
        <div> 승인 대기 중인 광고주 수: 10개</div>
        <div> 승인 대기 중인 업체주 수: 10개</div>
      </CardContent>
    </Card>
  )
}

export { ApprovalCard }
