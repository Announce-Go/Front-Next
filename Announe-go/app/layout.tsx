import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import Providers from "./providers"

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
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
