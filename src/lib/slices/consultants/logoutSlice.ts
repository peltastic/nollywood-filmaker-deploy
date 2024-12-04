import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILogoutState {
  logoutType: "expired" | "triggered";
}

const initialState: ILogoutState = {
  logoutType: "triggered",
};

export const consultantLogoutSlice = createSlice({
  name: "consultantLogoutSlice",
  initialState,
  reducers: {
    setConsultantLogoutType: (
      state,
      action: PayloadAction<"expired" | "triggered">
    ) => {
        state.logoutType = action.payload
    },
  },
});

export const { setConsultantLogoutType} = consultantLogoutSlice.actions


export default consultantLogoutSlice.reducer