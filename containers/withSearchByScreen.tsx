import { ComponentType, useCallback, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { NavigationScreens } from '../navigation';
import { useAppDispatch } from '../store/store';
import { RootStackParamList } from '../utils/types';
import { clearRecipies, clearMyRecipies, clearShoppingList } from '../store/recipe/recipe.reducer';
import { getRecipeByCustomPropertyThunk, getRecipeByQueryThunk } from '../store/recipe/recipe.thunk';

export type SearchByProps = {
    isCustom: boolean;
    isValid: boolean;
    customProperty: string;
    selectedProperties: string[];
    onSetProperty: (value: any) => void;
    onSubmit: () => void;
    onSelectProperty: (item: any) => void;
    onChange: (enteredValue: string) => void;
}   

const withSearchByScreen = (DumbComponent: ComponentType<SearchByProps>) => () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const [query, setQuery] = useState<string>("");

    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [customProperty, setCustomProperty] = useState<string>('Cuisine');
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsCustom(route.name === 'RecipeSearch' ? false : true);
            handleResetParams();
        })
    }, [navigation]);

    const handleQueryChange = (enteredValue: string) => {
        setIsValid(true);
        setQuery(enteredValue);
    }

    const handleResetParams = () => {
        setQuery("");
        setCustomProperty('Cuisine');
        setSelectedProperties([]);
        setIsValid(true);
    }

    const isFormValid = () => {
        if(route.name === "RecipeSearch") {
            if((query as string).trim().length === 0) {
                return false;
            }
        } else {   
            if(selectedProperties.length === 0) {
                return false;
            }
        }

        return true;
    } 

    const handleSearchSubmit = useCallback(() => {
        const hasValidationPassed = isFormValid();

        // dispatch(clearMyRecipies());
        // dispatch(clearShoppingList());

        if(hasValidationPassed) {
            setIsValid(true);
        } else {
            setIsValid(false);
            return;
        }

        if(route.name === 'RecipeSearch') {
            dispatch(getRecipeByQueryThunk(query as string) as any);
        } else {
            dispatch(getRecipeByCustomPropertyThunk({type: customProperty, query: selectedProperties}) as any);
        }

        handleResetParams()
        navigation.navigate(NavigationScreens.RECIPIES_LIST_SCREEN);
    }, [selectedProperties, navigation, dispatch, query]);

    const handleSetCustomProperty = useCallback((value: any) => {
        setSelectedProperties([]);
        setCustomProperty(value);
    }, [setSelectedProperties, setCustomProperty]);

    const handleSelectProperty = useCallback((item: any) => {
        setSelectedProperties(item);
        setIsValid(true);
    }, [setSelectedProperties]);

    return (
        <DumbComponent
            isValid={isValid}
            customProperty={customProperty}
            selectedProperties={selectedProperties}
            onSetProperty={handleSetCustomProperty}
            onSubmit={handleSearchSubmit}
            onSelectProperty={handleSelectProperty}
            onChange={handleQueryChange}
            isCustom={isCustom}
        />
  )
}

export default withSearchByScreen;