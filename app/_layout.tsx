import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Platform, Text, TextInput } from "react-native";

const defaultFont = Platform.select({
  web: "system-ui",  
  ios: "System",
  android: "System",
  default: "System",
});

((Text as any).defaultProps ??= {}).style = [{ fontFamily: defaultFont }];
((TextInput as any).defaultProps ??= {}).style = [{ fontFamily: defaultFont }];

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
