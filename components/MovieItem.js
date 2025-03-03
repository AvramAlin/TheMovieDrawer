import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyles } from "../assets/colors/GlobalStyles";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieItem({ posterPath, title, rating }) {
  const formattedRating = rating ? rating.toFixed(1) : "N/A";

  return (
    <TouchableOpacity style={styles.movieContainer} activeOpacity={0.6}>
      <View style={styles.posterContainer}>
        <Image
          style={styles.posterImage}
          source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
        />
        {rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{formattedRating}</Text>
          </View>
        )}
      </View>
      <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
    </TouchableOpacity>
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
    // overflow: "hidden",
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: "#f3eacf",
    fontFamily: "dmsans-bold",
    fontSize: 15,
  },
});
