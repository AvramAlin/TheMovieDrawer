import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { MoviesContext } from "../../store/movies-context";

export default function MovieDetailsModal({
  visible,
  movie,
  onClose,
  onAddToWatchList,
}) {
  const moviesContext = useContext(MoviesContext);
  const [isExistent, setIsExistent] = useState(false);

  useEffect(() => {
    if (movie) {
      if (moviesContext.findMovieGlobal(movie.id) !== false) {
        setIsExistent(true);
      } else {
        setIsExistent(false);
      }
    }
  }, [movie, moviesContext]);

  if (!movie) return null;

  // Format runtime in hours and minutes
  const formatRuntime = (runtime) => {
    if (!runtime) return "Unknown runtime";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  // Handle genre mapping
  const genreNames =
    movie.genres && movie.genres.length > 0
      ? movie.genres.map((genre) => genre.name).join(" • ")
      : "No genres available";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              {movie.backdrop_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                  }}
                  style={styles.backdrop}
                />
              )}

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <AntDesign
                  name="close"
                  size={20}
                  color={GlobalStyles.colors.background500}
                />
              </TouchableOpacity>

              <View style={styles.contentContainer}>
                <View style={styles.posterAndInfo}>
                  {movie.poster_path ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                      }}
                      style={styles.poster}
                    />
                  ) : (
                    <View style={styles.noPoster}>
                      <Ionicons
                        name="image-outline"
                        size={40}
                        color={GlobalStyles.colors.gray600}
                      />
                    </View>
                  )}

                  <View style={styles.detailsContainer}>
                    <Text style={styles.title}>
                      {movie.title || "Untitled"}
                    </Text>
                    <Text style={styles.genre}>{genreNames}</Text>
                    <Text style={styles.duration}>
                      {movie.release_date
                        ? movie.release_date.substring(0, 4)
                        : "Year unknown"}{" "}
                      • {formatRuntime(movie.runtime)}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <AntDesign
                        name="star"
                        size={16}
                        color={GlobalStyles.colors.accent500}
                      />
                      <Text style={styles.rating}>
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                <ScrollView style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>Overview</Text>
                  <Text style={styles.description}>
                    {movie.overview || "No description available."}
                  </Text>
                </ScrollView>

                <View style={styles.buttonContainer}>
                  {isExistent ? (
                    <View style={styles.existentContainer}>
                      <Text style={styles.existentText}>
                        Already added to WatchList
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={onAddToWatchList}
                    >
                      <AntDesign
                        name="plus"
                        size={16}
                        color={GlobalStyles.colors.dark500}
                      />
                      <Text style={styles.addButtonText}>Add to Watchlist</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: GlobalStyles.colors.background500,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "85%",
    overflow: "hidden",
  },
  backdrop: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: GlobalStyles.colors.dark500,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  contentContainer: {
    padding: 16,
  },
  posterAndInfo: {
    flexDirection: "row",
    marginTop: 8,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  noPoster: {
    width: 110,
    height: 165,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.background400,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
    marginBottom: 8,
  },
  genre: {
    fontSize: 15,
    fontFamily: "dmsans-light",
    color: GlobalStyles.colors.gray500,
    marginBottom: 6,
  },
  duration: {
    fontSize: 14,
    fontFamily: "dmsans-light",
    color: GlobalStyles.colors.gray400,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: "dmsans-medium",
    color: GlobalStyles.colors.gray300,
  },
  divider: {
    height: 1,
    backgroundColor: GlobalStyles.colors.gray700,
    marginVertical: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
    maxHeight: 200,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "dmsans-light",
    color: GlobalStyles.colors.dark500,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: width < 380 ? 16 : 24,
  },
  addButton: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.accent500,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: GlobalStyles.colors.dark500,
    fontSize: 15,
    fontFamily: "dmsans-bold",
    marginLeft: 8,
  },
  existentContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.dark500,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  existentText: {
    color: GlobalStyles.colors.background500,
    fontSize: 15,
    fontFamily: "dmsans-bold",
    marginLeft: 8,
  },
});
