import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.2; // Adjust this value to control movie poster width

const FavoriteMoviesProfile = ({ favoriteMovies, onFavoriteScreenClick }) => {
  const renderMovieItem = ({ item }) => {
    const isEmpty = !item.poster_path;

    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        activeOpacity={isEmpty ? 1 : 0.7}
      >
        {isEmpty ? (
          <View style={styles.emptyPoster} />
        ) : (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.posterImage}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Pressable
      style={({ pressed }) => (pressed ? { opacity: 0.65 } : null)}
      onPress={onFavoriteScreenClick}
    >
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Favorite movies</Text>
        {favoriteMovies && favoriteMovies.length > 0 ? (
          <FlatList
            data={favoriteMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => (item.id || Math.random()).toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.noFavMoviesContainer}>
            <Ionicons
              name="folder-open-outline"
              size={20}
              color={GlobalStyles.colors.background500}
            />
            <Text style={styles.noFavMoviesText}>No favorite movies.</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.background500,
    backgroundColor: GlobalStyles.colors.dark500,
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: "dmsans-bold",
    marginBottom: 10,
    paddingHorizontal: 15,
    color: GlobalStyles.colors.background500,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  movieItemContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  posterImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5, // Standard movie poster ratio
    borderRadius: 8,
  },
  noFavMoviesContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  noFavMoviesText: {
    color: GlobalStyles.colors.background500,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default FavoriteMoviesProfile;
