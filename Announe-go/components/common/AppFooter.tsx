function AppFooter() {
  return (
    <footer className="fixed bottom-0 z-10 w-full border-t bg-background/60 backdrop-blur">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
          {/* 회사 정보 */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
              <span className="font-semibold text-foreground">알리다고 컨설팅</span>
              <span className="hidden md:inline">|</span>
              <span>대표 전형진</span>
              <span className="hidden md:inline">|</span>
              <span>사업자등록번호 342-08-03101</span>
            </div>
            <div className="text-xs md:text-sm">
              본사 경기도 용인시 기흥구 동백중앙로 191, 8층 에프 826호 (중동, 씨티프라자)
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="flex flex-col gap-1 text-xs md:text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span>TEL 02-3402-1070</span>
              <span className="hidden sm:inline">/</span>
              <span>MOBILE 010-8782-1285</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <a 
                href="mailto:oper2068@kakao.com" 
                className="hover:text-foreground hover:underline transition-colors"
              >
                E-MAIL oper2068@kakao.com
              </a>
              <span className="hidden sm:inline">/</span>
              <a 
                href="mailto:oper2068@announcego.com" 
                className="hover:text-foreground hover:underline transition-colors"
              >
                oper2068@announcego.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { AppFooter }
