import { View, Text, TextInput, StyleSheet, Pressable,Image, Platform, KeyboardAvoidingView, Button, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { addPost } from "@/services/posts";
import { useRouter } from "expo-router";
import Photo from '../../assets/images/photo.svg'

export default function Write() {
  const FOOTER_H = 64; 
  const [image, setImage] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("사진 접근 권한이 필요합니다.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    const asset = result.assets[0];
    console.log("📂 선택된 이미지:", asset);
    setImage(asset.uri); 
  }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !image) return;
    await addPost("나", content, image || undefined);

    setContent("");
    setImage(null);
    router.push("/");
  };

 return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Pressable><Text style={styles.headerBtn}>취소</Text></Pressable>
          <Text style={styles.headerTitle}>포스트 쓰기</Text>
          <Pressable onPress={handleSubmit}><Text style={[styles.headerBtn, { color: "#007AFF" }]}>등록</Text></Pressable>
        </View>

        {/* 본문 (남은 공간 전부 차지) */}
        <ScrollView contentContainerStyle={styles.content}>          
          <TextInput
            style={styles.textarea}
            placeholder="내용을 입력하세요"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
          {/* 이미지 미리보기 */}
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 300, marginTop: 20 }}
            />
          )}
        </ScrollView>

        {/* 푸터 */}
        <View style={[styles.footer, { height: FOOTER_H }]}>
          <Pressable style={styles.photoBtn} onPress={pickImage}>
            <Photo
            style={{ width: 35, height: 35 }}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  headerTitle: { fontWeight: "bold", fontSize: 16 },
  headerBtn: { fontSize: 16, color: "#666" },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  
  textarea: {
    flex: 1,               
    fontSize: 16,
    paddingBottom: 12,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  
  photoBtn: {
    alignItems: "center",
    justifyContent: "center",
  }
});
