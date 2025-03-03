import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import MovieListItem from "../../components/MovieListItem";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}

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

  return (
    <View style={styles.container}>
      <FlatList
        data={finishedMovies}
        renderItem={renderMoviesFunction}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
  },
});
