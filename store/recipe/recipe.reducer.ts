import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRecipeByQueryThunk, getRecipeByCustomPropertyThunk, getAllRecipiesDetailsThunk } from "./recipe.thunk";
import { RecipeType, ShoppingRecipeType } from "../recipe/recipe.types";

type SliceState = {
    shoppingList: ShoppingRecipeType[]
    recipies: RecipeType[],
    myRecipies: any[],
    isLoading: boolean,
}

type Reducers = {
    clearRecipies: (state: SliceState) => void;
    clearMyRecipies: (state: SliceState) => void;
    clearShoppingList: (state: SliceState) => void;
    setMyRecipies: (state: SliceState, action: PayloadAction<RecipeType[]>) => void;
    addToShoppingList: (state: SliceState, action: PayloadAction<RecipeType>) => void;
    addToMyRecipies: (state: SliceState, action: PayloadAction<RecipeType>) => void;
    removeFromMyRecipies: (state: SliceState, action: PayloadAction<number>) => void;
    removeFromShoppingList: (state: SliceState, action: PayloadAction<number>) => void;
    checkIngredient: (state: SliceState, action: PayloadAction<{recipeId: number, ingredientId: number}>) => void;
}

const slice = createSlice({
    name: 'recipeReducer',
    initialState: {
        shoppingList: [],
        recipies: [],
        myRecipies: [],
        isLoading: false,
    } as SliceState,
    reducers: {
        clearRecipies: (state) => {
            state.recipies = [];
        },
        clearMyRecipies: (state) => {
            state.myRecipies = [];
        },
        clearShoppingList: (state) => {
            state.shoppingList = [];
        },
        setMyRecipies: (state, action) => {
            state.myRecipies = action.payload;
        },
        addToMyRecipies: (state, action) => {
            state.myRecipies.push(action.payload);
        },
        removeFromMyRecipies: (state, action) => {
            const index = state.myRecipies.map(r => r.id).indexOf(action.payload);
            state.myRecipies.splice(index, 1);
        },
        addToShoppingList: (state, action) => {
            const extractedRecipeData: ShoppingRecipeType = {
                id: action.payload.id,
                title: action.payload.title,
                image: action.payload.image,
                ingredients: action.payload.extendedIngredients.map((i: any) => ({
                    id: i.id,
                    name: i.name,
                    amount: Math.ceil(i.amount),
                    measure: {
                        amount: !!i.measures ? Math.ceil(i.measures.metric?.amount) : Math.ceil(i.measure.amount),
                        unit: !!i.measures ? i.measures.metric?.unitShort : i.measure.unit,
                    },
                    isChecked: false,
                    isValid: true,
                }))
            }

            state.shoppingList.push(extractedRecipeData);
        },
        removeFromShoppingList: (state, action) => {
            const index = state.shoppingList.map(r => r.id).indexOf(action.payload);
            state.shoppingList.splice(index, 1);
        },
        checkIngredient: (state, action) => {
            const {recipeId, ingredientId} = action.payload;
            const shoppingItemIndex = state.shoppingList.map(r => r.id).indexOf(recipeId);
            const ingredientIndex = state.shoppingList[shoppingItemIndex].ingredients.map(r => r.id).indexOf(ingredientId);
            
            const foundIngredient = state.shoppingList[shoppingItemIndex].ingredients[ingredientIndex];

            state.shoppingList[shoppingItemIndex].ingredients[ingredientIndex] = {
                ...foundIngredient,
                isChecked: !foundIngredient.isChecked
            }
        }
    } as Reducers,
    extraReducers: builder => {
        builder.addCase(getRecipeByQueryThunk.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getRecipeByQueryThunk.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getRecipeByQueryThunk.fulfilled, (state, action) => {
            state.recipies = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getRecipeByCustomPropertyThunk.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getRecipeByCustomPropertyThunk.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getRecipeByCustomPropertyThunk.fulfilled, (state, action) => {
            state.recipies = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getAllRecipiesDetailsThunk.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getAllRecipiesDetailsThunk.rejected, state => {
            state.isLoading = false;
        });
        builder.addCase(getAllRecipiesDetailsThunk.fulfilled, (state, action) => {
            state.myRecipies = action.payload;
            state.isLoading = false;
        });
    }
});

export const { 
    clearRecipies, 
    setMyRecipies, 
    clearShoppingList, 
    clearMyRecipies, 
    addToShoppingList, 
    addToMyRecipies, 
    removeFromMyRecipies,
    removeFromShoppingList,
    checkIngredient
} = slice.actions;
export default slice.reducer;
