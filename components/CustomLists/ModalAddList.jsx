import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

function ModalAddList({ visible, onClose, onAddList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddList = () => {
    if (title.trim() === "") {
      return; // Don't add empty title lists
    }

    onAddList(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            style={styles.keyboardView}
          >
            <View style={styles.modalView}>
              <View style={styles.headerContainer}>
                <Text style={styles.modalTitle}>Create New List</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter list title"
                  placeholderTextColor={GlobalStyles.colors.accent300}
                  value={title}
                  onChangeText={setTitle}
                />

                <Text style={styles.inputLabel}>Description (optional)</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  placeholder="Enter list description"
                  placeholderTextColor={GlobalStyles.colors.accent300}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  title.trim() === "" && styles.buttonDisabled,
                ]}
                onPress={handleAddList}
                disabled={title.trim() === ""}
              >
                <Text style={styles.buttonText}>Create List</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  keyboardView: {
    width: "100%",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: GlobalStyles.colors.dark500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: "dmsans-light",
    fontSize: 20,
    color: GlobalStyles.colors.background700,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: GlobalStyles.colors.accent500,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: "dmsans-light",
    fontSize: 16,
    color: GlobalStyles.colors.background700,
    marginBottom: 5,
  },
  input: {
    backgroundColor: GlobalStyles.colors.background700,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontFamily: "dmsans-light",
    color: GlobalStyles.colors.dark500,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.accent200,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: GlobalStyles.colors.accent500,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: Platform.OS === "ios" ? 20 : 10,
    borderColor: "black",
  },
  buttonDisabled: {
    backgroundColor: GlobalStyles.colors.accent300,
  },
  buttonText: {
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-bold",
    fontSize: 16,
  },
});

export default ModalAddList;
