// screens/AuthScreen/SignInScreen.js
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIRESTORE_DATABASE } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  async function initializeUserData(userId) {
    const userDocRef = doc(FIRESTORE_DATABASE, "users", userId);
    await setDoc(userDocRef, {
      movies: {
        finished: [],
        planToWatch: [],
        onHold: [],
        dropped: [],
      },
      customLists: [],
    });
  }

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign In failed : " + error.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = response.user.uid;
      await initializeUserData(userId);
    } catch (error) {
      console.log(error);
      alert("Registration failed" + error.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={[
            GlobalStyles.colors.primary700,
            GlobalStyles.colors.primary500,
          ]}
          style={styles.background}
        />

        <View style={styles.logoContainer}>
          <Text style={styles.title}>TheMovieDrawer</Text>
          <Text style={styles.subtitle}>
            Track and organize your movie journey
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={22}
              color={GlobalStyles.colors.accent500}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={GlobalStyles.colors.accent300}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={GlobalStyles.colors.accent500}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={GlobalStyles.colors.accent300}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={GlobalStyles.colors.background500}
          />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signInButton} onPress={signIn}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={signUp}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 38,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.accent500,
    textAlign: "center",
    marginHorizontal: 30,
  },
  formContainer: {
    width: "80%",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.background500,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#333",
    fontFamily: "dmsans-regular",
  },
  buttonContainer: {
    width: "80%",
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.background500,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.background500,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "dmsans-bold",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "dmsans-bold",
  },
});

export default SignInScreen;
