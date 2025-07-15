// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getSharedList = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const listId = req.query.listId;
    const userId = req.query.userId;

    if (!listId || !userId) {
      return res
        .status(400)
        .json({ error: "Missing listId or userId parameter" });
    }

    // Get the user document
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    const customLists = userData.customLists || [];

    // Find the specific list
    let requestedList = customLists.find((list) => list.id === listId);
    requestedList = {
      ...requestedList,
      userNameFirebase: userData.userDetails.username,
    };

    if (!requestedList) {
      return res.status(404).json({ error: "List not found" });
    }

    // Return the list data
    return res.json(requestedList);
  } catch (error) {
    console.error("Error retrieving shared list:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
