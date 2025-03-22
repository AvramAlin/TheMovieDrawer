// context/MoviesContext.js
import React, { createContext, useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DATABASE } from "../firebase/firebaseConfig";

export const MoviesContext = createContext({
  finishedMovies: [],
  planToWatchMovies: [],
  onHoldMovies: [],
  droppedMovies: [],
  addMovieToCategory: (movie, category) => {},
  removeMovieFromCategory: (movieId, category) => {},
  findMovie: (movieId, category) => {},
  findMovieGlobal: (movieId) => {},
});

function MoviesContextProvider({ children }) {
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  const [onHoldMovies, setOnHoldMovies] = useState([]);
  const [droppedMovies, setDroppedMovies] = useState([]);

  // Helper: Load movies for the current user from Firestore
  async function fetchMoviesData(userId) {
    const userDocRef = doc(FIRESTORE_DATABASE, "users", userId);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists() && docSnap.data().movies) {
        const moviesData = docSnap.data().movies;
        setFinishedMovies(moviesData.finished || []);
        setPlanToWatchMovies(moviesData.planToWatch || []);
        setOnHoldMovies(moviesData.onHold || []);
        setDroppedMovies(moviesData.dropped || []);
      } else {
        // If no movies data exists, clear the states
        setFinishedMovies([]);
        setPlanToWatchMovies([]);
        setOnHoldMovies([]);
        setDroppedMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies data:", error);
    }
  }

  // Listen for auth state changes to fetch the right movies data
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        fetchMoviesData(user.uid);
      } else {
        // Clear movies state when there's no authenticated user
        setFinishedMovies([]);
        setPlanToWatchMovies([]);
        setOnHoldMovies([]);
        setDroppedMovies([]);
      }
    });
    return unsubscribe;
  }, []);

  // Helper: Update Firestore for current user movies data
  async function updateFirestoreMovies(updatedMovies) {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
    const userDocRef = doc(FIRESTORE_DATABASE, "users", user.uid);
    try {
      await updateDoc(userDocRef, { movies: updatedMovies });
    } catch (error) {
      console.error("Error updating movies in Firestore:", error);
    }
  }

  function addMovieToCategory(movie, category) {
    let updatedMovies;
    switch (category) {
      case "Finished":
        setFinishedMovies((prev) => {
          const updated = [...prev, movie];
          updatedMovies = {
            finished: updated,
            planToWatch: planToWatchMovies,
            onHold: onHoldMovies,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "Plan to Watch":
        setPlanToWatchMovies((prev) => {
          const updated = [...prev, movie];
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: updated,
            onHold: onHoldMovies,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "On Hold":
        setOnHoldMovies((prev) => {
          const updated = [...prev, movie];
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: planToWatchMovies,
            onHold: updated,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "Dropped":
        setDroppedMovies((prev) => {
          const updated = [...prev, movie];
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: planToWatchMovies,
            onHold: onHoldMovies,
            dropped: updated,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      default:
        break;
    }
  }

  function removeMovieFromCategory(movieId, category) {
    let updatedMovies;
    const filterMovies = (movies) =>
      movies.filter((movie) => movie.id !== movieId);

    switch (category) {
      case "Finished":
        setFinishedMovies((prev) => {
          const updated = filterMovies(prev);
          updatedMovies = {
            finished: updated,
            planToWatch: planToWatchMovies,
            onHold: onHoldMovies,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "Plan to Watch":
        setPlanToWatchMovies((prev) => {
          const updated = filterMovies(prev);
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: updated,
            onHold: onHoldMovies,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "On Hold":
        setOnHoldMovies((prev) => {
          const updated = filterMovies(prev);
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: planToWatchMovies,
            onHold: updated,
            dropped: droppedMovies,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      case "Dropped":
        setDroppedMovies((prev) => {
          const updated = filterMovies(prev);
          updatedMovies = {
            finished: finishedMovies,
            planToWatch: planToWatchMovies,
            onHold: onHoldMovies,
            dropped: updated,
          };
          updateFirestoreMovies(updatedMovies);
          return updated;
        });
        break;
      default:
        break;
    }
  }

  function findMovie(movieId, category) {
    let movies = [];
    switch (category) {
      case "Finished":
        movies = finishedMovies;
        break;
      case "Plan to Watch":
        movies = planToWatchMovies;
        break;
      case "On Hold":
        movies = onHoldMovies;
        break;
      case "Dropped":
        movies = droppedMovies;
        break;
      default:
        return false;
    }
    return movies.some((movie) => movie.id === movieId);
  }

  function findMovieGlobal(movieId) {
    if (finishedMovies.some((movie) => movie.id === movieId)) return "Finished";
    if (planToWatchMovies.some((movie) => movie.id === movieId))
      return "Plan to Watch";
    if (onHoldMovies.some((movie) => movie.id === movieId)) return "On Hold";
    if (droppedMovies.some((movie) => movie.id === movieId)) return "Dropped";
    return false;
  }

  const value = {
    finishedMovies,
    planToWatchMovies,
    onHoldMovies,
    droppedMovies,
    addMovieToCategory,
    removeMovieFromCategory,
    findMovie,
    findMovieGlobal,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
