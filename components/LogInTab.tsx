import authApi from "@/api/authApi";
import Apple from "@/assets/icon/apple.svg";
import Google from "@/assets/icon/googlepay.svg";
import { Colors } from "@/constants/Colors";
import AuthContext from "@/contexts/AuthContext";
import { LoginUserSchema } from "@/services/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as z from "zod";
import Button from "./ui/Button";

WebBrowser.maybeCompleteAuthSession();

export default function LoginTab() {
  const { width, height } = useWindowDimensions();
  const { setUser } = useContext(AuthContext);

  const LoginForm = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function loginUser(data: z.infer<typeof LoginUserSchema>) {
    try {
      const response = await authApi.login(data);
      if (response) {
        setUser(response);
        router.replace("/(tabs)");
      } else {
        Toast.show({ type: "error", text1: "Identifiants incorrects" });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({ type: "error", text1: "Une erreur est survenue" });
    }
  }

  return (
    <View style={[{ width: width * 0.81, alignItems: "center" }]}>
      <Button label="Continuer avec Google" theme="outline" icon={Google} />
      <Button label="Continuer avec Apple" theme="outline" icon={Apple} />
      <View
        style={[
          {
            width: width * 0.8,
            borderColor: Colors.secondary,
            borderWidth: 1,
            marginVertical: 6,
          },
        ]}
      />
      <Controller
        control={LoginForm.control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[styles.input_label, { width: width * 0.8 }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                { width: width * 0.81, height: height * 0.055 },
              ]}
              onChangeText={onChange}
              value={value}
              placeholder="exemple@mail.com"
              keyboardType="email-address"
              autoComplete={"email"}
            />
          </>
        )}
      />
      <Controller
        control={LoginForm.control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[styles.input_label, { width: width * 0.8 }]}>
              Mot de passe
            </Text>
            <TextInput
              style={[
                styles.input,
                { width: width * 0.81, height: height * 0.055 },
              ]}
              onChangeText={onChange}
              value={value}
              placeholder="••••••••"
              keyboardType="default"
              secureTextEntry={true}
              onSubmitEditing={LoginForm.handleSubmit(loginUser, (errors) => {
                Toast.show({
                  type: "error",
                  text1: "Veuillez remplir tous les champs",
                });
              })}
            />
          </>
        )}
      />
      <Button label={"Mot de passe oublié ?"} theme={"link"} />
      <Button
        label={"Se connecter"}
        theme={"primary"}
        onPress={LoginForm.handleSubmit(loginUser, (errors) => {
          Toast.show({
            type: "error",
            text1: "Veuillez remplir tous les champs",
          });
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 73,
  },
  input_label: {
    color: Colors.foreground,
    textAlign: "left",
  },
  input: {
    marginVertical: 4,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: Colors.border,
    color: Colors.mutedForeground,
  },
});
