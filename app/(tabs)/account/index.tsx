import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import { router } from "expo-router";

export default function AccountIndex() {
  const [user, setUser] = useState<"loading" | null | {}>("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user && user !== "loading") {
      Alert.alert("로그인 성공", "환영합니다! 🎉");
    }
    if (user === null) {
      router.replace("/(tabs)/account/sign-in");
    }
  }, [user]);

  if (user === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>로그인 상태 확인 중...</Text>
      </View>
    );
  }

  return null; 
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
