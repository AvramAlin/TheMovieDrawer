import { createContext, useState } from "react";

export const CustomListsContext = createContext({
  customLists: [],
  addCustomList: (title) => {},
  deleteCustomList: (listId) => {},
  addMovieToCustomList: (listId, movie) => {},
  removeMovieFromCustomList: (listId, movieId) => {},
});

function CustomListsContextProvider({ children }) {
  const [customLists, setCustomLists] = useState([]);

  function addCustomList(title, movies = []) {
    setCustomLists((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((list) => list.id)) + 1 : 1;
      return [...prev, { id: newId, title: title, movies: movies }];
    });
  }

  const value = {
    customLists: customLists,
    addCustomList: addCustomList,
  };

  return (
    <CustomListsContext.Provider value={value}>
      {children}
    </CustomListsContext.Provider>
  );
}
export default CustomListsContextProvider;
