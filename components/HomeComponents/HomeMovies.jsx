import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieItem from "../MoviesComponents/MovieItem";
function renderMovieItem({ item }) {
  if (item.poster_path)
    return (
      <MovieItem
        posterPath={item.poster_path}
        title={item.title}
        rating={item.vote_average}
        id={item.id}
      />
    );
}

export default function HomeMovies({ moviesData, onLoad, category }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={moviesData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={onLoad}
        onEndReachedThreshold={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
});
