export type AgencyAgenciesResponse = {
  items: {
    id: number
    login_id: string
    name: string
    company_name: string
  }[]
  total: number;
}