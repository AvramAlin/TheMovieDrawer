import { FlatList, StyleSheet, View } from "react-native";
import MovieCustomListItem from "./MovieCustomListItem";
export default function MovieCustomList({ movies }) {
  function handleMoviePress(movie) {
    console.log("Movie pressed:", movie.title);
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCustomListItem movie={item} onPress={handleMoviePress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
