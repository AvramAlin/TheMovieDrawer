import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { GlobalStyles } from "../assets/colors/GlobalStyles";
import MovieItem from "./MovieItem";

function renderMovieItem({ item }) {
  return (
    <MovieItem
      posterPath={item.poster_path}
      title={item.title}
      rating={item.vote_average}
      id={item.id}
    />
  );
}

export default function SearchMovies({ moviesData, onLoad, isLoading }) {
  const renderFooter = () => {
    if (!isLoading) return null;
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found</Text>
      </View>
    );
  };

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
        onEndReachedThreshold={0.9}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    color: GlobalStyles.colors.gray700,
    fontSize: 16,
    fontFamily: "dmsans-light",
  },
});
