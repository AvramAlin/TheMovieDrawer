// components/RatingInputModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

const RatingInputModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const ratingNumber = parseInt(rating);

    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 10) {
      setError("Please enter a number between 1-10");
      return;
    }

    onSubmit(ratingNumber);
    setRating("");
    setError("");
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Rate this movie (1-10)</Text>

            <TextInput
              style={styles.input}
              value={rating}
              onChangeText={(text) => {
                setRating(text);
                setError("");
              }}
              placeholder="Enter rating"
              placeholderTextColor={GlobalStyles.colors.text500}
              keyboardType="numeric"
              maxLength={2}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonSubmit]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText, styles.submitText]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: GlobalStyles.colors.dark500,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    color: GlobalStyles.colors.background500,
    fontSize: 18,
    fontFamily: "dmsans-light",
    marginBottom: 15,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.background500,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: GlobalStyles.colors.background500,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    minWidth: "45%",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: GlobalStyles.colors.background500,
  },
  buttonSubmit: {
    backgroundColor: GlobalStyles.colors.accent500,
  },
  buttonText: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
  },
  submitText: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
  },
});

export default RatingInputModal;
