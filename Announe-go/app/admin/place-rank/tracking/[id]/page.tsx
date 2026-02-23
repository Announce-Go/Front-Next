import { AdminPlaceRankTrackingDetail } from "@/components/admin/AdminPlaceRankTrackingDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function PlaceRankTrackingDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminPlaceRankTrackingDetail trackingId={Number(id)} />
}
