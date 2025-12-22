import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui"
import { keywordDetailList } from "@/constants/list"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")

export default function UserPlaceIdPage({params}: {params: {company: string, id: string}}) {
  const { company, id } = params
  console.log(`id:`, id)
  console.log(`company:`, company)
  console.log(`keywordDetailList:`, keywordDetailList[company][id])

  const list = keywordDetailList[company][id]

  return (
    <div>
      <div className="mb-4">
        <Link href={`/user/place/${company}`}>
          <ArrowLeftIcon className="size-5 cursor-pointer w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 p-2 text-white" />
        </Link>
      </div>
      <h1 className="text-lg font-bold mb-4 bg-orange-500 text-white p-4 rounded-lg">"{list?.keyword}"키워드에 대한 상세 정보입니다.</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>회차</TableHead>
            <TableHead>키워드</TableHead>
            <TableHead>카운트</TableHead>
            {list?.dates.map((date) => (
              <TableHead key={date}>{dayjs(date).format("MM-DD(ddd)").toUpperCase()}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.rows.map((item) => (
            <TableRow key={item.round}>
              <TableCell>{item.round}</TableCell>
              <TableCell>{item.keyword}</TableCell>
              <TableCell>{item.count}</TableCell>
              {list?.dates.map((date) => (
                <TableCell key={date}>{item.ranksByDate[date]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}