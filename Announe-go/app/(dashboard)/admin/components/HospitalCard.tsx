import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

function HospitalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>광고주</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>5개</h1>
      </CardContent>
    </Card>
  )
}

export { HospitalCard }
