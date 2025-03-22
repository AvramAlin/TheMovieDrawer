import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons"; // Import the FontAwesome icon set

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieItem({ posterPath, title, rating, id }) {
  const formattedRating = rating ? rating.toFixed(1) : "N/A";
  const navigation = useNavigation();

  function handleNavigateMovieDetails() {
    navigation.navigate("MovieDetailsHome", {
      movieId: id,
    });
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.movieContainer, styles.pressed]
          : styles.movieContainer
      }
      onPress={handleNavigateMovieDetails}
    >
      <View style={styles.posterContainer}>
        <Image
          style={styles.posterImage}
          source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
        />
        {formattedRating !== "N/A" && (
          <View style={styles.ratingContainer}>
            <FontAwesome
              name="star"
              size={16}
              color={GlobalStyles.colors.accent500}
            />
            <Text style={styles.ratingText}>{formattedRating}</Text>
          </View>
        )}
      </View>
      <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    maxWidth: "48%",
    marginBottom: 3,
  },
  posterContainer: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  posterImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  movieTitle: {
    marginTop: 8,
    color: GlobalStyles.colors.gray700,
    fontSize: 16,
    fontFamily: "dmsans-light",
    fontWeight: "600",
    textAlign: "center",
  },
  ratingContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "#f3eacf",
    fontFamily: "dmsans-bold",
    fontSize: 15,
    marginLeft: 4,
  },
  pressed: {
    opacity: 0.8,
  },
});
