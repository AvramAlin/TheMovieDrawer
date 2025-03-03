import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ListsScreen from "./screens/ListsScreen/ListsScreen";
import MoviesScreen from "./screens/MoviesScreen/MoviesScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "./assets/colors/GlobalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FinishedList from "./screens/MoviesScreen/FinishedList";
import WatchingList from "./screens/MoviesScreen/WatchingList";
import OnHoldList from "./screens/MoviesScreen/OnHoldList";
import DroppedList from "./screens/MoviesScreen/DroppedList";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const BottomTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ListsStack = createNativeStackNavigator();
const MoviesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function MoviesTopTabScreen() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Finished" component={FinishedList} />
      <TopTab.Screen name="Watching" component={WatchingList} />
      <TopTab.Screen name="On Hold" component={OnHoldList} />
      <TopTab.Screen name="Dropped" component={DroppedList} />
    </TopTab.Navigator>
  );
}

function MoviesStackScreen() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen
        name="MoviesStack"
        component={MoviesTopTabScreen}
        options={{ headerShown: false }}
      />
    </MoviesStack.Navigator>
  );
}

function ListsStackScreen() {
  return (
    <ListsStack.Navigator>
      <ListsStack.Screen
        name="ListsStack"
        component={ListsScreen}
        options={{ headerShown: false }}
      />
    </ListsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded, error] = useFonts({
    "dmsans-light": require("./assets/fonts/DMSans-Light.ttf"),
    "dmsans-bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: GlobalStyles.colors.text500,
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarLabelStyle: { fontFamily: "dmsans-light" },
          }}
        >
          <BottomTab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
              title: "Home",
              tabBarLabel: "Home",
            }}
          />
          <BottomTab.Screen
            name="MoviesTab"
            component={MoviesStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="movie" color={color} size={size} />
              ),
              title: "Movies",
              tabBarLabel: "Movies",
            }}
          />
          <BottomTab.Screen
            name="ListsTab"
            component={ListsStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
              title: "Lists",
              tabBarLabel: "Lists",
            }}
          />
          <BottomTab.Screen
            name="ProfileTab"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
              title: "Profile",
              tabBarLabel: "Profile",
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
