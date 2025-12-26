"use client";
import { createSideBar } from "@/lib/sideBarFactory";

function SideBar({type}:{type:string}) {
  return <>{createSideBar(type)}</>;
}

export { SideBar };
