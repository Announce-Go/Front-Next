import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";


const MENU_ITEMS = [
  {
    label: "플레이스 순위 체크",
    href: "/user/place",
  }
]


export function UserSideBar() {

  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-white flex flex-col hidden md:flex">
      {/* 1. 상단 로고 및 검색 영역 */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          Go Home
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Link href="/user">
              <HomeIcon className="size-4" />
            </Link>
          </Button>
        </h1>
        <p className="text-md text-gray-500">
          메뉴를 선택해주세요.
        </p>
      </div>

      {/* 2. 내비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          
        </ul>
      </nav>
      
      {/* 3. 하단 링크 (Github 등) */}
      <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
        v1.0.0
      </div>
    </aside>
  )
}

