import { FlatList, StyleSheet, View } from "react-native";
import MovieCustomListItem from "./MovieCustomListItem";
import { useContext, useState, useEffect } from "react";
import { CustomListsContext } from "../../store/customLists-context";
import DeleteMovieListAlert from "../UI/DeleteMovieListAlert";
import MovieModal from "./MovieModal";
import { getMovieDetails } from "../../api/tmdb";
import { MoviesContext } from "../../store/movies-context";

export default function MovieCustomList({ listId }) {
  const customListsContext = useContext(CustomListsContext);
  const moviesContext = useContext(MoviesContext);
  const [movies, setMovies] = useState(
    customListsContext.customLists.find((list) => list.id === listId).movies
  );
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    setMovies(customListsContext.getList(listId)?.movies || []);
  }, [customListsContext.customLists]);

  async function handlePressMovie(movieId) {
    const result = await getMovieDetails(movieId);
    setMovieDetails(result);
    setModalDetailsVisible(true);
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

  function handleAddMovieToWatchList() {
    moviesContext.addMovieToCategory(movieDetails, "Plan to Watch");
    //console.log("added");
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCustomListItem
            movie={item}
            onPress={handlePressMovie}
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
      <MovieModal
        visible={modalDetailsVisible}
        onClose={() => setModalDetailsVisible(false)}
        movie={movieDetails}
        onAddToWatchList={handleAddMovieToWatchList}
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
