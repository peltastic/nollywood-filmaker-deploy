
import { IUserInfoData } from "@/interfaces/auth/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



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
  },
});

export const { setAdminInfo } = authInfoSlice.actions;

export default authInfoSlice.reducer;
