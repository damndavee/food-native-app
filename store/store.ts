import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistReducer, persistStore} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { compose, createStore, applyMiddleware } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { rootReducer } from './root.reducer';
import { rootSaga } from './root.saga';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware, thunk];
const composedEnhancers = compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, {}, composedEnhancers);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

sagaMiddleware.run(rootSaga);