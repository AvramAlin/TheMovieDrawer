import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { AntDesign } from "@expo/vector-icons"; // Assuming you're using Expo
import { CustomListsContext } from "../../store/customLists-context";

export default function ListMovieItem({
  movieItem,
  releaseYear,
  onPress,
  listData,
}) {
  const customListsContext = useContext(CustomListsContext);
  const [added, setIsAdded] = useState(
    listData?.movies?.some((movie) => movie.id === movieItem.id) || false
  );
  const imageUrl = movieItem.poster_path
    ? `https://image.tmdb.org/t/p/w185${movieItem.poster_path}`
    : "https://via.placeholder.com/92x138?text=No+Image";

  function handleAddToList() {
    if (!added) {
      customListsContext.addMovieToCustomList(listData.id, movieItem);
      setIsAdded(true);
    } else {
      customListsContext.removeMovieFromCustomList(listData.id, movieItem.id);
      setIsAdded(false);
    }
  }

  return (
    <Pressable style={styles.container} onPress={() => onPress && onPress(id)}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movieItem.title}
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <AntDesign
              name="star"
              size={16}
              color={GlobalStyles.colors.accent500}
            />
            <Text style={styles.rating}>
              {movieItem.vote_average.toFixed(1)}
            </Text>
          </View>
          <Text style={styles.year}>{releaseYear}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.addButton, added ? styles.addedButton : {}]}
        onPress={handleAddToList}
      >
        {added ? (
          <AntDesign name="check" size={16} color="#fff" />
        ) : (
          <AntDesign
            name="plus"
            size={16}
            color={GlobalStyles.colors.dark500}
          />
        )}
      </TouchableOpacity>
    </Pressable>
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
    shadowOffset: { width: 1, height: 1 },
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
    width: "80%",
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
  addButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    backgroundColor: GlobalStyles.colors.accent500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 1,
  },
  addedButton: {
    backgroundColor: GlobalStyles.colors.dark500, // Use a success color like green
  },
});
