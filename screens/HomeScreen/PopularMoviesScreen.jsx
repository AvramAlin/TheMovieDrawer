// HomeScreen.js
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import HomeMovies from "../../components/HomeMovies";

function PopularMoviesScreen() {
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

  function handleLoadMore() {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <HomeMovies
      moviesData={movies}
      onLoad={handleLoadMore}
      category="popular"
    />
  );
}

export default PopularMoviesScreen;

const styles = StyleSheet.create({});
