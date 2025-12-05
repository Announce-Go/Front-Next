"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"

export function SearchBox() {
  const [keyword, setKeyword] = useState<string>("")
  const [placeAddress, setPlaceAddress] = useState<string>("")

  const handleSubmit = () => {
    if (!keyword && !placeAddress) {
      toast.error("키워드 또는 주소를 입력해주세요.",{
        position: "top-center",
      })
      return;
    }
    
    // console.log(`keyword:`, keyword)
    // console.log(`placeAddress:`, placeAddress)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">
          키워드
        </div>
        <Input 
          type="text" 
          placeholder="키워드를 입력해주세요." 
          className="w-full bg-gray-100 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
    </div>
  )
}