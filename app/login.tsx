import Logo from "@/assets/images/logo_white.svg";
import LoginTab from "@/components/LogInTab";
import SignInTab from "@/components/SignInTab";
import Tab from "@/components/Tab";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, width: width, height: height },
      ]}
    >
      <Logo style={styles.image} />
      <Text style={[styles.slogan, { fontFamily: "Mudstone", fontSize: 20 }]}>
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
          />
          <Tab
            label="Inscription"
            selected={connectionOrInscription === "inscription"}
            onPress={() => {
              setConnectionOrInscription("inscription");
            }}
          />
        </View>
        {connectionOrInscription === "connexion" ? <LoginTab /> : <SignInTab />}
      </View>
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
