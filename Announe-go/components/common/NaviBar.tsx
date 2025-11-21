import Link from "next/link"
import { Button } from "@/components/ui/button"

function NaviBar() {
  return (
    <nav className="w-full h-14 border-b bg-background">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">LOGO</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm hover:underline underline-offset-4"
          >
            대시보드
          </Link>
          <Link
            href="/settings"
            className="px-3 py-2 text-sm hover:underline underline-offset-4"
          >
            설정
          </Link>
          <Button size="sm" className="cursor-pointer">
            로그인
          </Button>
        </div>
      </div>
    </nav>
  )
}

export { NaviBar }
