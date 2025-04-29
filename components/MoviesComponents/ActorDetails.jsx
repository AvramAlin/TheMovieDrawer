import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getPersonDetails, getPersonCredits } from "../../api/tmdb";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import BackButton from "../UI/BackButton";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ActorDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const personId = route.params?.personId;
  const [personDetails, setPersonDetails] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    async function fetchPerson() {
      setIsFetching(true);
      const details = await getPersonDetails(personId);
      const credits = await getPersonCredits(personId);
      setPersonDetails(details);
      setPersonCredits(credits);
      setIsFetching(false);
    }
    fetchPerson();
  }, [personId]);

  const handleMoviePress = (movieId) => {
    // Grab the top‐level navigator state
    const navState = navigation.getState();
    const available = navState.routeNames;

    // decide which one is live
    const target = available.includes("MovieDetailsHome")
      ? "MovieDetailsHome"
      : "MovieDetailsMovies";

    navigation.navigate(target, { movieId });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const sortedMovies = personCredits?.cast
    ? [...personCredits.cast].sort((a, b) => b.popularity - a.popularity)
    : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <BackButton />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: personDetails.profile_path
              ? `https://image.tmdb.org/t/p/w342${personDetails.profile_path}`
              : "https://via.placeholder.com/342x513.png?text=No+Image",
          }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{personDetails.name}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons
            name="calendar-today"
            size={16}
            color={GlobalStyles.colors.text800}
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            Born: {formatDate(personDetails.birthday)}
          </Text>
        </View>

        {personDetails.place_of_birth && (
          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={GlobalStyles.colors.text800}
              style={styles.icon}
            />
            <Text style={styles.infoText}>{personDetails.place_of_birth}</Text>
          </View>
        )}

        {personDetails.biography && (
          <View style={styles.biographySection}>
            <Text style={styles.sectionTitle}>Biography</Text>
            <Text
              style={styles.biography}
              numberOfLines={isBioExpanded ? undefined : 6}
            >
              {personDetails.biography}
            </Text>
            <TouchableOpacity
              onPress={() => setIsBioExpanded((v) => !v)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {isBioExpanded ? "Show less" : "Read more"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.knownForSection}>
          <Text style={styles.sectionTitle}>Known For</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedMovies.slice(0, 10)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieContainer}
                onPress={() => handleMoviePress(item.id)}
                activeOpacity={0.7}
              >
                <Image
                  source={{
                    uri: item.poster_path
                      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                      : "https://via.placeholder.com/185x278.png?text=No+Poster",
                  }}
                  style={styles.moviePoster}
                />
                <Text style={styles.movieTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.character && (
                  <Text style={styles.movieCharacter} numberOfLines={2}>
                    as {item.character}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  header: {
    height: 60,
    justifyContent: "center",
    paddingLeft: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 10,
  },
  profileImage: {
    width: 180,
    height: 270,
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-light",
  },
  biographySection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
  },
  biography: {
    fontSize: 15,
    lineHeight: 22,
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-light",
  },
  readMoreButton: {
    marginTop: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
  },
  knownForSection: {
    marginTop: 24,
  },
  movieContainer: {
    width: 120,
    marginRight: 16,
    marginBottom: 8,
  },
  moviePoster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    color: GlobalStyles.colors.dark500,
    fontFamily: "dmsans-bold",
  },
  movieCharacter: {
    fontSize: 12,
    color: GlobalStyles.colors.text800,
    textAlign: "center",
    fontFamily: "dmsans-light",
    marginTop: 2,
  },
});
