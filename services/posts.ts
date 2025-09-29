import { db } from "../app/src/firebaseConfig";
import { Post } from "../types";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

// 글 목록 불러오기
export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userName: data.userName ?? "",
      content: data.content ?? "",
      createdAt: data.createdAt
        ? data.createdAt.toDate().toLocaleString("ko-KR")
        : "",
      imageUrl: data.imageUrl ?? null,   
      comments: data.comments || [],
    };
  });
}

// 개별 글 불러오기
export async function getPostById(postId: string): Promise<Post | null> {
  const ref = doc(db, "posts", postId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    id: snap.id,
    userName: data.userName ?? "",
    content: data.content ?? "",
    createdAt: data.createdAt
      ? data.createdAt.toDate().toLocaleString("ko-KR")
      : "",
    imageUrl: data.imageUrl ?? null,  
    comments: (data.comments || []).map((c: any) => ({
      id: c.id ?? Date.now().toString(),
      userName: c.userName ?? "익명",
      text: c.text ?? "",
      createdAt: c.createdAt?.toDate
        ? c.createdAt.toDate().toLocaleString("ko-KR")
        : "",
    })),
  };
}

// 댓글 추가
export async function addComment(postId: string, userName: string, text: string) {
  const ref = doc(db, "posts", postId);
  await updateDoc(ref, {
    comments: arrayUnion({
      id: Date.now().toString(),
      userName,
      text,
      createdAt: new Date().toLocaleString("ko-KR"),
    }),
  });
}

// Cloudinary 업로드 (웹 + 모바일 둘 다 지원)
export async function uploadToCloudinary(imageUri: string) {
  let fileToUpload: any;

  if (imageUri.startsWith("blob:")) {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    fileToUpload = blob; 
  } else {
    fileToUpload = {
      uri: imageUri,
      type: "image/jpeg", 
      name: "upload.jpg",
    } as any;
  }

  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("upload_preset", "community"); 

  const res = await fetch("https://api.cloudinary.com/v1_1/dn00jgclg/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("📸 Cloudinary 응답:", data);

  if (!res.ok) throw new Error(data.error?.message || "Upload failed");
  return data.secure_url;
}

// 게시글 작성
export async function addPost(userName: string, content: string, imageUri?: string) {
  const docRef = await addDoc(collection(db, "posts"), {
    userName,
    content,
    imageUrl: null,
    createdAt: serverTimestamp(),
    comments: [],
  });

  if (imageUri) {
    try {
      const imageUrl = await uploadToCloudinary(imageUri);
      await updateDoc(doc(db, "posts", docRef.id), { imageUrl });
    } catch (err) {
      console.error("❌ 이미지 업로드 실패:", err);
    }
  }
}

// 실시간 업로드
export function listenPosts(callback: (posts: any[]) => void) {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        userName: data.userName ?? "",
        content: data.content ?? "",
        createdAt: data.createdAt
          ? data.createdAt.toDate().toLocaleString("ko-KR")
          : "",
        imageUrl: data.imageUrl ?? null,
        comments: data.comments || [],
      };
    });
    callback(posts);
  });
}