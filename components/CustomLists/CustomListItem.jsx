import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import React from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const IMAGE_URL = "https://image.tmdb.org/t/p/w185";

export default function CustomListItem({ customLists, onLongPress }) {
  const navigation = useNavigation();

  function handleOpenList(listData) {
    navigation.navigate("ListOpened", { listId: listData.id });
  }

  // Function to render a movie preview
  const renderMovieItem = ({ item, index }) => {
    // Only show the first 5 movie posters
    if (index > 8) return null;

    if (item.poster_path) {
      return (
        <Pressable style={styles.movieItem}>
          <Image
            source={{ uri: `${IMAGE_URL}${item.poster_path}` }}
            style={styles.poster}
            resizeMode="cover"
          />
        </Pressable>
      );
    }
  };

  const renderList = (list) => {
    return (
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.containerPressable, styles.pressed]
            : styles.containerPressable
        }
        onPress={() => handleOpenList(list)}
        onLongPress={() => onLongPress(list.id)}
      >
        <View key={list.id} style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>{list.title}</Text>
            <View style={styles.movieCountContainer}>
              <Text style={styles.movieCount}>{list.movies.length}</Text>
              <MaterialIcons
                name="movie"
                color={GlobalStyles.colors.background500}
                size={20}
              />
            </View>
          </View>

          <FlatList
            data={list.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.movieListContent}
          />
        </View>
      </Pressable>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <AntDesign
            name="folderopen"
            size={60}
            color={GlobalStyles.colors.dark500}
          />
        </View>
        <Text style={styles.emptyTitle}>No Lists Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {customLists.length > 0 ? (
        <FlatList
          data={customLists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderList(item, index)}
          contentContainerStyle={styles.listsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");
const posterWidth = (width - 120) / 3;

const styles = StyleSheet.create({
  containerPressable: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: GlobalStyles.colors.background400,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.dark500,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
    marginBottom: 12,
  },
  listsContainer: {
    marginTop: 10,
    paddingBottom: 16,
  },
  listContainer: {
    marginBottom: 8,
    backgroundColor: GlobalStyles.colors.dark500,
    borderRadius: 20,
    padding: 8,
    // elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray700,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.text500,
    paddingBottom: 10,
  },
  listTitle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "dmsans-bold",
    color: GlobalStyles.colors.text500,
  },
  movieCountContainer: {
    backgroundColor: GlobalStyles.colors.text800,
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieCount: {
    fontFamily: "dmsans-bold",
    fontSize: 13,
    color: GlobalStyles.colors.background300,
    marginHorizontal: 8,
  },
  movieListContent: {
    paddingVertical: 8,
  },
  movieItem: {
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  poster: {
    width: posterWidth - 35,
    height: (posterWidth - 35) * 1.5,
    borderRadius: 8,
  },
});
