import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import HomeMovies from "../../components/HomeMovies";
import { getNowPlayingMovies } from "../../api/tmdb";

export default function NowPlayingMoviesScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNowPlayingMovies(page);
  }, [page]);

  async function fetchNowPlayingMovies(page) {
    setIsLoading(true);
    try {
      const data = await getNowPlayingMovies(page);
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
      category="now_playing"
    />
  );
}

const styles = StyleSheet.create({});
