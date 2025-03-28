import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { UserDetailsContext } from "../../store/userDetails-context";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

// Predefined seeds for fun emoji avatars
const AVATAR_SEEDS = [
  // Positive emotions
  "smile",
  "happy",
  "joy",
  "excited",
  "cheerful",
  "bliss",
  "delight",
  "ecstatic",
  "thrilled",
  "content",

  // Playful personalities
  "cool",
  "silly",
  "goofy",
  "funny",
  "quirky",
  "wacky",
  "zany",
  "mischievous",
  "playful",
  "cheeky",

  // Cute and friendly
  "cute",
  "adorable",
  "sweet",
  "friendly",
  "bubbly",
  "cuddly",
  "fluffy",
  "charming",
  "lovely",
  "precious",

  // Activities and states
  "party",
  "chill",
  "sleepy",
  "dreamy",
  "relaxed",
  "dancing",
  "singing",
  "gaming",
  "reading",
  "thinking",

  // Character types
  "nerdy",
  "sporty",
  "artsy",
  "fancy",
  "hipster",
  "trendy",
  "retro",
  "cosmic",
  "magical",
  "mystical",

  // Surprised reactions
  "shocked",
  "surprised",
  "amazed",
  "astonished",
  "stunned",
  "startled",
  "wowed",
  "dazzled",
  "speechless",
  "mindblown",

  // Confused expressions
  "confused",
  "puzzled",
  "perplexed",
  "curious",
  "wondering",
  "baffled",
  "bewildered",
  "uncertain",
  "doubtful",
  "skeptical",

  // Food-themed
  "cookie",
  "pizza",
  "taco",
  "donut",
  "icecream",
  "candy",
  "burger",
  "sushi",
  "cupcake",
  "pancake",

  // Nature-themed
  "sunny",
  "rainbow",
  "starry",
  "cloudy",
  "flowery",
  "leafy",
  "ocean",
  "forest",
  "mountain",
  "garden",

  // Seasonal
  "summer",
  "winter",
  "autumn",
  "spring",
  "holiday",
  "festive",
  "snowy",
  "beachy",
  "cozy",
  "breezy",
];

const DICEBEAR_API = "https://api.dicebear.com/6.x/fun-emoji/png";

export default function ProfilePictureSelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [loadingImages, setLoadingImages] = useState({});
  const userDetailsContext = useContext(UserDetailsContext);

  useEffect(() => {
    // Initialize loadingImages state for all avatar seeds
    const initialLoadingState = AVATAR_SEEDS.reduce((acc, seed) => {
      acc[seed] = true; // Set all seeds to true (loading)
      return acc;
    }, {});
    setLoadingImages(initialLoadingState);
  }, []);

  const handleSelectAvatar = (seed) => {
    setSelectedSeed(seed);
  };

  const handleSaveAvatar = () => {
    if (selectedSeed) {
      userDetailsContext.updateProfilePicture(selectedSeed);
    }
    setModalVisible(false);
    setSelectedSeed(null);
  };

  const handleRandomAvatar = () => {
    userDetailsContext.generateRandomAvatar();
    setModalVisible(false);
    setSelectedSeed(null);
  };

  const handleImageLoad = (seed) => {
    setLoadingImages((prev) => ({ ...prev, [seed]: false }));
  };

  const renderAvatarOption = ({ item }) => {
    const avatarUrl = `${DICEBEAR_API}?seed=${item}`;
    const isSelected = selectedSeed === item;

    return (
      <TouchableOpacity
        style={[styles.avatarOption, isSelected && styles.selectedAvatarOption]}
        onPress={() => handleSelectAvatar(item)}
      >
        <View style={styles.avatarImageContainer}>
          {loadingImages[item] && (
            <ActivityIndicator
              size="small"
              color={GlobalStyles.colors.primary400}
              style={styles.loader}
            />
          )}
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
            onLoad={() => handleImageLoad(item)}
          />
        </View>
        <Text style={styles.seedName}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign
          name="picture"
          size={24}
          color={GlobalStyles.colors.background700}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose an Avatar</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color={GlobalStyles.colors.dark500}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={AVATAR_SEEDS}
              renderItem={renderAvatarOption}
              keyExtractor={(item) => item}
              numColumns={3}
              contentContainerStyle={styles.avatarGrid}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.randomButton]}
                onPress={handleRandomAvatar}
              >
                <Text style={styles.buttonText}>Random</Text>
                <Ionicons
                  name="shuffle"
                  size={18}
                  color={GlobalStyles.colors.background700}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  !selectedSeed && styles.disabledButton,
                ]}
                onPress={handleSaveAvatar}
                disabled={!selectedSeed}
              >
                <Text style={styles.buttonText}>Save</Text>
                <Ionicons
                  name="checkmark"
                  size={18}
                  color={GlobalStyles.colors.background700}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  editButton: {
    backgroundColor: GlobalStyles.colors.dark500,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.background700,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: GlobalStyles.colors.background300,
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.dark500,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.dark500,
  },
  avatarGrid: {
    paddingVertical: 10,
  },
  avatarOption: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.background400,
  },
  selectedAvatarOption: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.dark500,
  },
  avatarImageContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  seedName: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: "dmsans-medium",
    color: GlobalStyles.colors.background700,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.background500,
    paddingTop: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 120,
  },
  randomButton: {
    backgroundColor: GlobalStyles.colors.dark500,
  },
  saveButton: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    marginRight: 8,
  },
  loader: {
    position: "absolute",
  },
});
