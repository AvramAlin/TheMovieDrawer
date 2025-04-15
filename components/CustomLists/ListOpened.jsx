import { StyleSheet, Text, View, Share } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { CustomListsContext } from "../../store/customLists-context";
import ListHeader from "./ListHeader";
import MovieCustomList from "./MovieCustomList";
import NoDataText from "../UI/NoDataText";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";
import { generateShareableListUrl } from "../../utils/sharing";

export default function ListOpened() {
  const route = useRoute();
  const listId = route.params.listId;
  const customListsContext = useContext(CustomListsContext);
  const [currentListData, setCurrentListData] = useState(
    customListsContext.getList(listId)
  );

  const handleShareList = async () => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const shareUrl = generateShareableListUrl(userId, listId);

    try {
      const result = await Share.share({
        message: `Check out my movie list "${currentListData.title}" on TheMovieDrawer: ${shareUrl}`,
        url: shareUrl, // iOS only
      });
    } catch (error) {
      console.error("Error sharing list:", error);
      alert("Failed to share list");
    }
  };

  useEffect(() => {
    setCurrentListData(customListsContext.getList(listId));
  }, [customListsContext.customLists]);

  return (
    <View style={styles.container}>
      <ListHeader currentListData={currentListData} onShare={handleShareList} />
      {currentListData.movies.length > 0 ? (
        <MovieCustomList listId={listId} />
      ) : (
        <NoDataText />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 5 },
});
