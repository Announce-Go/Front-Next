"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { agencyList } from "@/constants/list"


type LIST_DATA_TYPE = {
  id: number
  company: string
  name: string
  keyword?: number
}


export function AgencyList() {
  const Router = useRouter()
  const [list, setList] = useState<LIST_DATA_TYPE[]>(agencyList)
    
  
  const handleClick = (company: string) => {
    Router.push(`/user/place/${company}`)
  }


  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">광고주 리스트</h1>
      {
        list.map(item => {
          return (
              <Card key={item.id} className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => handleClick(item.company)}
              >
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      <div>{item.name}</div>  
                      <div className="text-sm text-gray-500">등록된 키워드: {item?.keyword}개</div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
          )
        })
            
        
        
      }
      
    </div>
  )
}