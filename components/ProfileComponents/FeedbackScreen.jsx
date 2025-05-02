import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function FeedbackScreen({ navigation }) {
  const [message, setMessage] = useState("");

  function handleSendFeedback() {
    if (!message.trim()) {
      Alert.alert("Feedback", "Please enter a message before sending.");
      return;
    }
    const subject = encodeURIComponent("App Feedback");
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:avramalinmedia@gmail.com?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "No mail client found on this device.");
        } else {
          return Linking.openURL(mailtoUrl);
        }
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Could not open the mail app. Please try again later."
        );
      });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: GlobalStyles.colors.dark500 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} // adjust if you have a header
      >
        <View style={styles.body}>
          <Text style={styles.title}>Send Feedback</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your feedback here..."
            placeholderTextColor={GlobalStyles.colors.light300}
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.button} onPress={handleSendFeedback}>
            <Text style={styles.buttonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  body: {
    padding: 16,
  },
  title: {
    fontFamily: "dmsans-bold",
    fontSize: 20,
    color: GlobalStyles.colors.background500,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.dark600,
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-regular",
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    minHeight: 150,
  },
  footer: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.dark500,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary600,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    fontSize: 16,
  },
});
