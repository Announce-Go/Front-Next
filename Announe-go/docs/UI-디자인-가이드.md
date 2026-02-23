# 모두보고 UI 디자인 가이드

## 전체 분위기
다크 테마 기반의 **딥 인디고·퍼플·시안** 그라디언트 팔레트.
고급스럽고 화려하지만 정보 전달이 명확한 SaaS 스타일.

---

## 배경색

| 용도 | 값 |
|------|----|
| 주요 배경 (오른쪽 패널 / 콘텐츠 영역) | `linear-gradient(160deg, #0a0a1a 0%, #0f0f2e 100%)` |
| 브랜드 패널 (왼쪽 사이드) | `linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)` |

---

## 컬러 팔레트

| 이름 | HEX / rgba | 사용처 |
|------|-----------|--------|
| Cyan (포인트) | `#06b6d4` | 버튼 시작색, 링크, 강조 |
| Indigo (포인트) | `#6366f1` | 버튼 끝색, 아이콘 배경 |
| 텍스트 (흰색) | `#ffffff` | 헤딩, 중요 텍스트 |
| 텍스트 (서브) | `#94a3b8` | 라벨, 보조 설명 |
| 텍스트 (비활성) | `#475569` | placeholder, 힌트 |
| 텍스트 (매우 흐림) | `#64748b` | 부제목 |
| 보라 (블롭) | `rgba(99,102,241,0.25)` | 배경 블롭 1 |
| 시안 (블롭) | `rgba(6,182,212,0.2)` | 배경 블롭 2 |
| 퍼플 (블롭) | `rgba(168,85,247,0.2)` | 배경 블롭 3 |
| 카드/패널 배경 | `rgba(255,255,255,0.06)` | Glassmorphism 카드 |
| 카드/패널 테두리 | `rgba(255,255,255,0.1)` | Glassmorphism 테두리 |
| 입력 배경 | `rgba(255,255,255,0.05)` | Input 필드 |
| 입력 테두리 | `rgba(255,255,255,0.1)` | Input 테두리 |
| 에러 배경 | `rgba(239,68,68,0.1)` | 에러 박스 |
| 에러 테두리 | `rgba(239,68,68,0.3)` | 에러 박스 테두리 |
| 선택됨 (Cyan tint) | `rgba(6,182,212,0.15)` | 선택된 카드/항목 배경 |
| 선택됨 테두리 | `rgba(6,182,212,0.5)` | 선택된 카드/항목 테두리 |

---

## 그라디언트

| 용도 | 값 |
|------|----|
| 주요 버튼 | `linear-gradient(90deg, #06b6d4, #6366f1)` |
| 로고 / 아이콘 배경 | `linear-gradient(135deg, #06b6d4, #6366f1)` |
| 브랜드 텍스트 (clip) | `linear-gradient(90deg, #ffffff, #a5f3fc, #818cf8)` |
| 탭 활성화 | `linear-gradient(90deg, #06b6d4, #6366f1)` |

---

## 버튼 스타일

### 주요 버튼 (CTA)
```
background: linear-gradient(90deg, #06b6d4, #6366f1)
boxShadow: 0 0 24px rgba(99,102,241,0.35)
height: 52px
borderRadius: rounded-xl (12px)
fontWeight: semibold
color: white
border: 없음
```

### 탭 활성화
```
background: linear-gradient(90deg, #06b6d4, #6366f1)
boxShadow: 0 0 16px rgba(99,102,241,0.3)
color: white
```

### 탭 비활성화
```
color: #64748b
background: 없음
```

---

## Input 스타일

```
height: 52px (로그인) / 46px (회원가입 2열)
background: rgba(255,255,255,0.05)
border: rgba(255,255,255,0.1)
borderRadius: rounded-xl
color: white
placeholder: text-slate-500 (#64748b)
focus border: #06b6d4 (cyan-500)
focus ring: 없음 (focus-visible:ring-0)
```

---

## 카드 / 패널 스타일 (Glassmorphism)

