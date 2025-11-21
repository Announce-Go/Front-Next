"use client"
import { Input } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

import { useState, useEffect } from "react"
import dayjs from "dayjs"
import "dayjs/locale/ko"

dayjs.locale("ko")

function AgencyMarketingBlogTopDetailPage() {
  const [startDate, setStartDate] = useState<string>("20251028")

  const [today, setToday] = useState<string>("20251121")

  // 노출 일자 리스트
  const [list, setList] = useState<{ date: string; count: number }[]>([])
  // 노출 시작일자

  useEffect(() => {
    const days = dayjs(startDate)
    const diffDays: number = dayjs(today).diff(dayjs(startDate), "day")

    const newList = []
    for (let i = 0; i < diffDays + 1; i++) {
      newList.push({
        date: days.add(i, "day").format("MM/DD(ddd)"),
        count: i + 1,
      })
    }
    setList(newList)
  }, [startDate])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStartDate("20251029")
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            1회차 상세
            <button onClick={handleClick}>Click</button>
            {startDate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {list.map((item, index) => (
                  <TableHead key={index}>{item.date}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {list.map((item, index) => (
                  <TableCell key={index}>
                    {item.date === dayjs(today).format("MM/DD(ddd)") ? (
                      <Input type="number" className="w-[65px]" />
                    ) : (
                      <>{item.count}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgencyMarketingBlogTopDetailPage
