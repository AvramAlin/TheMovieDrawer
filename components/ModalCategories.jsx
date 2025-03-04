import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { GlobalStyles } from "../assets/colors/GlobalStyles";
import ButtonCustom from "./UI/ButtonCustom";
import { Ionicons } from "@expo/vector-icons";

const CATEGORY_OPTIONS = [
  { label: "Finished", icon: "checkmark-circle-outline", color: "#4CAF50" },
  { label: "Plan to Watch", icon: "calendar-outline", color: "#FFC107" },
  { label: "On Hold", icon: "pause-circle-outline", color: "#2196F3" },
  { label: "Dropped", icon: "close-circle-outline", color: "#F44336" },
];

export default function ModalCategories({
  modalVisible,
  setModalVisible,
  onAddCategory,
}) {
  const [animation] = useState(
    new Animated.Value(Dimensions.get("window").height)
  );

  useEffect(() => {
    if (modalVisible) openModal();
  }, [modalVisible]);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animation, {
      toValue: Dimensions.get("window").height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.bottomSheet,
            { transform: [{ translateY: animation }] },
          ]}
        >
          <Text style={styles.modalTitle}>Add Movie To</Text>
          {CATEGORY_OPTIONS.map((category) => (
            <Pressable
              key={category.label}
              onPress={() => {
                console.log(`Selected category: ${category.label}`);
                onAddCategory(category.label);
                closeModal();
              }}
              style={styles.optionButton}
            >
              <Ionicons
                name={category.icon}
                size={24}
                color={category.color}
                style={styles.icon}
              />
              <Text style={styles.optionText}>{category.label}</Text>
            </Pressable>
          ))}

          <ButtonCustom
            name="close"
            onPress={closeModal}
            size={24}
            color={GlobalStyles.colors.background500}
            style={styles.buttonContainer}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly darker overlay
  },
  bottomSheet: {
    height: "52%",
    backgroundColor: GlobalStyles.colors.background500,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray700,
    marginBottom: 7,
    alignSelf: "flex-start",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    width: "100%",
    backgroundColor: GlobalStyles.colors.gray500,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray700,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    shadowOpacity: 0.15,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: GlobalStyles.colors.background300,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: "101%",
    marginBottom: 10,
    width: "100%",
  },
});
