import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function SectionPressable({ iconName, textInput, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.settingsContainer]
          : styles.settingsContainer
      }
    >
      <Ionicons
        name={iconName}
        size={28}
        color={GlobalStyles.colors.background500}
      />
      <Text style={styles.settingsText}>{textInput}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: GlobalStyles.colors.dark500,
  },
  settingsText: {
    fontSize: 18,
    fontFamily: "dmsans-light",
    marginHorizontal: 10,
    color: GlobalStyles.colors.background500,
  },
  pressed: {
    opacity: 0.5,
  },
});
