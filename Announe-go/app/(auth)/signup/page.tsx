"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Building2, UserCircle, Eye, EyeOff } from "lucide-react"
import { signupAdvertiser, signupAgency } from "@/Features/apis/auth"

/* ── 광고주 스키마 ── */
// 멀티파트(파일 업로드) 시 사용: png, jpg, svg, pdf
// const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "application/pdf"]
// const MAX_FILE_MB = 5
const clientSchema = z.object({
  id: z.string().min(5, { message: "아이디는 5자 이상 입력해주세요." }),
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, { message: "비밀번호는 8자 이상 입력해주세요." }),
  ClientName: z.string().min(1, { message: "이름을 입력해주세요." }),
  ClientPhone: z.string().min(1, { message: "연락처를 입력해주세요." }),
  ClientCompany: z.string().min(1, { message: "병원명을 입력해주세요." }),
  // 사업자등록증/로고 이미지 (멀티파트 시 추가)
  // businessRegistration: z.union([z.instanceof(File), z.undefined()]).optional()
  //   .refine((f) => !f || (f instanceof File && ALLOWED_FILE_TYPES.includes(f.type)), "png, jpg, svg, pdf 파일만 가능합니다.")
  //   .refine((f) => !f || (f instanceof File && f.size <= MAX_FILE_MB * 1024 * 1024), `파일 크기는 ${MAX_FILE_MB}MB 이하여야 합니다.`),
  // logo: z.union([z.instanceof(File), z.undefined()]).optional()
  //   .refine((f) => !f || (f instanceof File && ALLOWED_FILE_TYPES.includes(f.type)), "png, jpg, svg, pdf 파일만 가능합니다.")
  //   .refine((f) => !f || (f instanceof File && f.size <= MAX_FILE_MB * 1024 * 1024), `파일 크기는 ${MAX_FILE_MB}MB 이하여야 합니다.`),
})

/* ── 업체 스키마 ── */
const venderSchema = z.object({
  id: z.string().min(5, { message: "아이디는 5자 이상 입력해주세요." }),
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
  ClientCompany: z.string().optional(),
  VenderCompany: z.string().min(1, { message: "업체명을 입력해주세요." }),
  VenderName: z.string().min(1, { message: "이름을 입력해주세요." }),
  VenderPhone: z.string().min(1, { message: "연락처를 입력해주세요." }),
  VenderProducts: z.array(z.string()).optional(),
  Agreements: z
    .array(z.enum(["terms", "privacy"]))
    .length(2, { message: "이용약관과 개인정보 처리방침에 모두 동의해야 합니다." }),
})

const PRODUCTS = [
  { id: "blog", label: "블로그 상위노출", value: "blog" },
  { id: "brandBlog", label: "브랜드 블로그", value: "brandBlog" },
  { id: "cafe", label: "카페", value: "cafe" },
  { id: "paper", label: "영수증 리뷰", value: "paper" },
]

const AGREEMENTS = [
  { id: "agree-terms", label: "이용약관 동의 (필수)", value: "terms" as const },
  {
    id: "agree-privacy",
    label: "개인정보 처리방침 동의 (필수)",
    value: "privacy" as const,
  },
]

/* ── Input 공통 스타일 ── */
const inputStyle = {
  height: "46px",
  background: "rgba(255,255,255,0.05)",
  borderColor: "rgba(255,255,255,0.1)",
}
const inputClass =
  "rounded-xl border text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-cyan-500 transition-all duration-200"

