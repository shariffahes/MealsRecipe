import React from "react";
import { StyleSheet } from "react-native";
import MealsNavigator from "./Navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { useFonts } from "expo-font";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./Store/reducers/meals";
import { Provider } from "react-redux";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});
const store = createStore(rootReducer);

export default function App() {
  const [isFontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!isFontLoaded) return null;
  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
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
