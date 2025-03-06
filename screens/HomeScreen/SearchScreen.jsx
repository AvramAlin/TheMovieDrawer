import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { getSearchedMovies } from "../../api/tmdb";
import HomeMovies from "../../components/HomeMovies";
import SearchMovies from "../../components/SearchMovies";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  function handleCloseSearch() {
    setSearchQuery("");
    setSearchResults([]);
    setPage(1);
  }

  const fetchSearchMovies = async (query, pageNum) => {
    if (!query) return;

    setIsLoading(true);
    try {
      const data = await getSearchedMovies(query, pageNum);
      const filteredData = data.results.filter((movie) => movie.poster_path);

      if (pageNum === 1) {
        setSearchResults(filteredData);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...filteredData]);
      }
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleSearchMovies() {
    setPage(1);
    fetchSearchMovies(searchQuery, 1);
  }

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchSearchMovies(searchQuery, nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={24} color="white" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Movies..."
          placeholderTextColor={GlobalStyles.colors.background500}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text ?? "")}
          onSubmitEditing={handleSearchMovies}
          autoFocus
        />
        <TouchableOpacity onPress={handleCloseSearch}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <SearchMovies
        moviesData={searchResults}
        onLoad={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background500,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.gray500,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
    height: 40,
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary600,
    borderRadius: 8,
    padding: 8,
  },
  posterImage: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "dmsans-bold",
  },
});

export default SearchScreen;
