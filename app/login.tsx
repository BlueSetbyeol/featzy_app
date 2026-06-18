import Logo from "@/assets/images/logo_white.svg";
import LoginTab from "@/components/Auth/LogInTab";
import SignInTab from "@/components/Auth/SignInTab";
import Tab from "@/components/ui/Tab";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Mudstone: require("@/assets/fonts/Mudstone.otf"),
  });
  const [connectionOrInscription, setConnectionOrInscription] = useState<
    "connexion" | "inscription"
  >("connexion");

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: height }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo style={styles.image} />
          <Text
            style={[styles.slogan, { fontFamily: "Mudstone", fontSize: 20 }]}
          >
            Partager un repas, c’est eazy
          </Text>

          <View
            style={[
              styles.card,
              {
                width: width * 0.9,
                height: height * 0.6,
                backgroundColor: Colors.card,
              },
            ]}
          >
            <View
              style={[
                styles.tabsContainer,
                { width: width * 0.81, height: height * 0.06 },
              ]}
            >
              <Tab
                label="Connexion"
                selected={connectionOrInscription === "connexion"}
                onPress={() => {
                  setConnectionOrInscription("connexion");
                }}
                numberOfTabs={2}
              />
              <Tab
                label="Inscription"
                selected={connectionOrInscription === "inscription"}
                onPress={() => {
                  setConnectionOrInscription("inscription");
                }}
                numberOfTabs={2}
              />
            </View>
            {connectionOrInscription === "connexion" ? (
              <LoginTab />
            ) : (
              <SignInTab />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  slogan: {
    color: Colors.primary,
  },
  image: {
    width: 200,
    height: 73,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: 15,
    marginTop: 30,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    boxShadow: Colors.shadow,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.muted,
    borderRadius: 6,
    gap: 2,
    paddingHorizontal: 10,
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
