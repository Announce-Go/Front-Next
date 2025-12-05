"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PlaceRank } from "@/components/user/PlaceRank"
import { Suspense } from "react"


function UserPlacePage() {
  return (
    <div>
      <h1>UserPlacePage</h1>

      <Separator className="my-4" />

      <Card>
        <CardContent>
            <PlaceRank />
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPlacePage