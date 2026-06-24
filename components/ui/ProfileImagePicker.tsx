import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "./Button";

interface ProfileImagePickerProps {
  avatarPicked: ImagePicker.ImagePickerAsset | undefined;
  setAvatarPicked: (
    avatarPicked: ImagePicker.ImagePickerAsset | undefined,
  ) => void;
}

export default function ProfileImagePicker({
  avatarPicked,
  setAvatarPicked,
}: ProfileImagePickerProps) {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarPicked(result.assets[0]);
    } else {
      Toast.show({
        type: "error",
        text1: "Vous n'avez pas sélectionné d'image",
      });
    }
  };

  const displayName =
    avatarPicked?.fileName ?? avatarPicked?.uri.split("/").pop();

  return (
    <View style={{ width: "100%" }}>
      <Button
        label={"Choisir une photo"}
        onPress={pickImageAsync}
        theme={"link"}
      />
      {avatarPicked !== undefined && (
        <Text style={styles.text}>{displayName}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: Colors.foreground,
    marginBottom: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 10,
  },
});
