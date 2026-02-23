import { AdminSignupRequestDetail } from "@/components/admin/AdminSignupRequestDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminSignupRequestDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminSignupRequestDetail userId={Number(id)} />
}
