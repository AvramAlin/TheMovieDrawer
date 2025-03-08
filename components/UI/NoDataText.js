import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function NoDataText({ message = "No data available" }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="folder-open-outline"
        size={64}
        color={GlobalStyles.colors.gray500}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: GlobalStyles.colors.background500,
  },
  text: {
    fontFamily: "dmsans-light",
    marginTop: 10,
    fontSize: 18,
    color: GlobalStyles.colors.gray500,
    textAlign: "center",
  },
});
