"use client";
import { createSideBar } from "@/lib/sideBarFactory";
import { useAuthStore } from "@/store/AuthStore";

function SideBar() {
  const { role } = useAuthStore()
  const sideBar = createSideBar(role)

  return (
    <>{sideBar}</>
  )
}

export { SideBar };
