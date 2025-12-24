import { category } from "@/constants/category";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  BadgeDollarSign,
  Briefcase,
  Newspaper,
  MessageCircle,
  Search,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSideBar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen border-r border-gray-100 bg-white flex flex-col hidden md:flex font-sans left-0 top-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* 1. Brand Header & Search */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-6 px-1">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            관리자
          </h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full bg-gray-50 text-sm pl-10 pr-4 py-2.5 rounded-xl border-none ring-1 ring-gray-100 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
        <div className="space-y-6">
          {category.admin.map((section, sectionIdx) => {
            const sectionKey = Object.keys(section)[0];
            const items = Object.values(section[sectionKey]);

            return (
              <div key={sectionIdx}>
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {sectionKey}
                </h3>
                <ul className="space-y-0.5">
                  {items.map((item: any, itemIdx) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={itemIdx}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                            isActive
                              ? "bg-orange-50 text-orange-600 shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <span
                            className={cn(
                              "transition-colors duration-200",
                              isActive
                                ? "text-orange-500"
                                : "text-gray-400 group-hover:text-gray-600"
                            )}
                          >
                            {item?.icon}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>

      {/* 3. Footer */}
      <div className="p-4 mx-4 mb-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              Admin
            </span>
            <span className="text-xs text-gray-400">v1.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
