import Link from "next/link"
import { serverFetch } from "@/Featchs/api/server-fetch"
import { PlaceRankTrackingControls } from "@/Features/place-rank/ui/PlaceRankTrackingControls"

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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

import { ExternalLink, MoreHorizontal, PlayCircle } from "lucide-react"



type TrackingItem = {
  id: number
  type: string
  keyword: string
  url: string
  status: "active" | "stopped" | string
  current_session: number
  agency_id: number
  agency_name: string
  advertiser_id: number
  advertiser_name: string
  latest_rank: number | null
  latest_checked_at: string | null
  created_at: string
}

type TrackingListResponse = {
  items: TrackingItem[]
  total: number
  pagination: {
    total: number
    page: number
    page_size: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

type SearchParams = Record<string, string | string[] | undefined>

function pickOne(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

function buildQuery(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue
    sp.set(k, String(v))
  }
  const qs = sp.toString()
  return qs ? `?${qs}` : ""
}

export async function PlaceRankTrackingCard(props: { searchParams?: SearchParams }) {
  const statusRaw = pickOne(props.searchParams?.status)
  const keyword = pickOne(props.searchParams?.keyword) ?? ""
  const advertiserId = pickOne(props.searchParams?.advertiser_id) ?? ""
  const page = Number(pickOne(props.searchParams?.page) ?? "1") || 1
  const pageSize = Number(pickOne(props.searchParams?.page_size) ?? "20") || 20

  const status: "all" | "active" | "stopped" =
    statusRaw === "active" || statusRaw === "stopped" ? statusRaw : "all"

  const qs = buildQuery({
    status: status === "all" ? undefined : status,
    keyword: keyword || undefined,
    advertiser_id: advertiserId || undefined,
    page,
    page_size: pageSize,
  })

  let data: TrackingListResponse | null = null
  let error: string | null = null
  try {
    data = await serverFetch<TrackingListResponse>(`/api/v1/agency/place-rank/tracking${qs}`, {
      cache: "no-store",
    })
  } catch (e) {
    error = e instanceof Error ? e.message : "목록을 불러오지 못했습니다."
  }

  const items = data?.items ?? []
  const pagination = data?.pagination

  const baseParams = new URLSearchParams()
  if (status !== "all") baseParams.set("status", status)
  if (keyword) baseParams.set("keyword", keyword)
  if (advertiserId) baseParams.set("advertiser_id", advertiserId)
  baseParams.set("page_size", String(pageSize))

  const prevHref = (() => {
    const p = new URLSearchParams(baseParams)
    p.set("page", String(Math.max(1, page - 1)))
    return `/agency/place-rank?${p.toString()}`
  })()

  const nextHref = (() => {
    const p = new URLSearchParams(baseParams)
    p.set("page", String(page + 1))
    return `/agency/place-rank?${p.toString()}`
  })()

  return (
    <Card className="shadow-sm border-l-4 border-l-green-500">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>추적 목록 (월보장)</CardTitle>
            <CardDescription>관리 중인 키워드 리스트입니다.</CardDescription>
          </div>

          <PlaceRankTrackingControls
            status={status}
            keyword={keyword}
            advertiserId={advertiserId}
            page={page}
            pageSize={pageSize}
          />
        </div>
      </CardHeader>

      <CardContent>
        {error ? (
          <div className="text-sm text-red-500">{error}</div>
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
                {items.map((it) => {
                  const rank =
                    typeof it.latest_rank === "number" ? it.latest_rank : null
                  return (
                    <TableRow key={String(it.id)} className="hover:bg-slate-50/50">
                      <TableCell className="font-bold text-slate-800">
                        {it.keyword}
                      </TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                          <a href={it.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[9px] bg-blue-100 text-blue-700 font-bold">
                              {(it.advertiser_name?.[0] ?? "A").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-slate-700">
                            {it.advertiser_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-normal bg-slate-100 text-slate-600"
                        >
                          {it.current_session}회차
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{it.latest_checked_at ?? "-"}</span>
                            <span className="font-medium text-green-600">
                              {it.created_at ? `등록: ${it.created_at}` : ""}
                            </span>
                          </div>
                          <Progress value={0} className="h-2 bg-slate-100" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {rank !== null ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 text-base px-3 py-1">
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
                          className="border-green-200 text-green-600 bg-green-50 flex w-fit ml-auto items-center gap-1"
                        >
                          <PlayCircle className="w-3 h-3" />{" "}
                          {it.status === "stopped" ? "중단됨" : "추적중"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                {pagination
                  ? `총 ${pagination.total}건 • ${pagination.page}/${pagination.total_pages} 페이지`
                  : `페이지 ${page}`}
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  disabled={pagination ? !pagination.has_prev : page <= 1}
                >
                  <Link href={prevHref}>이전</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  disabled={pagination ? !pagination.has_next : items.length < pageSize}
                >
                  <Link href={nextHref}>다음</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
