"use client";
import { useAuthStore } from "@/stores/AuthStore";
import { createSideBar } from "@/lib/sideBarFactory";

function SideBar() {
  const { role } = useAuthStore();
  // console.log(`role:`, role)
  const sideBar = createSideBar(role);
  //console.log(`sideBar:`, sideBar)

  return <>{sideBar}</>;
}

export { SideBar };
