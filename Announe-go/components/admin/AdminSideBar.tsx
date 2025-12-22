import Link from "next/link";


const MENU_ITEMS = [
  {
    label: "",
    href: "",
  }
]


export function AdminSideBar() {

  

  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-white flex flex-col hidden md:flex">
      {/* 1. 상단 로고 및 검색 영역 */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Brand Management</h1>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-gray-100 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
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

