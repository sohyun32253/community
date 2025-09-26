import { View, Text, TextInput, Image, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import AccountScreen from "../../components/AccountScreen";

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
    const onSubmit = (data: any) => {
    console.log("로그인 시도:", data);
  };

   const [showPwd, setShowPwd] = useState(false);
   const [passwordVisible, setPasswordVisible] = useState(false);

   function togglePwdVisibility() {
    setShowPwd((prev) => !prev);
  }

  const router = useRouter(); 

  function goToSignin() {
    router.push("/sign-in");
  }

  return (
  <View
    style={{
      backgroundColor: "#fff",
      padding:40,
      paddingHorizontal:40,
      width: "100%",
      flex:1
    }}
  >
    <Text
      style={{
        fontSize: 28,
        color: "#444",
        marginBottom: 24,
        fontWeight: "bold",
        textAlign: 'center'
      }}
    >
      Sign in
    </Text>

    {/* SNS 버튼 영역 */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24
      }}
    >
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
    </View>

    {/* 이메일 */}
    <Text accessibilityLabel="Email label" style={styles.label}>Email</Text>
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
          placeholder="Example@mail.com"
          keyboardType="email-address"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
    />
    {errors.email && (
      <Text style={{ color: "red", marginBottom: 8 }}>
        {errors.email?.message}
      </Text>
    )}

    {/* 비밀번호 표시 토글 */}
    <View style={{ position: "relative" }}>
      <Text style={styles.label}>Password</Text>

      <Controller
        control={control}
        name="password"
        rules={{
          required: "비밀번호를 입력해주세요.",
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/,
            message: "영문자,숫자,특수문자를 포함한 8-15자 이내의 비밀번호를 입력해주세요.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Enter your password"
            secureTextEntry={!showPwd}   
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            returnKeyType="done"
          />
        )}
      />

      {/* 눈 아이콘 버튼 */}
      <Pressable
        onPress={togglePwdVisibility}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="비밀번호 표시 전환"
        style={{ position: "absolute", right: 14, bottom: 18 }}
      >
        <Image
          source={
            showPwd
              ? require("../../assets/images/visibility_off_icon.svg")
              : require("../../assets/images/visibility_icon.svg")
          }
          style={{ width: 24, height: 24, resizeMode: "contain" }}
        />
      </Pressable>
    </View>

    {errors.password && (
      <Text style={styles.error}>{String(errors.password.message)}</Text>
    )}

    <Pressable
      style={{
        width: "100%",
        height:50,
        padding: 10,
        marginTop: 30,
        backgroundColor: "#222222",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={handleSubmit(onSubmit)}
    >
      <Text style={styles.buttonText}>회원가입</Text>
    </Pressable>

    <View
      style={{
        alignItems: "center",
        marginTop: 40,
        position: "relative",
      }}
    >
    </View>

    <Text style={{ color: "#FF7700", textAlign: "center", fontWeight: "bold" }} onPress={goToSignin}>
      계정이 있다면? 로그인 하러가기
    </Text>
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
    marginBottom: 5,
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
  buttonText: { color: "#fff", fontWeight: "700" },
  label: { 
    marginVertical:10, 
    textAlign:"left",
    fontWeight:"bold",
    color: "#11111"
  }
});

