import { UserSideBar } from "@/components/user/UserSideBar"
import { AdminSideBar } from "@/components/admin/AdminSideBar"
import { MasterSideBar } from "@/components/master/MasterSideBar"
import { AdvertiserSideBar } from "@/components/advertiser/AdvertiserSideBar"

const sideModule = {
  USER: <UserSideBar />,
  user: <UserSideBar />,
  AGENCY: <UserSideBar />,
  agency: <UserSideBar />,
  ADMIN: <AdminSideBar />,
  admin: <AdminSideBar />,
  MASTER: <MasterSideBar />,
  master: <MasterSideBar />,
  ADVERTISER: <AdvertiserSideBar />,
  advertiser: <AdvertiserSideBar />,
}

const createSideBar = (role: string) => {
  return sideModule[role as keyof typeof sideModule];
};

export { createSideBar };
