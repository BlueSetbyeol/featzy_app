import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress?: () => void;
};

export default function Tab({ label, selected, onPress }: Props) {
  if (selected) {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: Colors.background }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, { color: Colors.foreground }]}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.button, { backgroundColor: Colors.muted }]}
      onPress={onPress}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: "48%",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 2,
    margin: 1,
  },
  buttonLabel: {
    color: Colors.mutedForeground,
    fontSize: 16,
  },
});
