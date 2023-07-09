import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore as createPersistStore,
    persistReducer,
} from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { IAuthState, IBooksState } from "../types/reducer";
import authReducer from "./reducer/auth.reducer";
import bookReducer from "./reducer/book.reducer";
import socketReducer from "./reducer/socket.reducer";

const rootReducer = combineReducers({
    auth: persistReducer<IAuthState>(
        {
            key: "auth-reducer-data-persist",
            storage: AsyncStorage,
            stateReconciler: hardSet,
        },
        authReducer
    ),
    books: persistReducer<IBooksState>(
        {
            key: "books-persisted-store",
            storage: AsyncStorage,
            stateReconciler: hardSet,
        },
        bookReducer
    ),
    socket: socketReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistStore = createPersistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
