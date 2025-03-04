import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/NoDataText";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}
export default function DroppedList() {
  const moviesContext = useContext(MoviesContext);

  if (moviesContext.droppedMovies.length == 0) return <NoDataText />;

  return <MovieList movieData={moviesContext.droppedMovies} />;
}

const styles = StyleSheet.create({});
