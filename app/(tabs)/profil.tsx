import authApi from "@/api/authApi";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import AuthContext from "@/contexts/AuthContext";
import { extractApiError } from "@/lib/axios";
import { ChangeUserSchema } from "@/services/userSchema";
import { UpdateProfilePayload } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { Pen } from "lucide-react-native";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import z from "zod";

const Placeholder = require("@/assets/images/portrait.jpeg");

export default function ProfilScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { width, height } = useWindowDimensions();

  const ChangeInformationForm = useForm<z.infer<typeof ChangeUserSchema>>({
    resolver: zodResolver(ChangeUserSchema),
    defaultValues: {
      first_name: user?.user.first_name ?? "",
      last_name: user?.user.last_name ?? "",
      phone_number: user?.user.phone_number ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      ChangeInformationForm.reset({
        first_name: user.user.first_name ?? "",
        last_name: user.user.last_name ?? "",
        phone_number: user.user.phone_number ?? "",
      });
    }
  }, [user]);

  async function onSubmit(data: z.infer<typeof ChangeUserSchema>) {
    const { dirtyFields } = ChangeInformationForm.formState;

    const payload: Partial<UpdateProfilePayload> = {};
    if (dirtyFields.first_name) payload.first_name = data.first_name;
    if (dirtyFields.last_name) payload.last_name = data.last_name;
    if (dirtyFields.phone_number) payload.phone = data.phone_number;

    if (Object.keys(payload).length === 0) {
      return;
    }

    try {
      const updated = await authApi.updateProfile(payload);
      if (user) setUser({ ...user, user: updated });
      Toast.show({
        type: "success",
        text1: "Ton compte a bien été mis à jour.",
      });
    } catch (error) {
      const { message } = extractApiError(error);
      Toast.show({ type: "error", text1: message });
    }
  }

  const AVATAR_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const AVATAR_MAX_SIZE = 5 * 1024 * 1024;

  async function handleUploadAvatar(
    avatarPicked: ImagePicker.ImagePickerAsset,
  ) {
    if (!avatarPicked) {
      Toast.show({
        type: "error",
        text1: "Choisis d'abord une image.",
      });
      return;
    }

    const mimeType = avatarPicked.mimeType ?? "";
    if (!AVATAR_ALLOWED_TYPES.includes(mimeType)) {
      Toast.show({
        type: "error",
        text1: "Le format doit être JPEG, PNG ou WebP.",
      });
      return;
    }

    if ((avatarPicked.fileSize ?? 0) > AVATAR_MAX_SIZE) {
      Toast.show({
        type: "error",
        text1: "L'image ne doit pas dépasser 5 Mo.",
      });
      return;
    }

    try {
      const updated = await authApi.uploadAvatar({
        uri: avatarPicked.uri,
        name: avatarPicked.fileName ?? "avatar.jpg",
        type: mimeType,
      } as any);
      console.log(updated);

      if (user) {
        setUser({ ...user, user: updated });
      }
      Toast.show({
        type: "success",
        text1: "Ta photo de profil a bien été mise à jour.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: extractApiError(error).message,
      });
    }
  }

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      await handleUploadAvatar(asset);
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        width: width,
        height: height,
        alignItems: "center",
        backgroundColor: Colors.background,
        paddingTop: 30,
      }}
    >
      <View style={styles.profileSection}>
        <Pressable onPress={pickImageAsync}>
          <Pen style={styles.editIcon} />
          {user && user.user.avatar_url ? (
            <Image
              source={{ uri: user.user.avatar_url }}
              style={styles.profileImage}
              resizeMode="cover"
              onLoad={() => console.log("Image loaded!")}
              onError={(e) => console.log("Image error:", e.nativeEvent.error)}
            />
          ) : (
            <Image
              source={Placeholder}
              style={styles.profileImage}
              resizeMode="cover"
            />
          )}
        </Pressable>
      </View>

      <View style={styles.identityCard}>
        <View style={{ alignItems: "center", width: width * 0.8 }}>
          <View style={{ width: "100%" }}>
            <Controller
              control={ChangeInformationForm.control}
              name="first_name"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.input_label]}>Prénom</Text>
                  <TextInput
                    style={[styles.input, { height: height * 0.055 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Leïla"
                    keyboardType="default"
                    autoComplete={"name"}
                  />
                </>
              )}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Controller
              control={ChangeInformationForm.control}
              name="last_name"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.input_label]}>Nom</Text>
                  <TextInput
                    style={[styles.input, { height: height * 0.055 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Dubois"
                    keyboardType="default"
                    autoComplete={"family-name"}
                  />
                </>
              )}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Text style={[styles.input_label]}>Email</Text>
            <TextInput
              style={[styles.input, { height: height * 0.055 }]}
              value={user && user.user.email}
              editable={false}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Controller
              control={ChangeInformationForm.control}
              name="phone_number"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.input_label]}>Téléphone</Text>
                  <TextInput
                    style={[styles.input, { height: height * 0.055 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="0123456789"
                    keyboardType="number-pad"
                    autoComplete={"tel"}
                  />
                </>
              )}
            />
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 10, alignSelf: "stretch" }}>
          <Button
            label={"Modifier le mot de passe"}
            theme={"secondary"}
            disabled={true}
          />
          <Button
            label={"Enregistrer mes informations"}
            theme={"primary"}
            onPress={ChangeInformationForm.handleSubmit(onSubmit, (errors) => {
              const firstError = Object.values(errors)[0]?.message;
              Toast.show({
                type: "error",
                text1: firstError ?? "Veuillez vérifier les champs.",
              });
            })}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginBottom: 10,
    paddingHorizontal: 20,
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.muted,
    borderWidth: 3,
    overflow: "hidden",
  },
  editIcon: {
    position: "absolute",
    top: -2,
    right: -4,
    color: Colors.primary,
    backgroundColor: Colors.muted,
    zIndex: 5,
    borderRadius: 4,
  },
  identityCard: {
    width: "90%",
    alignItems: "stretch",
    backgroundColor: Colors.card,
    boxShadow: "0px 2px 3px #00000028",
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 14,
    padding: 20,
  },
  input_label: {
    color: Colors.foreground,
    textAlign: "left",
  },
  input: {
    marginVertical: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: Colors.border,
    color: Colors.mutedForeground,
    height: 32,
    backgroundColor: Colors.input,
  },
  doubleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
    marginTop: 12,
  },
});
