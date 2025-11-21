import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui"

function AgencyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>업체</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>10개</h1>
      </CardContent>
    </Card>
  )
}

export { AgencyCard }
