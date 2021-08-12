import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { StyleSheet, View, Text, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/HeaderButtons";
import Colors from "../Constants/colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../Store/actions/mealsAction";

const MySwitch = (props) => (
  <View style={styles.filterContainer}>
    <Text style={styles.title}> {props.label}</Text>
    <Switch
      value={props.value}
      thumbColor={Platform.OS == "android" ? Colors.primary : "white"}
      onValueChange={(value) => props.onToggle(value)}
      trackColor={{
        true: Colors.accentColor,
        false: "grey",
      }}
    />
  </View>
);
const FilterScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const filters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegeterian: isVegeterian,
    };

    dispatch(setFilters(filters));
  }, [isGlutenFree, isLactoseFree, isVegeterian, isVegan, dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName="ios-save"
            name="Save"
            onPress={() => {
              saveFilters();
            }}
            color={Colors.accentColor}
          />
        </HeaderButtons>
      ),
    });
  }, [saveFilters, navigation]);

  return (
    <View style={styles.screen}>
      <MySwitch
        label="Gluten-Free"
        value={isGlutenFree}
        onToggle={(value) => setIsGlutenFree(value)}
      />

      <MySwitch
        label="Vegan-Only"
        value={isVegan}
        onToggle={(value) => setIsVegan(value)}
      />

      <MySwitch
        label="Lactose-Free"
        value={isLactoseFree}
        onToggle={(value) => setIsLactoseFree(value)}
      />
      <MySwitch
        label="vegeterian"
        value={isVegeterian}
        onToggle={(value) => setIsVegeterian(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default FilterScreen;
