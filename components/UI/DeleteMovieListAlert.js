import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function DeleteMovieListAlert({
  visible,
  movieTitle,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="alert-circle"
              size={48}
              color={GlobalStyles.colors.error500}
            />
          </View>
          <Text style={styles.title}>Delete Movie</Text>
          <Text style={styles.message}>
            Are you sure you want to delete "{movieTitle}" from your list?
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Delete</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 320,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: "dmsans-bold",
    marginVertical: 8,
    color: GlobalStyles.colors.error500,
  },
  message: {
    fontFamily: "dmsans-regular",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    color: GlobalStyles.colors.gray700,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray500,
  },
  confirmButton: {
    backgroundColor: GlobalStyles.colors.error500,
  },
  cancelButtonText: {
    fontFamily: "dmsans-medium",
    color: GlobalStyles.colors.gray700,
    fontSize: 16,
  },
  confirmButtonText: {
    fontFamily: "dmsans-bold",
    color: "white",
    fontSize: 16,
  },
});
