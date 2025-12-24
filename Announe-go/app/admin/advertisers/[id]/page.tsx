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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { 
  ChevronLeft, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Download, 
  Eye, 
  ImageIcon
} from "lucide-react"

export default function AdvertiserDetailPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 1. 네비게이션 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-slate-900">
          <ChevronLeft className="w-4 h-4 mr-1" />
          목록으로
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-2xl font-bold text-slate-900">광고주 상세 정보</h1>
      </div>

      <div className="space-y-6">
        
        {/* 2. 기본 정보 섹션 (광고주 테마: Blue) */}
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 로고 영역 강조 */}
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">AH</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">A한의원</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                      광고주
                    </span>
                    <span className="text-slate-400">|</span>
                    <span>가입일: 2025-11-15</span>
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline">정보 수정</Button>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 정보 그리드 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Building2 className="w-4 h-4" /> 담당자명
                </div>
                <div className="text-base font-semibold text-slate-900">김철수</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Mail className="w-4 h-4" /> 이메일
                </div>
                <div className="text-base font-semibold text-slate-900">kim@a.com</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Phone className="w-4 h-4" /> 연락처
                </div>
                <div className="text-base font-semibold text-slate-900">010-1234-5678</div>
              </div>
            </div>

            {/* 첨부파일 영역 (박스 형태로 디자인) */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-900 mb-3">첨부 서류</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 파일 1: 사업자등록증 */}
                <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md border shadow-sm">
                      <FileText className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">business_license.pdf</p>
                      <p className="text-xs text-slate-400">사업자등록증</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* 파일 2: 로고 */}
                <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md border shadow-sm">
                      <ImageIcon className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">logo.png</p>
                      <p className="text-xs text-slate-400">브랜드 로고</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. 담당 업체 목록 (업체 테마: Purple) */}
        <Card className="shadow-sm border-t-4 border-t-purple-500">
          <CardHeader>
            <CardTitle>담당 업체 목록</CardTitle>
            <CardDescription>이 광고주를 담당하고 있는 대행사 리스트입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead>업체명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이용 카테고리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                       <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-50 text-purple-600 text-xs">XM</AvatarFallback>
                      </Avatar>
                      X마케팅
                    </div>
                  </TableCell>
                  <TableCell>홍길동</TableCell>
                  <TableCell className="text-muted-foreground">010-1111-2222</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-0">플레이스</Badge>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-0">카페</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="hover:bg-slate-50/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                       <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">YA</AvatarFallback>
                      </Avatar>
                      Y광고대행사
                    </div>
                  </TableCell>
                  <TableCell>이영희</TableCell>
                  <TableCell className="text-muted-foreground">010-3333-4444</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-none border-0">블로그</Badge>
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-none border-0">언론기사</Badge>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="hover:bg-slate-50/50">
                   <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                       <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-50 text-purple-600 text-xs">ZM</AvatarFallback>
                      </Avatar>
                      Z미디어
                    </div>
                  </TableCell>
                  <TableCell>박민수</TableCell>
                  <TableCell className="text-muted-foreground">010-5555-6666</TableCell>
                  <TableCell>
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 shadow-none border-0">카페침투</Badge>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}