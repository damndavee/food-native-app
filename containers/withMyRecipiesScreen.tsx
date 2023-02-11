import { ComponentType, useState } from "react";
import { isLoadingSelector, dishTypesSelector, myRecipiesSelector, typeRelatedDishesSelector } from "../store/recipe/recipe.selector";
import { RecipeType } from "../store/recipe/recipe.types";
import { useAppDispatch, useAppSelector } from "../store/store";

export type MyRecipiesProps = {
    isLoading: boolean;
    typesOfDish: string[],
    typeRelatedDishes: {[props: string]: RecipeType[]},
    onSearch: (query: string) => void;
}

const withMyRecipiesScreen = (DumbComponent: ComponentType<MyRecipiesProps>) => () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const dishTypes = useAppSelector(dishTypesSelector);
    const myRecipies = useAppSelector(myRecipiesSelector);
    const typeRelatedDishes = useAppSelector(typeRelatedDishesSelector);

    const [filteredList, setFilteredList] = useState<RecipeType[]>(typeRelatedDishes);

    const handleSearchQuery = (query: string) => {
        filterByTitle(typeRelatedDishes, query);
    }

    function filterByTitle(obj: RecipeType[], title: string) {
        const filteredObject: any = {};
        Object.entries(obj).forEach(([key, value]) => {
          filteredObject[key] = value.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
        });
        setFilteredList(filteredObject)
    }
    
    return (
        <DumbComponent 
            isLoading={isLoading}
            typesOfDish={dishTypes}
            typeRelatedDishes={filteredList}
            onSearch={handleSearchQuery}
        />
    )
};

export default withMyRecipiesScreen;