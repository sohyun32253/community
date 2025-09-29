import { View, Text, TextInput, Image, Pressable, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import GoogleSignInButton from "../../../components/GoogleSignInButton";
import AccountScreen from "../../../components/AccountScreen";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import Toast from "react-native-toast-message";
export default function Account() {
  type FormData = {
    email: string;
    password: string;
  };
  const{
  control,
  handleSubmit,
  formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function goToSignup() {
    router.push("/account/sign-up");
  }

   const onSubmit = async (data: FormData) => {
    setError("");
    setLoading(true);
    try {
    const userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
    Toast.show({
      type: "success",
      text1: "로그인 성공",
      text2: `${userCred.user.email}님 환영합니다!`,
    });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "로그인 실패",
        text2: "아이디 또는 비밀번호를 확인하세요.",
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 28, color: "#444", marginBottom: 24, fontWeight:"bold" }}>
        Sign in
      </Text>

      <View style={{ paddingHorizontal:40, width: "100%"}}>
          {/* 이메일 */}
          <Controller<FormData>
          control={control}
          name="email"
          rules={{
              required: "이메일을 입력해주세요.",
              pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 형식을 작성해주세요.",
              },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
              style={styles.input}
              placeholder="이메일"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              />
          )}
          />
          {errors.email && (
          <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.email?.message}
          </Text>
          )}

          {/* 비밀번호 */}
          <Controller<FormData>
          control={control}
          name="password"
          rules={{
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^.{4,12}$/,
              message: "4-12글자의 비밀번호를 입력해주세요.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          />
          {errors.password && (
          <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.password?.message}
          </Text>
          )}

        {/* 로그인 버튼 */}
          <Pressable 
            style={{ 
              width: "100%",
              padding: "10px", 
              backgroundColor:"#222222",
              borderRadius:50,
              display:"flex",
              alignItems:"center",
              marginTop:20
            }}
            onPress={handleSubmit(onSubmit)} >
            <Text style={styles.buttonText}>로그인</Text>
          </Pressable>

          <View style={{ alignItems: "center", marginTop: 40, marginBottom: 24, position:"relative"}}>
            <Text style={{ fontSize: 16, color: "#444" }}>sns로 로그인하기</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 24,
              marginBottom:24 
            }}
          >
          <GoogleSignInButton/>
          <AccountScreen/>
        </View>

        <Text style={{ color: "#FF7700", textAlign: "center", fontWeight: "bold" }} onPress={goToSignup}>계정이 없다면? 회원가입 하러가기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  error: { color: "red", marginBottom: 8 },
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

