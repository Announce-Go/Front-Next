import { SideBar, NaviBar } from "@/components/common"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <NaviBar /> */}
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
