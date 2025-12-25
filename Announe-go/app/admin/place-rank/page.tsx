import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import { 
  MapPin, 
  Search, 
  ExternalLink, 
  ArrowRight,
  Trophy,
  RefreshCw,
  MoreHorizontal
} from "lucide-react"

export default function PlaceRankPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-green-600" />
            플레이스 순위 관리
          </h1>
          <p className="text-muted-foreground mt-1">실시간 순위 조회 키워드 트래킹을 관리합니다.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 1. 추적 목록 (월보장) */}
        <Card className="shadow-sm border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>추적 목록 (월보장)</CardTitle>
                <CardDescription>관리 중인 키워드의 일별 순위 변동을 모니터링합니다.</CardDescription>
              </div>
              {/* 필터 및 검색 */}
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="상태: 전체" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="active">진행중</SelectItem>
                    <SelectItem value="paused">일시정지</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="검색어 입력" className="pl-9" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-[150px]">키워드</TableHead>
                  <TableHead className="w-[100px]">URL</TableHead>
                  <TableHead>광고주 / 업체</TableHead>
                  <TableHead>회차</TableHead>
                  <TableHead className="w-[200px]">진행률 (보장일수)</TableHead>
                  <TableHead className="text-right">최근순위</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">강남한의원</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 border-blue-200 text-blue-600 bg-blue-50">광고주</Badge>
                        <span className="text-sm font-medium">A한의원</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 border-purple-200 text-purple-600 bg-purple-50">업체</Badge>
                        <span className="text-xs text-muted-foreground">X마케팅</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">3회차</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>20일 / 25일</span>
                        <span className="font-medium text-green-600">80%</span>
                      </div>
                      <Progress value={80} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 text-base px-3 py-1">
                            3위
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">서울한의원</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 border-blue-200 text-blue-600 bg-blue-50">광고주</Badge>
                        <span className="text-sm font-medium">B병원</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="text-[10px] px-1 py-0 border-purple-200 text-purple-600 bg-purple-50">업체</Badge>
                        <span className="text-xs text-muted-foreground">Y광고</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">2회차</Badge>
                  </TableCell>
                  <TableCell>
                     <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>25일 / 25일</span>
                        <span className="font-medium text-blue-600">완료</span>
                      </div>
                      <Progress value={100} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-slate-600">5위</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">한의원추천</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 border-blue-200 text-blue-600 bg-blue-50">광고주</Badge>
                        <span className="text-sm font-medium">C클리닉</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="text-[10px] px-1 py-0 border-purple-200 text-purple-600 bg-purple-50">업체</Badge>
                        <span className="text-xs text-muted-foreground">Z미디어</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">1회차</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>15일 / 25일</span>
                        <span className="font-medium text-green-600">60%</span>
                      </div>
                      <Progress value={60} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                     <div className="flex items-center justify-end gap-1">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 text-base px-3 py-1">
                            2위
                        </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Row 4 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-bold text-slate-800">부산한의원</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-green-600">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] px-1 py-0 border-blue-200 text-blue-600 bg-blue-50">광고주</Badge>
                        <span className="text-sm font-medium">D병원</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="text-[10px] px-1 py-0 border-purple-200 text-purple-600 bg-purple-50">업체</Badge>
                        <span className="text-xs text-muted-foreground">A컴퍼니</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">2회차</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>18일 / 25일</span>
                        <span className="font-medium text-green-600">72%</span>
                      </div>
                      <Progress value={72} className="h-2 bg-slate-100" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-bold text-slate-600">4위</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
            
            {/* 페이지네이션 (간소화) */}
            <div className="mt-4 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" disabled>이전</Button>
                <div className="text-sm font-medium">1 / 10</div>
                <Button variant="outline" size="sm">다음</Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}