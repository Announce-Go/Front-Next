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
        <h1> 승인 대기 중인 병원 수: 10개</h1>
      </CardContent>
    </Card>
  )
}

export { ApprovalCard }
