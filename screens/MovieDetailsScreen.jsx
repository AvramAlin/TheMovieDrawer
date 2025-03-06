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
import LoadingOverlay from "../components/LoadingOverlay";
import { GlobalStyles } from "../assets/colors/GlobalStyles";
import MovieSomeDetails from "../components/MovieSomeDetails";
import CastInfo from "../components/CastInfo";
import SimilarMovies from "../components/SimilarMovies";
import BackButton from "../components/UI/BackButton";
import ModalCategories from "../components/ModalCategories";
import { MoviesContext } from "../store/movies-context";
import CustomAlert from "../components/UI/CustomAlert";

export default function MovieDetailsScreen() {
  const route = useRoute();
  const movieId = route.params?.movieId;
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const movieContext = useContext(MoviesContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertCategory, setAlertCategory] = useState("");

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
      movieContext.addMovieToCategory(movieDetails, label);
    } else {
      // Alert.alert(
      //   "Movie Already Added",
      //   `This movie is already in your '${label}' movies list.`,
      //   [{ text: "Ok", style: "cancel" }],
      //   { cancelable: true }
      // );
      setModalVisible(false);
      setAlertCategory(label);
      setAlertVisible(true);
    }
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
