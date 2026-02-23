'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"


import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function TestFilter({propsSearchParams}: {propsSearchParams: any}) {

  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(propsSearchParams)


  const [keyword, setKeyword] = useState(propsSearchParams.keyword || '')
  

  
  // console.log(`RCC component params`, params.status)
  // console.log(`RCC component status`, propsSearchParams.status)

  /**
   * params --
   * keyword: string
   * status: string
   * page: string
   * page_size: string
   */

  const testPush = () => {
    if ( propsSearchParams.status === 'active') {
      router.push(`/agency/test-rank?status=stopped`)
    } else {
      router.push(`/agency/test-rank?status=active`)
    }
  }

  const handlefilterChange = (type: string, value: string) => {   
    // parmas set이 진짜 중요   
    params.set(type, value)

    console.log(`params test2`, params.toString())  
    router.push(`${pathname}?${params.toString()}`)
  }

  
  
  return (
    <>
      status props 값 : {propsSearchParams.status} 값

      <br />
      <div onClick={testPush}>active</div>
      <Card>
        <Select value={propsSearchParams.status || 'all'} onValueChange={(v) => handlefilterChange('status', v)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="상태: 전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">추적중</SelectItem>
            <SelectItem value="stopped">중단됨</SelectItem>
          </SelectContent>
        </Select>


        <div className="relative w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type="text"
            placeholder="keyword# "
            className="pl-9"
            value={propsSearchParams.keyword || keyword}            
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlefilterChange('keyword', keyword)
            }}
            // onBlur={applyKeywordAdvertiser}
          />
        </div>
        
      </Card>
    </>
    // <Card className="shadow-sm border-l-4 border-l-green-500">
    //   <CardHeader>
    //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    //       <div>
    //         <CardTitle>추적 목록 (월보장)</CardTitle>
    //         <CardDescription>관리 중인 키워드 리스트입니다.</CardDescription>
    //       </div>

    //       <div className="flex flex-col sm:flex-row gap-2">
    //         <div className="flex gap-2">
    //           <Select
    //             value={props.status}
    //             onValueChange={(v) => {
    //               const next = new URLSearchParams(currentParams)
    //               next.set("page", "1")
    //               if (v === "all") next.delete("status")
    //               else next.set("status", v)
    //               pushParams(next)
    //             }}
    //           >
    //             <SelectTrigger className="w-[120px]">
    //               <SelectValue placeholder="상태: 전체" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="all">전체</SelectItem>
    //               <SelectItem value="active">추적중</SelectItem>
    //               <SelectItem value="stopped">중단됨</SelectItem>
    //             </SelectContent>
    //           </Select>

    //           {/* 키워드 */}
    //           <div className="relative w-[200px]">
    //             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    //             <Input
    //               type="text"
    //               placeholder="keyword"
    //               className="pl-9"
    //               value={keywordInput}
    //               onChange={(e) => setKeywordInput(e.target.value)}
    //               onKeyDown={(e) => {
    //                 if (e.key === "Enter") applyKeywordAdvertiser()
    //               }}
    //               onBlur={applyKeywordAdvertiser}
    //             />
    //           </div>

    //           {/* 광고주 아이디 검색    */}
    //           <Input
    //             className="w-[140px]"
    //             placeholder="advertiser_id"
    //             inputMode="numeric"
    //             value={advertiserIdInput}
    //             onChange={(e) => setAdvertiserIdInput(e.target.value)}
    //             onKeyDown={(e) => {
    //               if (e.key === "Enter") applyKeywordAdvertiser()
    //             }}
    //             onBlur={applyKeywordAdvertiser}
    //           />

    //           {/* 페이징 사이즈 */}
    //           <Select
    //             value={String(props.pageSize)}
    //             onValueChange={(v) => {
    //               const next = new URLSearchParams(currentParams)
    //               next.set("page", "1")
    //               next.set("page_size", v)
    //               pushParams(next)
    //             }}
    //           >
    //             <SelectTrigger className="w-[120px]">
    //               <SelectValue placeholder="page_size" />
    //             </SelectTrigger>
    //             <SelectContent>
    //               <SelectItem value="10">10</SelectItem>
    //               <SelectItem value="20">20</SelectItem>
    //               <SelectItem value="50">50</SelectItem>
    //             </SelectContent>
    //           </Select>
    //         </div>

    //         {/* 추적 등록 */}
    //         <Dialog open={open} onOpenChange={setOpen}>
    //           <DialogTrigger asChild>
    //             <Button className="bg-slate-900 text-white hover:bg-slate-800">
    //               <Plus className="w-4 h-4 mr-1.5" />
    //               추적 등록
    //             </Button>
    //           </DialogTrigger>
    //           <DialogContent>
    //             <DialogHeader>
    //               <DialogTitle>추적 등록</DialogTitle>
    //               <DialogDescription>keyword, url, advertiser_id를 입력해주세요.</DialogDescription>
    //             </DialogHeader>
    //             <div className="space-y-3">
    //               <div className="space-y-1">
    //                 <label className="text-sm font-medium">키워드</label>
    //                 <Input
    //                   value={createKeyword}
    //                   onChange={(e) => setCreateKeyword(e.target.value)}
    //                   placeholder="예: 강남한의원"
    //                 />
    //               </div>
    //               <div className="space-y-1">
    //                 <label className="text-sm font-medium">플레이스 URL</label>
    //                 <Input
    //                   value={createUrl}
    //                   onChange={(e) => setCreateUrl(e.target.value)}
    //                   placeholder="https://place.naver.com/..."
    //                 />
    //               </div>
    //               <div className="space-y-1">
    //                 <label className="text-sm font-medium">advertiser_id</label>
    //                 <Input
    //                   value={createAdvertiserId}
    //                   onChange={(e) => setCreateAdvertiserId(e.target.value)}
    //                   placeholder="예: 123"
    //                   inputMode="numeric"
    //                 />
    //               </div>
    //               <div className="flex justify-end gap-2 pt-2">
    //                 <Button
    //                   type="button"
    //                   variant="outline"
    //                   onClick={() => setOpen(false)}
    //                   disabled={isCreating}
    //                 >
    //                   취소
    //                 </Button>
    //                 <Button type="button" onClick={onCreate} disabled={isCreating}>
    //                   {isCreating ? "등록 중..." : "등록"}
    //                 </Button>
    //               </div>
    //             </div>
    //           </DialogContent>
    //         </Dialog>
    //       </div>
    //     </div>
    //   </CardHeader>
    // </Card>
  )
}