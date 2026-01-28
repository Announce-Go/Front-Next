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
