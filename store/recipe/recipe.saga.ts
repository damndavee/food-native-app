import { put, takeLatest, select, race, take, takeEvery, call } from 'redux-saga/effects';

import { storeAllRecipiesAction } from './recipe.action';
import { getAllRecipiesDetailsThunk } from "./recipe.thunk";
import { recipiesSelector, myRecipiesSelector } from "./recipe.selector";
import { RecipeType, ShoppingRecipeType } from "./recipe.types";
import { addToMyRecipies } from "./recipe.reducer";

 
export function* storeFetchedRecipies(): any {
    const myRecipies: RecipeType[] = yield select(myRecipiesSelector);
    const recentlyFetchedRecipies: RecipeType[] = yield select(recipiesSelector);
    const mergedRecipies: RecipeType[] = [...myRecipies, ...recentlyFetchedRecipies];
    
    const recipiesSet = new Set();

    mergedRecipies.forEach(r => recipiesSet.add(JSON.stringify(r)));
    
    const formattedMergedRecipies = [...recipiesSet].map((item) => {
        if (typeof item === 'string') return JSON.parse(item);
        else if (typeof item === 'object') return item;
    });

    const recipiesId = formattedMergedRecipies.map(r => r.id);

    yield put(getAllRecipiesDetailsThunk(recipiesId) as any);

    const [success, rejected] = yield race([take(getAllRecipiesDetailsThunk.fulfilled), take(getAllRecipiesDetailsThunk.rejected)]);

    if(success) {
        yield console.log("HERE GOES SOME SUCCESS TOAST");
    }

    if(rejected) {
        yield console.log("HERE GOES SOME REJECTED TOAST");
    }
}

export function* recipeSagaWatcher() {
    yield takeEvery(storeAllRecipiesAction, storeFetchedRecipies);
}