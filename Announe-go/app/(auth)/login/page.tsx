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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"

const formSchema = z.object({
  login_id: z.string().min(4, {
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
    // .regex(/[A-Z]/, {
    //   message: "비밀번호에 대문자가 포함되어야 합니다.",
    // })
    // .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    //   message: "비밀번호에 특수문자가 포함되어야 합니다.",
    // }),
})

function SignInPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [remember_me, setRememberMe] = useState<boolean>(false)
  const [login_id, setLoginId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [serverError, setServerError] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login_id: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { login_id, password } = data
    setLoginId(login_id)
    setPassword(password)
    setServerError("")

    const params = {
      login_id,
      password,
      remember_me,
    }

    try {
      const result = await login(params)

      setAuth({
        role: result.user.role,
        user: result.user,
      })
    
      
      if (result.user.role === "admin") {
        router.push("/admin/dashboard")
        return
      }
      if (result.user.role === "agency") {
        router.push("/agency/dashboard")
        return
      }
      if (result.user.role === "advertiser") {
        router.push("/advertiser/dashboard")
        return
      }

      // role이 예상값이 아니면 기본 경로로 이동
      router.push("/agency/dashboard")
    } catch (e) {
      setServerError("로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.")
      console.error(e)
    }
  }

  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-md px-4 py-10">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>아이디와 비밀번호를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="login_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>아이디</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="아이디를 입력해주세요."
                          type="text"
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
                          placeholder="대소문자와 특수문자를 포함한 6자 이상의 비밀번호를 입력해주세요."
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
                {serverError ? (
                  <p className="text-sm text-red-500">{serverError}</p>
                ) : null}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember_me"
                    name="remember_me"
                    onCheckedChange={(checked) =>
                      setRememberMe(checked === "indeterminate" ? false : checked)
                    }
                  />
                  <Label htmlFor="remember_me">
                    로그인 상태를 유지하시겠습니까?
                  </Label>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button variant="link" className="w-full cursor-pointer">
              <Link href="/signup">아이디가 없으신가요?</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default SignInPage
