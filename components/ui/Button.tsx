import { Colors } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";

type Theme =
  | "primary"
  | "secondary"
  | "muted"
  | "ghost"
  | "outline"
  | "link"
  | "default";

type Props = {
  label: string;
  theme?: Theme;
  onPress?: () => void;
  icon?: React.FC<SvgProps>;
  disabled?: boolean;
};

type ThemeConfig = {
  button: ViewStyle;
  label: TextStyle;
};

const themeStyles: Record<Theme, ThemeConfig> = {
  primary: {
    button: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    label: {
      color: Colors.primaryForeground,
      fontWeight: "300",
    },
  },
  secondary: {
    button: {
      backgroundColor: Colors.secondary,
      borderColor: Colors.secondary,
    },
    label: { color: Colors.secondaryForeground },
  },
  muted: {
    button: { backgroundColor: Colors.muted, borderColor: Colors.muted },
    label: { color: Colors.mutedForeground },
  },
  ghost: {
    button: { backgroundColor: "transparent", borderColor: "transparent" },
    label: { color: Colors.foreground },
  },
  outline: {
    button: {
      backgroundColor: "transparent",
      borderColor: Colors.border,
    },
    label: { color: Colors.foreground, fontSize: 14 },
  },
  link: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 0,
      boxShadow: "0px",
    },
    label: {
      color: Colors.primary,
      textAlign: "left",
      width: "100%",
      fontSize: 14,
    },
  },
  default: {
    button: { backgroundColor: Colors.card },
    label: { color: Colors.cardForeground },
  },
};

export default function Button({
  label,
  theme = "default",
  onPress,
  icon,
  disabled,
}: Props) {
  const Icon = icon;
  const { button: buttonThemeStyle, label: labelThemeStyle } =
    themeStyles[theme];

  const disabledOpacity = theme === "link" ? 0.8 : 0.5;

  return (
    <Pressable
      style={[
        styles.button,
        buttonThemeStyle,
        disabled && { opacity: disabledOpacity },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {Icon && (
        <Icon style={[styles.buttonIcon, disabled && { opacity: 0.5 }]} />
      )}
      <Text
        style={[
          styles.buttonLabel,
          labelThemeStyle,
          disabled && { opacity: 0.5 },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 6,
    width: "100%",
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
    padding: 5,
    boxShadow: "0px 2px 3px #00000028",
    gap: 5,
    fontSize: 14,
  },
  buttonLabel: {
    color: Colors.foreground,
    fontSize: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
  },
  buttonIcon: {
    width: 14,
    height: 14,
  },
});
