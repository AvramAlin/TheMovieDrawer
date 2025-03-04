import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/NoDataText";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}
export default function FinishedList() {
  const moviesContext = useContext(MoviesContext);

  if (moviesContext.finishedMovies.length == 0) return <NoDataText />;

  return <MovieList movieData={moviesContext.finishedMovies} />;
}

const styles = StyleSheet.create({});
