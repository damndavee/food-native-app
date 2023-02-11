import { createSelector } from "reselect";

import { RootState } from "../store";

import { RecipeType } from "./recipe.types";

export const isLoadingSelector = (state: RootState) => state.recipe.isLoading;
export const recipiesSelector = (state: RootState) => state.recipe.recipies;
export const myRecipiesSelector = (state: RootState) => state.recipe.myRecipies;
export const shoppingListSelector = (state: RootState) => state.recipe.shoppingList;

export const dishTypesSelector = createSelector(
    [myRecipiesSelector],
    (recipies) => {
        const dishTypes = recipies.map(r => r.dishTypes?.length !== 0 ? r.dishTypes : ['other']).flat();
        const dishTypesSet = new Set(dishTypes);
        
        return Array.from(dishTypesSet);
    }
);

export const typeRelatedDishesSelector = createSelector(
    [myRecipiesSelector, dishTypesSelector], 
    (recipies, types) => {
        const dishesTypeObject = types.reduce((acc, cur) => ({...acc, [cur]: []}), {});

        recipies.forEach((r) => {
            if(r.dishTypes.length === 0) dishesTypeObject['other'].push(r);

            r.dishTypes.forEach((d: string) => {
                dishesTypeObject[d].push(r);
            })      
        });
        
        return dishesTypeObject;
    }
);

export const selectedRecipeSelector = createSelector(
    [myRecipiesSelector, recipiesSelector], 
    (myRecipies, fetchedRecipies) => (recipeId: number) => {
        return myRecipies.find((recipe: RecipeType) => recipe.id === recipeId) ?? fetchedRecipies.find((recipe: RecipeType) => recipe.id === recipeId);
    }
);

export const recipeIsInMyRecipesSelector = createSelector(
    [myRecipiesSelector],
    (recipies) => (recipeId: number) => {
        return !!recipies.find((recipe: RecipeType) => recipe.id === recipeId);
    }
)

export const myRecipiesIdsSelector = createSelector(
    [myRecipiesSelector],
    (recipies) => recipies.map(r => r.id)
);