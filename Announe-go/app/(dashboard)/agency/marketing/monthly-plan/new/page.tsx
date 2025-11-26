"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Checkbox,
  Button,
} from "@/components/ui"
import { Calendar } from "@/components/ui"
import { useState } from "react"

function AgencyMarketingBlogTopNewPage() {
  const [payDate, setPayDate] = useState<Date | undefined>(
    new Date("2025-11-20")
  )
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date("2025-11-21")
  )
  return (
    <section className="w-full p-4">
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>새 회차 시작</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roundNo">회차 번호</Label>
              <Input id="roundNo" placeholder="회차를 입력해주세요." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyword">키워드 *</Label>
              <Input id="keyword" required placeholder="예: 강남 한의원" />
            </div>

            <div className="space-y-3">
              <Label>노출 형태 * (복수 선택 가능)</Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <Checkbox id="type-once" />
                  <span>인기글</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox id="type-monthly" />
                  <span>스마트블럭</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox id="type-monthly" />
                  <span>타랭킹</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>결제일 *</Label>
                <div className="rounded-md border inline-block">
                  <Calendar
                    mode="single"
                    selected={payDate}
                    onSelect={setPayDate}
                    initialFocus
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>노출 시작일 *</Label>
                <div className="rounded-md border inline-block">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" className="cursor-pointer">
              취소
            </Button>
            <Button type="button" className="cursor-pointer">
              저장
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default AgencyMarketingBlogTopNewPage
