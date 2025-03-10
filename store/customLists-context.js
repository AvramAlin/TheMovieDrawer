import { createContext, useState } from "react";

export const CustomListsContext = createContext({
  customLists: [],
  addCustomList: (title) => {},
  deleteCustomList: (listId) => {},
  addMovieToCustomList: (listId, movie) => {},
  removeMovieFromCustomList: (listId, movieId) => {},
  getList: (listId) => {},
});

function CustomListsContextProvider({ children }) {
  const [customLists, setCustomLists] = useState([]);

  function addCustomList(title, description, movies = []) {
    setCustomLists((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((list) => list.id)) + 1 : 1;
      return [
        ...prev,
        { id: newId, title: title, description: description, movies: movies },
      ];
    });
  }

  function deleteCustomList(listId) {
    setCustomLists((prev) => prev.filter((list) => list.id !== listId));
  }

  function addMovieToCustomList(listId, movie) {
    setCustomLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, movies: [...list.movies, movie] } : list
      )
    );
  }

  function removeMovieFromCustomList(listId, movieId) {
    setCustomLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              movies: list.movies.filter((movie) => movie.id !== movieId),
            }
          : list
      )
    );
  }

  function getList(listId) {
    return customLists.find((list) => list.id === listId) || null;
  }

  const value = {
    customLists: customLists,
    addCustomList: addCustomList,
    deleteCustomList: deleteCustomList,
    addMovieToCustomList: addMovieToCustomList,
    removeMovieFromCustomList: removeMovieFromCustomList,
    getList: getList,
  };

  return (
    <CustomListsContext.Provider value={value}>
      {children}
    </CustomListsContext.Provider>
  );
}
export default CustomListsContextProvider;
