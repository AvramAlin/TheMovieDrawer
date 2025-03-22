import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Pressable
        onPress={() => FIREBASE_AUTH.signOut()}
        style={({ pressed }) => (pressed ? { opacity: 0.6 } : null)}
      >
        <View style={styles.signOutContainer}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  signOutContainer: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.error500,
    marginHorizontal: "35%",
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    shadowOpacity: 0.3,
  },
  signOutText: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    alignSelf: "center",
    textAlign: "center",
  },
});
