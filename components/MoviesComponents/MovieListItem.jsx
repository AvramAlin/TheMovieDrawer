import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { getFormattedDate } from "../../utils/date";
import { FavoriteMoviesContext } from "../../store/favorite-context";
import { MoviesContext } from "../../store/movies-context";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieListItem({ movie, movieCategory }) {
  const navigation = useNavigation();
  const favoriteMovies = useContext(FavoriteMoviesContext);
  const moviesContext = useContext(MoviesContext);
  const movieItem = moviesContext.finishedMovies.find(
    (theMovie) => theMovie.id === movie.id
  );
  const [iconName, setIconName] = useState(
    favoriteMovies.isMovieFavorite(movie.id) ? "favorite" : "favorite-border"
  );
  const addedAt =
    movie.addedAt === undefined
      ? "No record"
      : getFormattedDate(new Date(movie.addedAt));

  useEffect(() => {
    setIconName(
      favoriteMovies.isMovieFavorite(movie.id) ? "favorite" : "favorite-border"
    );
  }, [favoriteMovies]);

  function handleNavigate() {
    navigation.navigate("MovieDetailsMovies", {
      movieId: movie.id,
      movieCategory: movieCategory,
    });
  }

  function handleFavoritePress() {
    if (iconName === "favorite-border") {
      setIconName("favorite");
      favoriteMovies.addFavoriteMovie(movie);
    } else {
      setIconName("favorite-border");
      favoriteMovies.removeFavoriteMovie(movie.id);
    }
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
            {movieCategory === "Finished" ? (
              <View style={styles.rowContainer}>
                <View style={styles.rowContainerGrade}>
                  <MaterialIcons
                    name="grade"
                    size={18}
                    color={GlobalStyles.colors.accent500}
                  />
                  <Text style={styles.textGrade}>
                    {movieItem.userRating ? movieItem.userRating : "NA"}
                  </Text>
                </View>
                <Text style={styles.dateText}>Added {addedAt}</Text>
              </View>
            ) : (
              <Text style={styles.dateText}>Added {addedAt}</Text>
            )}
          </View>
          <Pressable onPress={handleFavoritePress}>
            <MaterialIcons
              name={iconName}
              size={25}
              color="black"
              style={styles.icon}
            />
          </Pressable>
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
    zIndex: 10,
    paddingTop: 3,
    paddingHorizontal: 2,
    right: 7,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainerGrade: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.dark500,
    padding: 5,
    borderRadius: 20,
  },
  textGrade: {
    fontFamily: "dmsans-light",
    paddingHorizontal: 5,
    color: GlobalStyles.colors.background500,
  },
});
