// components/MoviesComponents/GPTChat.js
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { askGPT } from "../../api/gpt_api_calls";

const { width, height } = Dimensions.get("window");

export default function GPTChat({ visible, onClose, movieList }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Append user message
    const newHistory = [...messages, { role: "user", content: messageText }];
    setMessages(newHistory);
    setUserInput("");
    setLoading(true);

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Fetch assistant reply
    let reply;
    try {
      reply = await askGPT(movieList, newHistory);
    } catch (err) {
      console.error(err);
      reply = "Something went wrong. Please try again.";
    }

    // Append assistant message
    setMessages([...newHistory, { role: "assistant", content: reply }]);
    setLoading(false);

    // Auto-scroll to bottom after reply
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // User taps send icon
  const handleSend = () => sendMessage(userInput);

  // "Personalized" trigger via button
  const handleSuggestClick = () =>
    sendMessage(
      "🎥 Please give me personalized recommendations from my library."
    );

  const renderTypingIndicator = () => (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Animated.View
            style={[
              styles.chatContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Enhanced Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.headerIcon}>
                  <Ionicons name="film" size={20} color="white" />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Movie Assistant</Text>
                  <Text style={styles.headerSubtitle}>
                    Your movie companion
                  </Text>
                </View>
              </View>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>

            {/* Chat Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.length === 0 && (
                <View style={styles.welcomeContainer}>
                  <Ionicons
                    name="sparkles"
                    size={32}
                    color={GlobalStyles.colors.primary500}
                  />
                  <Text style={styles.welcomeText}>
                    Welcome to Movie Assistant! I'm here to help you discover
                    amazing movies based on your personal collection.
                  </Text>
                  <Text style={styles.welcomeSubtext}>
                    Ask me anything about movies or get personalized
                    recommendations!
                  </Text>
                </View>
              )}

              {messages.map((msg, i) => (
                <View
                  key={i}
                  style={[
                    styles.messageContainer,
                    msg.role === "user"
                      ? styles.userContainer
                      : styles.assistantContainer,
                  ]}
                >
                  {msg.role === "assistant" && (
                    <View style={styles.avatarContainer}>
                      <Ionicons name="film" size={16} color="white" />
                    </View>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      msg.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble,
                    ]}
                  >
                    <Text
                      style={
                        msg.role === "user"
                          ? styles.userText
                          : styles.assistantText
                      }
                    >
                      {msg.content}
                    </Text>
                  </View>
                </View>
              ))}

              {loading && renderTypingIndicator()}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputArea}>
              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <Pressable
                  style={styles.quickActionButton}
                  onPress={handleSuggestClick}
                >
                  <Ionicons
                    name="star"
                    size={16}
                    color={GlobalStyles.colors.background500}
                  />
                  <Text style={styles.quickActionText}>
                    Get Recommendations
                  </Text>
                </Pressable>
              </View>

              {/* Input Container */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ask about movies..."
                  placeholderTextColor={GlobalStyles.colors.gray500}
                  value={userInput}
                  onChangeText={setUserInput}
                  onSubmitEditing={handleSend}
                  multiline={true}
                  maxLength={500}
                />
                <Pressable
                  onPress={handleSend}
                  style={[
                    styles.sendButton,
                    { opacity: userInput.trim() ? 1 : 0.5 },
                  ]}
                  disabled={!userInput.trim()}
                >
                  <Ionicons name="send" size={18} color="white" />
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chatContainer: {
    width: "100%",
    height: "92%",
    backgroundColor: GlobalStyles.colors.background500,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.dark500,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.dark500,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "dmsans-bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-regular",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-regular",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 24,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: GlobalStyles.colors.gray500,
    fontFamily: "dmsans-light",
    textAlign: "center",
    marginTop: 8,
  },
  messageContainer: {
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  assistantContainer: {
    justifyContent: "flex-start",
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GlobalStyles.colors.dark500,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 2,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    backgroundColor: GlobalStyles.colors.dark500,
    borderBottomLeftRadius: 6,
  },
  userText: {
    color: "white",
    fontFamily: "dmsans-regular",
    fontSize: 15,
    lineHeight: 20,
  },
  assistantText: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-light",
    fontSize: 15,
    lineHeight: 22,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  typingBubble: {
    backgroundColor: GlobalStyles.colors.dark500,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 36,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalStyles.colors.gray500,
    marginHorizontal: 2,
  },
  inputArea: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  quickActions: {
    marginBottom: 12,
  },
  quickActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.dark500,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  quickActionText: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-medium",
    fontSize: 14,
    marginLeft: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    color: "black",
    fontFamily: "dmsans-regular",
    fontSize: 16,
    paddingVertical: 12,
    maxHeight: 120,
    lineHeight: 20,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginBottom: 2,
  },
});
