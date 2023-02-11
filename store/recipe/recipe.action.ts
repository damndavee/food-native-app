import { createAction } from 'redux-actions';
import { RecipeType } from "./recipe.types";

export const getRecipeByQueryAction = createAction('recipe/GET_RECIPE_BY_QUERY');
export const getRecipeByCustomPropertyAction = createAction('recipe/GET_RECIPE_BY_CUSTOM_PROPERTY');
export const storeAllRecipiesAction = createAction('recipe/STORE_ALL_RECIPIES');
export const sortRecipiesAction = createAction('recipe/SORT_RECIPIES');