import { SideBar } from "@/components/common/SideBar"
function DashboardLayout({ children }: { children: React.ReactNode }) {


  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SideBar />
      <div className="flex-1 overflow-y-auto">
        <div className="px-8 py-12">
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout