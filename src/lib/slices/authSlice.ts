import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthStatusState {
  status: "LOGGED_IN" | "LOGGED_OUT";
}

const initialState: AuthStatusState = {
  status: "LOGGED_OUT",
};

export const authStatusSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<"LOGGED_IN" | "LOGGED_OUT">) => {
      state.status = action.payload;
    },
  },
});


export const { setAuthStatus } = authStatusSlice.actions

export default authStatusSlice.reducer