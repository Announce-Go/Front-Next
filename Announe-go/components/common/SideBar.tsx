"use client"
import { useAuthStore } from "@/store/AuthStore"
import { createSideBar } from "@/lib/sideBarFactory"

function SideBar() {
  const { role } = useAuthStore()
  const sideBar = createSideBar(role)
  //console.log(`sideBar:`, sideBar)

  return (
    <>{sideBar}</>
  )
}

export { SideBar }
