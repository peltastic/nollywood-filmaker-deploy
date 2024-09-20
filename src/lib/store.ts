import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import servicesReducer from "./slices/servicesSlice";
import persistReducer from "redux-persist/lib/persistReducer";

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducer = combineReducers({
  services: servicesReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
