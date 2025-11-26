"use client"

import { useEffect, useState } from "react"
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
  Textarea,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui"
import { ChevronDownIcon } from "lucide-react"
import RegistStatusData from "./RegistStatusData.json"

type REGIST_STATUS_DATA_TYPE = {
  no: number
  date: string
  userId: string
  nickname: string
  detail: string
  note: string
}

function RegistStatus() {
  const [list, setList] = useState<REGIST_STATUS_DATA_TYPE[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const [userId, setUserId] = useState<string>("")
  const [nickname, setNickname] = useState<string>("")
  const [detail, setDetail] = useState<string>("")
  const [note, setNote] = useState<string>("")

  useEffect(() => {
    const { data } = RegistStatusData
    setList(data)
  }, [])

  const resetForm = () => {
    setSelectedDate(undefined)
    setUserId("")
    setNickname("")
    setDetail("")
    setNote("")
  }

  const handleSave = () => {
    if (!selectedDate || !userId || !nickname || !detail) {
      alert("날짜, ID, 닉네임, 세부 정보는 필수 입력 항목입니다.")
      return
    }

    const newNo = list.length > 0 ? Math.max(...list.map((item) => item.no)) + 1 : 1

    const newItem: REGIST_STATUS_DATA_TYPE = {
      no: newNo,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      userId: userId.trim(),
      nickname: nickname.trim(),
      detail: detail.trim(),
      note: note.trim(),
    }

    setList((prev) => [...prev, newItem])
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
  }

  return (
    <div className="flex w-full flex-col gap-5 xl:flex-row">
      <Card className="w-full xl:w-2/3">
        <CardHeader>
          <CardTitle>가입 상태</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>닉네임</TableHead>
                <TableHead>계정 셋팅 세부 정보</TableHead>
                <TableHead>특이사항</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.no}>
                  <TableCell>{item.no}</TableCell>
                  <TableCell>{dayjs(item.date).format("YYYY-MM-DD")}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.nickname}</TableCell>
                  <TableCell>{item.detail}</TableCell>
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
            <FieldLegend>가입 상태 데이터를 입력하세요.</FieldLegend>
            <FieldDescription>ID, 닉네임, 세부 정보 등을 기록합니다.</FieldDescription>
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
                <FieldLabel htmlFor="userId">ID</FieldLabel>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디를 입력해주세요."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력해주세요."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="detail">계정 셋팅 세부 정보</FieldLabel>
                <Textarea
                  id="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="계정 설정 진행 상황을 입력해주세요."
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
  )
}

export { RegistStatus }