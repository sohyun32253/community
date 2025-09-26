import React, { useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet,  ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../app/src/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:     "886186505959-af0366oejd4rk2encsj2j9pc1gebcbas.apps.googleusercontent.com",
  });

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        const idToken = response.authentication?.idToken;
        if (!idToken) return;

        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
      }
    })();
  }, [response]);

  return (
            <Pressable style={styles.snsButton} onPress={() => promptAsync()}>
      <Image
        source={require("../assets/images/google_icon.svg")} 
        style={{ width: 24, height: 24, resizeMode: "contain" }}
      />
    </Pressable>
  );
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

