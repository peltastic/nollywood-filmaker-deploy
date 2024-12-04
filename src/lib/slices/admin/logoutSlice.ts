import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILogoutSlice {
  logoutType: "triggered" | "expired";
}

const initialState: ILogoutSlice = {
  logoutType: "triggered",
};

export const adminLogoutSlice = createSlice({
  name: "adminLogoutSlice",
  initialState,
  reducers: {
    setAdminLogoutType: (
      state,
      action: PayloadAction<"expired" | "triggered">
    ) => {
      state.logoutType = action.payload;
    },
  },
});

export const { setAdminLogoutType } = adminLogoutSlice.actions;

export default adminLogoutSlice.reducer;
