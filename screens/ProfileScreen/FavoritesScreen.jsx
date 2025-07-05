import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { useContext } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import BackButton from "../../components/UI/BackButton";
import NoDataText from "../../components/UI/NoDataText";
import { FavoriteMoviesContext } from "../../store/favorite-context";
import FavoriteList from "../../components/ProfileComponents/FavoriteList";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const favoriteMovies = useContext(FavoriteMoviesContext);
  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <View style={styles.rowContainer}>
          {Platform.OS === "android" && (
            <BackButton style={styles.buttonBack} />
          )}
          <Text style={styles.title}>Favorite Movies</Text>
          <Ionicons
            name="star-outline"
            size={27}
            color={GlobalStyles.colors.background500}
            style={styles.iconStyle}
          />
        </View>
      </View>
      {favoriteMovies.favoriteMovies &&
      favoriteMovies.favoriteMovies.length > 0 ? (
        <FavoriteList movies={favoriteMovies.favoriteMovies} />
      ) : (
        <NoDataText />
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    padding: 5,
    backgroundColor: GlobalStyles.colors.dark500,
    margin: 0,
    borderBottomRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
  },
  title: {
    marginTop: 10,
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 20,
    padding: 8,
    marginBottom: 10,
    marginLeft: Platform.OS === "android" && "11%",
  },
  rowContainer: {
    flexDirection: "row",
  },
  buttonBack: {
    marginTop: "-1%",
    marginLeft: "-4%",
  },
  iconStyle: {
    marginTop: "4.5%",
  },
});
