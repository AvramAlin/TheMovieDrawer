import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

const IMAGE_URL = "https://image.tmdb.org/t/p/w185";

export default function MovieCustomListItem({ movie, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={() => onPress(movie)}
    >
      <Image
        source={{ uri: `${IMAGE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.release_date?.split("-")[0]}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={GlobalStyles.colors.dark200}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    backgroundColor: GlobalStyles.colors.background500,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 2,
  },
  poster: {
    width: 55,
    height: 80,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.dark500,
  },
  year: {
    fontSize: 14,
    color: GlobalStyles.colors.text300,
  },
  pressed: {
    opacity: 0.75,
  },
});
