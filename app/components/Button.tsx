import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text } from "react-native";
import { SvgProps } from "react-native-svg";

type Props = {
  label: string;
  theme?: "primary" | "secondary" | "muted" | "ghost" | "outline" | "link";
  onPress?: () => void;
  icon?: React.FC<SvgProps>;
};

export default function Button({ label, theme, onPress, icon }: Props) {
  const Icon = icon;

  if (theme === "primary") {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: Colors.primary }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonLabel,
            {
              color: Colors.primaryForeground,
              fontSize: 12,
              fontWeight: "light",
            },
          ]}
        >
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }
  if (theme === "secondary") {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: Colors.secondary }]}
        onPress={onPress}
      >
        <Text
          style={[styles.buttonLabel, { color: Colors.secondaryForeground }]}
        >
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }
  if (theme === "muted") {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: Colors.muted }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, { color: Colors.mutedForeground }]}>
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }
  if (theme === "ghost") {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: "none" }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, { color: Colors.foreground }]}>
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }
  if (theme === "outline") {
    return (
      <Pressable
        style={[
          styles.button,
          styles.shadow,
          {
            backgroundColor: "none",
            borderColor: Colors.border,
            height: 35,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonLabel,
            { color: Colors.foreground, fontSize: 14 },
          ]}
        >
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }
  if (theme === "link") {
    return (
      <Pressable
        style={[styles.button, { backgroundColor: "none", borderWidth: 0 }]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonLabel,
            {
              color: Colors.primary,
              textAlign: "left",
              width: "100%",
              fontSize: 12,
            },
          ]}
        >
          {Icon && <Icon style={styles.buttonIcon} />}
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[styles.button, { backgroundColor: Colors.card }]}
      onPress={onPress}
    >
      {Icon && <Icon style={styles.buttonIcon} />}
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 6,
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: Colors.shadow,
    marginVertical: 3,
  },
  buttonLabel: {
    color: Colors.foreground,
    fontSize: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
  },
  buttonIcon: {
    marginRight: 8,
    width: 14,
    height: 14,
  },
  shadow: {
    shadowColor: "#00000028",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    boxShadow: "0px 2px 3px #00000028",
  },
});
