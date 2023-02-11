import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecipeService } from "../../services/recipe.service";

export const getRecipeByQueryThunk = createAsyncThunk('recipe/GET_RECIPE_BY_QUERY', (query: string) => RecipeService.getRecipeByQuery(query));
export const getRecipeByCustomPropertyThunk = createAsyncThunk('recipe/GET_RECIPE_BY_CUSTOM_PROPERTY', (queryData: {type: string, query: string[]}) => RecipeService.getRecipeByCustomProperty(queryData));
export const getRecipeDetailsThunk = createAsyncThunk('recipe/GET_RECIPE_DETAILS', (id: number) => RecipeService.getRecipeDetails(id));
export const getAllRecipiesDetailsThunk = createAsyncThunk('recipe/GET_ALL_RECIPIES_DETAILS', (idArray: number[]) => RecipeService.getAllGivenRecipiesDetails(idArray));