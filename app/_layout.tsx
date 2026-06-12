import "@/global.css";
import { Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";

import { Lato_300Light } from "@expo-google-fonts/lato/300Light";
import { Lato_400Regular } from "@expo-google-fonts/lato/400Regular";
import { Lato_700Bold } from "@expo-google-fonts/lato/700Bold";
import { useFonts } from "@expo-google-fonts/lato/useFonts";
import { Lexend_300Light } from "@expo-google-fonts/lexend/300Light";
import { Lexend_400Regular } from "@expo-google-fonts/lexend/400Regular";
import { Lexend_700Bold } from "@expo-google-fonts/lexend/700Bold";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import Toast from "react-native-toast-message";
import AuthContext, { LoginProvider } from "./contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_700Bold,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO à changer quand login peut être fonctionnel

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;
      await SplashScreen.hideAsync();
      setIsLoading(false);
    }
    if (user) {
      setIsLoggedIn(true);
    }
    // async function prepare() {
    //   const token = await AsyncStorage.getItem("token"); // ← your auth check
    //   if (token) setIsLoggedIn(true);

    //   setIsLoading(false);
    //   await SplashScreen.hideAsync();
    // }
    prepare();
  }, [fontsLoaded, user]);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <>
      <Auth0Provider
        domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN ?? ""}
        clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ?? ""}
      >
        <LoginProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Slot />
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </LoginProvider>
        <Toast key="global-toast" position="top" topOffset={50} />
      </Auth0Provider>
    </>
  );
}
