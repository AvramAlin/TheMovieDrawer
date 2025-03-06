import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function SearchIcon({ onPress, tintColor }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={Platform.OS === "ios" ? 22 : 25}
          color={tintColor}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    marginHorizontal: 12,
    marginTop: Platform.OS === "ios" ? "13%" : "36%",
  },
  pressed: {
    opacity: 0.4,
  },
});
