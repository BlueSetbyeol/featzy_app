import { Colors } from "@/constants/Colors";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

type DialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};

export default function Dialog({ open, setOpen, children }: DialogProps) {
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
    >
      <View style={{ flex: 1 }}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />
        <View style={[styles.modal, { top: height * 0.3, width: "80%" }]}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 20,
    zIndex: 10,
    alignSelf: "center",
    position: "absolute",
    boxShadow: "0px 2px 3px #00000028",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
