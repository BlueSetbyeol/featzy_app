import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const Logo = require("@/assets/images/logo.svg");

export default function Login() {
  const [fontsLoaded] = useFonts({
    Mudstone: require("@/assets/fonts/Mudstone.otf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} contentFit="contain"></Image>
      <Text style={[styles.text, { fontFamily: "Mudstone", fontSize: 20 }]}>
        Partager un repas, c’est eazy
      </Text>
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
  text: {
    color: Colors.primary,
  },
  image: {
    width: 200,
    height: 73,
  },
});
