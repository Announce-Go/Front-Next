"use client";
import { createSideBar } from "@/lib/sideBarFactory";

function SideBar() {
  return <>{createSideBar("admin")}</>;
}

export { SideBar };
