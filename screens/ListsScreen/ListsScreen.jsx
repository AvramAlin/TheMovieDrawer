import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import { getPopularMovies } from "../../api/tmdb";
import CustomListItem from "../../components/CustomLists/CustomListItem";
import AddCustomListButton from "../../components/UI/AddCustomListButton";
import { LinearGradient } from "expo-linear-gradient";
import { CustomListsContext } from "../../store/customLists-context";

function ListsScreen() {
  const customListsContext = useContext(CustomListsContext);
  const [customLists, setCustomLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const data = await getPopularMovies();
        customListsContext.addCustomList("Best romance movies", data);
        customListsContext.addCustomList("Hatz jonule", data);
        const newList1 = {
          id: 1,
          title: "Best romance movies",
          movies: data,
        };
        const newList2 = {
          id: 2,
          title: "For later later be later",
          movies: data,
        };
        const newList3 = {
          id: 3,
          title: "My favs dramas",
          movies: data,
        };

        setCustomLists([newList1, newList2, newList3]);
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
      <View style={styles.headerContainer}>
        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitle}>My Collection</Text>
        </View>
        <View style={styles.addListButton}>
          <AddCustomListButton />
        </View>
      </View>
      <View style={styles.containerCustomLists}>
        <CustomListItem customLists={customListsContext.customLists} />
      </View>
    </View>
  );
}

export default ListsScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerCustomLists: {
    flex: 1,
    paddingHorizontal: 7,
  },
  headerContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: GlobalStyles.colors.dark500,
    borderBottomWidth: 3,
  },
  addListButton: {
    marginTop: 4,
  },
  screenTitleContainer: {
    paddingHorizontal: 4,
    marginTop: 8,
    width: 0.8 * width,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: "dmsans-light",
    color: GlobalStyles.colors.background500,
    marginBottom: 10,
  },
  loadingText: {
    color: "black",
    fontSize: 16,
    fontFamily: "dmsans-medium",
  },
});
