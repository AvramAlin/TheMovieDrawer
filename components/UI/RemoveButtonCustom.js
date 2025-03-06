import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function RemoveButtonCustom({ icon, size, text, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={onPress}
    >
      <View style={styles.buttonLayout}>
        <Ionicons
          name={icon}
          size={size}
          color={GlobalStyles.colors.background500}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonLayout: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.error500,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
  },
  buttonText: {
    fontFamily: "dmsans-bold",
    marginHorizontal: 3,
    padding: 7,
    fontSize: 15,
    color: GlobalStyles.colors.background500,
  },
  buttonIcon: {
    marginHorizontal: 3,
    padding: 7,
  },
});
