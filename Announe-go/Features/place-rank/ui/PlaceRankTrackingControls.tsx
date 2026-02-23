"use client"

import { useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { http } from "@/Featchs/api/http"

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

type Props = {
  status: "all" | "active" | "stopped"
  keyword: string
  advertiserId: string
  page: number
  pageSize: number
}

type CreateTrackingBody = {
  keyword: string
  url: string
  advertiser_id: number
}

export function PlaceRankTrackingControls(props: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const [keywordInput, setKeywordInput] = useState(props.keyword)
  const [advertiserIdInput, setAdvertiserIdInput] = useState(props.advertiserId)

  const [open, setOpen] = useState(false)
  const [createKeyword, setCreateKeyword] = useState("")
  const [createUrl, setCreateUrl] = useState("")
  const [createAdvertiserId, setCreateAdvertiserId] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const currentParams = useMemo(() => {
    const p = new URLSearchParams(sp.toString())
    return p
  }, [sp])

  const pushParams = (next: URLSearchParams) => {
    const qs = next.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(currentParams)
    if (value === null || value.trim() === "") next.delete(key)
    else next.set(key, value)
    pushParams(next)
  }

  const applyKeywordAdvertiser = () => {
    const next = new URLSearchParams(currentParams)
    // 필터가 바뀌면 1페이지부터
    next.set("page", "1")

    if (keywordInput.trim()) next.set("keyword", keywordInput.trim())
    else next.delete("keyword")

    if (advertiserIdInput.trim()) next.set("advertiser_id", advertiserIdInput.trim())
    else next.delete("advertiser_id")

    pushParams(next)
  }

  const onCreate = async () => {
    const k = createKeyword.trim()
    const u = createUrl.trim()
    const idNum = Number(createAdvertiserId)

    if (!k || !u || !createAdvertiserId.trim()) {
      toast.warning("keyword, url, advertiser_id를 모두 입력해주세요.")
      return
    }
    if (!Number.isFinite(idNum) || idNum <= 0) {
      toast.warning("advertiser_id는 1 이상의 숫자여야 합니다.")
      return
    }

    setIsCreating(true)
    try {
      await http.post("/api/v1/agency/place-rank/tracking", {
        keyword: k,
        url: u,
        advertiser_id: idNum,
      } satisfies CreateTrackingBody)

      toast.success("추적 등록이 완료되었습니다.")
      setOpen(false)
      setCreateKeyword("")
      setCreateUrl("")
      setCreateAdvertiserId("")
      router.refresh()
    } catch (e) {
      console.error(e)
      toast.error("추적 등록에 실패했습니다.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2">
        <Select
          value={props.status}
          onValueChange={(v) => {
            const next = new URLSearchParams(currentParams)
            next.set("page", "1")
            if (v === "all") next.delete("status")
            else next.set("status", v)
            pushParams(next)
          }}
        >
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
            placeholder="keyword"
            className="pl-9"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyKeywordAdvertiser()
            }}
            onBlur={applyKeywordAdvertiser}
          />
        </div>

        <Input
          className="w-[140px]"
          placeholder="advertiser_id"
          inputMode="numeric"
          value={advertiserIdInput}
          onChange={(e) => setAdvertiserIdInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applyKeywordAdvertiser()
          }}
          onBlur={applyKeywordAdvertiser}
        />

        <Select
          value={String(props.pageSize)}
          onValueChange={(v) => {
            const next = new URLSearchParams(currentParams)
            next.set("page", "1")
            next.set("page_size", v)
            pushParams(next)
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="page_size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-1.5" />
            추적 등록
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>추적 등록</DialogTitle>
            <DialogDescription>keyword, url, advertiser_id를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">키워드</label>
              <Input
                value={createKeyword}
                onChange={(e) => setCreateKeyword(e.target.value)}
                placeholder="예: 강남한의원"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">플레이스 URL</label>
              <Input
                value={createUrl}
                onChange={(e) => setCreateUrl(e.target.value)}
                placeholder="https://place.naver.com/..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">advertiser_id</label>
              <Input
                value={createAdvertiserId}
                onChange={(e) => setCreateAdvertiserId(e.target.value)}
                placeholder="예: 123"
                inputMode="numeric"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isCreating}
              >
                취소
              </Button>
              <Button type="button" onClick={onCreate} disabled={isCreating}>
                {isCreating ? "등록 중..." : "등록"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

