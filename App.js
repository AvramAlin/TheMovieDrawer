import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ListsScreen from "./screens/ListsScreen/ListsScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GlobalStyles } from "./assets/colors/GlobalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FinishedList from "./screens/MoviesScreen/FinishedList";
import OnHoldList from "./screens/MoviesScreen/OnHoldList";
import DroppedList from "./screens/MoviesScreen/DroppedList";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PlanToWatchList from "./screens/MoviesScreen/PlantToWatchList";
import PopularMoviesScreen from "./screens/HomeScreen/PopularMoviesScreen";
import TopRatedMoviesScreen from "./screens/HomeScreen/TopRatedMoviesScreen";
import NowPlayingMoviesScreen from "./screens/HomeScreen/NowPlayingMoviesScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import MoviesContextProvider from "./store/movies-context";
import SearchScreen from "./screens/HomeScreen/SearchScreen";
import SearchIcon from "./components/UI/SearchIcon";
import UpcomingMoviesScreen from "./screens/HomeScreen/UpcomingMoviesScreen";
import { LinearGradient } from "expo-linear-gradient";
import CustomListsContextProvider from "./store/customLists-context";
import ListOpened from "./components/CustomLists/ListOpened";
import SearchCustomListMovie from "./screens/ListsScreen/SearchCustomListMovie";
import SignInScreen from "./screens/LoginScreen/SignInScreen";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase/firebaseConfig";
import FavoriteMoviesContextProvider from "./store/favorite-context";
import FavoritesScreen from "./screens/ProfileScreen/FavoritesScreen";

const BottomTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ListsStack = createNativeStackNavigator();
const MoviesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const LoginStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeTopTabScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MovieDetailsHome"
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <HomeStack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
}

function HomeTopTabScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          elevation: 2, // Remove shadow on Android
          shadowOpacity: 0.5, // Remove shadow on iOS
          borderBottomWidth: 0,
          paddingVertical: 2,
        },
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.accent500,
          height: 3,
          borderRadius: 3,
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          textTransform: "none", // Removes all caps
          fontFamily: "dmsans-bold",
          fontSize: 14,
        },
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 11,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.text500,
        tabBarPressColor: GlobalStyles.colors.primary600, // R
      }}
    >
      <TopTab.Screen
        name="PopularMovies"
        component={PopularMoviesScreen}
        options={{ title: "Popular" }}
      />
      <TopTab.Screen
        name="TopRatedMovies"
        component={TopRatedMoviesScreen}
        options={{ title: "Top Rated" }}
      />
      <TopTab.Screen
        name="NowPlayingMovies"
        component={NowPlayingMoviesScreen}
        options={{ title: "Now Playing" }}
      />
      <TopTab.Screen
        name="UpcomingMovies"
        component={UpcomingMoviesScreen}
        options={{ title: "Upcoming" }}
      />
    </TopTab.Navigator>
  );
}

function MoviesTopTabScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          elevation: 2, // Remove shadow on Android
          shadowOpacity: 0.5, // Remove shadow on iOS
          borderBottomWidth: 0,
          paddingVertical: 2,
        },
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.accent500,
          height: 3,
          borderRadius: 3,
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          textTransform: "none", // Removes all caps
          fontFamily: "dmsans-bold",
          fontSize: 14,
        },
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 12,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.text500,
        tabBarPressColor: GlobalStyles.colors.primary600, // R
      }}
    >
      <TopTab.Screen name="Finished" component={FinishedList} />
      <TopTab.Screen name="Plan To Watch" component={PlanToWatchList} />
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
      <MoviesStack.Screen
        name="MovieDetailsMovies"
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
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
      <ListsStack.Screen
        name="ListOpened"
        component={ListOpened}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <ListsStack.Screen
        name="ListSearchMovie"
        component={SearchCustomListMovie}
        options={{
          presentation: "modal",
          title: "Add Movie",
          headerShown: false,
        }}
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
      <ProfileStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <FavoriteMoviesContextProvider>
        <MoviesContextProvider>
          <CustomListsContextProvider>
            <NavigationContainer>
              {!user ? (
                <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                  <LoginStack.Screen name="SignIn" component={SignInScreen} />
                </LoginStack.Navigator>
              ) : (
                <BottomTab.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: GlobalStyles.colors.primary500,
                    },
                    headerTintColor: GlobalStyles.colors.text500,
                    tabBarStyle: {
                      backgroundColor: GlobalStyles.colors.primary500,
                    },
                    tabBarActiveTintColor: GlobalStyles.colors.accent500,
                    tabBarLabelStyle: { fontFamily: "dmsans-light" },
                    headerTitleStyle: {
                      fontFamily: "dmsans-bold",
                      fontSize: 25,
                      alignSelf: "center",
                      paddingBottom: 5,
                    },
                    headerTitle: "TheMovieDrawer",
                    headerBackground: () => (
                      <LinearGradient
                        colors={[
                          GlobalStyles.colors.primary700,
                          GlobalStyles.colors.primary500,
                        ]}
                        style={{ flex: 1 }}
                      />
                    ),
                  }}
                >
                  <BottomTab.Screen
                    name="HomeTab"
                    component={HomeStackScreen}
                    options={({ navigation }) => ({
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                      ),
                      title: "Home",
                      tabBarLabel: "Home",
                      headerRight: ({ tintColor }) => (
                        <SearchIcon
                          tintColor={tintColor}
                          onPress={() => {
                            navigation.navigate("HomeTab", {
                              screen: "SearchHome",
                            });
                          }}
                        />
                      ),
                    })}
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
              )}
            </NavigationContainer>
          </CustomListsContextProvider>
        </MoviesContextProvider>
      </FavoriteMoviesContextProvider>
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
