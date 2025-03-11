import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CustomListsContext } from "../../store/customLists-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

import ListHeader from "./ListHeader";
import MovieCustomList from "./MovieCustomList";
import NoDataText from "../UI/NoDataText";
import DeleteMovieListAlert from "../UI/DeleteMovieListAlert";

export default function ListOpened() {
  const route = useRoute();
  const listId = route.params.listId;
  const customListsContext = useContext(CustomListsContext);
  const [currentListData, setCurrentListData] = useState(
    customListsContext.getList(listId)
  );

  useEffect(() => {
    setCurrentListData(customListsContext.getList(listId));
  }, [customListsContext.customLists]);

  return (
    <View style={styles.container}>
      <ListHeader currentListData={currentListData} />
      {currentListData.movies.length > 0 ? (
        <MovieCustomList listId={listId} />
      ) : (
        <NoDataText />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
