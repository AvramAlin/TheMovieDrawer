import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import ListMovieItem from "./ListMovieItem";

export default function ListSearchMovies({
  moviesData,
  onLoad,
  isLoading,
  listData,
}) {
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

  function renderMovieItem({ item }) {
    return (
      <ListMovieItem
        movieItem={item}
        releaseYear={
          item.release_date ? item.release_date.substring(0, 4) : "N/A"
        }
        listData={listData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moviesData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={1} // Changed from 2 to 1 for single column (rows)
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
  listContent: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 16,
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