/* ── 광고주 폼 ── */
function ClientForm() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: "",
      email: "",
      password: "",
      ClientName: "",
      ClientPhone: "",
      ClientCompany: "",
      // businessRegistration: undefined,
      // logo: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof clientSchema>) {
    setServerError("")
    setIsLoading(true)
    try {
      // JSON 전송 (현재)
      await signupAdvertiser({
        login_id: data.id,
        email: data.email,
        password: data.password,
        name: data.ClientName,
        phone: data.ClientPhone,
        company_name: data.ClientCompany,
      })
      // 멀티파트 전송 시 참고:
      // const formData = new FormData()
      // formData.append("login_id", data.id)
      // formData.append("email", data.email)
      // formData.append("password", data.password)
      // formData.append("name", data.ClientName)
      // formData.append("phone", data.ClientPhone)
      // formData.append("company_name", data.ClientCompany)
      // if (data.businessRegistration instanceof File) formData.append("business_license_file_id", data.businessRegistration)
      // if (data.logo instanceof File) formData.append("logo_file_id", data.logo)
      // await signupAdvertiser(formData)
      router.push("/login")
    } catch (e: unknown) {
      setServerError(
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "가입에 실패했습니다. 다시 시도해주세요."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">아이디</FormLabel>
                <FormControl>
                  <Input
                    placeholder="아이디"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호"
                      type={showPw ? "text" : "password"}
                      className={`${inputClass} pr-9`}
                      style={inputStyle}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                      style={{ color: "#475569" }}
                    >
                      {showPw ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  type="email"
                  className={inputClass}
                  style={inputStyle}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="ClientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ClientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">연락처</FormLabel>
                <FormControl>
                  <Input
                    placeholder="010-0000-0000"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="ClientCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">병원명</FormLabel>
              <FormControl>
                <Input
                  placeholder="병원명을 입력해주세요"
                  className={inputClass}
                  style={inputStyle}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* ── 멀티파트 시 사업자등록증/로고 파일 필드 (참고용) ──
        <FormField control={form.control} name="businessRegistration"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">사업자등록증 이미지/PDF (선택)</FormLabel>
              <FormControl>
                <input type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf"
                  className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:py-2 file:px-3 file:text-xs file:font-medium file:cursor-pointer file:bg-cyan-500/20 file:text-cyan-400"
                  onChange={(e) => onChange(e.target.files?.[0])} {...field} />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )} />
        <FormField control={form.control} name="logo"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">로고 이미지 (선택)</FormLabel>
              <FormControl>
                <input type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf"
                  className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:py-2 file:px-3 file:text-xs file:font-medium file:cursor-pointer file:bg-cyan-500/20 file:text-cyan-400"
                  onChange={(e) => onChange(e.target.files?.[0])} {...field} />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )} />
        */}

        {serverError && (
          <p className="text-sm text-red-400 text-center">{serverError}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold text-white rounded-xl border-0 transition-all duration-300 cursor-pointer mt-2 disabled:opacity-60"
          style={{
            height: "48px",
            background: "linear-gradient(90deg, #06b6d4, #6366f1)",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          {isLoading ? "가입 처리 중..." : "가입 신청하기"}
        </Button>
      </form>
    </Form>
  )
}

/* ── 업체 폼 ── */
function VenderForm() {
  const router = useRouter()
  const [showPw, setShowPw] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof venderSchema>>({
    resolver: zodResolver(venderSchema),
    defaultValues: {
      id: "",
      email: "",
      password: "",
      ClientCompany: "",
      VenderCompany: "",
      VenderName: "",
      VenderPhone: "",
      VenderProducts: [],
      Agreements: [],
    },
  })

  async function onSubmit(data: z.infer<typeof venderSchema>) {
    setServerError("")
    setIsLoading(true)
    try {
      await signupAgency({
        login_id: data.id,
        email: data.email,
        password: data.password,
        name: data.VenderName,
        phone: data.VenderPhone,
        company_name: data.VenderCompany,
        categories: data.VenderProducts,
      })
      router.push("/login")
    } catch (e: unknown) {
      setServerError(
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "가입에 실패했습니다. 다시 시도해주세요."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">아이디</FormLabel>
                <FormControl>
                  <Input
                    placeholder="아이디"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호"
                      type={showPw ? "text" : "password"}
                      className={`${inputClass} pr-9`}
                      style={inputStyle}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                      style={{ color: "#475569" }}
                    >
                      {showPw ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  type="email"
                  className={inputClass}
                  style={inputStyle}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="ClientCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">광고주</FormLabel>
                <FormControl>
                  <Input
                    placeholder="광고주명"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="VenderCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">업체명</FormLabel>
                <FormControl>
                  <Input
                    placeholder="업체명"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="VenderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="VenderPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300 text-xs">연락처</FormLabel>
                <FormControl>
                  <Input
                    placeholder="010-0000-0000"
                    className={inputClass}
                    style={inputStyle}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />
        </div>

        {/* 계약 상품 */}
        <FormField
          control={form.control}
          name="VenderProducts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">계약 상품</FormLabel>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {PRODUCTS.map((opt) => {
                  const checked = (field.value ?? []).includes(opt.value)
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 rounded-lg p-2.5 cursor-pointer border transition-all duration-200"
                      style={{
                        background: checked
                          ? "rgba(6,182,212,0.15)"
                          : "rgba(255,255,255,0.03)",
                        borderColor: checked
                          ? "rgba(6,182,212,0.5)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Checkbox
                        checked={checked}
                        className="border-slate-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 w-3.5 h-3.5"
                        onCheckedChange={(next) => {
                          const nextChecked = next === true
                          if (nextChecked) {
                            field.onChange([...(field.value ?? []), opt.value])
                          } else {
                            field.onChange(
                              (field.value ?? []).filter((v: string) => v !== opt.value)
                            )
                          }
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: checked ? "#06b6d4" : "#94a3b8" }}
                      >
                        {opt.label}
                      </span>
                    </label>
                  )
                })}
              </div>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* 약관 동의 */}
        <FormField
          control={form.control}
          name="Agreements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-xs">약관 동의</FormLabel>
              <div className="space-y-2 mt-1">
                {AGREEMENTS.map((opt) => {
                  const checked = (field.value ?? []).includes(opt.value)
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        className="border-slate-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                        onCheckedChange={(next) => {
                          const nextChecked = next === true
                          if (nextChecked) {
                            field.onChange([...(field.value ?? []), opt.value])
                          } else {
                            field.onChange(
                              (field.value ?? []).filter((v) => v !== opt.value)
                            )
                          }
                        }}
                      />
                      <span className="text-xs" style={{ color: "#94a3b8" }}>
                        {opt.label}
                      </span>
                    </label>
                  )
                })}
              </div>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {serverError && (
          <p className="text-sm text-red-400 text-center">{serverError}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold text-white rounded-xl border-0 transition-all duration-300 cursor-pointer mt-2 disabled:opacity-60"
          style={{
            height: "48px",
            background: "linear-gradient(90deg, #06b6d4, #6366f1)",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          {isLoading ? "가입 처리 중..." : "가입 신청하기"}
        </Button>
      </form>
    </Form>
  )
}

/* ── 메인 페이지 ── */
function SignUpPage() {
  const [tab, setTab] = useState<"client" | "vender">("client")

  return (
    <div className="min-h-screen w-full flex">
      {/* ── 왼쪽 브랜드 패널 ── */}
      <div
        className="hidden lg:flex lg:w-2/5 relative overflow-hidden flex-col items-center justify-center p-10"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-blob"
          style={{ background: "rgba(99,102,241,0.25)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{ background: "rgba(6,182,212,0.2)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 text-center text-white max-w-xs">
          <div className="flex items-center justify-center mb-6 animate-float">
            <div
              className="w-18 h-18 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                width: "72px",
                height: "72px",
                background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                boxShadow: "0 0 40px rgba(99,102,241,0.5)",
              }}
            >
              <BarChart3 className="w-9 h-9 text-white" />
            </div>
          </div>

          <h1
            className="text-4xl font-extrabold mb-3 tracking-tight"
            style={{
              background: "linear-gradient(90deg, #ffffff, #a5f3fc, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            모두보고
          </h1>
          <p className="text-base mb-10" style={{ color: "#a5b4fc" }}>
            스마트한 마케팅 순위 추적 플랫폼
          </p>

          <div className="space-y-3 text-left">
            {[
              {
                icon: UserCircle,
                label: "광고주",
                desc: "마케팅 성과를 직접 확인",
              },
              {
                icon: Building2,
                label: "대행사(업체)",
                desc: "고객사 캠페인을 통합 관리",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl p-3 border"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #6366f1)",
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{label}</p>
                  <p className="text-xs" style={{ color: "#a5b4fc" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs mt-8" style={{ color: "#4c4f8a" }}>
            가입 후 관리자 승인을 통해 서비스를 이용하실 수 있습니다.
          </p>
        </div>
      </div>

      {/* ── 오른쪽 폼 패널 ── */}
      <div
        className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-10 overflow-y-auto"
        style={{
          background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)",
        }}
      >
        <div className="w-full max-w-lg py-6">
          {/* 모바일 로고 */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
            >
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">모두보고</span>
          </div>

          {/* 헤딩 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">회원가입</h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              역할을 선택하고 정보를 입력해주세요
            </p>
          </div>

          {/* 탭 */}
          <div
            className="flex rounded-xl p-1 mb-6"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {(
              [
                { key: "client", label: "광고주", icon: UserCircle },
                { key: "vender", label: "대행사 (업체)", icon: Building2 },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={
                  tab === key
                    ? {
                        background:
                          "linear-gradient(90deg, #06b6d4, #6366f1)",
                        color: "#ffffff",
                        boxShadow: "0 0 16px rgba(99,102,241,0.3)",
                      }
                    : { color: "#64748b" }
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* 폼 */}
          {tab === "client" ? <ClientForm /> : <VenderForm />}

          {/* 로그인 링크 */}
          <div className="mt-5 text-center">
            <span className="text-sm" style={{ color: "#475569" }}>
              이미 계정이 있으신가요?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "#06b6d4" }}
            >
              로그인
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
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

export default SignUpPage
