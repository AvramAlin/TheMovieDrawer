import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}
export default function PlanToWatchList() {
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  useEffect(() => {
    async function fetchFinishedMovies() {
      try {
        const data = await getPopularMovies(1);
        setPlanToWatchMovies((prevMovies) => [...prevMovies, ...data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFinishedMovies();
  }, [setPlanToWatchMovies]);

  return <MovieList movieData={planToWatchMovies} />;
}

const styles = StyleSheet.create({});
