import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import BackButton from "../UI/BackButton";
import { useNavigation } from "@react-navigation/native";

export default function ListHeader({ currentListData, onShare }) {
  const navigation = useNavigation();

  function handleToggleSearchOnPress() {
    navigation.navigate("ListSearchMovie", {
      listData: currentListData,
    });
  }

  return (
    <View>
      <View style={styles.listHeader}>
        <View style={styles.rowContainer}>
          {Platform.OS === "android" && (
            <BackButton style={styles.buttonBack} />
          )}
          <Text style={styles.title}>{currentListData.title}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.numberContainer}>
            <MaterialCommunityIcons
              name="movie-open"
              color={GlobalStyles.colors.dark500}
              size={22}
              style={styles.icon}
            />
            <Text style={styles.movieCounter}>
              {currentListData.movies.length} movies
            </Text>
          </View>
          <View style={styles.numberContainer}>
            <Pressable onPress={onShare}>
              <Text style={styles.shareText}>Share</Text>
            </Pressable>
            <MaterialCommunityIcons
              name="share"
              color={GlobalStyles.colors.dark500}
              size={22}
              style={styles.shareIcon}
            />
          </View>
        </View>
        <Text style={styles.description}>{currentListData.description}</Text>
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.floatingButton, styles.pressed]
            : styles.floatingButton
        }
        onPress={handleToggleSearchOnPress}
      >
        <MaterialCommunityIcons
          name="plus"
          size={28}
          color={GlobalStyles.colors.dark500}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  numberContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.background500,
    marginLeft: "5%",
  },
  icon: {
    marginLeft: 10,
  },
  movieCounter: {
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-light",
    fontSize: 14,
    margin: 5,
    marginHorizontal: 15,
  },
  shareText: {
    fontFamily: "dmsans-light",
    fontSize: 14,
    marginHorizontal: 10,
    margin: 5,
  },
  shareIcon: {
    marginRight: 5,
  },
  description: {
    color: GlobalStyles.colors.background500,
    margin: 5,
    padding: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: "45%",
    right: "7%",
    backgroundColor: GlobalStyles.colors.accent500,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonBack: {
    marginTop: "-1%",
    marginLeft: "-4%",
  },
});
