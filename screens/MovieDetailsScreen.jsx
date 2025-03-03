import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
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

export default function MovieDetailsScreen() {
  const route = useRoute();
  const movieId = route.params?.movieId;
  const [movieDetails, setMovieDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <MovieSomeDetails movieDetails={movieDetails} />
        <CastInfo credits={credits} />
        <SimilarMovies similarMovies={similarMovies} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
});
