import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext, useEffect } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have this package installed
import { UserDetailsContext } from "../../store/userDetails-context";
import ProfilePictureSelector from "./ProfilePictureSelector";
import backgroundImage from "../../assets/images/background.webp";

export default function ProfileHeader() {
  const userDetailsContext = useContext(UserDetailsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(
    userDetailsContext.userDetails.username
  );
  const [blurRadius, setBlurRadius] = useState(2);

  useEffect(() => {
    // After a short delay, increase the blur radius
    const timer = setTimeout(() => {
      setBlurRadius(9);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveUsername = () => {
    userDetailsContext.updateUsername(newUsername);
    setIsEditing(false);
  };

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
        source={backgroundImage}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
        blurRadius={blurRadius}
      >
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: userDetailsContext.userDetails.profilePicture,
            }}
            style={styles.profileImage}
          />
          <ProfilePictureSelector />
          <View style={styles.usernameContainer}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.textInput}
                  value={newUsername}
                  onChangeText={setNewUsername}
                  autoFocus
                  maxLength={20}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleSaveUsername}
                  >
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color={GlobalStyles.colors.background700}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => {
                      setNewUsername(userDetailsContext.userDetails.username);
                      setIsEditing(false);
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={GlobalStyles.colors.background700}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.usernameDisplay}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.textUsername}>
                  {userDetailsContext.userDetails.username}
                </Text>
                <Ionicons
                  name="pencil"
                  size={18}
                  color={GlobalStyles.colors.background700}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
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
    minWidth: 200,
  },
  usernameDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    marginLeft: 8,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  textInput: {
    fontSize: 20,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background700,
    flex: 1,
    padding: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
