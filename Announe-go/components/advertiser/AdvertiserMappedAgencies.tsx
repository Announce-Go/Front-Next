"use client"

import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getAdvertiserAgencies } from "@/Features/apis/advertiser"

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

import { Building2, Search, Users } from "lucide-react"

export function AdvertiserMappedAgencies() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("")

  // 검색 디바운스 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchKeyword])

  const agenciesQuery = useQuery({
    queryKey: ["advertiser", "agencies"],
    queryFn: getAdvertiserAgencies,
    staleTime: 30 * 1000,
  })

  const items = agenciesQuery.data?.items ?? []
  const total = agenciesQuery.data?.total ?? 0

  const filteredItems = useMemo(() => {
    const keyword = debouncedSearchKeyword.trim().toLowerCase()
    if (!keyword) return items
    return items.filter((a) => {
      const combined =
        `${a.name ?? ""} ${a.company_name ?? ""} ${a.login_id ?? ""}`.toLowerCase()
      return combined.includes(keyword)
    })
  }, [items, debouncedSearchKeyword])

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-600" />
            매핑된 업체 대시보드
          </h1>
          <p className="text-muted-foreground mt-1">
            현재 광고주와 매핑된 업체 목록과 기본 정보를 확인할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium text-slate-600">
                매핑된 업체 수
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                현재 이 광고주와 연결된 전체 업체 수입니다.
              </CardDescription>
            </div>
            <div className="p-2 rounded-full bg-emerald-50">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {agenciesQuery.isLoading ? "…" : `${total}곳`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 + 리스트 */}
      <Card className="shadow-sm border-t-4 border-t-emerald-500">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>매핑된 업체 목록</CardTitle>
              <CardDescription>
                로그인된 광고주와 연결된 업체 정보를 확인합니다.
              </CardDescription>
            </div>
            <div className="flex w-full sm:w-auto items-center space-x-2">
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="업체명 / 계정 ID / 법인명 검색"
                  className="pl-9 bg-white"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setDebouncedSearchKeyword(searchKeyword)}
              >
                검색
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {agenciesQuery.isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              매핑된 업체 정보를 불러오는 중입니다...
            </div>
          ) : agenciesQuery.isError ? (
            <div className="py-12 text-center text-sm text-red-500">
              매핑된 업체 목록을 불러오지 못했습니다.
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              검색 조건에 맞는 업체가 없습니다.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[200px]">업체명</TableHead>
                  <TableHead>법인 / 회사명</TableHead>
                  <TableHead>업체 계정 ID</TableHead>
                  <TableHead className="w-[120px] text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((agency) => {
                  const acronym =
                    agency.company_name?.[0] ||
                    agency.name?.[0] ||
                    agency.login_id?.[0] ||
                    "A"

                  return (
                    <TableRow
                      key={agency.id}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border bg-emerald-50">
                            <AvatarFallback className="text-[11px] font-bold text-emerald-700">
                              {acronym}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">
                              {agency.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ID: {agency.login_id}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-800">
                          {agency.company_name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                          {agency.login_id}
                        </code>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-emerald-50 text-emerald-700 border-0">
                          매핑 완료
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

