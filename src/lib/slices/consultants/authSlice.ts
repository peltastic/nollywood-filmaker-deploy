import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthStatusState {
  status: "LOGGED_IN" | "LOGGED_OUT";
}

const initialState: AuthStatusState = {
  status: "LOGGED_OUT",
};

export const consultantAuthStatusSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setConsultantAuthStatus: (state, action: PayloadAction<"LOGGED_IN" | "LOGGED_OUT">) => {
      state.status = action.payload;
    },
  },
});


export const { setConsultantAuthStatus } = consultantAuthStatusSlice.actions

export default consultantAuthStatusSlice.reducer