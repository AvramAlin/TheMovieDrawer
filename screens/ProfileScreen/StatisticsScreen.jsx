import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import React, { useContext } from "react";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { MoviesContext } from "../../store/movies-context";
import SimpleStat from "../../components/ProfileComponents/SimpleStat";
import GenresStat from "../../components/ProfileComponents/GenresStat";
import BackButton from "../../components/UI/BackButton";

export default function StatisticsScreen() {
  const moviesContext = useContext(MoviesContext);
  const sumRuntime = moviesContext.finishedMovies.reduce(
    (acc, curr) => acc + curr.runtime,
    0
  );
  const futureRuntime = moviesContext.planToWatchMovies.reduce(
    (acc, curr) => acc + curr.runtime,
    0
  );
  const greatMoviesNumber = moviesContext.finishedMovies.reduce((acc, curr) => {
    if (curr.userRating >= 9) return acc + 1;
    else return acc;
  }, 0);
  const awfulExperiencesNumber = moviesContext.finishedMovies.reduce(
    (acc, curr) => {
      if (curr.userRating <= 5) return acc + 1;
      else return acc;
    },
    0
  );

  const formatRuntime = (runtime) => {
    if (!runtime) return "Unknown runtime";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <View style={styles.rowContainer}>
          {Platform.OS === "android" && (
            <BackButton style={styles.buttonBack} />
          )}
          <Text style={styles.title}>Statistics</Text>
          <Ionicons
            name="stats-chart"
            size={27}
            color={GlobalStyles.colors.background500}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <SimpleStat
          iconName="clock-time-four"
          textInput="Time spent watching movies"
          result={formatRuntime(sumRuntime)}
        />
        <SimpleStat
          iconName="calendar-clock"
          textInput="Future Watch Time"
          result={formatRuntime(futureRuntime)}
        />
        <GenresStat />
        <SimpleStat
          iconName="medal"
          textInput="Great movies you watched (>= 9)"
          result={greatMoviesNumber}
        />
        <SimpleStat
          iconName="thumb-down"
          textInput="Awful experiences (<=5)"
          result={awfulExperiencesNumber}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.dark500,
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
    alignItems: "center",
  },
  buttonBack: {
    marginTop: "-10%",
    marginLeft: "-4%",
  },
});
