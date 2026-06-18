import { StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function ButtonGroup({ children, style }: Props) {
  return <View style={[styles.group, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 6,
    overflow: "hidden",
    gap: 4,
  },
});
