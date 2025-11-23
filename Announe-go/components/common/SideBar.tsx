import Link from "next/link"

type PROPS_TYPE = {
  categoryType: "agency" | "hospital" | "admin"
}

function SideBar({ categoryType }: PROPS_TYPE) {



  return (
    <aside className="fixed left-0 top-[68px] bottom-[68px] w-64 border-r bg-background">
      <div className="h-full overflow-y-auto p-4">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Navigation
        </h2>
        {
          categoryType === "agency" && (
            <nav className="space-y-1">
              <Link
                href="/agency/marketing/blog-top/1"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                블로그 상위노출
              </Link>
              <Link
                href="/agency/marketing/brand-blog"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                브랜드 블로그
              </Link>
              <Link
                href="/agency/marketing/cafe"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                카페
              </Link>
              <Link
                href="/paper"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                영수증 리뷰
              </Link>
            </nav>
          )
        }
        {
          categoryType === "hospital" && (
            <nav className="space-y-1">
              <Link
                href="/blog"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                대시보드
              </Link>
            </nav>
          )
        }
        {
          categoryType === "admin" && (
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                대시보드
              </Link>
            </nav>
          )
        }
        
      </div>
    </aside>
  )
}

export { SideBar }
