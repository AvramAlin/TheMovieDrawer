import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {} from "@expo/vector-icons";
import { GlobalStyles } from "../assets/colors/GlobalStyles";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieListItem({ movie }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    margin: 2.5,
    width: "100%",
    height: "80%",
    elevation: 4,
    backgroundColor: GlobalStyles.colors.background300,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 145,
    width: 95,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontFamily: "dmsans-bold",
    textAlign: "center",
  },
});
