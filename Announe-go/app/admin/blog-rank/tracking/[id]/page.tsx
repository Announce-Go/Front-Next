import { AdminBlogRankTrackingDetail } from "@/components/admin/AdminBlogRankTrackingDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogRankTrackingDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminBlogRankTrackingDetail trackingId={Number(id)} />
}
