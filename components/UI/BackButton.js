import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Optional, for an icon-based back button
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color={GlobalStyles.colors.text500}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 15, // Adjust for safe area
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  backButtonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
});

export default BackButton;
