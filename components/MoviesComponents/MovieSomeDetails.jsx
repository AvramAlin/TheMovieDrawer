import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import BackButton from "../UI/BackButton";
import ButtonCustom from "../UI/ButtonCustom";

export default function MovieSomeDetails({ movieDetails, onPressingAdd }) {
  // Function to convert minutes to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine star rating
  const renderStars = (rating) => {
    const starPercentage = (rating / 10) * 5;
    const fullStars = Math.floor(starPercentage);
    const halfStar = starPercentage % 1 >= 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome
          key={`full-${i}`}
          name="star"
          size={16}
          color={GlobalStyles.colors.accent500 || "#FFD700"}
          style={{ marginRight: 2 }}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesome
          key="half"
          name="star-half-o"
          size={16}
          color={GlobalStyles.colors.accent500 || "#FFD700"}
          style={{ marginRight: 2 }}
        />
      );
    }

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome
          key={`empty-${i}`}
          name="star-o"
          size={16}
          color={GlobalStyles.colors.accent500 || "#FFD700"}
          style={{ marginRight: 2 }}
        />
      );
    }

    return stars;
  };

  return (
    <>
      {/* Backdrop with gradient overlay */}
      <View style={styles.backdropContainer}>
        <BackButton />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`,
          }}
          style={styles.backdrop}
        />
        <View style={styles.backdropGradient} />
        <ButtonCustom
          name="add"
          size={32}
          color="white"
          onPress={onPressingAdd}
        />
      </View>

      {/* Poster with shadow */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={styles.poster}
        />
      </View>

      {/* Movie details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieDetails.title}</Text>
        {movieDetails.tagline && (
          <Text style={styles.tagline}>{movieDetails.tagline}</Text>
        )}

        {/* Rating and release row */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(movieDetails.vote_average)}
            </View>
            <Text style={styles.ratingText}>
              {movieDetails.vote_average.toFixed(1)}
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.dateContainer}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color={GlobalStyles.colors.text800 || "#666"}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoText}>
              {formatDate(movieDetails.release_date)}
            </Text>
          </View>
        </View>

        {/* Runtime */}
        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={18}
            color={GlobalStyles.colors.text800 || "#666"}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.infoText}>
            {formatRuntime(movieDetails.runtime)}
          </Text>
        </View>

        {/* Genres */}
        <View style={styles.infoRow}>
          <MaterialIcons
            name="category"
            size={18}
            color={GlobalStyles.colors.text800 || "#666"}
            style={{ marginRight: 6 }}
          />
          <View style={styles.genreContainer}>
            {movieDetails.genres.map((genre, index) => (
              <View key={genre.id} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Overview section */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{movieDetails.overview}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdropContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  backdrop: {
    width: "100%",
    height: 250,
  },
  backdropGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  posterContainer: {
    position: "absolute",
    top: 150,
    left: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 8,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  detailsContainer: {
    marginTop: 90,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "dmsans-bold",
  },
  tagline: {
    fontStyle: "italic",
    color: GlobalStyles.colors.text800,
    marginBottom: 12,
    fontFamily: "dmsans-light",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles?.colors?.accent500,
    marginLeft: 4,
    fontFamily: "dmsans-bold",
  },
  separator: {
    height: 16,
    width: 1,
    backgroundColor: GlobalStyles.colors.text800,
    marginHorizontal: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "dmsans-light",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genreBadge: {
    backgroundColor: GlobalStyles?.colors?.primary500 || "#333",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  genreText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "dmsans-light",
  },
  overviewSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "dmsans-bold",
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 16,
    fontFamily: "dmsans-light",
  },
});
