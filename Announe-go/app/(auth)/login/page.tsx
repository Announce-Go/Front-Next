"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { login } from "@/Features/apis/auth"
import { useAuthStore } from "@/store/AuthStore"
import {
  Eye,
  EyeOff,
  Lock,
  User,
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  Clock,
} from "lucide-react"

const formSchema = z.object({
  login_id: z.string().min(4, { message: "아이디는 4자 이상 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
})

const features = [
  {
    icon: TrendingUp,
    title: "실시간 순위 추적",
    desc: "플레이스·블로그·카페 순위를 실시간으로 확인",
  },
  {
    icon: Shield,
    title: "역할 기반 대시보드",
    desc: "관리자·대행사·광고주 맞춤 인터페이스",
  },
  {
    icon: Zap,
    title: "빠른 데이터 분석",
    desc: "캠페인 성과를 한눈에 파악",
  },
]

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isExpired = searchParams.get("expired") === "true"
  const setAuth = useAuthStore((s) => s.setAuth)
  const [remember_me, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 이미 로그인된 상태면 대시보드로 이동해요
  useEffect(() => {
    const { user } = useAuthStore.getState()
    if (!user) return
    const role = user.role?.toLowerCase()
    if (role === "admin")           router.replace("/admin/dashboard")
    else if (role === "agency")     router.replace("/agency/dashboard")
    else if (role === "advertiser") router.replace("/advertiser/dashboard")
  }, [router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { login_id: "", password: "" },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setServerError("")
    setIsPending(false)
    try {
      const result = await login({ ...data, remember_me })
      setAuth({ role: result.user.role, user: result.user })

      const role = result.user.role.toLowerCase()
      if (role === "admin") router.push("/admin/dashboard")
      else if (role === "agency") router.push("/agency/dashboard")
      else if (role === "advertiser") router.push("/advertiser/dashboard")
      else router.push("/agency/dashboard")
    } catch (e: any) {
      const detail = e?.response?.data?.detail ?? ""
      console.log("[login error] response data:", e?.response?.data)
      console.log("[login error] detail:", detail)
      if (detail.includes("승인 대기")) {
        setIsPending(true)
      } else {
        setServerError("로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.")
      }
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* ── 왼쪽 브랜드 패널 ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-12"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        {/* 배경 블롭 */}
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-blob"
          style={{ background: "rgba(99,102,241,0.25)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{ background: "rgba(6,182,212,0.2)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full blur-3xl animate-blob animation-delay-4000"
          style={{ background: "rgba(168,85,247,0.2)" }}
        />

        {/* 격자 오버레이 */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 text-center text-white max-w-md w-full">
          {/* 로고 */}
          <div className="flex items-center justify-center mb-8 animate-float">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                boxShadow: "0 0 40px rgba(99,102,241,0.5)",
              }}
            >
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1
            className="text-5xl font-extrabold mb-3 tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #ffffff, #a5f3fc, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            모두보고
          </h1>
          <p className="text-lg mb-14" style={{ color: "#a5b4fc" }}>
            스마트한 마케팅 순위 추적 플랫폼
          </p>

          {/* 기능 카드 */}
          <div className="space-y-3 text-left">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm" style={{ color: "#a5b4fc" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 오른쪽 로그인 패널 ── */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12"
        style={{
          background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)",
        }}
      >
        <div className="w-full max-w-md">
          {/* 모바일 로고 */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
              }}
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">모두보고</span>
          </div>

          {/* 헤딩 */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              다시 오셨군요!
            </h2>
            <p style={{ color: "#64748b" }}>계정에 로그인하여 시작하세요</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* 아이디 */}
              <FormField
                control={form.control}
                name="login_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: "#475569" }}
                        />
                        <Input
                          placeholder="아이디"
                          type="text"
                          className="pl-11 rounded-xl border text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-cyan-500 transition-all duration-200"
                          style={{
                            height: "52px",
                            background: "rgba(255,255,255,0.05)",
                            borderColor: "rgba(255,255,255,0.1)",
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* 비밀번호 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                          style={{ color: "#475569" }}
                        />
                        <Input
                          placeholder="비밀번호"
                          type={showPassword ? "text" : "password"}
                          className="pl-11 pr-11 rounded-xl border text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-cyan-500 transition-all duration-200"
                          style={{
                            height: "52px",
                            background: "rgba(255,255,255,0.05)",
                            borderColor: "rgba(255,255,255,0.1)",
                          }}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                          style={{ color: "#475569" }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* 로그인 상태 유지 */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="remember"
                  className="border-slate-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  onCheckedChange={(c) => setRememberMe(c === true)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm cursor-pointer select-none"
                  style={{ color: "#94a3b8" }}
                >
                  로그인 상태 유지
                </label>
              </div>

              {/* 세션 만료 안내 */}
              {isExpired && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    background: "rgba(234,179,8,0.08)",
                    borderColor: "rgba(234,179,8,0.3)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(234,179,8,0.2)" }}
                    >
                      <Clock className="w-4 h-4" style={{ color: "#eab308" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#eab308" }}>
                        세션이 만료되었어요.
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                        보안을 위해 자동으로 로그아웃되었어요. 다시 로그인해주세요.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 승인 대기 안내 */}
              {isPending && (
                <div
                  className="rounded-xl p-4 border"
                  style={{
                    background: "rgba(251,146,60,0.1)",
                    borderColor: "rgba(251,146,60,0.3)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(251,146,60,0.2)" }}
                    >
                      <Clock className="w-4 h-4" style={{ color: "#fb923c" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#fb923c" }}>
                        승인 대기중이에요.
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                        관리자가 계정을 검토 중이에요. 승인 완료 후 로그인하실 수 있어요.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 일반 에러 */}
              {serverError && (
                <div
                  className="rounded-xl p-3 border"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    borderColor: "rgba(239,68,68,0.3)",
                  }}
                >
                  <p className="text-sm text-red-400 text-center">
                    {serverError}
                  </p>
                </div>
              )}

              {/* 로그인 버튼 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold text-white rounded-xl transition-all duration-300 disabled:opacity-60 text-base cursor-pointer border-0 mt-2"
                style={{
                  height: "52px",
                  background: "linear-gradient(90deg, #06b6d4, #6366f1)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    로그인 중...
                  </div>
                ) : (
                  "로그인"
                )}
              </Button>
            </form>
          </Form>

          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <span className="text-sm" style={{ color: "#475569" }}>
              계정이 없으신가요?{" "}
            </span>
            <Link
              href="/signup"
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "#06b6d4" }}
            >
              회원가입
            </Link>
          </div>

          {/* 하단 구분선 */}
          <div className="mt-12 flex items-center gap-3">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <span className="text-xs" style={{ color: "#1e293b" }}>
              © 2025 모두보고
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  )
}
