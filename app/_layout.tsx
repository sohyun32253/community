import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "로그인" }} />
        <Stack.Screen name="signup" options={{ title: "회원가입" }} />
      </Stack>
      <Toast /> 
    </>
  );
}
