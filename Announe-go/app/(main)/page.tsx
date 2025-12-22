import { Card, CardContent } from "@/components/ui";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 메인 환영 메시지 */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              모두보고에 오신 것을
              <br />
              <span className="text-primary">환영합니다</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-6">
              더 나은 서비스를 제공하기 위해 노력하겠습니다
            </p>
          </div>

          {/* 카드 섹션 */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">빠른 시작</h3>
                <p className="text-sm text-muted-foreground">
                  간편한 가입으로 바로 시작하세요
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">편리한 기능</h3>
                <p className="text-sm text-muted-foreground">
                  다양한 기능을 한 곳에서 이용하세요
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">지속적인 개선</h3>
                <p className="text-sm text-muted-foreground">
                  사용자 경험 향상을 위해 노력합니다
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA 버튼 */}
          <div className="mt-12 space-x-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/signin">시작하기</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              더 알아보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
