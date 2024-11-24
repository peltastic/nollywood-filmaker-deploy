import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IRouteState {
  adminFallbackRoute: string | null;
}

const initialState: IRouteState = {
  adminFallbackRoute: "",
};

export const adminRouteSlice = createSlice({
  name: "adminRouteSlcie",
  initialState,
  reducers: {
    setAdminFallbackRoute: (state, action: PayloadAction<string | null>) => {
      state.adminFallbackRoute = action.payload;
    },
  },
});

export const { setAdminFallbackRoute } = adminRouteSlice.actions;

export default adminRouteSlice.reducer;
