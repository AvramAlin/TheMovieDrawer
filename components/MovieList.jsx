import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import MovieListItem from "./MovieListItem";
import { GlobalStyles } from "../assets/colors/GlobalStyles";

function renderMoviesFunction({ item }) {
  return <MovieListItem movie={item} />;
}

export default function MovieList({ movieData }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movieData}
        renderItem={renderMoviesFunction}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
