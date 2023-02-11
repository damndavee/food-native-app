import { combineReducers } from '@reduxjs/toolkit';

import recipeReducer from "./recipe/recipe.reducer";

export const rootReducer = combineReducers({
  recipe: recipeReducer
});
