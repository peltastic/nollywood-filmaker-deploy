import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthStatusState {
  status: "LOGGED_IN" | "LOGGED_OUT";
}

const initialState: AuthStatusState = {
  status: "LOGGED_OUT",
};

export const adminAuthStatus = createSlice({
  name: "adminAuthSlice",
  initialState,
  reducers: {
    setAdminAuthStatus: (
      state,
      action: PayloadAction<"LOGGED_IN" | "LOGGED_OUT">
    ) => {
      state.status = action.payload;
    },
  },
});

export const { setAdminAuthStatus } = adminAuthStatus.actions;

export default adminAuthStatus.reducer;
