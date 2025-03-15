import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import {} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { getFormattedDate } from "../../utils/date";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieListItem({ movie, movieCategory }) {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("MovieDetailsMovies", {
      movieId: movie.id,
      movieCategory: movieCategory,
    });
  }
  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : null)}
      onPress={handleNavigate}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{movie.title}</Text>
            </View>
            <Text style={styles.dateText}>
              Added {getFormattedDate(new Date())}
            </Text>
          </View>
          <AntDesign name="right" size={18} color="black" style={styles.icon} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    margin: 2.5,
    width: "100%",
    height: "80%",
    elevation: 4,
    backgroundColor: GlobalStyles.colors.background300,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 125,
    width: 75,
  },
  titleContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "dmsans-bold",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 12,
    color: GlobalStyles.colors.gray500 || "#666",
    alignSelf: "flex-end",
    marginBottom: 3,
    fontStyle: "italic",
  },
  pressed: {
    opacity: 0.6,
    backgroundColor: GlobalStyles.colors.background500,
  },
  icon: {
    paddingTop: 3,
    paddingHorizontal: 2,
  },
});
