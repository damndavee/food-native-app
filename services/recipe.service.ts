import { spoonacularAPI } from "../utils/config";
import { RecipeType } from "../store/recipe/recipe.types";

export class RecipeService {
    static async getRecipeByQuery(query: string): Promise<RecipeType[]> {
        const {data} = await spoonacularAPI.get(`/complexSearch?query=${query}&number=10`);
        return data.results.map((r: RecipeType) => ({...r, shouldBeUpdated: true}));
    }

    static async getRecipeByCustomProperty(queryData: {type: string, query: string[]}): Promise<RecipeType[]> {
        const parsedQuery = queryData.query.map(q => q.toLowerCase()).join(",");
        const {data} = await spoonacularAPI.get(`/complexSearch?${queryData.type.toLowerCase()}=${parsedQuery}&number=10`);
        return data.results.map((r: RecipeType) => ({...r, shouldBeUpdated: true}));
    }

    // cannot get type of recipe object details
    static async getRecipeDetails(id: number): Promise<any> {
        const {data} = await spoonacularAPI.get(`/${id}/information?includeNutrition=false`);
        return data;
    }

    // cannot get type of recipe object details
    static async getAllGivenRecipiesDetails(idArray: number[]): Promise<any[]> {
        const parsedIds = idArray.join(",");
        const {data} = await spoonacularAPI.get(`/informationBulk?ids=${parsedIds}`);
        return data;
    }
}