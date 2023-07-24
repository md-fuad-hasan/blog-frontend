import { applyMiddleware, createStore } from 'redux';
import {reducer} from './reducer';
import thunk from 'redux-thunk';

import { persistReducer, persistStore } from 'redux-persist';
import storage  from 'redux-persist/lib/storage';

const persistConfig = {
    key:"root",
    storage,
}

const persistedReducer = persistReducer(persistConfig,reducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);