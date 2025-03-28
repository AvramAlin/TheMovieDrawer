// context/UserDetailsContext.js
import React, { createContext, useState, useEffect } from "react";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DATABASE } from "../firebase/firebaseConfig";

// Default avatar style from DiceBear
const DICEBEAR_API = "https://api.dicebear.com/6.x/fun-emoji/png";

export const UserDetailsContext = createContext({
  userDetails: { username: "", profilePicture: "" },
  updateUsername: (newUsername) => {},
  updateProfilePicture: (seed) => {},
  generateRandomAvatar: () => {},
});

function UserDetailsContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    profilePicture: `${DICEBEAR_API}`,
  });

  // Function to fetch user details from Firestore for the current user
  async function fetchUserDetails(userId) {
    if (!userId) return;
    try {
      const userDocRef = doc(FIRESTORE_DATABASE, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // Check if userDetails exists in the document
        if (docSnap.data().userDetails) {
          setUserDetails(docSnap.data().userDetails);
        } else {
          // If userDetails doesn't exist but the document does, initialize it
          const email = FIREBASE_AUTH.currentUser?.email || "";
          const defaultUsername = email.split("@")[0] || "User";
          const defaultAvatar = `${DICEBEAR_API}?seed=${defaultUsername}`;

          const newUserDetails = {
            username: defaultUsername,
            profilePicture: defaultAvatar,
          };

          // Update the existing document with the new userDetails field
          await updateDoc(userDocRef, {
            userDetails: newUserDetails,
          });

          setUserDetails(newUserDetails);
        }
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  }

  // Listen for changes in auth state and fetch the corresponding user details
  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        fetchUserDetails(user.uid);
      } else {
        setUserDetails({
          username: "",
          profilePicture: `${DICEBEAR_API}?seed=default`,
        });
      }
    });

    return unsubscribe;
  }, []);

  // Helper function to update the Firestore document with userDetails
  async function updateFirestoreUserDetails(updatedDetails) {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const userDocRef = doc(FIRESTORE_DATABASE, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        userDetails: updatedDetails,
      });
    } catch (error) {
      console.error("Error updating user details in Firestore:", error);
    }
  }

  // Update username
  function updateUsername(newUsername) {
    setUserDetails((prev) => {
      const updatedDetails = {
        ...prev,
        username: newUsername,
      };

      updateFirestoreUserDetails(updatedDetails);
      return updatedDetails;
    });
  }

  // Update profile picture with a specific seed
  function updateProfilePicture(seed) {
    const newAvatarUrl = `${DICEBEAR_API}?seed=${seed}`;

    setUserDetails((prev) => {
      const updatedDetails = {
        ...prev,
        profilePicture: newAvatarUrl,
      };

      updateFirestoreUserDetails(updatedDetails);
      return updatedDetails;
    });
  }

  // Generate a random avatar
  function generateRandomAvatar() {
    const randomSeed = Math.random().toString(36).substring(2, 10);
    updateProfilePicture(randomSeed);
  }

  const value = {
    userDetails,
    updateUsername,
    updateProfilePicture,
    generateRandomAvatar,
  };

  return (
    <UserDetailsContext.Provider value={value}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailsContextProvider;
