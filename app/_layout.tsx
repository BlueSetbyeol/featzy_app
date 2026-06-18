import { Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { LoginProvider } from "@/contexts/AuthContext";
import { GeoProvider } from "@/contexts/GeoContext";
import { Lato_300Light } from "@expo-google-fonts/lato/300Light";
import { Lato_400Regular } from "@expo-google-fonts/lato/400Regular";
import { Lato_700Bold } from "@expo-google-fonts/lato/700Bold";
import { useFonts } from "@expo-google-fonts/lato/useFonts";
import { Lexend_300Light } from "@expo-google-fonts/lexend/300Light";
import { Lexend_400Regular } from "@expo-google-fonts/lexend/400Regular";
import { Lexend_700Bold } from "@expo-google-fonts/lexend/700Bold";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;
      await SplashScreen.hideAsync();
      setIsLoading(false);
    }
    // async function prepare() {
    //   const token = await AsyncStorage.getItem("token"); // ← your auth check
    //   if (token) setIsLoggedIn(true);

    //   setIsLoading(false);
    //   await SplashScreen.hideAsync();
    // }
    prepare();
  }, [fontsLoaded]);

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
      <GeoProvider>
        <LoginProvider>
          <SafeAreaProvider style={{ height: "100%" }}>
            <SafeAreaView style={{ height: "100%" }}>
              <Slot />
              <StatusBar style="auto" />
            </SafeAreaView>
          </SafeAreaProvider>
        </LoginProvider>
        <Toast key="global-toast" />
      </GeoProvider>
    </>
  );
}
