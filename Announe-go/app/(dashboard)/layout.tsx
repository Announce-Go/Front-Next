import { SideBar, NaviBar } from "@/components/common"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NaviBar />
      <div className="flex">
        <SideBar />
        <main className="ml-64 flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
