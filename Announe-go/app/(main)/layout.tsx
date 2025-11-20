import { AppHeader, AppFooter } from "@/components/common"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="page">
      <AppHeader />
      <div className="page-content">{children}</div>
      <AppFooter />
    </div>
  )
}
