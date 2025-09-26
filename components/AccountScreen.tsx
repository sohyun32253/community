import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import * as AuthSession from "expo-auth-session";

// Kakao
const kakaoDiscovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
  tokenEndpoint: "https://kauth.kakao.com/oauth/token",
};

// Naver
const naverDiscovery = {
  authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
  tokenEndpoint: "https://nid.naver.com/oauth2.0/token",
};

export default function AccountScreen() {
  const redirectUri = AuthSession.makeRedirectUri();
  const state = Math.random().toString(36).slice(2);

  // Kakao
  const [kakaoRequest, kakaoResponse, kakaoPrompt] = AuthSession.useAuthRequest(
    {
      clientId: "a0c3bdfdb3a11cbdfd1e36467c4f8af9",
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
    },
    kakaoDiscovery
  );

  // Naver
  const [naverRequest, naverResponse, naverPrompt] = AuthSession.useAuthRequest(
    {
      clientId: "ASI6FugW3USW2tEwSZhh",
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      state,
    },
    naverDiscovery
  );

  return (
<View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
  
  {/* Kakao 버튼 */}
  <Pressable
    disabled={!kakaoRequest}
    onPress={() => kakaoPrompt()}
    style={styles.snsButton}
  >
    <Image
      source={require("../assets/images/kakao_icon.svg")}
    />
  </Pressable>

  {/* Naver 버튼 */}
  <Pressable
    disabled={!naverRequest}
    onPress={() => naverPrompt()}
    style={styles.snsButton}
  >
    <Image
      source={require("../assets/images/naver_icon.svg")}
    />
  </Pressable>
</View>
  )
}

const styles = StyleSheet.create({
    snsButton: {  
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 50,
    width: 50,
    height:50
},
  buttonText: { color: "#fff", fontWeight: "700"},
});
