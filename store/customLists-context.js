// context/CustomListsContext.js
import React, { createContext, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DATABASE } from "../firebase/firebaseConfig";
import { useEffect } from "react";

export const CustomListsContext = createContext({
  customLists: [],
  addCustomList: (title, description, movies) => {},
  deleteCustomList: (listId) => {},
  addMovieToCustomList: (listId, movie) => {},
  removeMovieFromCustomList: (listId, movieId) => {},
  getList: (listId) => {},
});

function CustomListsContextProvider({ children }) {
  const [customLists, setCustomLists] = useState([]);

  // Function to fetch customLists from Firestore for the current user
  async function fetchCustomLists(userId) {
    if (!userId) return;
    try {
      const userDocRef = doc(FIRESTORE_DATABASE, "users", userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists() && docSnap.data().customLists) {
        setCustomLists(docSnap.data().customLists);
      } else {
        // No customLists yet – clear state or default value
        setCustomLists([]);
      }
    } catch (error) {
      console.error("Error fetching customLists: ", error);
    }
  }

  // Listen for changes to the authenticated user and load appropriate data
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        // When a user is signed in, fetch their customLists
        fetchCustomLists(user.uid);
      } else {
        // When signing out, clear the state so that previous user's data isn't visible
        setCustomLists([]);
      }
    });

    return unsubscribe;
  }, []);

  // Helper function to update Firestore with the current customLists array
  async function updateFirestoreCustomLists(updatedLists) {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
    const userDocRef = doc(FIRESTORE_DATABASE, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        customLists: updatedLists,
      });
    } catch (error) {
      console.error("Error updating customLists in Firestore:", error);
      // Optionally, you can revert state changes or notify the user
    }
  }

  function addCustomList(title, description, movies = []) {
    setCustomLists((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((list) => list.id)) + 1 : 1;
      const newList = { id: newId, title, description, movies };
      const updatedLists = [...prev, newList];
      // Update Firestore with the new customLists array
      updateFirestoreCustomLists(updatedLists);
      return updatedLists;
    });
  }

  function deleteCustomList(listId) {
    setCustomLists((prev) => {
      const updatedLists = prev.filter((list) => list.id !== listId);
      updateFirestoreCustomLists(updatedLists);
      return updatedLists;
    });
  }

  function addMovieToCustomList(listId, movie) {
    setCustomLists((prev) => {
      const updatedLists = prev.map((list) => {
        if (list.id === listId) {
          return { ...list, movies: [...list.movies, movie] };
        }
        return list;
      });
      updateFirestoreCustomLists(updatedLists);
      return updatedLists;
    });
  }

  function removeMovieFromCustomList(listId, movieId) {
    setCustomLists((prev) => {
      const updatedLists = prev.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            movies: list.movies.filter((movie) => movie.id !== movieId),
          };
        }
        return list;
      });
      updateFirestoreCustomLists(updatedLists);
      return updatedLists;
    });
  }

  function getList(listId) {
    return customLists.find((list) => list.id === listId) || null;
  }

  const value = {
    customLists,
    addCustomList,
    deleteCustomList,
    addMovieToCustomList,
    removeMovieFromCustomList,
    getList,
  };

  return (
    <CustomListsContext.Provider value={value}>
      {children}
    </CustomListsContext.Provider>
  );
}

export default CustomListsContextProvider;
