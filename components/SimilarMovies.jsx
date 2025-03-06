import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";

export default function SimilarMovies({ similarMovies }) {
  const routes = useNavigationState((state) => state?.routes);
  const currentRoute = routes[routes.length - 1];
  const navigation = useNavigation();
  function handlePressSimilarMovie(id) {
    if (currentRoute.name === "MovieDetailsHome") {
      navigation.push("MovieDetailsHome", {
        movieId: id,
      });
    } else if (currentRoute.name === "MovieDetailsMovies") {
      navigation.push("MovieDetailsMovies", {
        movieId: id,
      });
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Similar Movies:</Text>
        <FlatList
          horizontal
          data={similarMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if (item.poster_path)
              return (
                <Pressable
                  style={({ pressed }) =>
                    pressed
                      ? [styles.similarMovieContainer, styles.pressed]
                      : styles.similarMovieContainer
                  }
                  android_ripple={3}
                  onPress={() => handlePressSimilarMovie(item.id)}
                >
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
                    }}
                    style={styles.similarMovieImage}
                  />
                  <Text style={styles.similarMovieTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </Pressable>
              );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 1,
    paddingHorizontal: 16,
  },
  similarMovieContainer: {
    width: 100,
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 8,
  },
  similarMovieImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginBottom: 4,
  },
  similarMovieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
