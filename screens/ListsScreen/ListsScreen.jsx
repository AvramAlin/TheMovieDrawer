import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

function ListsScreen() {
  return (
    <View style={styles.container}>
      <Text>ListsScreen bro</Text>
    </View>
  );
}

export default ListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
