import { ComponentType, useLayoutEffect, useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from '../store/store';
import { selectedRecipeSelector, recipeIsInMyRecipesSelector, myRecipiesIdsSelector } from "../store/recipe/recipe.selector";
import { addToShoppingList, addToMyRecipies, removeFromMyRecipies } from "../store/recipe/recipe.reducer";
import { RecipeType } from '../store/recipe/recipe.types';
import { getAllRecipiesDetailsThunk } from "../store/recipe/recipe.thunk";
import { Colors } from '../utils/constants';
import IconButton from '../components/IconButton';
import { RootStackParamList } from '../utils/types';
import { NavigationScreens } from '../navigation';

export type RecipieDetailsProps = {
    recipe: RecipeType
}

const withRecipeDetailsScreen = (DumbComponent: ComponentType<RecipieDetailsProps>) => () => {
    const { params } = useRoute<RouteProp<RootStackParamList, 'RecipeDetailsScreen'>>();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const selectedRecipe = useAppSelector(selectedRecipeSelector)(params?.recipeId);
    const recipeIsInMyRecipes = useAppSelector(recipeIsInMyRecipesSelector)(params?.recipeId);
    const myRecipiesIds = useAppSelector(myRecipiesIdsSelector);

    const handleAddToShoppingList = () => {
      dispatch(addToShoppingList(selectedRecipe));
      navigation.navigate(NavigationScreens.SHOPPING_LIST_SCREEN);
    };

    const toggleRecipeStatus = () => {
      if(recipeIsInMyRecipes) {
        dispatch(removeFromMyRecipies(params?.recipeId));
      } else {
        dispatch(addToMyRecipies(selectedRecipe));
        dispatch(getAllRecipiesDetailsThunk([...myRecipiesIds, params?.recipeId]) as any);
      }

      navigation.goBack();
    }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          return (
            <>
              <IconButton name={recipeIsInMyRecipes ? 'heart' : 'heart-outline'} color={Colors.text} onPress={toggleRecipeStatus} />
              <IconButton name="cart" color={Colors.text} onPress={handleAddToShoppingList} />
            </>
          )
        }
      })
    }, [navigation, handleAddToShoppingList]);

    return (
        <DumbComponent recipe={selectedRecipe} />
    )
}

export default withRecipeDetailsScreen;