import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import Colors from "../Constants/colors";
import { Platform } from "react-native";
import { CATEGORIES } from "../Data/dummy_data";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/HeaderButtons";

const Stack = createNativeStackNavigator();

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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Fav" iconName="ios-star" onPress={() => {}} />
        </HeaderButtons>
      ),
    };
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: Platform.select({
            ios: Colors.primary,
            android: "black",
          }),
        }}
      >
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerStyle: {
              backgroundColor: Platform.OS === "android" ? Colors.primary : "",
            },
            headerTintColor:
              Platform.OS === "android" ? "white" : Colors.primary,
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
    </NavigationContainer>
  );
};

export default MealsNavigator;
