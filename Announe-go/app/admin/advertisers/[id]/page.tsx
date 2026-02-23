import { AdminAdvertiserDetail } from "@/components/admin/AdminAdvertiserDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AdminAdvertiserDetailPage({ params }: PageProps) {
  const { id } = await params
  return <AdminAdvertiserDetail advertiserId={Number(id)} />
}
