import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { getUpcomingMovies } from "../../api/tmdb";
import HomeMovies from "../../components/HomeComponents/HomeMovies";

export default function UpcomingMoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNowPlayingMovies(page);
  }, [page]);

  async function fetchNowPlayingMovies(page) {
    setIsLoading(true);
    try {
      const data = await getUpcomingMovies(page);
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
      category="upcoming"
    />
  );
}

const styles = StyleSheet.create({});
