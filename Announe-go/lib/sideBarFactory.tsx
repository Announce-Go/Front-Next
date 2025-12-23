import { UserSideBar } from "@/components/user/UserSideBar";
import { AdminSideBar } from "@/components/admin/AdminSideBar";
import { MasterSideBar } from "@/components/master/MasterSideBar";

const sideModule = {
  admin: <AdminSideBar />,
  advertisers: <AdminSideBar />,
  agency: <AdminSideBar />,
};

const createSideBar = (role: string) => {
  return sideModule[role as keyof typeof sideModule];
};

export { createSideBar };
