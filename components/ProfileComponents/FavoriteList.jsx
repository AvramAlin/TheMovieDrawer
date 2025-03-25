import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieCustomListItem from "../CustomLists/MovieCustomListItem";
import DeleteFavoriteAlert from "./DeleteFavoriteAlert";
import { FavoriteMoviesContext } from "../../store/favorite-context";
import FavMovieModal from "./FavMovieModal";
import { getMovieDetails } from "../../api/tmdb";

export default function FavoriteList({ movies }) {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const favoriteMovies = useContext(FavoriteMoviesContext);
  const [movieId, setMovieId] = useState(null);
  const [modalDetailsVisible, setModalDetailsVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  async function handlePressMovie(movieId) {
    const result = await getMovieDetails(movieId);
    setMovieDetails(result);
    setModalDetailsVisible(true);
  }

  function handleLongPressMovie(movieId) {
    setModalDeleteVisible(true);
    setMovieId(movieId);
  }

  function deleteFavoriteMovie() {
    favoriteMovies.removeFavoriteMovie(movieId);
    setModalDeleteVisible(false);
    setMovieId(null);
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
            onLongPress={handleLongPressMovie}
          />
        )}
      />
      <DeleteFavoriteAlert
        visible={modalDeleteVisible}
        onCancel={() => {
          setModalDeleteVisible(false);
          setMovieId(null);
        }}
        onConfirm={deleteFavoriteMovie}
      />
      <FavMovieModal
        visible={modalDetailsVisible}
        onClose={() => setModalDetailsVisible(false)}
        movie={movieDetails}
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
