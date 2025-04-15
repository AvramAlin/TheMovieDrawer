import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { MoviesContext } from "../../store/movies-context";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function StatsContainer() {
  const moviesContext = useContext(MoviesContext);
  const moviesWatched = moviesContext.finishedMovies.length;
  const planningTo = moviesContext.planToWatchMovies.length;
  return (
    <ScrollView>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{moviesWatched}</Text>
          <Text style={styles.statLabel}>Watched</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{planningTo}</Text>
          <Text style={styles.statLabel}>Planning</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.background500,
    backgroundColor: GlobalStyles.colors.dark500,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  divider: {
    width: 1,
    backgroundColor: GlobalStyles.colors.background500,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.background500,
  },
  statLabel: {
    fontSize: 16,
    color: GlobalStyles.colors.background500,
  },
});
