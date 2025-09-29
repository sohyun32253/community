# 📱 Community (RN + Expo + Firebase + Cloudinary)

간단한 커뮤니티 앱입니다.  
**주요 기능:** 회원가입/로그인, 글 목록/상세/작성, 이미지 첨부(Cloudinary), 댓글, 실시간 갱신(Firestore `onSnapshot`).

---

## 📂 GitHub 저장소
👉 [저장소 바로가기](https://github.com/sohyun32253/community)  

---

## 🚀 기술 스택
- **React Native (Expo)**
- **expo-router** (파일 기반 라우팅, 탭/상세)
- **Firebase**: Authentication(Email/Password), Firestore(글/댓글)
- **Cloudinary**: 이미지 업로드
- **react-hook-form**, **react-native-toast-message**

---

## 📦 설치 & 실행

```bash
# 저장소 클론
git clone https://github.com/사용자아이디/community.git
cd community

# 의존성 설치
npm install

# 로컬 개발 서버 실행
npx expo start

# 웹 실행
npx expo start --web
```

## 탭 구성
### Feed 
- 글 조회, 상세, 댓글

### Write 
- 글 작성, 이미지 첨부

### Account 
- 로그인 / 회원가입

  

## 🔑 주요 기능

## 회원가입/로그인

- Firebase Authentication (이메일/비밀번호)

- 로그인 성공/실패 시 Toast 알림

- 로그인 여부에 따라 /account/index → 자동 리다이렉트

- 구글, 카카오, 네이버 api 호출

- 유효성 검사 실시

## 피드 (글 목록)

- Firestore에서 최신순으로 불러오기

- onSnapshot을 사용한 실시간 갱신

## 글 작성

- 텍스트 / 이미지 첨부 (Cloudinary 업로드 후 Firestore 저장)
  
- 글 작성 시 피드에 자동 반영

- 상세 페이지

- 글 내용 + 이미지 표시

- 댓글 목록 렌더링

## 댓글

Firestore arrayUnion으로 저장

작성 시 실시간 반영

## 🗂️ Firestore 데이터 구조
```
posts: [
  {
    "userName": "나",
    "content": "첫 글입니다 👋",
    "imageUrl": "https://res.cloudinary.com/...",
    "createdAt": Timestamp,
    "comments": [
      {
        "id": "169123456",
        "userName": "익명",
        "text": "좋아요!",
        "createdAt": "2025.09.29 12:34"
      }
    ]
  }
]
```

## 🎥 시연 영상

[MVP 시연 영상](https://drive.google.com/file/d/1ziFYMK6qP4VFn_vH3gkOk2IYjpyVT0-N/view?usp=sharing)

## 📹 영상 흐름

회원가입 → 로그인

피드 확인

글 작성 (텍스트/이미지)

상세 보기 + 댓글 작성

## ⚠️ 유의사항
- 구글, 카카오, 네이버 소셜 로그인 API 연동도 구현하였습니다.  
- 다만 화면 녹화 특성상 시연 영상 메인에는 버튼 클릭 장면이 보이지 않습니다.  
- 별도의 API 호출 확인 영상은 아래 링크에서 확인 가능합니다.  

👉 [소셜 로그인 API 시연 영상](https://drive.google.com/file/d/16b41P9LIH2douRWL1Tp_tRbW2AM9idzs/view?usp=sharing)

- Cloudinary는 Unsigned preset 사용 (community 또는 mvp_posts)

- Firebase 키는 공개 가능 (클라이언트 전용)

- 실제 서비스에서는 Firestore 보안 규칙 필요





