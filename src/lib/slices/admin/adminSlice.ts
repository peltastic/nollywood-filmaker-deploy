import { IUserInfoData } from "@/interfaces/auth/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { resetConsultantInfo } from "../consultants/consultantSlice";

export interface IAdminInfoState {
  user: IUserInfoData;
}

const initialState: IAdminInfoState = {
  user: {
    email: "",
    expertise: [],
    fname: "",
    id: "",
    lname: "",
    phone: "",
    role: "admin",
  },
};

export const authInfoSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setAdminInfo: (state, action: PayloadAction<IUserInfoData>) => {
      state.user = action.payload;
    },
    resetAdminInfo: (state) => {
      state.user = {
        email: "",
        expertise: [],
        fname: "",
        id: "",
        lname: "",
        phone: "",
        role: "admin",
      };
    },
  },
});

export const { setAdminInfo, resetAdminInfo } = authInfoSlice.actions;

export default authInfoSlice.reducer;
