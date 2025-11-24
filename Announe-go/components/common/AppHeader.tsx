import Link from "next/link"
import Image from "next/image"

function AppHeader() {
  return (
    <header className="fixed top-0 z-10 w-full border-b bg-background/60 backdrop-blur h-[68px]">
      <div className="flex items-center justify-between h-full px-4 md:px-6 lg:px-8">
        {/* 로고 영역 */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/main-logo-gold.png" alt="logo" width={80} height={80} />
          </Link>
        </div>

        {/* 네비게이션 영역 (나중에 메뉴 추가 가능) */}
        <div className="flex items-center gap-4">
          {/* 여기에 네비게이션 메뉴나 버튼을 추가할 수 있습니다 */}
        </div>
      </div>
    </header>
  )
}

export { AppHeader }
