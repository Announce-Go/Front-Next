# 알리다고 (AnnounceGo)!!

병원 광고 관리 시스템

## 📌 프로젝트 소개

120여개 이상의 병원 광고를 효율적으로 관리하기 위한 통합 관리 시스템입니다.

### 주요 목적

- 카카오톡 단톡방으로 관리하던 광고 업무의 효율성 개선
- 여러 광고 업체의 서비스를 한 곳에서 통합 관리
- 병원이 자신의 광고 상황(순위, 노출 등)을 실시간으로 확인할 수 있는 플랫폼 제공

### 사용자 역할

- **관리자**: 병원 및 광고업체 관리, 전체 데이터 조회
- **광고업체** (120개): 담당 병원의 광고 순위 데이터 입력 및 계약 관리
- **병원**: 자신의 광고 현황 조회 (조회 전용)

---

## 📅 개발 일정

**프로젝트 시작일**: 2025-11-10
**현재 진행 단계**: 2단계 (화면 및 기능 설계) 🔄

| 단계    | 내용                               | 예상 기간 | 종료 예정일 | 상태      |
| ------- | ---------------------------------- | --------- | ----------- | --------- |
| 1-1단계 | 요구사항 정의 v1 (수동 입력 방식)  | -         | 2025-11-13  | ✅ 완료   |
| 1-2단계 | 요구사항 정의 v2 (크롤링/스케줄링) | -         | 2025-12-19  | ✅ 완료   |
| 2단계   | 화면 및 기능 설계                  | 5-7일     | 2025-12-26  | 🔄 진행중 |
| 3단계   | API 개발                           | 10-15일   | 2026-01-10  | ⏳ 대기   |
| 4단계   | 프론트엔드 개발                    | 10-15일   | 2026-01-25  | ⏳ 대기   |
| 5단계   | 인프라 구성                        | 5-7일     | 2026-02-01  | ⏳ 대기   |
| 6단계   | 배포                               | 1-3일     | 2026-02-04  | ⏳ 대기   |
| 7단계   | 테스트 및 버그 수정                | 3-5일     | 2026-02-09  | ⏳ 대기   |
| 8단계   | 운영 배포                          | 1일       | 2026-02-10  | ⏳ 대기   |

**예상 완료일**: 2026-02-10

---

## 📚 문서

- [요구사항 정의서](01_requirement.md) - 시스템 요구사항 및 기능 명세
- [시스템 설계서](04_architecture) - 기술 스택 및 아키텍처 다이어그램
- [화면 설계서](02_wireframe) - UI/UX 설계 및 화면 구성, API 목록
- [진행중인 질문](99_questions_pending) - 요구사항 관련 미해결 질문
- [해결된 질문](99_questions_resolved.md) - 답변 완료된 질문 아카이브
- [프로젝트 예산서](99_budget.md) - 개발 비용 및 서버 운영 비용

---

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
import { useQuery } from "@tanstack/react-query";

export function UserProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return <div>{data.name}</div>;
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
