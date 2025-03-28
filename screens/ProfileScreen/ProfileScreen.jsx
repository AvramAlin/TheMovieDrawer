import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { FIREBASE_AUTH } from "../../firebase/firebaseConfig";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import StatsContainer from "../../components/ProfileComponents/StatsContainer";
import FavoriteMoviesProfile from "../../components/ProfileComponents/FavoriteMoviesProfile";
import SectionPressable from "../../components/ProfileComponents/SectionPressable";
import { FavoriteMoviesContext } from "../../store/favorite-context";
import { UserDetailsContext } from "../../store/userDetails-context";

export default function ProfileScreen({ navigation }) {
  const favoriteMoviesContext = useContext(FavoriteMoviesContext);

  function handleNavigateFavorites() {
    navigation.navigate("FavoritesScreen");
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: GlobalStyles.colors.dark500 }}
    >
      <View style={styles.container}>
        <ProfileHeader />
        <StatsContainer />

        <FavoriteMoviesProfile
          favoriteMovies={favoriteMoviesContext.favoriteMovies}
          onFavoriteScreenClick={handleNavigateFavorites}
        />

        <SectionPressable iconName="settings-sharp" textInput="Settings" />
        <SectionPressable
          iconName="information-circle-outline"
          textInput="About the app"
        />
        <SectionPressable iconName="mail-outline" textInput="Send feedback" />
        <SectionPressable
          iconName="log-out"
          textInput="Log out"
          onPress={() => FIREBASE_AUTH.signOut()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.dark500,
    paddingBottom: 20,
  },
  signOutContainer: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.error500,
    marginHorizontal: "35%",
    padding: 10,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    shadowOpacity: 0.3,
  },
  signOutText: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    alignSelf: "center",
    textAlign: "center",
  },
});
