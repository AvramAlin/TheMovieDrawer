import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";

export default function CastInfo({ credits }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Cast:</Text>
      <FlatList
        horizontal
        data={credits.cast.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          if (item.profile_path)
            return (
              <View style={styles.castContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
                  }}
                  style={styles.castImage}
                />
                <Text style={styles.castName}>{item.name}</Text>
                <Text style={styles.castCharacter}>as {item.character}</Text>
              </View>
            );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 3,
    paddingHorizontal: 16,
  },
  castContainer: {
    width: 100,
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 1,
  },
  castImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginBottom: 4,
  },
  castName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  castCharacter: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
