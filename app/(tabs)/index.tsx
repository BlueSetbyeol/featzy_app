import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.text}>Home page</Text>
    </View>

    // <GestureHandlerRootView style={styles.container}>
    //   <View style={styles.container}>
    //     <View style={styles.imageContainer}>
    //       <View ref={imageRef} collapsable={false}>
    //         <ImageViewer
    //           imgSource={PlaceholderImage}
    //           selectedImage={selectedImage}
    //         />
    //         {pickedEmoji && (
    //           <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
    //         )}
    //       </View>
    //     </View>
    //     {showAppOptions ? (
    //       <View style={styles.optionsContainer}>
    //         <View style={styles.optionsRow}>
    //           <IconButton icon="refresh" label="Reset" onPress={onReset} />
    //           <CircleButton onPress={onAddSticker} />
    //           <IconButton
    //             icon="save-alt"
    //             label="Save"
    //             onPress={onSaveImageAsync}
    //           />
    //         </View>
    //       </View>
    //     ) : (
    //       <View style={styles.footerContainer}>
    //         <Button
    //           theme="primary"
    //           label="Choose a photo"
    //           onPress={pickImageAsync}
    //         />
    //         <Button
    //           label="Use this photo"
    //           onPress={() => setShowAppOptions(true)}
    //         />
    //       </View>
    //     )}
    //     <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
    //       <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
    //     </EmojiPicker>
    //   </View>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
