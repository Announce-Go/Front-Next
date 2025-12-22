"use client"

import { useEffect, useState, useMemo } from "react"
import dayjs from "dayjs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  Button,
  Input,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Textarea,
} from "@/components/ui"
import { ChevronDownIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import MonthChartData from "./MonthChartData.json"

type MONTH_CHART_DATA_TYPE = {
  no: number
  date: string
  weekday: string
  visitorTotal: number
  memberTotal: number
  nonMemberTotal: number
}

type MONTH_AVERAGE_TYPE = {
  category: string
  octoberAverage: number
  novemberAverage: number
  note: string
}

function MonthChart() {
  const [list, setList] = useState<MONTH_CHART_DATA_TYPE[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const [weekday, setWeekday] = useState<string>("")
  const [visitorTotal, setVisitorTotal] = useState<string>("")
  const [memberTotal, setMemberTotal] = useState<string>("")
  const [nonMemberTotal, setNonMemberTotal] = useState<string>("")

  // 평균 방문수 테이블 상태
  const [averageList, setAverageList] = useState<MONTH_AVERAGE_TYPE[]>([])
  const [category, setCategory] = useState<string>("")
  const [octoberAverage, setOctoberAverage] = useState<string>("")
  const [novemberAverage, setNovemberAverage] = useState<string>("")
  const [averageNote, setAverageNote] = useState<string>("")

  useEffect(() => {
    const { data } = MonthChartData
    setList(data)
    
    // 초기 평균 데이터 설정
    setAverageList([
      {
        category: "방문자 전체",
        octoberAverage: 1500,
        novemberAverage: 1580,
        note: "11월 증가 추세"
      },
      {
        category: "멤버 전체",
        octoberAverage: 900,
        novemberAverage: 948,
        note: "안정적 증가"
      },
      {
        category: "비멤버",
        octoberAverage: 600,
        novemberAverage: 630,
        note: "소폭 증가"
      }
    ])
  }, [])

  // 차트 데이터 계산
  const chartData = useMemo(() => {
    const totalVisitor = list.reduce((sum, item) => sum + item.visitorTotal, 0)
    const totalMember = list.reduce((sum, item) => sum + item.memberTotal, 0)
    const totalNonMember = list.reduce((sum, item) => sum + item.nonMemberTotal, 0)

    return [
      {
        name: "조회수 현황",
        "방문자 전체": totalVisitor,
        "멤버 전체": totalMember,
        "비멤버": totalNonMember
      }
    ]
  }, [list])

  const resetForm = () => {
    setSelectedDate(undefined)
    setWeekday("")
    setVisitorTotal("")
    setMemberTotal("")
    setNonMemberTotal("")
  }

  const resetAverageForm = () => {
    setCategory("")
    setOctoberAverage("")
    setNovemberAverage("")
    setAverageNote("")
  }

  const handleSave = () => {
    if (!selectedDate || !weekday || !visitorTotal || !memberTotal || !nonMemberTotal) {
      alert("날짜, 요일, 방문자/멤버/비멤버 수는 필수 입력 항목입니다.")
      return
    }

    const newNo = list.length > 0 ? Math.max(...list.map((item) => item.no)) + 1 : 1

    const newItem: MONTH_CHART_DATA_TYPE = {
      no: newNo,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      weekday: weekday.trim(),
      visitorTotal: parseInt(visitorTotal) || 0,
      memberTotal: parseInt(memberTotal) || 0,
      nonMemberTotal: parseInt(nonMemberTotal) || 0,
    }

    setList((prev) => [...prev, newItem])
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
  }

  const handleSaveAverage = () => {
    if (!category || !octoberAverage || !novemberAverage) {
      alert("구분, 10월 평균 방문수, 11월 평균 방문수는 필수 입력 항목입니다.")
      return
    }

    const newItem: MONTH_AVERAGE_TYPE = {
      category: category.trim(),
      octoberAverage: parseInt(octoberAverage) || 0,
      novemberAverage: parseInt(novemberAverage) || 0,
      note: averageNote.trim()
    }

    setAverageList((prev) => [...prev, newItem])
    resetAverageForm()
  }

  const handleCancelAverage = () => {
    resetAverageForm()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      {/* 기존 일별 통계 테이블 */}
      <div className="flex w-full flex-col gap-5 xl:flex-row">
      <Card className="w-full xl:w-2/3">
        <CardHeader>
          <CardTitle>월간 통계</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>요일</TableHead>
                <TableHead>방문자 전체</TableHead>
                <TableHead>멤버 전체</TableHead>
                <TableHead>비멤버</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.no}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{dayjs(item.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{item.weekday}</TableCell>
                  <TableCell>{item.visitorTotal.toLocaleString()}</TableCell>
                  <TableCell>{item.memberTotal.toLocaleString()}</TableCell>
                  <TableCell>{item.nonMemberTotal.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full xl:w-1/3">
        <CardHeader>
          <CardTitle>데이터 입력</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldLegend>월간 방문자 데이터를 입력하세요.</FieldLegend>
            <FieldDescription>요일별 방문자/멤버/비멤버 지표를 기록합니다.</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="date">날짜</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-full justify-between font-normal">
                      {selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : "날짜를 선택해주세요."}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <FieldLabel htmlFor="weekday">요일</FieldLabel>
                <Input
                  id="weekday"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                  placeholder="요일을 입력해주세요. (예: 월, Tue)"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="visitorTotal">방문자 전체</FieldLabel>
                <Input
                  id="visitorTotal"
                  type="number"
                  min="0"
                  value={visitorTotal}
                  onChange={(e) => setVisitorTotal(e.target.value)}
                  placeholder="총 방문자 수를 입력해주세요."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="memberTotal">멤버 전체</FieldLabel>
                <Input
                  id="memberTotal"
                  type="number"
                  min="0"
                  value={memberTotal}
                  onChange={(e) => setMemberTotal(e.target.value)}
                  placeholder="멤버 수를 입력해주세요."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="nonMemberTotal">비멤버</FieldLabel>
                <Input
                  id="nonMemberTotal"
                  type="number"
                  min="0"
                  value={nonMemberTotal}
                  onChange={(e) => setNonMemberTotal(e.target.value)}
                  placeholder="비멤버 수를 입력해주세요."
                />
              </Field>
              <Field className="flex justify-end gap-2">
                <Button variant="outline" type="button" className="cursor-pointer" onClick={handleCancel}>
                  취소
                </Button>
                <Button type="button" className="cursor-pointer" onClick={handleSave}>
                  저장
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
      </div>

      {/* 평균 방문수 테이블 및 입력 폼 */}
      <div className="flex w-full flex-col gap-5 xl:flex-row">
        <Card className="w-full xl:w-2/3">
          <CardHeader>
            <CardTitle>월별 평균 방문수</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>구분</TableHead>
                  <TableHead>10월 평균 방문수</TableHead>
                  <TableHead>11월 평균 방문수</TableHead>
                  <TableHead>비고</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {averageList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.octoberAverage.toLocaleString()}</TableCell>
                    <TableCell>{item.novemberAverage.toLocaleString()}</TableCell>
                    <TableCell>{item.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="w-full xl:w-1/3">
          <CardHeader>
            <CardTitle>평균 방문수 입력</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldLegend>월별 평균 방문수를 입력하세요.</FieldLegend>
              <FieldDescription>구분별 10월/11월 평균 방문수를 기록합니다.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="category">구분</FieldLabel>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="구분을 입력해주세요. (예: 방문자 전체)"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="octoberAverage">10월 평균 방문수</FieldLabel>
                  <Input
                    id="octoberAverage"
                    type="number"
                    min="0"
                    value={octoberAverage}
                    onChange={(e) => setOctoberAverage(e.target.value)}
                    placeholder="10월 평균 방문수를 입력해주세요."
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="novemberAverage">11월 평균 방문수</FieldLabel>
                  <Input
                    id="novemberAverage"
                    type="number"
                    min="0"
                    value={novemberAverage}
                    onChange={(e) => setNovemberAverage(e.target.value)}
                    placeholder="11월 평균 방문수를 입력해주세요."
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="averageNote">비고</FieldLabel>
                  <Textarea
                    id="averageNote"
                    value={averageNote}
                    onChange={(e) => setAverageNote(e.target.value)}
                    placeholder="추가 메모를 입력해주세요."
                  />
                </Field>
                <Field className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer"
                    onClick={handleCancelAverage}
                  >
                    취소
                  </Button>
                  <Button type="button" className="cursor-pointer" onClick={handleSaveAverage}>
                    저장
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>
      </div>

      {/* 조회수 현황 차트 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>조회수 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
              <Bar dataKey="방문자 전체" fill="#38BDF8" />
              <Bar dataKey="멤버 전체" fill="#0EA5E9" />
              <Bar dataKey="비멤버" fill="#0284C7" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export { MonthChart }