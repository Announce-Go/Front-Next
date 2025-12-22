"use client"
import { useQuery } from "@tanstack/react-query"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import dayjs from "dayjs"
import "dayjs/locale/ko"
dayjs.locale("ko")

export function PlaceRank() {
//   const [keyword, setKeyword] = useState<string>("")
//   const [placeAddress, setPlaceAddress] = useState<string>("")
//   const [rank, setRank] = useState<number | undefined>(undefined)
//   const [list, setList] = useState<any[]>(
//     [
//     {
//       rank: 1,
//       keyword: "청주다이어트한약",
//       count: 100
//     },
//     {
//       rank: 2,
//       keyword: "청주다이어트약",
//     }
//   ]
// )
  


//   const getList = async (keyword: string, placeAddress: string) => {
//     const res = await fetch(`/api/v1/ranks/place?keyword=${keyword}&url=${placeAddress}`);   
//     const data = await res.json(); 
//     setRank(data)
//     return data;
//   }

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["placeRank"],
//     queryFn: () => getList(keyword, placeAddress),
//     enabled: false,
//   })


//   const handleSubmit = async () => {
//     if (!keyword && !placeAddress) {
//       toast.error("키워드 또는 주소를 입력해주세요.",{
//         position: "top-center",
//       })
//       return;
//     }
//     refetch();
//     setKeyword("");
//     setPlaceAddress("");
//   }

//   if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-6">
      {/* <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">
          키워드
        </div>
        <Input 
          type="text" 
          placeholder="키워드를 입력해주세요." 
          className="w-full bg-gray-100 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">
          플레이스 주소
        </div>
        <Input 
          type="text" 
          placeholder="플레이스 주소를 입력해주세요." 
          className="w-full bg-gray-100 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={placeAddress}
          onChange={(e) => setPlaceAddress(e.target.value)}
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button variant="outline" className="cursor-pointer">
          초기화
        </Button>
        <Button variant="default" className="cursor-pointer" onClick={handleSubmit}>
          검색
        </Button>
      </div>

      {/* 이 부분은 리스트 영역 */}
      {/* <Card>
        <div className="w-full">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="w-10 text-center sticky left-0 z-20 bg-white border-r">회차</TableHead>
                <TableHead className="w-10 sticky left-10 z-20 bg-white border-r">키워드</TableHead>
                <TableHead className="w-10 text-center sticky left-20 z-20 bg-white border-r">카운트</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center sticky left-20 z-10 bg-white border-r"></TableCell>
                <TableCell className="text-center sticky left-20 z-10 bg-white border-r"></TableCell>
                <TableCell className="text-center sticky left-20 z-10 bg-white border-r"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>  */}
    </div>
  )
}