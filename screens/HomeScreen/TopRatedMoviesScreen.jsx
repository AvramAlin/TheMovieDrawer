// HomeScreen.js
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/tmdb";
import HomeMovies from "../../components/HomeComponents/HomeMovies";

function TopRatedMoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTopRatedMovies(page);
  }, [page]);

  async function fetchTopRatedMovies(page) {
    setIsLoading(true);
    try {
      const data = await getTopRatedMovies(page);
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
      category="top_rated"
    />
  );
}

export default TopRatedMoviesScreen;

const styles = StyleSheet.create({});
