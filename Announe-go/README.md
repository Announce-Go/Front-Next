# Project Name

Next.js 15 기반의 모던 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Framework**: Next.js 15
- **Runtime**: Node.js v22
- **Package Manager**: pnpm
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Jest

## 📋 사전 요구사항

- Node.js v22 이상
- pnpm 8.0 이상

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 🧪 테스트

```bash
# 전체 테스트 실행
pnpm test

# Watch 모드로 테스트 실행
pnpm test:watch

# 커버리지 리포트 생성
pnpm test:coverage
```

## 📁 프로젝트 구조

```
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── api/               # API 라우트
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # UI 컴포넌트
├── lib/                   # 유틸리티 함수 및 설정
│   ├── api.ts            # API 클라이언트
│   └── utils.ts          # 헬퍼 함수
├── hooks/                 # 커스텀 React Hooks
├── types/                 # TypeScript 타입 정의
├── public/                # 정적 파일
├── __tests__/            # 테스트 파일
└── tailwind.config.ts    # Tailwind CSS 설정
```

## 스타일링

Tailwind CSS를 사용하여 스타일링합니다.

```tsx
// 예시
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-blue-600">Hello World</h1>
</div>
```

## 🔄 데이터 페칭

TanStack Query를 사용하여 서버 상태를 관리합니다.

```tsx
// 예시
import { useQuery } from "@tanstack/react-query"

export function UserProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  return <div>{data.name}</div>
}
```

## 🌍 환경변수

`.env.local` 파일을 생성하여 환경변수를 설정하세요.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
DATABASE_URL=your_database_url
```

## 📦 주요 스크립트

```bash
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버 실행
pnpm lint         # ESLint 실행
pnpm test         # Jest 테스트 실행
pnpm type-check   # TypeScript 타입 체크
```

## 🚢 배포

### Vercel로 배포합니다.

1. GitHub 저장소와 연동
2. Vercel에서 자동으로 빌드 및 배포
3. 환경변수 설정

### 기타 플랫폼

```bash
# 빌드
pnpm build

# 빌드된 파일은 .next 폴더에 생성됩니다
```

## 📝 코딩 컨벤션

- **컴포넌트**: PascalCase (예: `UserProfile.tsx`)
- **파일명**: kebab-case (예: `user-profile.tsx`) 또는 PascalCase
- **함수/변수**: camelCase (예: `getUserData`)
- **상수**: UPPER_SNAKE_CASE (예: `API_BASE_URL`)

## 👥 팀

- **Developer**: 강민욱
