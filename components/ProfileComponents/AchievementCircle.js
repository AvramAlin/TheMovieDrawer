// components/ProfileComponents/AchievementCircle.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../assets/colors/GlobalStyles";

export default function AchievementCircle({
  icon,
  color,
  progress,
  total,
  label,
  description,
}) {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(progress / total, 1);
  const strokeDashoffset = circumference * (1 - progressPercent);
  const completed = progress >= total;

  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#333"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.iconOverlay}>
          <Ionicons name={icon} size={32} color={color} />
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
      {completed ? (
        <View style={styles.completedRow}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={color}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.completedText, { color: color }]}>
            Completed
          </Text>
        </View>
      ) : (
        <Text style={styles.progressText}>
          {progress}/{total}
        </Text>
      )}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 16,
    width: 120,
  },
  svgContainer: {
    position: "relative",
    marginBottom: 8,
  },
  iconOverlay: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  label: {
    fontFamily: "dmsans-bold",
    color: GlobalStyles.colors.background500,
    fontSize: 15,
    marginTop: 2,
    textAlign: "center",
  },
  progressText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  completedText: {
    fontSize: 13,
    fontFamily: "dmsans-bold",
  },
  description: {
    color: "#999",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
});
