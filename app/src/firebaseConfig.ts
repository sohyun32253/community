// src/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const auth = initializeAuth(app, { persistence: inMemoryPersistence });

export { app, auth };
export const db = getFirestore(app);
export const doc = getFirestore(app);
