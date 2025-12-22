type AuthType = {
  id: string
  password: string
  name: string
  role: "ADMIN" | "USER" | "MASTER" | ""
}

export type { AuthType }