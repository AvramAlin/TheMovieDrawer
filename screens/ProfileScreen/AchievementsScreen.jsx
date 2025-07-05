// screens/Profile/AchievementsScreen.jsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MoviesContext } from "../../store/movies-context";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import AchievementCircle from "../../components/ProfileComponents/AchievementCircle";
import BackButton from "../../components/UI/BackButton";

export default function AchievementsScreen() {
  const moviesContext = useContext(MoviesContext);

  // Calculate progress for each achievement
  const finished = moviesContext.finishedMovies;
  const horrorWatched = finished.filter((m) =>
    m.genres?.some((g) => g.name === "Horror")
  ).length;
  const ratedMovies = finished.filter((m) => m.userRating).length;
  const totalRuntime = finished.reduce(
    (acc, curr) => acc + (curr.runtime || 0),
    0
  );
  const romanceWatched = finished.filter((m) =>
    m.genres?.some((g) => g.name === "Romance")
  ).length;

  const thrillerWatched = finished.filter((m) =>
    m.genres?.some((g) => g.name === "Thriller")
  ).length;

  const masterpieceRated = finished.filter((m) => m.userRating === 10).length;

  const sciFiWatched = finished.filter((m) =>
    m.genres?.some((g) => g.name === "Science Fiction")
  ).length;

  // Marathoner: Watch 5 movies in one day
  const moviesByDay = {};
  finished.forEach((m) => {
    const day = m.addedAt?.slice(0, 10); // 'YYYY-MM-DD'
    if (day) moviesByDay[day] = (moviesByDay[day] || 0) + 1;
  });
  const marathoner = Object.values(moviesByDay).some((count) => count >= 5)
    ? 1
    : 0;

  // Polyglot: Watch movies in 5 different languages
  const languages = new Set(finished.map((m) => m.original_language));

  const polyglot = languages.size;

  // Old School: Watch 5 movies released before 1980
  const oldSchool = finished.filter((m) => {
    const year = parseInt(m.release_date?.slice(0, 4));
    return year && year < 1980;
  }).length;

  // Fresh Release: Watch 10 movies released this year
  const currentYear = new Date().getFullYear();
  const freshRelease = finished.filter((m) =>
    m.release_date?.startsWith(currentYear.toString())
  ).length;

  // Animated Fan: Watch 10 animated movies
  const animatedFan = finished.filter((m) =>
    m.genres?.some((g) => g.name === "Animation")
  ).length;

  // Define achievements as an array
  const achievements = [
    {
      icon: "star",
      color: "#00BFFF",
      progress: finished.length,
      total: 10,
      label: "Rookie",
      description: "Watch 10 movies",
    },
    {
      icon: "time",
      color: "#FF69B4",
      progress: Math.floor(totalRuntime / 60),
      total: 24,
      label: "Binge Watcher",
      description: "Watch 24 hours of movies",
    },
    {
      icon: "film",
      color: "#FFD700",
      progress: finished.length,
      total: 200,
      label: "Cinephile",
      description: "Watch 200 movies",
    },
    {
      icon: "skull",
      color: "#FF6347",
      progress: horrorWatched,
      total: 10,
      label: "Horror Enthusiast",
      description: "Watch 10 horror movies",
    },
    {
      icon: "chatbubble-ellipses",
      color: "#ADFF2F",
      progress: ratedMovies,
      total: 20,
      label: "Critic",
      description: "Rate 20 movies",
    },
    // NEW ACHIEVEMENTS BELOW
    {
      icon: "heart",
      color: "#FF69B4",
      progress: romanceWatched,
      total: 10,
      label: "Romance Lover",
      description: "Watch 10 romance movies",
    },
    {
      icon: "pulse",
      color: "#FF4500",
      progress: thrillerWatched,
      total: 10,
      label: "Tension Seeker",
      description: "Watch 10 thriller movies",
    },
    {
      icon: "diamond",
      color: "#8e44ad",
      progress: masterpieceRated,
      total: 1,
      label: "Masterpiece",
      description: "Rate a movie 10/10",
    },
    {
      icon: "planet",
      color: "#00FFB4",
      progress: sciFiWatched,
      total: 10,
      label: "Aliens Exist",
      description: "Watch 10 science fiction movies",
    },
    {
      icon: "walk",
      color: "#FFA500",
      progress: marathoner,
      total: 1,
      label: "Marathoner",
      description: "Watch 5 movies in one day",
    },
    {
      icon: "language",
      color: "#1abc9c",
      progress: polyglot,
      total: 5,
      label: "Polyglot",
      description: "Watch movies in 5 different languages",
    },
    {
      icon: "hourglass",
      color: "#b5651d",
      progress: oldSchool,
      total: 5,
      label: "Old School",
      description: "Watch 5 movies released before 1980",
    },
    {
      icon: "flash",
      color: "#e67e22",
      progress: freshRelease,
      total: 10,
      label: "Fresh Release",
      description: "Watch 10 movies released this year",
    },
    {
      icon: "color-palette",
      color: "#f39c12",
      progress: animatedFan,
      total: 10,
      label: "Animated Fan",
      description: "Watch 10 animated movies",
    },
  ];

  const completedCount = achievements.filter(
    (a) => a.progress >= a.total
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <View style={styles.rowContainer}>
          {Platform.OS === "android" && (
            <BackButton style={styles.buttonBack} />
          )}
          <Text style={styles.title}>Achievements</Text>
          <Ionicons
            name="trophy"
            size={27}
            color={GlobalStyles.colors.background500}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {completedCount} / {achievements.length} achievements completed
          </Text>
        </View>
        {/** Render achievements in rows of 2 */}
        {Array.from({ length: Math.ceil(achievements.length / 2) }).map(
          (_, rowIdx) => (
            <View style={styles.achievementsRow} key={rowIdx}>
              {achievements.slice(rowIdx * 2, rowIdx * 2 + 2).map((a, idx) => (
                <AchievementCircle key={a.label} {...a} />
              ))}
            </View>
          )
        )}
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
  summaryContainer: {
    alignItems: "center",
    marginVertical: 12,
    paddingTop: 14,
  },
  summaryText: {
    color: GlobalStyles.colors.background500,
    fontFamily: "dmsans-bold",
    fontSize: 18,
    letterSpacing: 0,
  },
  scrollContent: {
    paddingBottom: 50,
    alignItems: "center",
  },
  achievementsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonBack: {
    marginTop: "-10%",
    marginLeft: "-4%",
  },
});
