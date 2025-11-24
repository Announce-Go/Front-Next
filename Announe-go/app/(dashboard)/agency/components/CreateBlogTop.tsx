"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import dayjs from "dayjs"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui"
import { ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import apiData from "@/app/(dashboard)/agency/marketing/blog-top/[id]/apiData.json"
import { Label } from "@/components/ui"


function CreateBlogTop() {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [hospitalList, setHospitalList] = useState<{value: string, label: string}[]>([])
  const [rank, setRank] = useState<string | number | undefined>("")
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    const res = apiData
    setHospitalList(res.rows.map(item =>{
      return {
        value: item.keyWord,
        label: item.keyWord,
      }
    }
    ))
  }, [])

  useEffect(() => {
    const hospital = apiData.rows.find(item => item.keyWord === value)
    const rank = hospital?.values.find(item => item.date === dayjs().format("YYYY-MM-DD"))?.rank
    setRank(rank)
    if (rank && rank !== undefined) {
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }
  }, [value])

  const handleSave = () => {
    console.log(`save:`, {
      keyword: value,
      rank: rank,
    })
  }




  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h4 className="text-lg font-bold">
            키워드를 선택하고 순위를 입력해주세요.
          </h4>
        </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="mb-2">
        <Label htmlFor="keyword">키워드</Label>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>      
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? hospitalList.find((hospitalList) => hospitalList.value === value)?.label
            : "키워드를 선택해주세요."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="키워드를 검색해보세요" />
          <CommandList>
            <CommandEmpty>키워드를 검색해보세요</CommandEmpty>
            <CommandGroup>
              {hospitalList.map((hospital) => (
                <CommandItem
                  key={hospital.value}
                  value={hospital.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === hospital.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {hospital.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      </Popover>

      <div className="space-y-2 mt-5">
        <Label htmlFor="rank">
          순위를 입력해주세요.
        </Label>
        <Input id="rank" type="text" disabled={isEdit} value={rank?.toString() || ""} onChange={(e) => setRank(e.target.value)} placeholder="순위를 입력해주세요." className="w-[150px]" />
      </div>


      <div className="flex justify-end">
        {
          isEdit ? (
            <Button variant="outline" type="button" className="cursor-pointer" onClick={() => setIsEdit(false)}>수정</Button>
          ) : (
            <Button variant="outline" type="button" className="cursor-pointer" onClick={handleSave}>저장</Button>
          )
        }

      </div>

      </CardContent>
    </Card>
  )
}

export default CreateBlogTop