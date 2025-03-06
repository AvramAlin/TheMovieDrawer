import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/NoDataText";

export default function DroppedList() {
  const moviesContext = useContext(MoviesContext);
  const category = "Dropped";

  if (moviesContext.droppedMovies.length == 0) return <NoDataText />;

  return (
    <MovieList
      movieData={moviesContext.droppedMovies}
      movieCategory={category}
    />
  );
}

const styles = StyleSheet.create({});
