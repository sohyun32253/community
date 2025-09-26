import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { View, Text } from "react-native";

export default function Account() {
  const [user, setUser] = useState<null | {} | "loading">("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (u) => setUser(u ?? null));
    return () => unsub();
  }, []);

  if (user === "loading") return null;
  if (user === null) return <Redirect href="/sign-in" />;

  return (
    <View>
      <Text>마이페이지 (로그인됨)</Text>
    </View>
  );
}
