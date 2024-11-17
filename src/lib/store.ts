import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import servicesReducer from "./slices/servicesSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import routeReducer from "./slices/routeSlice";
import logoutReducer from "./slices/logoutSlice";
import consultantAuthReducer from "./slices/consultants/authSlice"
import consultantReducer from "./slices/consultants/consultantSlice"
import consultantRouteReducer from "./slices/consultants/routeSlice"
import persistReducer from "redux-persist/lib/persistReducer";
import { authApi } from "./features/users/auth/auth";
import { servicesApi } from "./features/users/services/services";
import { profileApi } from "./features/users/profile/profile";
import { requestsApi } from "./features/users/dashboard/requests/requests";
import { consultantAuthApi } from "./features/consultants/auth/auth";
import { availabilityApi } from "./features/consultants/profile/availability";
import { chatApi } from "./features/users/chat/chat";
import { consultantRequestsApi } from "./features/consultants/dashboard/request";
import { consultantProfileApi } from "./features/consultants/profile/profile";

const persistConfig = {
  key: "root",
  storage,
};
const combinedReducer = combineReducers({
  services: servicesReducer,
  user: userReducer,
  auth: authReducer,
  route: routeReducer,
  logout: logoutReducer,
  consultantAuth: consultantAuthReducer,
  consultant: consultantReducer,
  consultantRoute: consultantRouteReducer
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [consultantAuthApi.reducerPath]: consultantAuthApi.reducer,
    [availabilityApi.reducerPath]: availabilityApi.reducer,
    [consultantRequestsApi.reducerPath]: consultantRequestsApi.reducer,
    [consultantProfileApi.reducerPath]: consultantProfileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authApi.middleware,
      servicesApi.middleware,
      profileApi.middleware,
      requestsApi.middleware,
      consultantAuthApi.middleware,
      availabilityApi.middleware,
      chatApi.middleware,
      consultantRequestsApi.middleware,
      consultantProfileApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
