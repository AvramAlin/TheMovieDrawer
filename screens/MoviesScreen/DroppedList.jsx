import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../api/tmdb";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { MoviesContext } from "../../store/movies-context";
import MovieList from "../../components/MoviesComponents/MovieList";
import NoDataText from "../../components/UI/NoDataText";

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
