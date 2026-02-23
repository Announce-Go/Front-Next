import { AdminAgencyDetail } from "@/components/admin/AdminAgencyDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminAgencyDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminAgencyDetail agencyId={Number(id)} />
}
