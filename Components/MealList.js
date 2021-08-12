import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={props.meals}
        renderItem={renderMealItem}
        contentContainerStyle={{
          alignItems: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MealList;
