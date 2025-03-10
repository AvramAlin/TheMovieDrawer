import { StyleSheet, Text, View, Pressable } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function AddCustomListButton() {
  //   console.log("Merge");

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.button, styles.pressed] : styles.button
      }
    >
      <View style={styles.container}>
        <Entypo
          name="add-to-list"
          size={25}
          color={GlobalStyles.colors.background500}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});
