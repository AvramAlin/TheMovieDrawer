import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import MovieList from "../../components/MoviesComponents/MovieList";
import { MoviesContext } from "../../store/movies-context";
import NoDataText from "../../components/UI/NoDataText";
import GPTChat from "../../components/MoviesComponents/GPTChat";
import { Ionicons } from "@expo/vector-icons";
export default function FinishedList() {
  const moviesContext = useContext(MoviesContext);
  const category = "Finished";
  const [showChat, setShowChat] = useState(false);

  if (moviesContext.finishedMovies.length == 0) return <NoDataText />;

  return (
    <>
      <MovieList
        movieData={moviesContext.finishedMovies}
        movieCategory={category}
      />
      <Pressable
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: GlobalStyles.colors.dark500,
          padding: 12,
          borderRadius: 50,
          elevation: 4,
        }}
        onPress={() => setShowChat(true)}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
      </Pressable>
      <GPTChat
        visible={showChat}
        onClose={() => setShowChat(false)}
        movieList={moviesContext.finishedMovies}
      />
    </>
  );
}

const styles = StyleSheet.create({});
