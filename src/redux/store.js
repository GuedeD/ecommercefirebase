import { configureStore } from "@reduxjs/toolkit";
import { bazarReducer } from "./bazarSlice";

// -------------- ETAPE 2 DEBUT -------------- //
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
// -------------- ETAPE 2 FIN -------------- //

// -------------- ETAPE 3 DEBUT -------------- //
const persistConfig = {
  key: "root",
  storage,
};
// -------------- ETAPE 3 FIN -------------- //

// -------------- ETAPE 4 DEBUT -------------- //
const reducers = combineReducers({ bazar: bazarReducer });
// -------------- ETAPE 4 FIN -------------- //

// -------------- ETAPE 5 DEBUT -------------- //
const persistedReducer = persistReducer(persistConfig, reducers);
// -------------- ETAPE 5 FIN -------------- //

// -------------- ETAPE 6 DEBUT -------------- //
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// -------------- ETAPE 6 FIN -------------- //

// -------------- ETAPE 7 DEBUT -------------- //
export let persistor = persistStore(store);
// -------------- ETAPE 7 FIN -------------- //
