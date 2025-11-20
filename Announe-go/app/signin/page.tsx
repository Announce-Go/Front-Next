"use client"

import { Button } from "@/components/ui"
import Link from "next/link"

function SignInPage() {
  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-md px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold">로그인</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            계정에 접속하려면 이메일과 비밀번호를 입력하세요.
          </p>
        </div>

        <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
          <form
            className="p-6 space-y-5"
            method="post"
            action="/api/auth/signin"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="block w-full rounded-md border bg-background px-3 py-2 text-sm outline-none border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  비밀번호
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline underline-offset-4"
                >
                  비밀번호 찾기
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="block w-full rounded-md border bg-background px-3 py-2 text-sm outline-none border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring"
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full">
              이메일로 로그인
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-primary underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignInPage
