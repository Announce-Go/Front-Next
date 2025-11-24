import { HospitalCard, AgencyCard, ApprovalCard } from "../components"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

function AdminDashboardPage() {
  return (
    <div>
      <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
        <Link href="/admin/approvals" className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent text-secondary-foreground [a&]:hover:bg-secondary/90 bg-transparent">
          <span className="flex size-2 rounded-full bg-blue-500" title="New"></span>
          관리자님, 질문이 등록되었습니다. 확인 후 답변 처리해주세요.
          <ArrowRightIcon className="size-4" />
        </Link>
        <h1 className="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
          Admin Dashboard
        </h1>
        <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
          광고주 및 업체정보를 승인하고 관리해주세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ApprovalCard />
        <HospitalCard />
        <AgencyCard />
      </div>
    </div>
  )
}

export default AdminDashboardPage
