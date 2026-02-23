import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import Providers from "./providers"
import { AuthInit } from "@/components/common/AuthInit"

export const metadata: Metadata = {
  title: "Announce-go",
  description: "Announce-go",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <AuthInit />
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
