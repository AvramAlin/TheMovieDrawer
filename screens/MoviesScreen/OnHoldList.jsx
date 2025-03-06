import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/NoDataText";

export default function OnHoldList() {
  const moviesContext = useContext(MoviesContext);
  const category = "On Hold";

  if (moviesContext.onHoldMovies.length == 0) return <NoDataText />;

  return (
    <MovieList
      movieData={moviesContext.onHoldMovies}
      movieCategory={category}
    />
  );
}

const styles = StyleSheet.create({});
