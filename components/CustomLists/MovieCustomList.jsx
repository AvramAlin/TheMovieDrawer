import { FlatList, StyleSheet, View } from "react-native";
import MovieCustomListItem from "./MovieCustomListItem";
import { useContext, useState, useEffect } from "react";
import { CustomListsContext } from "../../store/customLists-context";
import DeleteMovieListAlert from "../UI/DeleteMovieListAlert";
export default function MovieCustomList({ listId }) {
  const customListsContext = useContext(CustomListsContext);
  const [movies, setMovies] = useState(
    customListsContext.customLists.find((list) => list.id === listId).movies
  );
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    setMovies(customListsContext.getList(listId)?.movies || []);
  }, [customListsContext.customLists]);

  function handleMoviePress(movie) {
    console.log("Movie pressed:", movie.title);
  }
  function handleLongPress(movieId) {
    setModalIsVisible(true);
    setMovieId(movieId);
  }

  function handleDeleteMovie() {
    customListsContext.removeMovieFromCustomList(listId, movieId);
    setMovieId(null);
    setModalIsVisible(false);
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCustomListItem
            movie={item}
            onPress={handleMoviePress}
            onLongPress={handleLongPress}
          />
        )}
      />
      <DeleteMovieListAlert
        visible={modalIsVisible}
        onCancel={() => setModalIsVisible(false)}
        onConfirm={handleDeleteMovie}
        movieTitle={
          customListsContext.customLists
            .find((list) => list.id === listId)
            .movies.find((movie) => movie.id === movieId)?.title
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
