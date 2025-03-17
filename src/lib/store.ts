import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import servicesReducer from "./slices/servicesSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import routeReducer from "./slices/routeSlice";
import logoutReducer from "./slices/logoutSlice";
import consultantLogoutReducer from "./slices/consultants/logoutSlice";
import consultantAuthReducer from "./slices/consultants/authSlice";
import adminAuthReducer from "./slices/admin/authSlice";
import adminReducer from "./slices/admin/adminSlice";
import adminRouteReducer from "./slices/admin/routeSlice";
import consultantReducer from "./slices/consultants/consultantSlice";
import consultantRouteReducer from "./slices/consultants/routeSlice";
import adminLogoutReducer from "./slices/admin/logoutSlice";
import persistReducer from "redux-persist/lib/persistReducer";
import { authApi } from "./features/users/auth/auth";
import { servicesApi } from "./features/users/services/services";
import { profileApi } from "./features/users/profile/profile";
import { requestsApi } from "./features/users/dashboard/requests/requests";
import { consultantAuthApi } from "./features/consultants/auth/auth";
import { availabilityApi } from "./features/consultants/profile/availability";
import { chatApi } from "./features/users/services/chat/chat";
import { consultantRequestsApi } from "./features/consultants/dashboard/request";
import { consultantProfileApi } from "./features/consultants/profile/profile";
import { calendarApi } from "./features/consultants/calendar/calendar";
import { adminAuthApi } from "./features/admin/auth/auth";
import { adminRequestApi } from "./features/admin/requests/request";
import { dashboardChatApi } from "./features/users/dashboard/chat/chat";
import { consultantDashboardChatApi } from "./features/consultants/dashboard/chat/chat";
import { adminCustomersApi } from "./features/admin/customers/customers";
import { resolveApi } from "./features/consultants/dashboard/resolve";
import { adminStatsApi } from "./features/admin/dashboard/stats";
import { adminConsultantApi } from "./features/admin/consultants/consultants";
import { adminIssuesApi } from "./features/admin/issues/issues";
import { adminFeedbackApi } from "./features/admin/feedback/feedback";
import { issuesApi } from "./features/users/issues/issues";
import { filmmakerDatabaseApi } from "./features/users/filmmaker-database/filmmaker-database";
import { adminChatsApi } from "./features/admin/chats/chats";
import { withdrawalsApi } from "./features/consultants/dashboard/withdrawals/withdrawals";
import { adminFilmakerDatabaseApi } from "./features/admin/filmmaker-database/filmmaker-database";
import { adminWithdrawalsApi } from "./features/admin/dashboard/withdrawals";
import { filmmakerDatabaseConsultantApi } from "./features/consultants/dashboard/chat/filmmaker-database";
import { exportChatApi } from "./features/export";
import { joinApi } from "./features/join";
import { waitlistApi } from "./features/admin/waitlist/waitlist";
import { contactUsApi } from "./features/contact-us";
import { contactUsResponseApi } from "./features/admin/contact-us/contact-us";

const persistConfig = {
  key: "root",
  storage,
};
const combinedReducer = combineReducers({
  services: servicesReducer,
  user: userReducer,
  auth: authReducer,
  logout: logoutReducer,
  consultantAuth: consultantAuthReducer,
  consultant: consultantReducer,
  consultantLogout: consultantLogoutReducer,
  adminAuth: adminAuthReducer,
  adminuser: adminReducer,
  adminLogout: adminLogoutReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
  reducer: {
    persistedState: persistedReducer,
    route: routeReducer,
    adminRoute: adminRouteReducer,
    consultantRoute: consultantRouteReducer,
    [authApi.reducerPath]: authApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [requestsApi.reducerPath]: requestsApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [consultantAuthApi.reducerPath]: consultantAuthApi.reducer,
    [availabilityApi.reducerPath]: availabilityApi.reducer,
    [consultantRequestsApi.reducerPath]: consultantRequestsApi.reducer,
    [consultantProfileApi.reducerPath]: consultantProfileApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [adminRequestApi.reducerPath]: adminRequestApi.reducer,
    [dashboardChatApi.reducerPath]: dashboardChatApi.reducer,
    [consultantDashboardChatApi.reducerPath]:
      consultantDashboardChatApi.reducer,
    [adminCustomersApi.reducerPath]: adminCustomersApi.reducer,
    [resolveApi.reducerPath]: resolveApi.reducer,
    [adminStatsApi.reducerPath]: adminStatsApi.reducer,
    [adminConsultantApi.reducerPath]: adminConsultantApi.reducer,
    [adminIssuesApi.reducerPath]: adminIssuesApi.reducer,
    [adminFeedbackApi.reducerPath]: adminFeedbackApi.reducer,
    [issuesApi.reducerPath]: issuesApi.reducer,
    [filmmakerDatabaseApi.reducerPath]: filmmakerDatabaseApi.reducer,
    [adminChatsApi.reducerPath]: adminChatsApi.reducer,
    [withdrawalsApi.reducerPath]: withdrawalsApi.reducer,
    [adminFilmakerDatabaseApi.reducerPath]: adminFilmakerDatabaseApi.reducer,
    [adminWithdrawalsApi.reducerPath]: adminWithdrawalsApi.reducer,
    [filmmakerDatabaseConsultantApi.reducerPath]:
      filmmakerDatabaseConsultantApi.reducer,
    [exportChatApi.reducerPath]: exportChatApi.reducer,
    [joinApi.reducerPath]: joinApi.reducer,
    [waitlistApi.reducerPath]: waitlistApi.reducer,
    [contactUsApi.reducerPath]: contactUsApi.reducer,
    [contactUsResponseApi.reducerPath]: contactUsResponseApi.reducer
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
      consultantProfileApi.middleware,
      calendarApi.middleware,
      adminAuthApi.middleware,
      adminRequestApi.middleware,
      dashboardChatApi.middleware,
      consultantDashboardChatApi.middleware,
      adminCustomersApi.middleware,
      resolveApi.middleware,
      adminStatsApi.middleware,
      adminConsultantApi.middleware,
      adminIssuesApi.middleware,
      adminFeedbackApi.middleware,
      issuesApi.middleware,
      filmmakerDatabaseApi.middleware,
      adminChatsApi.middleware,
      withdrawalsApi.middleware,
      adminFilmakerDatabaseApi.middleware,
      adminWithdrawalsApi.middleware,
      filmmakerDatabaseConsultantApi.middleware,
      exportChatApi.middleware,
      joinApi.middleware,
      waitlistApi.middleware,
      contactUsApi.middleware,
      contactUsResponseApi.middleware
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
