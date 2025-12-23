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
import { Checkbox } from "@/components/ui/checkbox"
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
  ClientCompany: z.string().min(1, {
    message: "광고주는 필수 입력 항목입니다.",
  }),
  VenderCompany: z.string().min(1, {
    message: "업체명은 필수 입력 항목입니다.",
  }),
  VenderName: z.string().min(1, {
    message: "이름은 필수 입력 항목입니다.",
  }),
  VenderPhone: z.string().min(1, {
    message: "연락처는 필수 입력 항목입니다.",
  }),
  VenderProducts: z.array(z.string()).min(1, {
    message: "계약 상품은 필수 입력 항목입니다.",
  }),
  Agreements: z.array(z.enum(["terms", "privacy"])).length(2, {
    message: "이용약관과 개인정보 처리방침에 모두 동의해야 합니다.",
  }),
})

function Vender() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
      ClientCompany: "",
      VenderCompany: "",
      VenderName: "",
      VenderPhone: "",
      VenderProducts: [],
      Agreements: [],
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const params = {
      id: data.id,
      password: data.password,
      ClientCompany: data.ClientCompany,
      VenderCompany: data.VenderCompany,
      VenderName: data.VenderName,
      VenderPhone: data.VenderPhone,
      VenderProducts: data.VenderProducts,
      Agreements: data.Agreements,
    }
    console.log(`params:`, params)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>업체</CardTitle>
          <CardDescription>업체 정보를 입력해주세요.</CardDescription>
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
                name="ClientCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>광고주</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="광고주를 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="VenderCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>업체명</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="업체명을 입력해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="VenderName"
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
                name="VenderPhone"
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
                name="VenderProducts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium mb-2 text-[15px]">
                      계약 상품
                    </FormLabel>
                    <div className="flex flex-col items-start gap-3">
                      {[
                        { id: "blog", label: "블로그 상위노출", value: "blog" },
                        {
                          id: "brandBlog",
                          label: "브랜드 블로그",
                          value: "brandBlog",
                        },
                        { id: "cafe", label: "카페", value: "cafe" },
                        { id: "paper", label: "영수증 리뷰", value: "paper" },
                      ].map((opt) => {
                        const checked = (field.value ?? []).includes(opt.value)
                        return (
                          <div
                            className="flex items-center gap-2"
                            key={opt.value}
                          >
                            <Checkbox
                              id={opt.id}
                              checked={checked}
                              onCheckedChange={(ck) => {
                                const isChecked =
                                  ck === "indeterminate" ? false : ck
                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value ?? []),
                                    opt.value,
                                  ])
                                } else {
                                  field.onChange(
                                    (field.value ?? []).filter(
                                      (v: string) => v !== opt.value
                                    )
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={opt.id}>{opt.label}</Label>
                          </div>
                        )
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Agreements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium mb-2 text-[15px]">
                      약관 동의
                    </FormLabel>
                    <div className="flex flex-col items-start gap-3">
                      {(
                        [
                          {
                            id: "agree-terms",
                            label: "이용약관 동의 (필수)",
                            value: "terms",
                          },
                          {
                            id: "agree-privacy",
                            label: "개인정보 처리방침 동의 (필수)",
                            value: "privacy",
                          },
                        ] as const
                      ).map((opt) => {
                        const checked = (field.value ?? []).includes(opt.value)
                        return (
                          <div
                            className="flex items-center gap-2"
                            key={opt.value}
                          >
                            <Checkbox
                              id={opt.id}
                              checked={checked}
                              onCheckedChange={(ck) => {
                                const isChecked =
                                  ck === "indeterminate" ? false : ck
                                if (isChecked) {
                                  field.onChange([
                                    ...(field.value ?? []),
                                    opt.value,
                                  ])
                                } else {
                                  field.onChange(
                                    (field.value ?? []).filter(
                                      (v) => v !== opt.value
                                    )
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={opt.id}>{opt.label}</Label>
                          </div>
                        )
                      })}
                    </div>
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

export default Vender
