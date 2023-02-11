import { ComponentType, useCallback} from "react";
import { shoppingListSelector } from "../store/recipe/recipe.selector";
import { ShoppingRecipeType } from "../store/recipe/recipe.types";
import { removeFromShoppingList, checkIngredient } from "../store/recipe/recipe.reducer";
import { useAppSelector, useAppDispatch } from "../store/store";

export type ShoppingListProps= {
    shoppingList: ShoppingRecipeType[];
    onRemove: (id: number) => void;
    onCheckIngredient: (recipeId: number, ingredientId: number) => void;
};

const withShoppingListScreen = (DumbComponent: ComponentType<ShoppingListProps>) => () => {
    const dispatch = useAppDispatch();

    const shoppingList = useAppSelector(shoppingListSelector);

    const handleRemoveShoppingItem = useCallback((id: number) => {
        dispatch(removeFromShoppingList(id));
    }, []);

    const handleCheckIngredient = useCallback((recipeId: number, ingredientId: number) => {
        dispatch(checkIngredient({recipeId, ingredientId}));
    }, []);

    return (
        <DumbComponent 
            shoppingList={shoppingList} 
            onRemove={handleRemoveShoppingItem}
            onCheckIngredient={handleCheckIngredient}
        />
    )
}

export default withShoppingListScreen;