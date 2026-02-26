import { AgencyPlaceRankTrackingDetail } from "@/Features/place-rank/ui/AgencyPlaceRankTrackingDetail"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function AgencyPlaceRankTrackingDetailPage({ params }: PageProps) {
  const { id } = await params
  return (
    <div
      className="min-h-screen p-8 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)" }}
    >
      {/* 배경 블롭 */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(99,102,241,0.12)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(6,182,212,0.08)" }} />

      <div className="relative">
        <AgencyPlaceRankTrackingDetail trackingId={Number(id)} />
      </div>
    </div>
  )
}
