import { AdminSignupRequestDetail } from "@/components/admin/AdminSignupRequestDetail"

type PageProps = {
  params: { id: string }
}

export default function AdminSignupRequestDetailPage({ params }: PageProps) {
  const id = Number(params.id)
  return <AdminSignupRequestDetail userId={id} />
}
