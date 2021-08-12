import { MEALS } from "../../Data/dummy_data";
import { SET_FILTERS, TOGGLE_FAV } from "../actions/mealsAction";

const initialState = {
  allMeals: MEALS,
  filteredMeals: MEALS,
  favMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const existingIndex = state.favMeals.findIndex(
        (meal) => meal.id === action.mealId
      );

      if (existingIndex !== -1) {
        const updatedFavMeals = [...state.favMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favMeals: updatedFavMeals };
      } else {
        const meal = state.allMeals.find((m) => m.id == action.mealId);

        return { ...state, favMeals: state.favMeals.concat(meal) };
      }
    case SET_FILTERS:
      const filtersSetting = action.filters;

      const filteredMeals = state.allMeals.filter((meal) => {
        if (filtersSetting.glutenFree && !meal.isGlutenFree) return false;
        if (filtersSetting.lactoseFree && !meal.isLactoseFree) return false;
        if (filtersSetting.vegeterian && !meal.isVegeterian) return false;
        if (filtersSetting.vegan && !meal.isVegan) return false;
        return true;
      });
      return { ...state, filteredMeals: filteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
