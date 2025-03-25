// context/FavoriteMoviesContext.js
import React, { createContext, useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DATABASE } from "../firebase/firebaseConfig";

export const FavoriteMoviesContext = createContext({
  favoriteMovies: [],
  addFavoriteMovie: (movie) => {},
  removeFavoriteMovie: (movieId) => {},
  clearFavoriteMovies: () => {},
  isMovieFavorite: (movieId) => false,
});

function FavoriteMoviesContextProvider({ children }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Function to fetch favorite movies from Firestore for the current user
  async function fetchFavoriteMovies(userId) {
    if (!userId) return;
    try {
      const userDocRef = doc(FIRESTORE_DATABASE, "users", userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists() && docSnap.data().favoriteMovies) {
        setFavoriteMovies(docSnap.data().favoriteMovies);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.error("Error fetching favorite movies: ", error);
    }
  }

  // Listen for changes in auth state and fetch the corresponding favoriteMovies
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        fetchFavoriteMovies(user.uid);
      } else {
        setFavoriteMovies([]);
      }
    });

    return unsubscribe;
  }, []);

  // Helper function to update the Firestore document with favoriteMovies array
  async function updateFirestoreFavoriteMovies(updatedMovies) {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
    const userDocRef = doc(FIRESTORE_DATABASE, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        favoriteMovies: updatedMovies,
      });
    } catch (error) {
      console.error("Error updating favorite movies in Firestore:", error);
    }
  }

  // Add a movie to favorites
  function addFavoriteMovie(movie) {
    setFavoriteMovies((prev) => {
      // Avoid duplicates using a unique movie id
      const exists = prev.find((fav) => fav.id === movie.id);
      if (exists) return prev;

      const updatedMovies = [...prev, movie];
      updateFirestoreFavoriteMovies(updatedMovies);
      return updatedMovies;
    });
  }

  // Remove a movie from favorites based on its id
  function removeFavoriteMovie(movieId) {
    setFavoriteMovies((prev) => {
      const updatedMovies = prev.filter((movie) => movie.id !== movieId);
      updateFirestoreFavoriteMovies(updatedMovies);
      return updatedMovies;
    });
  }

  // Optionally, clear all favorite movies (for example, on sign out)
  function clearFavoriteMovies() {
    setFavoriteMovies([]);
    updateFirestoreFavoriteMovies([]);
  }

  // Check if a movie is already favorite
  function isMovieFavorite(movieId) {
    return favoriteMovies.some((movie) => movie.id === movieId);
  }

  const value = {
    favoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
    clearFavoriteMovies,
    isMovieFavorite,
  };

  return (
    <FavoriteMoviesContext.Provider value={value}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
}

export default FavoriteMoviesContextProvider;
