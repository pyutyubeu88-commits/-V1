[README.md](https://github.com/user-attachments/files/26077251/README.md)
# AI 자동 대댓글 생성기 — Vercel 배포 가이드

## 배포 방법

### 1단계 — Vercel 가입
https://vercel.com 에서 GitHub 계정으로 가입

### 2단계 — 이 폴더를 GitHub에 올리기
1. GitHub에서 새 저장소 생성
2. 이 폴더의 파일들을 업로드

### 3단계 — Vercel에서 배포
1. Vercel 대시보드 → New Project
2. GitHub 저장소 연결
3. Deploy 클릭
4. 자동으로 `https://프로젝트명.vercel.app` 주소 생성

### 4단계 — Google OAuth 설정
Google Cloud Console → OAuth 클라이언트 ID → 승인된 JavaScript 원본에 추가:
```
https://프로젝트명.vercel.app
```

## 파일 구조
```
vercel-deploy/
├── vercel.json          # Vercel 설정
├── api/
│   └── post-comment.js  # YouTube 댓글 게시 서버
└── public/
    └── index.html       # 메인 앱
```
