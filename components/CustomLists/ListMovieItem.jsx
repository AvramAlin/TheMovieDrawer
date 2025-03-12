import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo

export default function ListMovieItem({
  posterPath,
  title,
  rating,
  id,
  releaseYear,
  onPress,
}) {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w185${posterPath}`
    : "https://via.placeholder.com/92x138?text=No+Image";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(id)}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <AntDesign
              name="star"
              size={16}
              color={GlobalStyles.colors.accent500}
            />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.year}>{releaseYear}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.background500,
    borderRadius: 12,
    // overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
  },
  poster: {
    width: 77,
    height: 123,
    backgroundColor: GlobalStyles.colors.background300,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: "dmsans-medium",
    color: GlobalStyles.colors.gray100,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontFamily: "dmsans-regular",
    color: GlobalStyles.colors.gray200,
    marginLeft: 4,
  },
  year: {
    fontSize: 14,
    fontFamily: "dmsans-regular",
    color: GlobalStyles.colors.gray400,
  },
});
