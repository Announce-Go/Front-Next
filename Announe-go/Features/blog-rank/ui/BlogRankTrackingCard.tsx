"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { http } from "@/Featchs/api/http"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogDesc,
  DialogHeader as DialogHead,
  DialogTitle as DialogTitleUi,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  ExternalLink,
  MoreHorizontal,
  Plus,
  PlayCircle,
  Search,
} from "lucide-react"

type TrackingItem = {
  id?: number | string
  type?: "place" | "cafe" | "blog" | string
  keyword?: string
  url?: string
  advertiser_id?: number
  advertiser_name?: string
  current_session?: number
  status?: string
  latest_rank?: number
  latest_checked_at?: string
  created_at?: string
  [key: string]: unknown
}

type TrackingListResponse =
  | {
      items: TrackingItem[]
      total?: number
      pagination?: {
        total: number
        page: number
        page_size: number
        total_pages: number
        has_next: boolean
        has_prev: boolean
      }
    }

function normalizeItems(data: TrackingListResponse | undefined): TrackingItem[] {
  if (!data) return []
  return Array.isArray(data.items) ? data.items : []
}

type CreateTrackingBody = {
  keyword: string
  url: string
  advertiser_id: number
}

export function BlogRankTrackingCard() {
  const queryClient = useQueryClient()

  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "stopped">(
    "all",
  )
  const [keywordFilter, setKeywordFilter] = useState("")
  const [advertiserIdFilter, setAdvertiserIdFilter] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")
  const [advertiserId, setAdvertiserId] = useState("")

  const listQuery = useQuery({
    queryKey: [
      "agency",
      "blog-rank",
      "tracking",
      {
        status: statusFilter === "all" ? undefined : statusFilter,
        keyword: keywordFilter || undefined,
        advertiser_id: advertiserIdFilter || undefined,
        page,
        page_size: pageSize,
      },
    ],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        status: statusFilter === "all" ? undefined : statusFilter,
        keyword: keywordFilter.trim() || undefined,
        page,
        page_size: pageSize,
      }

      const advertiserIdNum = Number(advertiserIdFilter)
      if (advertiserIdFilter.trim() && Number.isFinite(advertiserIdNum)) {
        params.advertiser_id = advertiserIdNum
      }

      const res = await http.get<TrackingListResponse>("/api/v1/agency/blog-rank/tracking", {
        params,
      })
      return res.data
    },
    staleTime: 5 * 1000,
  })

  const items = normalizeItems(listQuery.data)
  const pagination = listQuery.data?.pagination

  const createMutation = useMutation({
    mutationFn: async (body: CreateTrackingBody) => {
      const res = await http.post("/api/v1/agency/blog-rank/tracking", body)
      return res.data
    },
    onSuccess: async () => {
      toast.success("추적 등록이 완료되었습니다.")
      setOpen(false)
      setKeyword("")
      setUrl("")
      setAdvertiserId("")
      // 현재 필터/페이지 조건으로 목록을 다시 불러오도록 invalidate
      await queryClient.invalidateQueries({ queryKey: ["agency", "blog-rank", "tracking"] })
    },
    onError: (e) => {
      console.error(e)
      toast.error("추적 등록에 실패했습니다.")
    },
  })

  const onSubmit = () => {
    const k = keyword.trim()
    const u = url.trim()
    const idNum = Number(advertiserId)

    if (!k || !u || !advertiserId.trim()) {
      toast.warning("keyword, url, advertiser_id를 모두 입력해주세요.")
      return
    }
    if (!Number.isFinite(idNum) || idNum <= 0) {
      toast.warning("advertiser_id는 1 이상의 숫자여야 합니다.")
      return
    }

    createMutation.mutate({ keyword: k, url: u, advertiser_id: idNum })
  }

  return (
    <Card className="shadow-sm border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>추적 목록 (월보장)</CardTitle>
            <CardDescription>관리 중인 키워드 리스트입니다.</CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* 필터 및 검색 그룹 */}
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v as "all" | "active" | "stopped")
                  setPage(1)
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
                  value={keywordFilter}
                  onChange={(e) => {
                    setKeywordFilter(e.target.value)
                    setPage(1)
                  }}
                />
              </div>
              <Input
                className="w-[140px]"
                placeholder="advertiser_id"
                inputMode="numeric"
                value={advertiserIdFilter}
                onChange={(e) => {
                  setAdvertiserIdFilter(e.target.value)
                  setPage(1)
                }}
              />
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  setPageSize(Number(v))
                  setPage(1)
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

            {/* 등록 버튼 (강조) */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                  <Plus className="w-4 h-4 mr-1.5" />
                  추적 등록
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHead>
                  <DialogTitleUi>추적 등록</DialogTitleUi>
                  <DialogDesc>keyword, url, advertiser_id를 입력해주세요.</DialogDesc>
                </DialogHead>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">키워드</label>
                    <Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="예: 강남한의원"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">블로그 게시글 URL</label>
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://blog.naver.com/..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">advertiser_id</label>
                    <Input
                      value={advertiserId}
                      onChange={(e) => setAdvertiserId(e.target.value)}
                      placeholder="예: 123"
                      inputMode="numeric"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                      disabled={createMutation.isPending}
                    >
                      취소
                    </Button>
                    <Button
                      type="button"
                      onClick={onSubmit}
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? "등록 중..." : "등록"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {listQuery.isLoading ? (
          <div className="text-sm text-gray-500">불러오는 중...</div>
        ) : listQuery.isError ? (
          <div className="text-sm text-red-500">목록을 불러오지 못했습니다.</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-500">등록된 추적 항목이 없습니다.</div>
        ) : (
          <div className="space-y-3">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[150px]">키워드</TableHead>
                  <TableHead className="w-[80px]">URL</TableHead>
                  <TableHead>광고주</TableHead>
                  <TableHead>회차</TableHead>
                  <TableHead className="w-[240px]">최근 체크</TableHead>
                  <TableHead className="text-right">최근순위</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it, idx) => {
                  const keywordStr = (it.keyword ?? `키워드 ${idx + 1}`).toString()
                  const advLabel =
                    it.advertiser_name ||
                    (it.advertiser_id ? `ID: ${it.advertiser_id}` : "-")
                  const rank = typeof it.latest_rank === "number" ? it.latest_rank : null
                  const status = typeof it.status === "string" ? it.status : "active"
                  const session =
                    typeof it.current_session === "number" ? it.current_session : null

                  return (
                    <TableRow key={String(it.id ?? idx)} className="hover:bg-slate-50/50">
                      <TableCell className="font-bold text-slate-800">
                        {keywordStr}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600"
                          onClick={() => {
                            const u = typeof it.url === "string" ? it.url : ""
                            if (u) window.open(u, "_blank", "noopener,noreferrer")
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700 font-bold">
                              {(advLabel?.toString()?.[0] ?? "A").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-slate-700">
                            {advLabel?.toString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-normal bg-slate-100 text-slate-600"
                        >
                          {session !== null ? `${session}회차` : "-"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              {it.latest_checked_at ? it.latest_checked_at : "-"}
                            </span>
                            <span className="font-medium text-blue-600">
                              {it.created_at ? `등록: ${it.created_at}` : ""}
                            </span>
                          </div>
                          <Progress value={0} className="h-2 bg-slate-100" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {rank !== null ? (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 text-base px-3 py-1">
                              {rank}위
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 text-base px-3 py-1">
                              -
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-blue-600 bg-blue-50 flex w-fit ml-auto items-center gap-1"
                        >
                          <PlayCircle className="w-3 h-3" />{" "}
                          {status === "stopped" ? "중단됨" : "추적중"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* 페이지네이션 */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                {pagination
                  ? `총 ${pagination.total}건 • ${pagination.page}/${pagination.total_pages} 페이지`
                  : `페이지 ${page}`}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={pagination ? !pagination.has_prev : page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  이전
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={pagination ? !pagination.has_next : items.length < pageSize}
                  onClick={() => setPage((p) => p + 1)}
                >
                  다음
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
