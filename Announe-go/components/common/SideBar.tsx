import Link from "next/link"
function SideBar() {
  return (
    <aside className="fixed left-0 top-[68px] bottom-[68px] w-64 border-r bg-background">
      <div className="h-full overflow-y-auto p-4">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Navigation
        </h2>
        <nav className="space-y-1">
          <Link
            href="/blog"
            className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            블로그 상위노출
          </Link>
          <Link
            href="/brandBlog"
            className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            브랜드 블로그
          </Link>
          <Link
            href="/cafe"
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
      </div>
    </aside>
  )
}

export { SideBar }
