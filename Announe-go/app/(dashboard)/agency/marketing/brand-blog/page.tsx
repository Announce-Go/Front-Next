"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { FieldSet, FieldLegend, FieldGroup, Field, FieldContent, FieldLabel, FieldDescription, FieldSeparator, FieldError } from "@/components/ui"
import { Input } from "@/components/ui"
import { Button } from "@/components/ui"
import { Checkbox } from "@/components/ui"
import BrandBlogData from "./BrandBlogData.json"

type LIST_DATA_TYPE = {
  keyword: string;
  url: string;
  rank: number;
  publish: boolean;
}

function AgencyMarketingBrandBlogPage() {
  const [list, setList] = useState<LIST_DATA_TYPE[]>([])

  useEffect(() => {
    const { data: brandBlogData } = BrandBlogData
    setList(brandBlogData)
  }, [])



  return (
    <div className="flex gap-5 w-full">
      <Card className="w-2/3">  
        <CardHeader>
          <h4 className="text-lg font-bold">브랜드 블로그</h4>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>키워드</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>순위</TableCell>
                <TableCell>비고</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                list.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.keyword}</TableCell>
                    <TableCell>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline">
                        {item.url}
                      </a>
                    </TableCell>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell>{item.publish ? "발행" : "미발행"}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-1/3">  
        <CardContent>
          <FieldSet>
            <FieldLegend>내용을 입력하세요.</FieldLegend>
            <FieldDescription>브랜드 블로그 키워드와, URL, 순위를 입력해주세요.</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="keyword">키워드</FieldLabel>
                <Input id="keyword" autoComplete="off" placeholder="키워드를 입력해주세요." />
                {/* <FieldError>Choose another username.</FieldError> */}
              </Field>
              <Field> 
                <FieldLabel htmlFor="url">URL</FieldLabel>
                <Input id="url" autoComplete="off" placeholder="http:// 또는 https:// 포함한 URL을 입력해주세요." />
                {/* <FieldError>Choose another username.</FieldError> */}
              </Field>
              <Field>
                <FieldLabel htmlFor="rank">순위</FieldLabel>
                <Input id="rank" autoComplete="off" placeholder="순위를 입력해주세요. 1~100" />
                {/* <FieldError>Choose another username.</FieldError> */}
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="publish"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="publish"
                  className="font-normal"
                >
                  발행
                </FieldLabel>
              </Field>
              <Field orientation="horizontal" className="justify-end">
                <Button variant="outline" type="button" className="cursor-pointer">취소</Button>
                <Button type="button" className="cursor-pointer">저장</Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgencyMarketingBrandBlogPage