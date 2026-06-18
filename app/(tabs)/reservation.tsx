import Logo from "@/assets/images/logo_white.svg";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { StyleSheet, Text, View } from "react-native";

export default function ReservationScreen() {
  return (
    <View style={styles.container}>
      <Logo style={styles.image} />
      <Text style={styles.text}>Coming soon !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  image: {
    width: 200,
    height: 73,
  },
  text: {
    color: Colors.foreground,
    fontFamily: Typography.Lato_700Bold,
  },
});
