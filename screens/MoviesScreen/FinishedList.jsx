import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MovieList";

export default function FinishedList() {
  const [finishedMovies, setFinishedMovies] = useState([]);
  useEffect(() => {
    async function fetchFinishedMovies() {
      try {
        const data = await getPopularMovies(1);
        setFinishedMovies((prevMovies) => [...prevMovies, ...data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFinishedMovies();
  }, [setFinishedMovies]);

  return <MovieList movieData={finishedMovies} />;
}

const styles = StyleSheet.create({});
