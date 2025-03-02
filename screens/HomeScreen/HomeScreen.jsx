import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
