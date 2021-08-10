import React from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import MealItem from "../Components/MealItem";
import { MEALS } from "../Data/dummy_data";

const CategoryMealsScreen = (props) => {
  const { categoryId } = props.route.params;

  const renderMealItem = (data) => {
    return (
      <MealItem
        onSelectMeal={() => {
          props.navigation.navigate("Details", {
            title: data.item.title,
            id: data.item.id,
          });
        }}
        item={data.item}
      />
    );
  };

  const meals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={meals}
        renderItem={renderMealItem}
        contentContainerStyle={{
          alignItems: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CategoryMealsScreen;
