import React from "react";
import MealList from "../Components/MealList";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import CustomText from "../Components/CustomText";

const FavoriteScreen = (props) => {
  const favMeal = useSelector((state) => state.meals.favMeals);
  if (favMeal.length === 0 || !favMeal)
    return (
      <View style={styles.content}>
        <CustomText>No favorite meals yet! </CustomText>
        <CustomText>Start adding some</CustomText>
      </View>
    );
  return <MealList meals={favMeal} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FavoriteScreen;
