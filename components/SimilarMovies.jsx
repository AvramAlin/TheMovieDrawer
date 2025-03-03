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

export default function SimilarMovies({ similarMovies }) {
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 70,
  },
  pressed: {
    opacity: 0.7,
  },
});
