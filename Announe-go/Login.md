# 인증(Auth) 시스템 개요

## 1. 폴더 구조 (Folder Structure)

`app/(auth)` 폴더를 기준으로 인증 관련 로직이 구성되어 있습니다.

```
app/(auth)/
├── apis/               # 인증 관련 API (현재 비어있음)
├── layout.tsx          # 인증 페이지 공통 레이아웃 (헤더, 중앙 정렬 등)
├── login/
│   └── page.tsx        # 로그인 페이지 (UI + 폼 로직)
└── signup/             # 회원가입 관련 페이지
```

## 2. 사용 라이브러리 (Tech Stack)

- **Framework**: Next.js (App Router)
- **Form Management**: `react-hook-form` (폼 상태 관리)
- **Validation**: `zod` + `@hookform/resolvers/zod` (데이터 유효성 검증)
- **UI Components**: `shadcn/ui` (Card, Input, Button, Form 등)

## 3. 로그인 플로우 (Login Flow)

현재 구현된 로그인 프로세스의 큰 흐름입니다.

1.  **페이지 진입**: 사용자가 `/login` 페이지에 접속.
2.  **데이터 입력**: 아이디와 비밀번호 입력.
3.  **유효성 검사 (Client Validations)**:
    - `zod` 스키마를 통해 실시간 검증 (길이, 특수문자 포함 여부 등).
4.  **폼 제출 (Submit)**:
    - 유효성 검사 통과 시 `onSubmit` 실행.
    - (현재) 입력 데이터 콘솔 출력 및 상태 저장.
5.  **이동 (Redirect)**:
    - 로그인 성공 처리가 완료되면 `/agency/dashboard`로 이동.
