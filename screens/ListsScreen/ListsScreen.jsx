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
import { LinearGradient } from "expo-linear-gradient";
import { CustomListsContext } from "../../store/customLists-context";
import AddCustomListButton from "../../components/UI/AddCustomListButton";
import ModalAddList from "../../components/CustomLists/ModalAddList";
import DeleteListAlert from "../../components/UI/DeleteListAlert";

function ListsScreen() {
  const customListsContext = useContext(CustomListsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setIsModalVisible] = useState(false);
  const [deleteListModalVisible, setDeleteListModalVisible] = useState(false);
  const [certainTitle, setCertainTitle] = useState("");
  const [currentId, setCurrentId] = useState(null);

  function handleAddList(title, description) {
    const emptyMovies = [];

    customListsContext.addCustomList(title, description, emptyMovies);
  }

  function handleLongPress(listId) {
    setCertainTitle(
      customListsContext.customLists.find((list) => list.id === listId).title
    );
    setCurrentId(listId);
    setDeleteListModalVisible(true);
  }

  function handleDeleteList() {
    customListsContext.deleteCustomList(currentId);
    setCertainTitle("");
    setCurrentId(null);
    setDeleteListModalVisible(false);
  }

  // useEffect(() => {
  //   async function fetchMovies() {
  //     setIsLoading(true);
  //     try {
  //       const data = await getPopularMovies();
  //       const desc1 = "Top romance movies that will be viewed tonight";
  //       const desc2 = "something stupid but a solid description";
  //       customListsContext.addCustomList("Best romance movies", desc1, data);
  //       customListsContext.addCustomList("Hatz jonule", desc2, data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchMovies();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitle}>My Collection</Text>
        </View>
        <View style={styles.addListButton}>
          <AddCustomListButton onPress={() => setIsModalVisible(true)} />
        </View>
      </View>
      <View style={styles.containerCustomLists}>
        <CustomListItem
          customLists={customListsContext.customLists}
          onLongPress={handleLongPress}
        />
      </View>
      <ModalAddList
        visible={modalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddList={handleAddList}
      />
      <DeleteListAlert
        listTitle={certainTitle}
        visible={deleteListModalVisible}
        onCancel={() => setDeleteListModalVisible(false)}
        onConfirm={handleDeleteList}
      />
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
