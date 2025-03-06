import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function CustomAlert({ visible, onClose, category }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Movie Already Added</Text>
          <Text style={styles.message}>
            This movie is already in your '{category}' list.
          </Text>
          <Button
            title="OK"
            onPress={onClose}
            color={GlobalStyles.colors.primary500}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(36, 36, 36, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "dmsans-bold",
    marginBottom: 10,
  },
  message: {
    fontFamily: "dmsans-light",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
