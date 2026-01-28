export type AuthRole =
  | "ADMIN"
  | "USER"
  | "MASTER"
  | "ADVERTISER"
  | "AGENCY"
  | "admin"
  | "user"
  | "master"
  | "advertiser"
  | "agency"
  | ""

export type AuthUser = {
  id?: string
  login_id?: string;
  email?: string;
  name: string;
  role: AuthRole;
  approval_status?: string | null;
}

export type AuthType = {
  user: AuthUser | null
  role: AuthRole
  accessToken?: string | null
  setAuth: (payload: { user?: AuthUser | null; role?: string; accessToken?: string | null }) => void
  clearAuth: () => void
}