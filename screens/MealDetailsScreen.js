import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import CustomText from "../Components/CustomText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../Store/actions/mealsAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/HeaderButtons";
import Colors from "../Constants/colors";

const ingredientsList = (ingredient, index) => {
  return (
    <CustomText key={index} style={styles.ingredientItem}>
      {ingredient}
    </CustomText>
  );
};

const MealDetailsScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.allMeals);
  const selectedMeal = availableMeals.find(
    (meal) => meal.id === props.route.params.id
  );

  const dispatch = useDispatch();

  const onToggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(selectedMeal.id));
  }, [dispatch, selectedMeal.id]);
  const isFav = useSelector((state) =>
    state.meals.favMeals.some((meal) => meal.id === selectedMeal.id)
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Fav"
            iconName="ios-star"
            onPress={onToggleFavHandler}
            color={isFav ? Colors.accentColor : "grey"}
          />
        </HeaderButtons>
      ),
    });
  }, [onToggleFavHandler, isFav]);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
      nestedScrollEnabled={true}
    >
      <View style={{ width: "100%", height: 400 }}>
        <Image
          source={{
            uri: selectedMeal.imageURL,
          }}
          style={styles.imageStyle}
        />
      </View>

      <CustomText style={styles.subTitle}>Ingredients</CustomText>
      <View style={styles.ingredientContainer}>
        <ScrollView
          style={{ width: "100%", margin: 5 }}
          contentContainerStyle={{ alignItems: "center" }}
          nestedScrollEnabled={true}
        >
          {selectedMeal.ingredients.map((ingredient, index) =>
            ingredientsList(ingredient, index)
          )}
        </ScrollView>
      </View>
      <CustomText style={styles.subTitle}>Instructions</CustomText>
      <View style={styles.instructionContainer}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          nestedScrollEnabled={true}
        >
          {selectedMeal.steps.map((step, index) => (
            <View
              key={index}
              style={{
                padding: 6,
                alignSelf: "center",
                width: "96%",
                borderBottomColor: "grey",
                borderBottomWidth: 1,
              }}
            >
              <CustomText style={styles.instructions}>
                <Text style={{ color: "red" }}>#{index + 1} </Text>
                {step}
              </CustomText>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  subTitle: {
    textAlign: "center",
    margin: 4,
    fontSize: 28,
    fontFamily: "open-sans-bold",
  },
  ingredientContainer: {
    width: "75%",
    height: "25%",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 6,
  },
  ingredientItem: {
    padding: 8,
    width: "90%",
    backgroundColor: "#FFBF00",
    margin: 4,
    fontSize: 16,
  },
  instructionContainer: {
    backgroundColor: "white",
    width: "75%",
    height: "25%",
    borderRadius: 12,
    borderWidth: 1,
    margin: 4,
    padding: 6,
  },
  instructions: {
    fontSize: 18,
    margin: 5,
  },
});

export default MealDetailsScreen;
