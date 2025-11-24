"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const formSchema = z.object({
  id: z.string().min(5, {
    message: "아이디는 필수 입력 항목입니다.",
  }),
  password: z
    .string()
    .min(6, {
      message: "비밀번호는 8자 이상 입력해주세요.",
    })
    .regex(/[a-z]/, {
      message: "비밀번호에 소문자가 포함되어야 합니다.",
    })
    .regex(/[A-Z]/, {
      message: "비밀번호에 대문자가 포함되어야 합니다.",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "비밀번호에 특수문자가 포함되어야 합니다.",
    }),
  ClientName: z.string().min(1, {
    message: "이름은 필수 입력 항목입니다.",
  }),
  ClientPhone: z.string().min(1, {
    message: "연락처는 필수 입력 항목입니다.",
  }),
  ClientCompany: z.string().min(1, {
    message: "병원명은 필수 입력 항목입니다.",
  }),
})

function Client() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
      ClientName: "",
      ClientPhone: "",
      ClientCompany: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>광고주</CardTitle>
          <CardDescription>광고주 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="아이디를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ClientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="이름을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ClientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="연락처를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ClientCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>병원명</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="병원명을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default Client
