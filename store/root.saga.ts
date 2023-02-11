import { call, all } from 'redux-saga/effects';
import { recipeSagaWatcher } from "./recipe/recipe.saga";

export function* rootSaga() {
  yield all([call(recipeSagaWatcher)]);
}
