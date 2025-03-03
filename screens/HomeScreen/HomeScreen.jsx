// HomeScreen.js
import { Text, StyleSheet, View, FlatList, StatusBar } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import MovieItem from "../../components/MovieItem";

function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]);

  async function fetchPopularMovies(page) {
    setIsLoading(true);
    try {
      const data = await getPopularMovies(page);
      setMovies((prevMovies) => [...prevMovies, ...data]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderMovieItem({ item }) {
    if (item.poster_path)
      return (
        <MovieItem
          posterPath={item.poster_path}
          title={item.title}
          rating={item.vote_average}
        />
      );
  }

  function handleLoadMore() {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Movies</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  header: {
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "dmsans-bold",
    color: GlobalStyles.colors.text500,
    textAlign: "left",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
});
