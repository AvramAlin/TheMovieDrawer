import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
