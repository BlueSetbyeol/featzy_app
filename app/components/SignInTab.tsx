import authApi from "@/app/api/authApi";
import { CreateUserSchema } from "@/app/services/userSchema";
import Apple from "@/assets/images/icon/apple.svg";
import Google from "@/assets/images/icon/googlepay.svg";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
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
import Button from "./Button";

export default function SignInTab() {
  const { width, height } = useWindowDimensions();

  const registerForm = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  });

  const notify = () =>
    Toast.show({
      type: "success",
      text1: "Compte créé !",
      text2: "Tu peux te connecter.",
    });

  async function createNewUser(data: z.infer<typeof CreateUserSchema>) {
    try {
      const response = await authApi.register(data);
      if (response) {
        router.replace("/login");
        notify();
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
      <Button
        label="Continuer avec Google"
        theme="outline"
        onPress={() => {}}
        icon={Google}
      />
      <Button
        label="Continuer avec Apple"
        theme="outline"
        onPress={() => {}}
        icon={Apple}
      />
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
      <View style={{ alignItems: "center" }}>
        <View style={[styles.doubleContainer, { width: width * 0.8 }]}>
          <View style={{ width: width * 0.39 }}>
            <Controller
              control={registerForm.control}
              name="firstname"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.input_label]}>Prénom</Text>
                  <TextInput
                    style={[styles.input, { height: height * 0.055 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Leïla"
                    keyboardType="default"
                    autoComplete={"name"}
                  />
                </>
              )}
            />
          </View>
          <View style={{ width: width * 0.39 }}>
            <Controller
              control={registerForm.control}
              name="lastname"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.input_label]}>Nom</Text>
                  <TextInput
                    style={[styles.input, { height: height * 0.055 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Dubois"
                    keyboardType="default"
                    autoComplete={"family-name"}
                  />
                </>
              )}
            />
          </View>
        </View>
        <Controller
          control={registerForm.control}
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
        <View style={{ alignItems: "center" }}>
          <View style={[styles.doubleContainer, { width: width * 0.8 }]}>
            <View style={{ width: width * 0.39 }}>
              <Controller
                control={registerForm.control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[styles.input_label]}>Mot de passe</Text>
                    <TextInput
                      style={[styles.input, { height: height * 0.055 }]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="••••••••"
                      keyboardType="default"
                      secureTextEntry={true}
                    />
                  </>
                )}
              />
            </View>
            <View style={{ width: width * 0.39 }}>
              <Controller
                control={registerForm.control}
                name="password_confirmation"
                render={({ field: { onChange, value } }) => (
                  <>
                    <Text style={[styles.input_label]}>Confirmation</Text>
                    <TextInput
                      style={[styles.input, { height: height * 0.055 }]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="••••••••"
                      keyboardType="default"
                      secureTextEntry={true}
                    />
                  </>
                )}
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        label={"Créer mon compte"}
        theme={"primary"}
        onPress={registerForm.handleSubmit(createNewUser, (errors) => {
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
  doubleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    marginTop: 12,
  },
  controller: {
    flex: 1,
  },
  input_label: {
    color: Colors.foreground,
    textAlign: "left",
  },
  input: {
    marginVertical: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: Colors.border,
    color: Colors.mutedForeground,
  },
});
