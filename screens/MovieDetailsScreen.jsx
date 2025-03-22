import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies,
} from "../api/tmdb";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../assets/colors/GlobalStyles";
import CastInfo from "../components/MoviesComponents/CastInfo";
import SimilarMovies from "../components/MoviesComponents/SimilarMovies";
import BackButton from "../components/UI/BackButton";
import { MoviesContext } from "../store/movies-context";
import CustomAlert from "../components/UI/CustomAlert";
import RemoveButtonCustom from "../components/UI/RemoveButtonCustom";
import DeletionModal from "../components/UI/DeletionModal";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import MovieSomeDetails from "../components/MoviesComponents/MovieSomeDetails";
import ModalCategories from "../components/MoviesComponents/ModalCategories";

export default function MovieDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const movieId = route.params?.movieId;
  const movieCategory = route.params?.movieCategory;
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const movieContext = useContext(MoviesContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertCategory, setAlertCategory] = useState("");
  const [deletionVisible, setDeletionVisible] = useState(false);

  function handleAddMovieModal() {
    setModalVisible(true);
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsFetching(true);
      const data = await getMovieDetails(movieId);
      const dataCredits = await getMovieCredits(movieId);
      const dataSimilarMovies = await getSimilarMovies(movieId);
      setMovieDetails(data);
      setCredits(dataCredits);
      setSimilarMovies(dataSimilarMovies);
      //   console.log(data);
      setIsFetching(false);
    }
    fetchMovieDetails();
  }, [setMovieDetails]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  function handleAddMovieToCategory(label) {
    if (!movieContext.findMovie(movieId, label)) {
      const result = movieContext.findMovieGlobal(movieId);
      if (result === false) {
        movieContext.addMovieToCategory(movieDetails, label);
      } else {
        movieContext.moveMovieBetweenCategories(movieDetails, result, label);
      }
    } else {
      setModalVisible(false);
      setAlertCategory(label);
      setAlertVisible(true);
    }
  }

  function handlePressRemoveItem() {
    setDeletionVisible(true);
  }

  function handleRemoveMovieFromCategory() {
    movieContext.removeMovieFromCategory(movieId, movieCategory);
    navigation.goBack();
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <MovieSomeDetails
          movieDetails={movieDetails}
          onPressingAdd={handleAddMovieModal}
        />
        <CastInfo credits={credits} />
        <SimilarMovies similarMovies={similarMovies} />
        {movieCategory ? (
          <>
            <RemoveButtonCustom
              icon="trash-bin"
              size={20}
              text={"Remove item"}
              onPress={handlePressRemoveItem}
            />
            <DeletionModal
              visible={deletionVisible}
              movieTitle={movieDetails.title}
              onCancel={() => setDeletionVisible(false)}
              onConfirm={handleRemoveMovieFromCategory}
            />
          </>
        ) : null}
      </ScrollView>
      <ModalCategories
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddCategory={handleAddMovieToCategory}
      />
      <CustomAlert
        visible={alertVisible}
        category={alertCategory}
        onClose={() => setAlertVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
