export type RecipeType = {
    id: number,
    title: string,
    image: string,
    imageType: string,
    extendedIngredients: any[],
    readyInMinutes: number,
    servings: number,
    vegan: boolean,
    vegetarian: boolean,
    veryHealthy: boolean,
    veryPopular: boolean,
    cheap: boolean,
    glutenFree: boolean,
    analyzedInstructions: any
}

export type IngredientType = {
    id: number,
    name: string,
    measure: {
        amount: number,
        unit: string
    },
    isChecked: boolean,
    isValid: boolean,
}

export type StepType = {
    id: number, 
    number: number, 
    step: string,
    isValid: boolean
}

export type ShoppingRecipeType = {
    id: number,
    title: string,
    image: string,
    ingredients: IngredientType[]
}