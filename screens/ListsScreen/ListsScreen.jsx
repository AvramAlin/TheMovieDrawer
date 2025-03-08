import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import CustomListItem from "../../components/CustomLists/CustomListItem";

function ListsScreen() {
  const [customLists, setCustomLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const data = await getPopularMovies();
        const newList = {
          id: Math.random(1),
          title: "Test List",
          movies: data,
        };
        setCustomLists([newList, newList]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading lists...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Custom Lists</Text>
      </View>

      <CustomListItem customLists={customLists} />
    </View>
  );
}

export default ListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
    padding: 10,
  },

  screenTitleContainer: {
    borderBottomColor: GlobalStyles.colors.dark500,
    borderBottomWidth: 2,
  },
  screenTitle: {
    fontSize: 20,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.gray700,
    marginBottom: 10,
    marginTop: 0,
  },
  loadingText: {
    color: "black",
    fontSize: 16,
  },
});
