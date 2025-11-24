import type { Metadata } from "next"
import "./globals.css"
import { AppHeader, AppFooter } from "@/components/common"

export const metadata: Metadata = {
  title: "Announce-go",
  description: "Announce-go",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
