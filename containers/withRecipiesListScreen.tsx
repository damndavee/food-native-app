import { ComponentType, useLayoutEffect } from "react";
import { Menu, Button, ThreeDotsIcon } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { isLoadingSelector, recipiesSelector } from "../store/recipe/recipe.selector";
import { RecipeType } from "../store/recipe/recipe.types";
import { storeAllRecipiesAction } from "../store/recipe/recipe.action";
import { Colors } from "../utils/constants";
import { RootTabScreenProps } from "../utils/types";
import { NavigationScreens } from "../navigation";
import IconButton from "../components/IconButton";

export type RecipiesListProps = {
    isLoading: boolean;
    recipies: RecipeType[];
}

const withRecipiesListScreen = (DumbComponent: ComponentType<RecipiesListProps>) => () => {
    const navigation = useNavigation<RootTabScreenProps>();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const recipies = useAppSelector(recipiesSelector);

    const handleSortRecipies = () => console.log("CLICKED!@!@");

    const handleStoreFetchedRecipies = () => {
        dispatch(storeAllRecipiesAction());
        navigation.navigate(NavigationScreens.MY_RECIPIES);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Menu 
                        w="160" shouldOverlapWithTrigger={false} // @ts-ignore
                        placement="bottom right" 
                        trigger={triggerProps => {
                            return (
                                <Button variant="ghost" {...triggerProps}>
                                    <ThreeDotsIcon color={Colors.text} size={5} />
                                </Button>
                            )}}>
                        <Menu.Item onPress={handleSortRecipies}>Sort</Menu.Item>
                        <Menu.Item onPress={handleStoreFetchedRecipies}>Save recipies</Menu.Item>
                    </Menu>
                )
            }
        })
    }, []);

    return (
        <DumbComponent 
            isLoading={isLoading}
            recipies={recipies}
        />
    )
}

export default withRecipiesListScreen;