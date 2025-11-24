import { SideBar, NaviBar } from "@/components/common"


type USER_TYPE = {
  type: "agency" | "hospital" | "admin"
}

function DashboardLayout({ children }: { children: React.ReactNode }) {

  const userType: USER_TYPE = {
    type: "agency",
  }

  return (
    <div>
      <NaviBar />
      <div className="flex">
        <SideBar categoryType={userType.type} />
        <main className="ml-64 flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
