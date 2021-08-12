import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../Constants/colors";
import { Platform } from "react-native";
import { CATEGORIES } from "../Data/dummy_data";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "../screens/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FilterScreen from "../screens/FilterScreen";

const Stack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const MainDrawer = createDrawerNavigator();
const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const drawerStyle = () => {
  return {
    drawerActiveTintColor: Colors.accentColor,
    headerTintColor: Platform.select({
      ios: Colors.primary,
      android: "#fff",
    }),
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerStyle: {
      backgroundColor: Platform.select({
        ios: "",
        android: Colors.primary,
      }),
    },
  };
};
const MealsNavigator = () => {
  const getRouteCatParams = ({ route }) => {
    const categoryId = route.params.categoryId;
    const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
    return {
      title: selectedCategory.title,
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? selectedCategory.color : "",
      },
    };
  };
  const getRouteDetailsParams = ({ route }) => {
    const name = route.params.title;
    return {
      title: name,
    };
  };

  const menuScreenDrawer = () => (
    <MainDrawer.Navigator screenOptions={drawerStyle}>
      <MainDrawer.Screen name="Categories" component={CategoriesScreen} />
      <MainDrawer.Screen name="Filter" component={FilterScreen} />
    </MainDrawer.Navigator>
  );

  const favScreenDrawer = () => (
    <MainDrawer.Navigator screenOptions={drawerStyle}>
      <MainDrawer.Screen name="Favorite Meals" component={FavoriteScreen} />
      <MainDrawer.Screen name="Filter" component={FilterScreen} />
    </MainDrawer.Navigator>
  );

  const HomeStackScreen = () => (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Platform.select({
          ios: Colors.primary,
          android: "black",
        }),
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={menuScreenDrawer}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        }}
      />
      <Stack.Screen
        name="Meals"
        component={CategoryMealsScreen}
        options={getRouteCatParams}
      />
      <Stack.Screen
        name="Details"
        component={MealDetailsScreen}
        options={getRouteDetailsParams}
      />
    </Stack.Navigator>
  );
  const FavStackScreen = () => (
    <FavStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <FavStack.Screen
        name="Favorites"
        component={favScreenDrawer}
        options={{ headerShown: false }}
      />
      <FavStack.Screen
        name="Details"
        component={MealDetailsScreen}
        options={getRouteDetailsParams}
      />
    </FavStack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor={Colors.accentColor}
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#fff" }}
        screenOptions={{
          tabBarActiveTintColor: Colors.accentColor,
          headerTintColor: Platform.select({
            ios: Colors.primary,
            android: "#fff",
          }),
          tabBarLabelStyle: {
            fontFamily: "open-sans",
          },
          headerShown: false,
          headerStyle: {
            backgroundColor: Platform.select({
              ios: "",
              android: Colors.primary,
            }),
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: (tabInfo) => (
              <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavStackScreen}
          options={{
            tabBarIcon: (tabInfo) => (
              <Ionicons name="ios-star" size={25} color={tabInfo.color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MealsNavigator;
