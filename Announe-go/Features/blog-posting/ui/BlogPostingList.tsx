"use client"

import { useState, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  ExternalLink,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Users,
  Building2,
  FileText,
} from "lucide-react"

type BlogPostingItem = {
  id?: number | string
  keyword?: string
  url?: string
  advertiser_id?: number
  advertiser_name?: string
  posting_date?: string
  created_at?: string
  [key: string]: unknown
}

type BlogPostingListResponse = {
  items: BlogPostingItem[]
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

function normalizeItems(data: BlogPostingListResponse | undefined): BlogPostingItem[] {
  if (!data) return []
  return Array.isArray(data.items) ? data.items : []
}

export function BlogPostingList() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | string | null>(null)

  // 검색어 디바운스 처리 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword)
      setPage(1) // 검색어 변경 시 첫 페이지로 리셋
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchKeyword])

  const listQuery = useQuery({
    queryKey: [
      "agency",
      "blog-posting",
      {
        keyword: debouncedSearchKeyword || undefined,
        page,
        page_size: pageSize,
      },
    ],
    queryFn: async () => {
      const params: Record<string, string | number | undefined> = {
        page,
        page_size: pageSize,
      }

      if (debouncedSearchKeyword.trim()) {
        params.keyword = debouncedSearchKeyword.trim()
      }

      const res = await http.get<BlogPostingListResponse>("/api/v1/agency/blog-posting", {
        params,
      })
      return res.data
    },
    staleTime: 5 * 1000,
  })

  const items = normalizeItems(listQuery.data)
  const pagination = listQuery.data?.pagination

  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const res = await http.delete(`/api/v1/agency/blog-posting/${id}`)
      return res.data
    },
    onSuccess: async () => {
      toast.success("포스팅이 삭제되었습니다.")
      setDeleteDialogOpen(false)
      setDeleteTargetId(null)
      await queryClient.invalidateQueries({ queryKey: ["agency", "blog-posting"] })
    },
    onError: (e) => {
      console.error(e)
      toast.error("포스팅 삭제에 실패했습니다.")
    },
  })

  const handleDelete = (id: number | string) => {
    setDeleteTargetId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteMutation.mutate(deleteTargetId)
    }
  }

  const handleEdit = (id: number | string) => {
    router.push(`/agency/blog-posting/${id}`)
  }

  const handleCreate = () => {
    router.push("/agency/blog-posting/new")
  }

  return (
    <>
      <Card className="shadow-sm border-t-4 border-t-blue-500">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>포스팅 목록</CardTitle>
              <CardDescription>
                총 <span className="font-bold text-blue-600">{pagination?.total || 0}</span>건의 블로그 포스팅이 등록되어 있습니다.
              </CardDescription>
            </div>
            <Button 
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              포스팅 등록
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* 검색 영역 */}
          <div className="mb-6 flex gap-2">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="키워드 / 광고주 입력"
                className="pl-9"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Enter 키 입력 시 즉시 검색
                    setDebouncedSearchKeyword(searchKeyword)
                    setPage(1)
                  }
                }}
              />
            </div>
            <Button
              onClick={() => {
                // 검색 버튼 클릭 시 즉시 검색
                setDebouncedSearchKeyword(searchKeyword)
                setPage(1)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              검색
            </Button>
          </div>

          {listQuery.isLoading ? (
            <div className="text-sm text-gray-500 py-8 text-center">불러오는 중...</div>
          ) : listQuery.isError ? (
            <div className="text-sm text-red-500 py-8 text-center">목록을 불러오지 못했습니다.</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-gray-500 py-8 text-center">등록된 포스팅이 없습니다.</div>
          ) : (
            <div className="space-y-3">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="w-[180px]">키워드</TableHead>
                    <TableHead className="w-[100px]">URL</TableHead>
                    <TableHead>광고주</TableHead>
                    <TableHead>포스팅일</TableHead>
                    <TableHead>등록일</TableHead>
                    <TableHead className="w-[120px] text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, idx) => {
                    const keywordStr = (item.keyword ?? `포스팅 ${idx + 1}`).toString()
                    const advLabel = item.advertiser_name || (item.advertiser_id ? `ID: ${item.advertiser_id}` : "-")
                    const postingDate = item.posting_date || "-"
                    const createdAt = item.created_at || "-"
                    const itemId = item.id ?? idx

                    return (
                      <TableRow key={String(itemId)} className="hover:bg-slate-50/50">
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
                              const u = typeof item.url === "string" ? item.url : ""
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
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-3 h-3 text-blue-400" />
                            <span className="text-sm">{postingDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{createdAt}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handleEdit(itemId)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              수정
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(itemId)}
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              삭제
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {/* 페이지네이션 */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4">
                <div>
                  {pagination
                    ? `총 ${pagination.total}건 • ${pagination.page}/${pagination.total_pages} 페이지`
                    : `페이지 ${page}`}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={pagination ? !pagination.has_prev : page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    이전
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
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

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>포스팅 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 포스팅을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteMutation.isPending ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
