import React from "react";
import MealList from "../Components/MealList";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import CustomText from "../Components/CustomText";

const CategoryMealsScreen = (props) => {
  const { categoryId } = props.route.params;
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const meals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (meals.length === 0 || !meals)
    return (
      <View style={styles.emptyMsg}>
        <CustomText>No meals found</CustomText>
        <CustomText>Maybe check your filters!</CustomText>
      </View>
    );

  return <MealList meals={meals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  emptyMsg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CategoryMealsScreen;
