import { useNavigation } from '@react-navigation/native';
import { ComponentType, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreens } from '../navigation';
import { addToMyRecipies } from '../store/recipe/recipe.reducer';
import { IngredientType, StepType } from '../store/recipe/recipe.types';
import { useAppDispatch } from '../store/store';

export type AddCustomRecipeProps = {
    ingredients: IngredientType[];
    steps: StepType[];
    recipe: any;
    dishType: string;
    selectedImage: string;
    onSetRecipe: (id: string, enteredValue: string | number | boolean) => void;
    onSetDishType: (enteredValue: string) => void;
    onSetSteps: (id: number, enteredValue: string) => void;
    onAddIngredientInput: () => void;
    onAddStepInput: () => void;
    onSubmitRecipe: () => void;
    onChangeIngredient: (id: string, ingredientId: number, enteredValue: string) => void;
    setSelectedImage: (image: string) => void
}

const withAddCustomRecipeScreen = (DumbComponent: ComponentType<AddCustomRecipeProps>) => () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation();
  
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [dishType, setDishType] = useState<string>("");
    const [recipe, setRecipe] = useState<any>({
      id: Math.floor(Math.random() * (10000000 - 1 + 1000000) + 1000000),
      title: { value: "" , isValid: true },
      servings: { value: null , isValid: true },
      readyInMinutes: { value: null , isValid: true },
      cheap: { value: false,isValid: true },
      glutenFree: { value: false,isValid: true },
      vegan: { value: false, isValid: true },
      vegetarian: { value: false,isValid: true },
      veryHealthy: { value: false, isValid: true },
      veryPopular: { value: false, isValid: true }, 
      image: { value: "" , isValid: true },
    });

    const [steps, setSteps] = useState<StepType[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>(""); 

    const handleSetDishType = (enteredValue: string) => {
      setDishType(enteredValue);
    }

    const handleSetRecipe = (id: string, enteredValue: string | number | boolean) => {  
      setRecipe((prevState: any) => ({
        ...prevState,
        [id]: {
          value: enteredValue,
          isValid: true,
        }
      }));
    }

    const handleAddStepInput = () => {
      setSteps((prevState: StepType[]) => [...prevState, {
        id: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
        number:  steps.length + 1,
        step: "",
        isValid: true,
      }])
    }

    const handleAddIngredientInput = () => {
        setIngredients((prevState: IngredientType[]) => [...prevState, {
          id: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
          name: "",
          measure: {
            amount: 0,
            unit: ""
          },
          isValid: true,
          isChecked: false
        }]);
    }

    const handleSetSteps = (id: number, enteredValue: string) => {
      const stepsCopy = steps;
      const step = steps.find(s => s.id === id);
      const index = steps.findIndex(s => s.id === id);

      let updatedStep: StepType = {
        ...step!,
        step: enteredValue
      }

      stepsCopy[index] = updatedStep;

      setSteps(stepsCopy);
    }
  
    const handleChangeIngredients = (id: string, ingredientId: number, enteredValue: string) => {
        const ingredientsCopy = ingredients;
        const ingredient = ingredients.find(i => i.id === ingredientId);
        const index = ingredients.findIndex(i => i.id === ingredientId);

        let updatedIngredient: IngredientType = {
            ...ingredient!,
            [id]: enteredValue,
        }

        if((id === 'amount' || id === 'unit') && !!ingredient) {
            updatedIngredient = {
              ...ingredient,
              measure: {
                ...ingredient['measure'],
                [id]: enteredValue
              }
            }
        }

        ingredientsCopy[index] = updatedIngredient;

        setIngredients(ingredientsCopy);
    }

    const handleSubmitRecipe = () => {
      const savedRecipe = {
        cheap: recipe.cheap.value,
        glutenFree: recipe.glutenFree.value,
        id: recipe.id,
        image: selectedImage,
        imageType: 'png',
        readyInMinutes: recipe.readyInMinutes.value,
        servings: recipe.servings.value,
        title: recipe.title.value,
        vegan: recipe.vegan.value,
        vegetarian: recipe.vegetarian.value,
        veryHealthy: recipe.veryHealthy.value,
        veryPopular: recipe.veryPopular.value,
        dishTypes: [dishType],
        extendedIngredients: ingredients,
        analyzedInstructions: [
          {name: "", steps: steps}
        ]
      };

      dispatch(addToMyRecipies(savedRecipe));
      navigation.navigate(NavigationScreens.MY_RECIPIES);
    }

    return (
        <DumbComponent 
            ingredients={ingredients}
            steps={steps}
            dishType={dishType}
            recipe={recipe}
            onSetRecipe={handleSetRecipe}
            onSetDishType={handleSetDishType}
            onSetSteps={handleSetSteps}
            onAddIngredientInput={handleAddIngredientInput}
            onAddStepInput={handleAddStepInput}
            onChangeIngredient={handleChangeIngredients}
            onSubmitRecipe={handleSubmitRecipe}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
        />
    )
}

export default withAddCustomRecipeScreen;