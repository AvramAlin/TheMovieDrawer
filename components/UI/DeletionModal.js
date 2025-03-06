// ConfirmDeleteModal.js
import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function DeletionModal({
  visible,
  movieTitle,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Ionicons
            name="warning-outline"
            size={50}
            color={GlobalStyles.colors.error500}
          />
          <Text style={styles.title}>Remove Movie</Text>
          <Text style={styles.message}>
            Are you sure you want to remove "{movieTitle}" from the list?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "dmsans-bold",
    marginVertical: 10,
    color: GlobalStyles.colors.error500,
  },
  message: {
    fontFamily: "dmsans-light",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: GlobalStyles.colors.gray700,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 25,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: GlobalStyles.colors.gray500,
  },
  confirmButton: {
    backgroundColor: GlobalStyles.colors.error500,
  },
  buttonText: {
    fontFamily: "dmsans-bold",
    color: "white",
    fontSize: 16,
  },
});
