// src/firebase.ts
// src/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, inMemoryPersistence } from "firebase/auth";

// 👉 Firebase 콘솔의 프로젝트 설정 값으로 교체
const firebaseConfig = {
  apiKey: "AIzaSyB4wTIUsnsk-pJy305PipMBhBC8cvhQltM",
  authDomain: "community-2ed81.firebaseapp.com",
  projectId: "community-2ed81",
  storageBucket: "community-2ed81.firebasestorage.app",
  messagingSenderId: "302727864622",
  appId: "1:302727864622:web:e2417474068dff21755abf",
  measurementId: "G-M6KYE2YL1N"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 상태 유지 귀찮으면 inMemoryPersistence (앱 껐다 켜면 로그아웃됨)
const auth = initializeAuth(app, { persistence: inMemoryPersistence });

export { app, auth };


// AIzaSyB4wTIUsnsk-pJy305PipMBhBC8cvhQltM