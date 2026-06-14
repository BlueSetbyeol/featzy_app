import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
};

export default function ToggleChip({ label, selected, onPress, icon }: Props) {
  return (
    <Pressable
      style={[
        styles.chip,
        {
          backgroundColor: selected ? Colors.secondary : Colors.background,
          borderColor: Colors.border,
        },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text
        style={[
          styles.label,
          { color: selected ? Colors.secondaryForeground : Colors.foreground },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  label: {
    fontSize: 13,
  },
});
