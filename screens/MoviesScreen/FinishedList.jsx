import { FlatList, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MoviesComponents/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/UI/NoDataText";
export default function FinishedList() {
  const moviesContext = useContext(MoviesContext);
  const category = "Finished";

  if (moviesContext.finishedMovies.length == 0) return <NoDataText />;

  return (
    <MovieList
      movieData={moviesContext.finishedMovies}
      movieCategory={category}
    />
  );
}

const styles = StyleSheet.create({});
