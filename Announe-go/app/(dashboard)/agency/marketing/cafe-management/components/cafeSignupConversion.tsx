"use client"

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, FieldSet, FieldLegend, FieldGroup, Field, FieldLabel, FieldDescription, Button, Input, Textarea, Calendar, Popover, PopoverTrigger, PopoverContent } from "@/components/ui"
import { ChevronDownIcon } from "lucide-react"
import CafeSignupConversionData from "./CafeSignupConversionData.json"

type CAFE_SIGNUP_DATA_TYPE = {
  no: number
  date: string
  cafeName: string
  title: string
  url: string
  comments: number
  views: number
  note: string
}

function CafeSignupConversion() {
  const [list, setList] = useState<CAFE_SIGNUP_DATA_TYPE[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)
  
  // 입력 폼 상태
  const [cafeName, setCafeName] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [views, setViews] = useState<string>("")
  const [note, setNote] = useState<string>("")

  useEffect(() => {
    const { data } = CafeSignupConversionData
    setList(data)
  }, [])

  // 폼 초기화 함수
  const resetForm = () => {
    setSelectedDate(undefined)
    setCafeName("")
    setTitle("")
    setUrl("")
    setComments("")
    setViews("")
    setNote("")
  }

  // 저장 함수
  const handleSave = () => {
    if (!selectedDate || !cafeName || !title || !url) {
      alert("날짜, 카페명, 제목, URL은 필수 입력 항목입니다.")
      return
    }

    const newNo = list.length > 0 ? Math.max(...list.map(item => item.no)) + 1 : 1
    
    const newItem: CAFE_SIGNUP_DATA_TYPE = {
      no: newNo,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      cafeName: cafeName.trim(),
      title: title.trim(),
      url: url.trim(),
      comments: parseInt(comments) || 0,
      views: parseInt(views) || 0,
      note: note.trim()
    }

    setList((prev) => [...prev, newItem])
    resetForm()
  }

  // 취소 함수
  const handleCancel = () => {
    resetForm()
  }

  return (
    <div className="flex w-full flex-col gap-5 xl:flex-row">
      <Card className="w-full xl:w-2/3">
        <CardHeader>
          <CardTitle>카페 가입 유도 현황</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>카페명</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>URL 주소</TableHead>
                <TableHead>댓글수</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>특이사항</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.no}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{dayjs(item.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{item.cafeName}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:text-primary/80 hover:underline">
                      {item.url}
                    </a>
                  </TableCell>
                  <TableCell>{item.comments.toLocaleString()}</TableCell>
                  <TableCell>{item.views.toLocaleString()}</TableCell>
                  <TableCell>{item.note}</TableCell>
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
            <FieldLegend>카페 유도 현황을 입력하세요.</FieldLegend>
            <FieldDescription>카페명, URL, 조회수 등 주요 지표를 기록합니다.</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="date">DATE</FieldLabel>
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
                <FieldLabel htmlFor="cafeName">카페명</FieldLabel>
                <Input 
                  id="cafeName" 
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                  placeholder="카페명을 입력해주세요." 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="title">제목</FieldLabel>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="게시글 제목을 입력해주세요." 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="url">URL 주소</FieldLabel>
                <Input 
                  id="url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https:// 포함하여 입력해주세요." 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="comments">댓글수</FieldLabel>
                <Input 
                  id="comments" 
                  type="number" 
                  min="0" 
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="댓글 수를 입력해주세요." 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="views">조회수</FieldLabel>
                <Input 
                  id="views" 
                  type="number" 
                  min="0" 
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  placeholder="조회 수를 입력해주세요." 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="note">특이사항</FieldLabel>
                <Textarea 
                  id="note" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="추가 메모를 입력해주세요." 
                />
              </Field>
              <Field className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="cursor-pointer"
                  onClick={handleCancel}
                >
                  취소
                </Button>
                <Button 
                  type="button" 
                  className="cursor-pointer"
                  onClick={handleSave}
                >
                  저장
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  )
}

export { CafeSignupConversion }