```
background: rgba(255,255,255,0.06)
border: rgba(255,255,255,0.1)
borderRadius: rounded-2xl
backdropFilter: backdrop-blur-sm
hover: scale-[1.02] + transition-all duration-300
```

---

## 아이콘 배경

```
background: linear-gradient(135deg, #06b6d4, #6366f1)
borderRadius: rounded-xl (10px) or rounded-2xl (16px)
size: w-10 h-10 (기본) / w-20 h-20 (로고)
```

---

## 레이아웃 패턴

### 페이지 레이아웃 (로그인·회원가입)
- **좌우 분할**: 왼쪽 40~50% 브랜드 패널 / 오른쪽 50~60% 폼 패널
- 왼쪽: 브랜드 정보, 기능 소개 카드, 애니메이션 로고
- 오른쪽: 실제 입력 폼
- 모바일: 오른쪽 패널만 풀스크린 (`hidden lg:flex` 로 왼쪽 숨김)

### 폼 레이아웃
- 2열 그리드 (`grid grid-cols-2 gap-3`): 짧은 필드 묶기
- 전체 너비: 긴 필드 (회사명, 이메일 등)

---

## 애니메이션 (globals.css에 정의됨)

| 클래스 | 효과 | 적용처 |
|--------|------|--------|
| `animate-blob` | 7s 무한 위치·크기 변화 | 배경 블롭 |
| `animation-delay-2000` | 2초 지연 | 블롭 2번째 |
| `animation-delay-4000` | 4초 지연 | 블롭 3번째 |
| `animate-float` | 3s 위아래 부유 | 로고 아이콘 |
| `animate-gradient` | 6s 그라디언트 이동 | (선택적) |
| `animate-spin` | 회전 | 로딩 스피너 |

### 배경 블롭 구성 (3개)
```tsx
{/* 블롭 1 - 인디고 */}
<div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-blob"
  style={{ background: "rgba(99,102,241,0.25)" }} />

{/* 블롭 2 - 시안 */}
<div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-2000"
  style={{ background: "rgba(6,182,212,0.2)" }} />

{/* 블롭 3 - 퍼플 */}
<div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full blur-3xl animate-blob animation-delay-4000"
  style={{ background: "rgba(168,85,247,0.2)" }} />
```

### 격자 오버레이
```tsx
<div className="absolute inset-0 opacity-[0.07]"
  style={{
    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  }}
/>
```

---

## 브랜드 텍스트 그라디언트 (CSS clip)

```tsx
<h1 style={{
  background: "linear-gradient(90deg, #ffffff, #a5f3fc, #818cf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}}>
  모두보고
</h1>
```

---

## 구분선 / 푸터 패턴

```tsx
<div className="flex items-center gap-3">
  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
  <span className="text-xs" style={{ color: "#1e293b" }}>© 2025 모두보고</span>
  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
</div>
```

---

## 로고 컴포넌트 패턴

```tsx
<div className="w-20 h-20 rounded-2xl flex items-center justify-center animate-float"
  style={{
    background: "linear-gradient(135deg, #06b6d4, #6366f1)",
    boxShadow: "0 0 40px rgba(99,102,241,0.5)",
  }}
>
  <BarChart3 className="w-10 h-10 text-white" />
</div>
```

---

## 사용 중인 아이콘 (lucide-react)

- `BarChart3` — 로고/브랜드
- `TrendingUp` — 순위 추적 기능
- `Shield` — 역할 기반 보안
- `Zap` — 빠른 분석
- `User` — 아이디 입력 아이콘
- `Lock` — 비밀번호 입력 아이콘
- `Eye` / `EyeOff` — 비밀번호 표시 토글
- `UserCircle` — 광고주 탭
- `Building2` — 대행사 탭

---

## 체크박스 스타일

```
border: slate-600
checked background: #06b6d4 (cyan-500)
checked border: #06b6d4
클래스: data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500
```

---

## 참고: 이 스타일이 적용된 파일

- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- `app/globals.css` (애니메이션 keyframes)
