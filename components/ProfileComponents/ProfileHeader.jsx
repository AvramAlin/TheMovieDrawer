import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";

export default function ProfileHeader({ username, profileImage }) {
  const user = FIREBASE_AUTH.currentUser;
  return (
    <LinearGradient
      colors={[
        GlobalStyles.colors.background300,
        GlobalStyles.colors.background500,
      ]}
      style={{ flex: 1 }}
    >
      <ImageBackground
        style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary400 }}
        source={require("../../assets/images/background4.jpg")}
        resizeMode="center"
        imageStyle={{ opacity: 0.5 }}
        blurRadius={9}
      >
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/profile.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.usernameContainer}>
            <Text style={styles.textUsername}>{username || user.email}</Text>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.background500,
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 75,
    marginBottom: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.dark500,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 10,
  },
  textUsername: {
    fontSize: 22,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background700,
  },
  usernameContainer: {
    backgroundColor: GlobalStyles.colors.dark500,
    padding: 13,
    marginBottom: 2,
    borderRadius: 20,
  },
});
