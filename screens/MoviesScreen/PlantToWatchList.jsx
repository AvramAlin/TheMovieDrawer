import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../../store/movies-context";
import MovieList from "../../components/MoviesComponents/MovieList";
import NoDataText from "../../components/UI/NoDataText";

export default function PlanToWatchList() {
  const moviesContext = useContext(MoviesContext);
  const category = "Plan to Watch";

  if (moviesContext.planToWatchMovies.length == 0) return <NoDataText />;

  return (
    <MovieList
      movieData={moviesContext.planToWatchMovies}
      movieCategory={category}
    />
  );
}

const styles = StyleSheet.create({});
