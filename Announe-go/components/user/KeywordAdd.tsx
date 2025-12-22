"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useKeywordStore } from "@/store/KeywordStore"
import { toast } from "sonner"

export function KeywordAdd() {

  const { company } = useParams()

  const [keyword, setKeyword] = useState<string>("")
  const [placeAddress, setPlaceAddress] = useState<string>("")
  const addKeyword = useKeywordStore(state => state.addKeyword)

  const handleReset = () => {
    setKeyword("")
    setPlaceAddress("")
  }

  const handleAdd = async () => {
    if (!company) {
      toast.error("회사 정보가 없습니다.", { position: "top-center" })
      return
    }
    if (!keyword || !placeAddress) {
      toast.error("키워드와 주소를 모두 입력해주세요.", { position: "top-center" })
      return
    }
    // 외부 API 호출로 랭킹 조회
    try {
      const res = await fetch(
        `/api/v1/ranks/place?keyword=${encodeURIComponent(keyword)}&url=${encodeURIComponent(placeAddress)}`
      )
      if (!res.ok) throw new Error("랭킹 조회 실패")
      const rank = await res.json()
      addKeyword(company as string, keyword, placeAddress, rank)
      toast.success("키워드가 추가되었습니다.", { position: "top-center" })
    } catch (e) {
      addKeyword(company as string, keyword, placeAddress)
      toast.error("랭킹 조회에 실패하여 랭크 없이 추가되었습니다.", { position: "top-center" })
    }
    handleReset()
  }

  return (
    <div className="mb-5">
      <Card>
        <CardHeader>
          <CardTitle>플레이스 키워드와 주소를 입력해주세요.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Input type="text" placeholder="키워드를 입력해주세요." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <Input type="text" placeholder="플레이스 주소를 입력해주세요." value={placeAddress} onChange={(e) => setPlaceAddress(e.target.value)} />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <Button variant="outline" className="cursor-pointer" onClick={handleReset}>초기화</Button>
            <Button variant="default" className="cursor-pointer" onClick={handleAdd}>추가</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}