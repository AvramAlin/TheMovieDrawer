import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import MovieListItem from "./MovieListItem";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
function renderMoviesFunction({ item }, movieCategory) {
  return <MovieListItem movie={item} movieCategory={movieCategory} />;
}

export default function MovieList({ movieData, movieCategory }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movieData}
        renderItem={(itemData) => renderMoviesFunction(itemData, movieCategory)}
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
