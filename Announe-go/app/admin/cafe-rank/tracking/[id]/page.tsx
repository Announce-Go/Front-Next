import { AdminCafeRankTrackingDetail } from "@/components/admin/AdminCafeRankTrackingDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CafeRankTrackingDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminCafeRankTrackingDetail trackingId={Number(id)} />
}
