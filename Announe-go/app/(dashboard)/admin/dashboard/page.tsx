import { HospitalCard, AgencyCard, ApprovalCard } from "../components"

function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ApprovalCard />
      <HospitalCard />
      <AgencyCard />
    </div>
  )
}

export default AdminDashboardPage
