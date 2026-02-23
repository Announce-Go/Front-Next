import { http } from "@/Featchs/api/http"
import { AuthUser } from "@/types/AuthTypes"

export type LoginRequest = {
  login_id: string
  password: string
  remember_me: boolean
}

export type LoginResponse = {
  user: AuthUser
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>("/api/v1/auth/login", body)
  return res.data
}

export type LogoutResponse = {
  [key: string]: unknown
}

export async function logout(): Promise<LogoutResponse> {
  const res = await http.post<LogoutResponse>("/api/v1/auth/logout")
  return res.data
}

/* ── 광고주 회원가입 (JSON) ── */
export type SignupAdvertiserRequest = {
  login_id: string
  email: string
  password: string
  name: string
  phone: string
  company_name: string
}

export async function signupAdvertiser(
  body: SignupAdvertiserRequest
): Promise<{ message?: string }> {
  const res = await http.post<{ message?: string }>(
    "/api/v1/signup/advertiser",
    body
  )
  return res.data
}

/* ── 광고주 회원가입 (멀티파트/FormData 버전, 참고용) ──
export async function signupAdvertiser(
  formData: FormData
): Promise<{ message?: string }> {
  const res = await http.post<{ message?: string }>(
    "/api/v1/signup/advertiser",
    formData
  )
  return res.data
}
*/

/* ── 대행사(업체) 회원가입 ── */
export type SignupAgencyRequest = {
  login_id: string
  email: string
  password: string
  name: string
  phone: string
  company_name: string
  categories: string[]
}

export async function signupAgency(
  body: SignupAgencyRequest
): Promise<{ message?: string }> {
  const res = await http.post<{ message?: string }>(
    "/api/v1/signup/agency",
    body
  )
  return res.data
}
