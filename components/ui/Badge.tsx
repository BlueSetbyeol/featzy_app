// components/ui/badge.tsx
import { Colors } from "@/constants/Colors";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

type BadgeVariant = "default" | "secondary" | "outline";

type Props = {
  children: ReactNode;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
};

export const badgeVariants: Record<
  BadgeVariant,
  {
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
    color: string;
  }
> = {
  default: {
    backgroundColor: Colors.primary,
    color: Colors.primaryForeground,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    color: Colors.secondaryForeground,
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: Colors.border,
    borderWidth: 1,
    color: Colors.foreground,
  },
};

export default function Badge({ children, variant = "default", style }: Props) {
  const v = badgeVariants[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: v.backgroundColor,
          borderColor: v.borderColor,
          borderWidth: v.borderWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
});
