import { IUserInfoData } from "@/interfaces/auth/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IConsultantInfo {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role: "consultant";
  expertise: string[];
}

export interface IConsultantInfoState {
  user: IUserInfoData | null;
}

const initialState: IConsultantInfoState = {
  user: {
    email: "",
    expertise: [],
    fname: "",
    id: "",
    lname: "",
    phone: "",
    role: "consultant",
  },
};

export const consultantInfoSlice = createSlice({
  name: "consultantSlice",
  initialState,
  reducers: {
    setConsultantInfo: (state, action: PayloadAction<IUserInfoData>) => {
      state.user = action.payload;
    },
    resetConsultantInfo: (state) => {
      state.user = null;
    },
  },
});

export const { setConsultantInfo, resetConsultantInfo } =
  consultantInfoSlice.actions;

export default consultantInfoSlice.reducer;
