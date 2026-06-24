import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";

export default function GlobalMap() {
  return (
    <View style={styles.container}>
      <Link href="https://featzy-front.vercel.app/">
        <Button label="Suivez le lien pour le site web" theme="primary" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
