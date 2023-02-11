import { NavigatorScreenParams , CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined,
    AddCustomRecipeScreen: undefined,
    RecipeDetailsScreen: {recipeId: number},
    RecipiesListScreen: undefined
}

export type RootTabParamList = {
    SearchByScreen: undefined,
    MyRecipiesScreen: undefined,
    ShoppingListScreen: undefined,
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList>,
  NativeStackScreenProps<RootStackParamList>
>;