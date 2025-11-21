"use client"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function AppSubHeader() {
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/60 backdrop-blur bg-white h-[68px]">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-2 px-4">
          <Button variant="ghost" size="icon" className="cursor-pointer block">
            <Link href="/" className="cursor-pointer block">
              <ArrowLeftIcon className="size-7" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export { AppSubHeader }
