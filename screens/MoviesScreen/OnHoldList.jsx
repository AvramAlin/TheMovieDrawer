import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { getMovieDetails, getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";
import { MoviesContext } from "../../store/movies-context";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}
export default function OnHoldList() {
  const moviesContext = useContext(MoviesContext);

  return <MovieList movieData={moviesContext.onHoldMovies} />;
}

const styles = StyleSheet.create({});
