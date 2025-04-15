import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useMemo } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MoviesContext } from "../../store/movies-context";

const GenresStat = () => {
  const { finishedMovies } = useContext(MoviesContext);

  // Calculate top genres from finished movies
  const topGenres = useMemo(() => {
    // Create a map to count genre occurrences
    const genreCount = {};

    // Count each genre from each movie
    finishedMovies.forEach((movie) => {
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genre) => {
          if (genre.name) {
            genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
          }
        });
      }
    });

    // Convert to array and sort by count (descending)
    const sortedGenres = Object.entries(genreCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Return top 5 genres
    return sortedGenres.slice(0, 5);
  }, [finishedMovies]);

  // Get appropriate icon for a genre
  const getGenreIcon = (genreName) => {
    const icons = {
      Action: "sword",
      Adventure: "compass",
      Animation: "animation",
      Comedy: "emoticon-happy-outline",
      Crime: "handcuffs",
      Documentary: "camera-document",
      Drama: "drama-masks",
      Family: "human-male-female-child",
      Fantasy: "castle",
      History: "book-open-page-variant",
      Horror: "ghost",
      Music: "music",
      Mystery: "magnify",
      Romance: "heart",
      "Science Fiction": "rocket",
      "TV Movie": "television-classic",
      Thriller: "knife",
      War: "shield",
      Western: "cowboy",
    };

    return icons[genreName] || "movie-open";
  };

  // Get a color based on the genre's position
  const getGenreColor = (index) => {
    const colors = [
      GlobalStyles.colors.background500, // Primary color for #1
      "#E5A823", // Gold for #2
      "#A3A3A3", // Silver for #3
      "#CD7F32", // Bronze for #4
      GlobalStyles.colors.background300, // Lighter color for #5
    ];

    return colors[index] || GlobalStyles.colors.background300;
  };

  // Render empty state
  if (topGenres.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            name="movie-filter"
            size={24}
            color={GlobalStyles.colors.background500}
          />
          <Text style={styles.headerText}>Top Genres Watched</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Finish watching some movies to see your top genres!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="movie-filter"
          size={24}
          color={GlobalStyles.colors.background500}
        />
        <Text style={styles.headerText}>Top Genres Watched</Text>
      </View>

      <FlatList
        data={topGenres}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.genreItem}>
            <View
              style={[
                styles.rankContainer,
                { backgroundColor: getGenreColor(index) },
              ]}
            >
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>

            <View style={styles.genreIconContainer}>
              <MaterialCommunityIcons
                name={getGenreIcon(item.name)}
                size={24}
                color={getGenreColor(index)}
              />
            </View>

            <View style={styles.genreInfoContainer}>
              <Text style={styles.genreName}>{item.name}</Text>
              <Text style={styles.genreCount}>
                {item.count} {item.count === 1 ? "movie" : "movies"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.dark400,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 18,
    marginLeft: 8,
  },
  genreItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: GlobalStyles.colors.dark300,
    borderRadius: 12,
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginLeft: 4,
  },
  rankText: {
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-bold",
    fontSize: 16,
  },
  genreIconContainer: {
    marginRight: 12,
  },
  genreInfoContainer: {
    flex: 1,
  },
  genreName: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 16,
  },
  genreCount: {
    color: GlobalStyles.colors.background300,
    fontFamily: "dmsans-medium",
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    color: GlobalStyles.colors.background300,
    fontFamily: "dmsans-medium",
    fontSize: 14,
    textAlign: "center",
  },
});

export default GenresStat;
