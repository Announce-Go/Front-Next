"use client"

import { useState, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { http } from "@/Featchs/api/http"
import type { AgencyAgenciesResponse } from "@/shared/types/agency"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, ArrowLeft, Loader2 } from "lucide-react"

type BlogPostingDetail = {
  id?: number | string
  keyword?: string
  url?: string
  posting_date?: string
  advertiser_id?: number
  [key: string]: unknown
}

type BlogPostingFormProps = {
  postingId?: number | string
  mode: "create" | "edit"
}

export function BlogPostingForm({ postingId, mode }: BlogPostingFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [keyword, setKeyword] = useState("")
  const [url, setUrl] = useState("")
  const [postingDate, setPostingDate] = useState("")
  const [selectedAdvertiserId, setSelectedAdvertiserId] = useState<number | null>(null)
  const [advertiserSearchKeyword, setAdvertiserSearchKeyword] = useState("")
  const [debouncedAdvertiserSearchKeyword, setDebouncedAdvertiserSearchKeyword] = useState("")

  // 광고주 검색어 디바운스 처리 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAdvertiserSearchKeyword(advertiserSearchKeyword)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [advertiserSearchKeyword])

  // 광고주 목록 조회
  const advertisersQuery = useQuery({
    queryKey: ["agency", "advertisers", debouncedAdvertiserSearchKeyword],
    queryFn: async () => {
      const params: Record<string, string | undefined> = {}
      if (debouncedAdvertiserSearchKeyword.trim()) {
        params.keyword = debouncedAdvertiserSearchKeyword.trim()
      }
      const res = await http.get<AgencyAgenciesResponse>("/api/v1/agency/advertisers", {
        params,
      })
      return res.data
    },
    staleTime: 5 * 1000,
  })

  // 포스팅 상세 조회 (수정 모드)
  const detailQuery = useQuery({
    queryKey: ["agency", "blog-posting", postingId],
    queryFn: async () => {
      const res = await http.get<BlogPostingDetail>(`/api/v1/agency/blog-posting/${postingId}`)
      return res.data
    },
    enabled: mode === "edit" && !!postingId,
  })

  // 상세 데이터 로드 시 폼에 반영
  useEffect(() => {
    if (detailQuery.data && mode === "edit") {
      setKeyword(detailQuery.data.keyword || "")
      setUrl(detailQuery.data.url || "")
      setPostingDate(detailQuery.data.posting_date || "")
      setSelectedAdvertiserId(detailQuery.data.advertiser_id || null)
    }
  }, [detailQuery.data, mode])

  // 등록 mutation
  const createMutation = useMutation({
    mutationFn: async (data: {
      keyword: string
      url: string
      posting_date: string
      advertiser_id: number
    }) => {
      const res = await http.post("/api/v1/agency/blog-posting", data)
      return res.data
    },
    onSuccess: () => {
      toast.success("포스팅이 등록되었습니다.")
      queryClient.invalidateQueries({ queryKey: ["agency", "blog-posting"] })
      router.push("/agency/blog-posting")
    },
    onError: (e) => {
      console.error(e)
      toast.error("포스팅 등록에 실패했습니다.")
    },
  })

  // 수정 mutation
  const updateMutation = useMutation({
    mutationFn: async (data: {
      keyword: string
      url: string
      posting_date: string
      advertiser_id: number
    }) => {
      const res = await http.put(`/api/v1/agency/blog-posting/${postingId}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success("포스팅이 수정되었습니다.")
      queryClient.invalidateQueries({ queryKey: ["agency", "blog-posting"] })
      router.push("/agency/blog-posting")
    },
    onError: (e) => {
      console.error(e)
      toast.error("포스팅 수정에 실패했습니다.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!keyword.trim()) {
      toast.warning("키워드를 입력해주세요.")
      return
    }

    if (!url.trim()) {
      toast.warning("URL을 입력해주세요.")
      return
    }

    if (!postingDate) {
      toast.warning("포스팅 날짜를 선택해주세요.")
      return
    }

    if (!selectedAdvertiserId) {
      toast.warning("광고주를 선택해주세요.")
      return
    }

    const data = {
      keyword: keyword.trim(),
      url: url.trim(),
      posting_date: postingDate,
      advertiser_id: selectedAdvertiserId,
    }

    if (mode === "create") {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate(data)
    }
  }

  const handleAdvertiserSelect = (advertiserId: number) => {
    setSelectedAdvertiserId(advertiserId)
  }

  const isLoading = mode === "edit" && detailQuery.isLoading
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            블로그 포스팅 기록 {mode === "create" ? "등록" : "수정"}
          </h1>
          <p className="text-muted-foreground mt-1">
            블로그 포스팅 정보를 입력하고 담당 광고주를 선택합니다.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/agency/blog-posting")}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          목록으로
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle>포스팅 정보</CardTitle>
            <CardDescription>블로그 포스팅의 기본 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 키워드 */}
            <div className="space-y-2">
              <Label htmlFor="keyword">
                키워드 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="keyword"
                type="text"
                placeholder="예: 강남한의원"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={isLoading || isSubmitting}
                required
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://blog.naver.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading || isSubmitting}
                required
              />
            </div>

            {/* 포스팅 날짜 */}
            <div className="space-y-2">
              <Label htmlFor="postingDate">
                포스팅 날짜 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postingDate"
                type="date"
                value={postingDate}
                onChange={(e) => setPostingDate(e.target.value)}
                disabled={isLoading || isSubmitting}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 광고주 선택 */}
        <Card className="shadow-sm border-t-4 border-t-blue-500 mt-6">
          <CardHeader>
            <CardTitle>광고주 선택</CardTitle>
            <CardDescription>
              이 포스팅과 연관된 광고주를 선택해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 광고주 검색 */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="광고주명으로 검색"
                className="pl-9"
                value={advertiserSearchKeyword}
                onChange={(e) => setAdvertiserSearchKeyword(e.target.value)}
                disabled={isLoading || isSubmitting}
              />
            </div>

            {/* 광고주 목록 */}
            {advertisersQuery.isLoading ? (
              <div className="text-sm text-gray-500 py-8 text-center">불러오는 중...</div>
            ) : advertisersQuery.isError ? (
              <div className="text-sm text-red-500 py-8 text-center">
                광고주 목록을 불러오지 못했습니다.
              </div>
            ) : !advertisersQuery.data?.items || advertisersQuery.data.items.length === 0 ? (
              <div className="text-sm text-gray-500 py-8 text-center">
                등록된 광고주가 없습니다.
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>광고주명</TableHead>
                      <TableHead>회사명</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {advertisersQuery.data.items.map((advertiser) => {
                      const isSelected = selectedAdvertiserId === advertiser.id
                      return (
                        <TableRow
                          key={advertiser.id}
                          className={`hover:bg-slate-50/50 cursor-pointer ${isSelected ? "bg-blue-50" : ""}`}
                          onClick={() => {
                            if (!isLoading && !isSubmitting) {
                              handleAdvertiserSelect(advertiser.id)
                            }
                          }}
                        >
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected 
                                  ? "border-blue-600 bg-blue-600" 
                                  : "border-slate-300"
                              }`}>
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{advertiser.name}</TableCell>
                          <TableCell>{advertiser.company_name || "-"}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/agency/blog-posting")}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                {mode === "create" ? "등록 중..." : "수정 중..."}
              </>
            ) : mode === "create" ? (
              "등록"
            ) : (
              "수정"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
