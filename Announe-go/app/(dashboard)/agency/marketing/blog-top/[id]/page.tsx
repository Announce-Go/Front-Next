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
import apiData from "./apiData.json"
import CreateBlogTop from "@/app/(dashboard)/agency/components/CreateBlogTop"
import { Button } from "@/components/ui"
import Link from "next/link"

dayjs.locale("ko")


type LIST_DATA_TYPE = {
  hospitalName?: string;
  title: string;
  dateList: string[];
  rows: {
    keyWord: string;
    count: number;
    values: {date: string, rank: number}[];
  }[]
}


function AgencyMarketingBlogTopDetailPage() {
  const [list, setList] = useState<LIST_DATA_TYPE>({
    dateList: [],
    rows: [],
    title: ""
  })

  useEffect(() => {
    const res = apiData
    setList(res)
  }, [])

  return (
    <div>
      <div className="mx-auto w-full max-w-3xl space-y-4">
        <Card>
          <CardHeader>
            <div className="w-[100px]">
              <Button >
                <Link href={`/agency/marketing/blog-top/new`}>블로그 상위노출 입력하기</Link>
              </Button>
            </div>
            <h4 className="text-lg font-bold">블로그 상위노출 [{dayjs().format("YYYY-MM-DD")}]</h4>
            <p className="text-sm text-gray-500">광고주: {list.hospitalName}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>회차</TableCell>
                  <TableCell>키워드</TableCell>
                  <TableCell>카운트</TableCell>
                  {list.dateList.map((item, index) => (
                    <TableCell key={index}>{dayjs(item).format("MM-DD(ddd)").toUpperCase()}</TableCell>
                  ))}

                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  list.rows.map((item, index) => (
                    <TableRow key={index}>
                      {
                        index === 0 && (
                          <TableCell rowSpan={list.rows.length}>{list.title}</TableCell>
                        )
                      }
                      <TableCell>{item.keyWord}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      {item.values.map((value, index) => (
                        <TableCell key={index} className="text-right">{value.rank}</TableCell>
                    ))}
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CreateBlogTop />
      </div>

    </div>
  )
}

export default AgencyMarketingBlogTopDetailPage
