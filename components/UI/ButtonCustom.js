import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function ButtonCustom({ name, size, color, onPress, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && Platform.OS === "ios" ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
        android_ripple={4}
      >
        <Ionicons name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "69%",
    marginLeft: "81%",
    borderRadius: 50,
    // overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  button: {
    backgroundColor: GlobalStyles.colors.gray700,
    padding: 10,
    borderRadius: 50,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
