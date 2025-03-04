import { createContext, useState } from "react";

export const MoviesContext = createContext({
  finishedMovies: [],
  planToWatchMovies: [],
  onHoldMovies: [],
  droppedMovies: [],
  addMovieToCategory: (movie, category) => {},
  removeMovieFromCategory: (movieId, category) => {},
});

function MoviesContextProvider({ children }) {
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [planToWatchMovies, setPlanToWatchMovies] = useState([]);
  const [onHoldMovies, setOnHoldMovies] = useState([]);
  const [droppedMovies, setDroppedMovies] = useState([]);

  function addMovieToCategory(movie, category) {
    switch (category) {
      case "Finished":
        setFinishedMovies((prev) => [...prev, movie]);
        break;
      case "Plan to Watch":
        setPlanToWatchMovies((prev) => [...prev, movie]);
        break;
      case "On Hold":
        setOnHoldMovies((prev) => [...prev, movie]);
        break;
      case "Dropped":
        setDroppedMovies((prev) => [...prev, movie]);
        break;
      default:
        break;
    }
  }
  function removeMovieFromCategory(movieId, category) {
    const filterMovies = (movies) =>
      movies.filter((movie) => movie.id !== movieId);

    switch (category) {
      case "Finished":
        setFinishedMovies(filterMovies);
        break;
      case "Plan to Watch":
        setPlanToWatchMovies(filterMovies);
        break;
      case "On Hold":
        setOnHoldMovies(filterMovies);
        break;
      case "Dropped":
        setDroppedMovies(filterMovies);
        break;
      default:
        break;
    }
  }

  const value = {
    finishedMovies: finishedMovies,
    planToWatchMovies: planToWatchMovies,
    onHoldMovies: onHoldMovies,
    droppedMovies: droppedMovies,
    addMovieToCategory: addMovieToCategory,
    removeMovieFromCategory: removeMovieFromCategory,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export default MoviesContextProvider;
