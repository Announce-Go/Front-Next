

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
  MapPin, 
  Coffee, 
  FileText, 
  PenTool, 
  Newspaper, 
  MessageCircle,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default function AgencyDetailPage() {
  // 이용 카테고리 데이터 (활성화 여부 포함)
  const services = [
    { label: "플레이스 순위", active: true, icon: MapPin, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { label: "카페 글 순위", active: true, icon: Coffee, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    { label: "블로그 글 순위", active: false, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { label: "블로그 포스팅", active: false, icon: PenTool, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200" },
    { label: "언론 기사", active: false, icon: Newspaper, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
    { label: "카페 침투", active: false, icon: MessageCircle, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  ]

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 1. 네비게이션 헤더 */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-slate-900">
          <ChevronLeft className="w-4 h-4 mr-1" />
          목록으로
        </Button>
        <Separator orientation="vertical" className="h-4" />
        <h1 className="text-2xl font-bold text-slate-900">업체 상세 정보</h1>
      </div>

      <div className="space-y-6">
        
        {/* 2. 기본 정보 섹션 (업체 테마: Purple) */}
        <Card className="shadow-sm border-t-4 border-t-purple-500">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* 로고 영역 (Purple) */}
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-purple-100 text-purple-600 text-xl font-bold">XM</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">X마케팅</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs font-medium border border-purple-100">
                      대행사
                    </span>
                    <span className="text-slate-400">|</span>
                    <span>가입일: 2025-11-15</span>
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:text-purple-700">정보 수정</Button>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Building2 className="w-4 h-4" /> 담당자명
                </div>
                <div className="text-base font-semibold text-slate-900">홍길동</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Phone className="w-4 h-4" /> 연락처
                </div>
                <div className="text-base font-semibold text-slate-900">010-1111-2222</div>
              </div>
               <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                  <Mail className="w-4 h-4" /> 이메일
                </div>
                <div className="text-base font-semibold text-slate-900">hong@x.com</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. 이용 카테고리 현황 (체크박스 대신 비주얼 카드 사용) */}
        <section>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                이용 가능한 서비스
                <Badge variant="secondary" className="text-xs font-normal">Total {services.filter(s => s.active).length}</Badge>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {services.map((service, index) => (
                    <div 
                        key={index}
                        className={`
                            relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                            ${service.active 
                                ? `bg-white ${service.border} shadow-sm` 
                                : "bg-slate-50 border-slate-100 opacity-60 grayscale"}
                        `}
                    >
                        {/* Active Badge Icon */}
                        <div className="absolute top-2 right-2">
                            {service.active ? (
                                <CheckCircle2 className={`w-4 h-4 ${service.color}`} />
                            ) : (
                                <XCircle className="w-4 h-4 text-slate-300" />
                            )}
                        </div>

                        {/* Main Icon */}
                        <div className={`p-3 rounded-full mb-3 ${service.active ? service.bg : 'bg-slate-200'}`}>
                            <service.icon className={`w-6 h-6 ${service.active ? service.color : 'text-slate-500'}`} />
                        </div>
                        
                        {/* Label */}
                        <span className={`text-sm font-bold ${service.active ? 'text-slate-800' : 'text-slate-400'}`}>
                            {service.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. 담당 광고주 목록 (광고주 리스트이므로 Blue 포인트 사용) */}
        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle>담당 광고주 목록</CardTitle>
            <CardDescription>
                현재 <span className="font-bold text-blue-600">3</span>곳의 광고주를 관리하고 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead>광고주명</TableHead>
                  <TableHead>담당자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>이메일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {/* Row 1 */}
                <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">AH</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-slate-900">A한의원</span>
                        <span className="text-xs text-muted-foreground">서울 강남점</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>김철수</TableCell>
                  <TableCell className="text-muted-foreground">010-1234-5678</TableCell>
                  <TableCell className="text-muted-foreground">kim@a.com</TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">BH</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-slate-900">B병원</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>이영희</TableCell>
                  <TableCell className="text-muted-foreground">010-2345-6789</TableCell>
                  <TableCell className="text-muted-foreground">lee@b.com</TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="hover:bg-slate-50/50 cursor-pointer">
                   <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">CC</AvatarFallback>
                      </Avatar>
                       <div className="flex flex-col">
                        <span className="text-slate-900">C클리닉</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>박민수</TableCell>
                  <TableCell className="text-muted-foreground">010-3456-7890</TableCell>
                  <TableCell className="text-muted-foreground">park@c.com</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}