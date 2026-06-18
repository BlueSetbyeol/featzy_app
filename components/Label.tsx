import { Colors } from "@/constants/Colors";
import { StyleSheet, Text } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function Label({ children }: Props) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.foreground,
    marginBottom: 4,
  },
});
