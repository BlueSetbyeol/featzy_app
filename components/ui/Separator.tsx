import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
});
