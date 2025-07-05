import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SimpleStat({ iconName, textInput, result }) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <View style={styles.statIconContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={28}
            color={GlobalStyles.colors.accent500}
          />
        </View>
        <Text style={styles.statLabel}>{textInput}</Text>
        <Text style={styles.statValue}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: GlobalStyles.colors.dark400,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderBottomColor: GlobalStyles.colors.background500,
    borderBottomWidth: 1,
  },
  statIconContainer: {
    backgroundColor: GlobalStyles.colors.dark300,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 17,
    marginBottom: 8,
  },
  statValue: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 24,
  },
});
