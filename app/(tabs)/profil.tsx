import { StyleSheet, Text, View } from "react-native";

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil screen</Text>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
