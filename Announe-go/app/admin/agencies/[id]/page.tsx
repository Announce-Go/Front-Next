import { AdminAgencyDetail } from "@/components/admin/AdminAgencyDetail"

type PageProps = {
  params: { id: string }
}

export default function AdminAgencyDetailPage({ params }: PageProps) {
  const agencyId = Number(params.id)
  return <AdminAgencyDetail agencyId={agencyId} />
}
