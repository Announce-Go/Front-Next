import { SideBar, NaviBar } from "@/components/common"

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NaviBar />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default BlogLayout
