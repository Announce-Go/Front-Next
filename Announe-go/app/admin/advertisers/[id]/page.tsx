import { AdminAdvertiserDetail } from "@/components/admin/AdminAdvertiserDetail"

type PageProps = {
  params: { id: string }
}

export default function AdminAdvertiserDetailPage({ params }: PageProps) {
  const advertiserId = Number(params.id)
  return <AdminAdvertiserDetail advertiserId={advertiserId} />
}
